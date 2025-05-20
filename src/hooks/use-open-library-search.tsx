import { useEffect, useState } from "react";
import type { Book } from "@/types/book";

export function useOpenLibrarySearch(query: string) {
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(
            debouncedQuery
          )}`,
          { signal: controller.signal }
        );
 console.log({res, debouncedQuery})
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        setResults(data.docs || []);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Failed to fetch books:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();

    return () => controller.abort();
  }, [debouncedQuery]);

  return { results, loading };
}