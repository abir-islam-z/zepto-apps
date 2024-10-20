import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://gutendex.com/",
});

export const getBooks = async ({
  page,
  search,
  topic,
}: {
  page?: string;
  search?: string;
  topic?: string;
}): Promise<ApiResponse> => {
  const response = await axiosInstance("/books", {
    params: {
      page,
      search,
      topic,
    },
  });
  return response.data;
};

export const getBook = async (id: string): Promise<Book> => {
  const response = await axiosInstance(`/books/${id}`);
  return response.data;
};

export const useGetBooks = ({
  search,
  page,
  topic,
}: {
  search?: string;
  page?: string;
  topic?: string;
}) => {
  return useQuery({
    queryKey: ["books", page, search, topic],
    queryFn: () =>
      getBooks({
        page,
        search,
        topic,
      }),
  });
};

export const useGetBook = (id: string) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => getBook(id),
  });
};
