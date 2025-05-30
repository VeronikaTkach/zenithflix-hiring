import { StaticImageData } from "next/image";

export interface ContentItem {
  id: number;
  title: string;
  year: number;
  thumbnail: string | StaticImageData;
  rating: number;
  watchProgress: number;
  genre: string;
  duration: number;
  description: string;
  cast: Array<string>;
}