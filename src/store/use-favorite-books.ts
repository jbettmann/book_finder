// src/store/useFavoriteBooks.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Book } from "@/types/book";

interface FavoriteBooksState {
  favorites: Book[];
  addFavorite: (book: Book) => void;
  removeFavorite: (bookId: string) => void;
  updateFavorite: (updatedBook: Partial<Book> & { key: string }) => void;
  clearFavorites: () => void;
}

export const useFavoriteBooks = create<FavoriteBooksState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (book) => {
        const exists = get().favorites.find((b) => b.key === book.key);
        if (!exists) {
          set((state) => ({
            favorites: [...state.favorites, book],
          }));
        } else {
          return { error: "Book already exist in list" };
        }
      },

      removeFavorite: (bookId) => {
        set((state) => ({
          favorites: state.favorites.filter((b) => b.key !== bookId),
        }));
      },

      updateFavorite: (updatedBook) => {
        set((state) => ({
          favorites: state.favorites.map((b) =>
            b.key === updatedBook.key ? { ...b, ...updatedBook } : b
          ),
        }));
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "favorite-books-storage",
    }
  )
);
