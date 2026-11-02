import Image from "next/image";

type Props = {
  /** Path under /public. When unset, a plain brand-tone block renders (no placeholder text). */
  src?: string;
  alt?: string;
  /** Tailwind aspect class, e.g. "aspect-[4/5]" */
  aspect?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function ImageSlot({
  src,
  alt = "",
  aspect = "aspect-[4/5]",
  className = "",
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-cement-100 ${aspect} ${className}`}>
      {src && (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      )}
    </div>
  );
}
