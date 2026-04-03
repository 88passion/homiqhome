"use client";

import Image from "next/image";
import { useState } from "react";
import type { PropertyImage } from "@/types/property";

interface PropertyGalleryProps {
  images: PropertyImage[];
  title: string;
}

export function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const list = images.length > 0 ? images : [{ id: "fallback", imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", sortOrder: 0, altText: title }];

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/5 sm:aspect-[16/10]">
        <Image
          src={list[selectedIndex].imageUrl}
          alt={list[selectedIndex].altText ?? title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
      </div>
      {list.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {list.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={`relative h-[4.5rem] w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-colors sm:h-20 sm:w-28 ${
                i === selectedIndex
                  ? "border-black"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.imageUrl}
                alt={img.altText ?? `${title} - ภาพ ${i + 1}`}
                fill
                className="object-cover"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
