'use client';
import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ContentItem } from "@/types/types";
import { Skeleton } from "@/components/Skeleton";

interface Props {
  item: ContentItem;
  onSelect: (item: ContentItem) => void;
}

export const ContentCard = React.memo(
  function ContentCard({ item, onSelect }: Props) {
    const [loaded, setLoaded] = useState(false);
    const style = useMemo(
      () => ({ width: "160px", height: "320px" }),
      []
    );

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(item)}
        onKeyDown={(e) => e.key === "Enter" && onSelect(item)}
        className="flex-shrink-0 w-[160px] box-border focus:outline-none cursor-pointer"
        style={style}
      >
        {!loaded && <Skeleton width="100%"/>}
        <Image
          src={item.thumbnail}
          alt={item.title}
          onLoadingComplete={() => setLoaded(true)}
          width={160}
          className={`object-cover rounded transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <h3 className="mt-2 text-sm font-medium">{item.title}</h3>
        <p className="text-xs text-gray-500">
          {item.year} • {item.rating}/10
        </p>
      </div>
    );
  }
);
ContentCard.displayName = "ContentCard";