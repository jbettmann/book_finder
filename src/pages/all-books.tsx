import BookTableContainer from "@/books/books-table-actions/books-table-container";
import React from "react";

export const AllBooks = () => {
  return (
    <div className="flex flex-1 flex-col gap-6 h-full">
      <h2 className="text-2xl font-bold text-center">Book Manager</h2>
      <BookTableContainer />
    </div>
  );
};
