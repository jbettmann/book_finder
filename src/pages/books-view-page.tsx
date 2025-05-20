import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookForm from "@/books/books-form";
import type { Book } from "@/types/book";
import { useFavoriteBooks } from "@/store/use-favorite-books";

export default function BookViewPage() {
  const { id } = useParams<{ id: string }>();
  const { favorites } = useFavoriteBooks();

  const [book, setBook] = useState<Partial<Book> | null>(null);

  useEffect(() => {
    if (!id) return;

    const matchedBook = favorites.find(
      (book) => book.cover_edition_key === `${id}`
    );

    if (matchedBook) {
      setBook(matchedBook);
    }
  }, [id, favorites]);

  if (!book) return <p>No book data available.</p>;

  return <BookForm initialData={book} onSubmit={() => {}} />;
}
