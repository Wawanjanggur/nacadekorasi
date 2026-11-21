import { cn } from "@/lib/cn";

interface SectionTitleProps {
  /** Judul script — dipakai apa adanya, mis. "Our Wedding Services" */
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  invert?: boolean;
  className?: string;
}

/**
 * Judul section memakai font script, sesuai referensi. Subjudul memakai
 * sans kecil berhuruf jarak lebar agar tidak bersaing dengan script.
 */
export function SectionTitle({
  title,
  subtitle,
  align = "center",
  invert = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <h2
        className={cn(
          "font-script script-lg",
          invert ? "text-white" : "text-teal",
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "label mt-4",
            invert ? "text-white/60" : "text-muted",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
