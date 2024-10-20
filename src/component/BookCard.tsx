import { Heart } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function BookCard({
  wishList,
  setWishList,
  book,
}: {
  book: Book;
  wishList: Book[];
  setWishList: React.Dispatch<React.SetStateAction<Book[]>>;
}) {
  const addToWishlist = () => {
    setWishList((prev) => [...prev, book]);
    localStorage.setItem("wishList", JSON.stringify([...wishList, book]));
  };

  const removeFromWishlist = () => {
    setWishList((prev) => prev.filter((item) => item.id !== book.id));
    localStorage.setItem(
      "wishList",
      JSON.stringify(wishList.filter((item) => item.id !== book.id))
    );
  };

  useEffect(() => {
    const data = localStorage.getItem("wishList");
    if (data) {
      setWishList(JSON.parse(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findIndex = wishList.findIndex((item) => item.id === book.id);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 w-52 text-center space-y-3">
      <div className="text-right">
        {
          // If the book is in the wishList, show the remove button
          findIndex !== -1 ? (
            <button
              className="bg-transparent border-none outline-none"
              onClick={removeFromWishlist}
              title="Remove from wishList"
            >
              <Heart className="text-red-500 fill-red-500" size={24} />
            </button>
          ) : (
            <button
              className="bg-transparent border-none outline-none"
              onClick={addToWishlist}
              title="Add to wishList"
            >
              <Heart className="text-red-500" size={24} />
            </button>
          )
        }
      </div>
      <div className="w-32 h-48 bg-yellow-300 drop-shadow-md flex place-items-center overflow-hidden rounded-lg mx-auto">
        <img
          className="w-full object-cover"
          src={book.formats["image/jpeg"]}
          alt={book.title}
        />
      </div>
      <div className="max-w-48 overflow-clip  mx-auto">
        <h2 className="text-lg font-bold text-teal-600 line-clamp-1">
          {book.title}
        </h2>
        <p className="line-clamp-1">
          <span className="text-gray-500">by </span>
          {book.authors.map((author, index) => (
            <span
              key={index}
              className="text-gray-500 capitalize font-semibold"
            >
              {author.name}
            </span>
          ))}
        </p>
        <div className="line-clamp-2 text-xs">
          <p>
            <span className="text-gray-400">Genre: </span>
          </p>
          {book.bookshelves.map((genre, index) => {
            if (genre.includes(":")) {
              genre = genre.split(":")[1];
            }

            return (
              <span
                key={genre}
                className="text-gray-400 capitalize font-semibold"
              >
                {genre}
                {index !== book.bookshelves.length - 1 ? ", " : ""}
              </span>
            );
          })}

          <p className="capitalize"> Book Id: ({book?.id})</p>
        </div>
      </div>
      <div className="mx-auto max-w-52 text-right">
        <Link to={`/books/${book.id}`}>
          <Button>View</Button>
        </Link>
      </div>
    </div>
  );
}
