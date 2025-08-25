import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { client } from "@/sanity/lib/client";

interface Props {
  asset: SanityImageSource;
  alt: string;
  caption?: string;
  className?: string; // allow external styling overrides
}

export const SanityImage = (props: Props) => {
  const { asset, alt, caption, className } = props;
  const imageProps = useNextSanityImage(client, asset);

  if (!imageProps) return null;

  return (
    <figure className="m-0">
      <Image
        width={imageProps.width}
        height={imageProps.height}
        src={imageProps.src}
        alt={alt}
        className={"block h-full w-full object-cover " + (className || "")}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-pretty text-gray-500 italic dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};
