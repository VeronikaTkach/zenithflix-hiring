'use client';

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ContentItem } from "@/types/types";
import { Skeleton } from "@/components/Skeleton";

interface Props {
  item: ContentItem;
  onSelect: (item: ContentItem) => void;
  isSelected?: boolean;
}

export const ContentCard = React.memo(
  function ContentCard({ item, onSelect }: Props) {
    const [loaded, setLoaded] = useState(false);
    const style = useMemo(
      () => ({ width: "180px", height: "320px", padding: "8px" }),
      []
    );

    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(item)}
        onKeyDown={(e) => e.key === "Enter" && onSelect(item)}
        className="relative flex-shrink-0 w-[160px] box-border focus:outline-none focus:ring cursor-pointer group"
        style={style}
      >
        {!loaded && <Skeleton width="100%" />}

        <Image
          src={item.thumbnail}
          alt={item.title}
          onLoadingComplete={() => setLoaded(true)}
          width={160}
          height={240}
          className={`object-cover rounded transition-opacity duration-200 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <h3 className="mt-2 text-sm font-medium truncate">{item.title}</h3>
        <p className="text-xs text-gray-500">
          {item.year} • {item.rating}/10
        </p>
        
        <div
          className="
            absolute inset-0 
            bg-black bg-opacity-80 
            text-white 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-200 
            p-2 flex flex-col overflow-auto
          "
        >
          <h4 className="text-base font-bold mb-1 truncate">{item.title}</h4>
          <p className="text-xs mb-1">Genre: {item.genre}</p>
          <p className="text-xs mb-1">Year: {item.year}</p>
          <p className="text-xs mb-1">Rating: {item.rating}/10</p>
          <p className="text-xs mb-1">Duration: {item.duration} min</p>
          {item.cast?.length > 0 && (
            <>
              <span className="font-semibold text-xs mt-2">Cast:</span>
              <ul className="list-disc list-inside text-xs mt-1 space-y-0.5">
                {item.cast.map((actor) => (
                  <li key={actor}>{actor}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    );
  }
);

ContentCard.displayName = "ContentCard";
