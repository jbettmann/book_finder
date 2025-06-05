// src/store/useFavoriteBooks.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteBooksState {
  sort: string;
  setSort: (book: string) => void;
}

export const useSort = create<FavoriteBooksState>()(
  persist(
    (set) => ({
      sort: "date-desc",

      setSort: (sort) => {
        set(() => ({
          sort: sort,
        }));
      },
    }),
    {
      name: "favorite-books-sort",
    }
  )
);
