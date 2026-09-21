import Image from "next/image";

/**
 * Official VPD logo — used as provided, never redrawn or altered.
 */
export function BrandLogo({ logo }: { logo: string }) {
  return (
    <div className="relative shrink-0 overflow-hidden h-18 w-18">
      <Image
        src={logo}
        alt="VPD Logo"
        fill
        sizes="(max-width: 768px) 40px, 44px"
        priority
        className="object-contain"
      />
    </div>
  );
}
