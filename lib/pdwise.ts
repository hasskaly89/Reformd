/**
 * PD Wise (GoHighLevel / LeadConnector API v2) lead push.
 *
 * Creates or updates the contact, then opens an opportunity in the
 * "No Purchase" stage of the studio's pipeline. A PD Wise workflow on that
 * stage (or on the `website-intro-offer` tag) sends the SMS.
 *
 * Server-only env, per studio (SLUG = CECIL_HILLS | KINGS_PARK). Each value
 * falls back to the un-suffixed name, for when both studios share one
 * PD Wise sub-account:
 *   PDWISE_TOKEN_<SLUG>        Private Integration token (scopes: contacts.write,
 *                              opportunities.readonly, opportunities.write)
 *   PDWISE_LOCATION_ID_<SLUG>  Sub-account (location) ID
 *   PDWISE_PIPELINE_<SLUG>     Pipeline name (optional; default: the first pipeline
 *                              that has the stage below)
 *   PDWISE_STAGE_<SLUG>        Stage name (optional; default "No Purchase")
 *   PDWISE_PIPELINE_ID_<SLUG> / PDWISE_STAGE_ID_<SLUG>  Exact IDs (optional; skip the lookup)
 */

import type { Studio } from "@/lib/constants";

const API = process.env.PDWISE_API_BASE || "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";
const DEFAULT_STAGE = "No Purchase";

type Config = {
  token: string;
  locationId: string;
  pipelineName?: string;
  stageName: string;
  pipelineId?: string;
  stageId?: string;
};

const envKey = (slug: string) => slug.toUpperCase().replace(/-/g, "_");
const env = (name: string, slug: string) => process.env[`${name}_${envKey(slug)}`] || process.env[name] || undefined;

/** The studio's PD Wise settings, or null when PD Wise isn't configured for it. */
export function pdwiseConfig(slug: string): Config | null {
  const token = env("PDWISE_TOKEN", slug);
  const locationId = env("PDWISE_LOCATION_ID", slug);
  if (!token || !locationId) return null;
  return {
    token,
    locationId,
    pipelineName: env("PDWISE_PIPELINE", slug),
    stageName: env("PDWISE_STAGE", slug) || DEFAULT_STAGE,
    pipelineId: env("PDWISE_PIPELINE_ID", slug),
    stageId: env("PDWISE_STAGE_ID", slug),
  };
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

async function call<T>(cfg: Config, path: string, init: RequestInit = {}): Promise<{ status: number; data: T }> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${cfg.token}`,
      Version: VERSION,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
  });
  const text = await res.text();
  let data: unknown = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }
  return { status: res.status, data: data as T };
}

type Pipeline = { id: string; name: string; stages: { id: string; name: string }[] };

/** Resolve pipeline + stage IDs by name (cached per location while the server instance lives). */
const stageCache = new Map<string, { pipelineId: string; stageId: string }>();
async function resolveStage(cfg: Config) {
  if (cfg.pipelineId && cfg.stageId) return { pipelineId: cfg.pipelineId, stageId: cfg.stageId };
  const key = `${cfg.locationId}|${cfg.pipelineName ?? ""}|${cfg.stageName}`;
  const hit = stageCache.get(key);
  if (hit) return hit;

  const { status, data } = await call<{ pipelines?: Pipeline[] }>(
    cfg,
    `/opportunities/pipelines?locationId=${encodeURIComponent(cfg.locationId)}`,
  );
  if (status >= 300 || !data.pipelines) throw new Error(`PD Wise pipelines lookup failed (${status})`);

  const wantStage = norm(cfg.stageName);
  const candidates = cfg.pipelineName
    ? data.pipelines.filter((p) => norm(p.name) === norm(cfg.pipelineName!))
    : data.pipelines;
  for (const p of candidates) {
    const stage = p.stages.find((s) => norm(s.name) === wantStage) ?? p.stages.find((s) => norm(s.name).includes(wantStage));
    if (stage) {
      const found = { pipelineId: p.id, stageId: stage.id };
      stageCache.set(key, found);
      return found;
    }
  }
  throw new Error(`PD Wise stage "${cfg.stageName}" not found${cfg.pipelineName ? ` in pipeline "${cfg.pipelineName}"` : ""}`);
}

export type Lead = {
  firstName: string;
  phone: string; // E.164
  email?: string;
  studio: Studio;
  offerUrl: string;
  page: string;
};

/** Upsert the contact and open a "No Purchase" opportunity. Throws on failure. */
export async function pushLeadToPdWise(cfg: Config, lead: Lead): Promise<{ contactId: string; opportunityId?: string; duplicate?: boolean }> {
  const tags = ["website-intro-offer", `studio-${lead.studio.slug}`, "no-purchase"];
  const source = lead.page.startsWith("/studios/") ? "Website studio page form" : "Website intro offer pop-up";

  const contact = await call<{ contact?: { id: string } }>(cfg, "/contacts/upsert", {
    method: "POST",
    body: JSON.stringify({
      locationId: cfg.locationId,
      firstName: lead.firstName,
      phone: lead.phone,
      ...(lead.email ? { email: lead.email } : {}),
      tags,
      source,
    }),
  });
  const contactId = contact.data.contact?.id;
  if (contact.status >= 300 || !contactId) throw new Error(`PD Wise contact upsert failed (${contact.status})`);

  const { pipelineId, stageId } = await resolveStage(cfg);
  const opp = await call<{ opportunity?: { id: string }; message?: string | string[] }>(cfg, "/opportunities/", {
    method: "POST",
    body: JSON.stringify({
      locationId: cfg.locationId,
      pipelineId,
      pipelineStageId: stageId,
      contactId,
      name: `${lead.firstName} | Website intro offer | ${lead.studio.shortName}`,
      status: "open",
      source,
    }),
  });

  if (opp.status < 300) return { contactId, opportunityId: opp.data.opportunity?.id };
  // Someone who submits twice already has an open opportunity: that's fine.
  const msg = String(Array.isArray(opp.data.message) ? opp.data.message.join(" ") : opp.data.message ?? "");
  if (/duplicate|already exists/i.test(msg)) return { contactId, duplicate: true };
  throw new Error(`PD Wise opportunity failed (${opp.status}): ${msg.slice(0, 200)}`);
}
