export interface BookDetail {
  id: number;
  title: string;
  author: string;
  price: number;
  types?: { description: string }[];
  mainGenres?: { description: string }[];
  subGenres?: { description: string }[];
}
