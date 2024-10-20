import { SearchIcon, Triangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BookCard from "../component/BookCard";
import Button from "../component/Button";
import useDebounce from "../hooks/useDebounce";
import { useGetBooks } from "../lib/bookApi";

const SEARCH_OPTIONS = [
  {
    value: "search",
    label: "Title",
  },
  {
    value: "topic",
    label: "Topic",
  },
];

export default function HomePage() {
  const [searchBy, setSearchBy] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchParam, setSearchParam] = useSearchParams();
  const [pageNumber, setPageNumber] = useSearchParams();
  const [wishList, setWishList] = useState<Book[]>([]);

  const search = (term: string) => {
    setSearchParam({ [searchBy]: term });
    localStorage.setItem("searchBy", searchBy);
    localStorage.setItem("searchTerm", term);
  };

  const debouncedSearch = useDebounce(search, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetBooks({
    [searchBy]: searchParam.get(searchBy) as string,
    page: pageNumber.get("page") as string,
  });

  useEffect(() => {
    const prevSearchBy = localStorage.getItem("searchBy") || "";
    const prevSearchTerm = localStorage.getItem("searchTerm") || "";
    if (
      prevSearchBy &&
      prevSearchTerm &&
      searchBy === "" &&
      searchTerm === ""
    ) {
      setSearchBy(prevSearchBy);
      setSearchTerm(prevSearchTerm);
      setSearchParam({ [prevSearchBy]: prevSearchTerm });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content = null;

  if (isLoading) {
    const loading = Array.from({ length: 10 }).map((_, index) => (
      <div
        className="space-y-3 bg-gray-300 animate-pulse p-4 rounded-lg text-center"
        key={index}
      >
        <div className="animate-pulse bg-gray-200/90 h-48 w-32 rounded-lg shrink-0"></div>
        <div className="animate-pulse bg-gray-200/90 h-4 w-48 rounded-lg mt-2"></div>
        <div className="animate-pulse bg-gray-200/90 h-4 w-48 rounded-lg mt-2"></div>
        <div className="animate-pulse bg-gray-200/90 h-8 w-48 rounded-lg mt-2"></div>
      </div>
    ));
    content = (
      <div className="p-8 sm:p-10 max-w-7xl mx-auto">
        <div className="text-md text-black">
          <div className="gap-5 flex flex-wrap justify-center">{loading}</div>
        </div>
      </div>
    );
  } else if (!isLoading && isError) {
    content = <div>Error: {error.message}</div>;
  } else if (!isLoading && data?.results.length === 0) {
    content = <div>No results found</div>;
  } else if (!isLoading && data) {
    content = (
      <div className="p-8 sm:p-10 max-w-7xl mx-auto">
        <div className="gap-5 flex flex-wrap w-full justify-center">
          {data?.results.map((book) => (
            <BookCard
              key={book?.id}
              book={book}
              wishList={wishList}
              setWishList={setWishList}
            />
          ))}
        </div>

        {/* Pagination Module */}
        <div className="flex justify-center items-center gap-3 mt-5">
          <Button
            disabled={!data?.previous && !data?.previous?.split("=")?.[1]}
            onClick={() => {
              const page =
                data?.previous && data?.previous?.split("=")?.[1]
                  ? data.previous.split("=")[1]
                  : "";
              if (page === "") {
                navigate("/");
              } else {
                setPageNumber({
                  page,
                });
              }
            }}
          >
            Previous
          </Button>

          <Button
            disabled={!data?.next && !data?.next?.split("=")?.[1]}
            onClick={() => {
              const page =
                data?.next && data?.next?.split("=")?.[1]
                  ? data.next.split("=")[1]
                  : "";

              if (page === "") {
                navigate("/");
              } else {
                setPageNumber({
                  page,
                });
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-brand relative px-6 sm:px-24 pb-24 pt-40">
        <div className="sm:space-x-3">
          <div>
            <p className="text-white text-lg capitalize mb-3">
              Explore Gutenberg Project's collection of books
            </p>
            <div className="flex">
              <div className="rounded-l-lg w-60 flex items-center bg-white px-3 py-1 border-white border-2">
                <SearchIcon className="text-brand" size={30} />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent w-52 h-10 border-2 border-none outline-none focus-within:outline-none focus-visible:outline-none focus:outline-none p-2 placeholder:text-gray-400 capitalize"
                  role="search"
                  value={searchTerm}
                  onChange={handleChange}
                />
              </div>
              <div className="bg-white rounded-r-lg border-l w-32 flex items-center px-4 relative">
                <select
                  title="Filter by"
                  className="w-32 h-10 border-none focus:outline-none py-1 bg-transparent appearance-none text-black absolute inset-x-0 z-20 px-3 font-extralight capitalize"
                  onChange={(e) => {
                    setSearchBy(e.target.value);
                    localStorage.removeItem("searchBy");
                    localStorage.removeItem("searchTerm");
                    setSearchTerm("");
                    setSearchParam({});
                  }}
                  value={searchBy}
                >
                  {/* empty value */}
                  <option value="" className="bg-brand text-white">
                    Filter by
                  </option>
                  {SEARCH_OPTIONS.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-brand text-white"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <Triangle
                  className="text-brand fill-brand rotate-180 absolute right-3"
                  size={15}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {content}
    </div>
  );
}
