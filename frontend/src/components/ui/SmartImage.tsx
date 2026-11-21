import Image from "next/image";
import { IMAGES, imageSrc, type ImageKey } from "@/lib/image-data";
import { cn } from "@/lib/cn";

interface SmartImageProps {
  image: ImageKey;
  alt: string;
  /** object-position, mis. "center 30%" — penting karena banyak foto orang terpotong di tengah */
  focus?: string;
  sizes?: string;
  priority?: boolean;
  /** Opsional: kelas untuk elemen pembungkus (dipakai bila perlu aspect-ratio). */
  className?: string;
  imgClassName?: string;
}

/**
 * Pembungkus next/image yang selalu menyertakan dimensi intrinsik dan
 * blur placeholder. Semua foto di situs ini lewat sini supaya tidak ada
 * layout shift dan tidak ada gambar tajam yang tampil buram karena
 * dipaksa mengisi kotak yang salah rasio.
 */
export function SmartImage({
  image,
  alt,
  focus = "center",
  sizes = "100vw",
  priority = false,
  imgClassName,
}: SmartImageProps) {
  const meta = IMAGES[image];

  return (
    <Image
      src={imageSrc(image)}
      alt={alt}
      width={meta.width}
      height={meta.height}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={meta.blurDataURL}
      className={cn("h-full w-full object-cover", imgClassName)}
      style={{ objectPosition: focus }}
    />
  );
}

/** Varian untuk gambar latar penuh (fill). */
export function SmartImageFill({
  image,
  alt,
  focus = "center",
  sizes = "100vw",
  priority = false,
  imgClassName,
}: Omit<SmartImageProps, "className">) {
  const meta = IMAGES[image];

  return (
    <Image
      src={imageSrc(image)}
      alt={alt}
      fill
      quality={95}
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      blurDataURL={meta.blurDataURL}
      className={cn("object-cover", imgClassName)}
      style={{ objectPosition: focus }}
    />
  );
}
