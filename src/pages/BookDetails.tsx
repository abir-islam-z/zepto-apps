import { useParams } from "react-router-dom";
import { useGetBook } from "../lib/bookApi";

export default function BookDetails() {
  const { id } = useParams();
  const { data: book, isLoading } = useGetBook(id as string);

  let content = null;

  if (isLoading) {
    // skeleton
    content = (
      <div className="animate-pulse bg-white rounded-lg shadow-lg overflow-hidden p-4 flex gap-5 flex-wrap sm:flex-nowrap">
        <div className="bg-gray-300 drop-shadow-md flex place-items-center overflow-hidden rounded-lg w-[320px] h-[420px]"></div>
        <div className="space-y-2">
          <div className="bg-gray-200/90 animate-pulse h-10 w-[300px] rounded-lg"></div>
          <div className="animate-pulse h-6 w-28 bg-gray-200/90 rounded-lg"></div>
          <div className="animate-pulse h-6 w-28 bg-gray-200/90 rounded-lg"></div>
          <div className="animate-pulse h-6 w-28 bg-gray-200/90 rounded-lg"></div>
        </div>
      </div>
    );
  } else if (!isLoading && book) {
    content = <BookDetailsContent book={book} />;
  }

  return <div className="max-w-7xl p-8 sm:p-10 mx-auto">{content}</div>;
}
const BookDetailsContent = ({ book }: { book: Book }) => (
  <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 flex gap-5 flex-wrap sm:flex-nowrap">
    <div className="bg-yellow-300 drop-shadow-md flex place-items-center overflow-hidden rounded-lg w-[320px] h-[420px]">
      <img
        className="w-full object-cover"
        src={book?.formats["image/jpeg"]}
        alt={book?.title}
      />
    </div>
    <div className="max-w-fit">
      <h2 className="text-lg font-bold text-teal-600">{book?.title}</h2>
      <p className="flex gap-2">
        <span className="text-gray-500">by </span>
        {book?.authors.map((author, index) => (
          <div>
            <span
              key={index}
              className="text-gray-500 capitalize font-semibold"
            >
              {author.name}
            </span>

            {/* Birth and Dead */}
            <span className="text-gray-400 ml-3">
              ({author.birth_year} - {author.death_year})
            </span>
          </div>
        ))}
      </p>
      <div className="text-md">
        <p>
          <span className="text-gray-400">Genre: </span>
        </p>
        {book?.bookshelves.map((genre, index) => {
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

        <div>
          {/* Download */}

          <a
            href={book?.formats["application/epub+zip"]}
            target="_blank"
            rel="noreferrer"
          >
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
              Download
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
);
