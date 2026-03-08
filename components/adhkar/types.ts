export interface AdhkarItem {
  id: number;
  text: string;
  count: number;
  audio: string;
  filename: string;
}

export interface AdhkarCategory {
  id: number | string;
  category: string;
  audio: string;
  filename: string;
  array: AdhkarItem[];
}
