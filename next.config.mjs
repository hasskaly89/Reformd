/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Legacy Squarespace URLs -> matching pages (301), so old Google results,
   * ads, emails and bookmarks keep working after the domain moves here.
   * Map by intent, never blanket-redirect to the homepage.
   */
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/cecil-hills", destination: "/schedule/cecil-hills", permanent: true },
      { source: "/kings-park", destination: "/schedule/kings-park", permanent: true },
      { source: "/pricing-cecil-hills", destination: "/pricing/cecil-hills", permanent: true },
      { source: "/pricing-kings-park", destination: "/pricing/kings-park", permanent: true },
    ];
  },
};

export default nextConfig;
