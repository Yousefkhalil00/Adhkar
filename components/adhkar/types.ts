export interface AdhkarItem {
  id: number;
  text: string;
  count: number;
  audio: string;
  filename: string;
}

export interface AdhkarCategory {
  id: number;
  category: string;
  audio: string;
  filename: string;
  array: AdhkarItem[];
}

export interface FeaturedCategory {
  id: string;
  title: string;
  preview: string;
}
