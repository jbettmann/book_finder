import { Button } from "@/components/ui/button";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { ReusableTableWrapper } from "@/components/ui/table/reusable-table-wrapper";
import { useFavoriteBooks } from "@/store/use-favorite-books";
import type { Book } from "@/types/book";
import { useMemo, useState } from "react";
import { BookList } from "../books-list-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BookTableContainer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date-desc");

  const { addFavorite, favorites, clearFavorites } = useFavoriteBooks();

  const handleAddBook = (book: Book) => {
    addFavorite(book);
  };

  const sortedFavorites = useMemo(() => {
    const copy = [...favorites];

    switch (sortOption) {
      case "date-asc":
        return copy; // original order
      case "date-desc":
        return copy.reverse();
      case "title-asc":
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      case "title-desc":
        return copy.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return copy;
    }
  }, [favorites, sortOption]);

  return (
    <ReusableTableWrapper
      isTableView={true}
      setIsTableView={() => {}}
      showToggleView={false}
      header={
        <div className="flex flex-wrap gap-4 w-full items-center">
          <DataTableSearch
            searchKey="books, authors, or IDs"
            searchQuery={searchTerm}
            setSearchQuery={setSearchTerm}
            onAdd={handleAddBook}
          />

          

          {favorites.length > 0 && (
            <Button
              variant="outline"
             
              onClick={clearFavorites}
            >
              Clear Favorites
            </Button>
          )}
          <Select value={sortOption} onValueChange={setSortOption} >
            <SelectTrigger className="w-[180px] ml-auto">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
              <SelectItem value="title-asc">Title A-Z</SelectItem>
              <SelectItem value="title-desc">Title Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
      tableComponent={
        <BookList
          data={sortedFavorites.map((book) => ({
            ...book,
            author_name: book.author_name || [],
          }))}
          totalItems={sortedFavorites.length}
        
        />
      }
    />
  );
}