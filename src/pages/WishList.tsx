import { useEffect, useState } from "react";
import BookCard from "../component/BookCard";

export default function WishList() {
  const [wishList, setWishList] = useState<Book[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("wishList");
    if (data) {
      setWishList(JSON.parse(data));
    }
  }, []);

  if (wishList.length === 0) {
    return (
      <div className="p-8 sm:p-10 max-w-7xl mx-auto">
        <div className="text-center text-2xl capitalize font-semibold">
          No books in wishList
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 sm:p-10 max-w-7xl mx-auto">
      <div className="gap-5 flex flex-wrap w-full justify-center">
        {wishList?.map((book) => (
          <BookCard
            key={book?.id}
            book={book}
            wishList={wishList}
            setWishList={setWishList}
          />
        ))}
      </div>
    </div>
  );
}
