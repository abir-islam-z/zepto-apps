interface Author {
  name: string;
  birth_year: number;
  death_year: number;
}

interface Formats {
  "text/html": string;
  "application/epub+zip": string;
  "application/x-mobipocket-ebook": string;
  "application/rdf+xml": string;
  "image/jpeg": string;
  "text/plain; charset=us-ascii": string;
  "application/octet-stream": string;
}

interface Translator {
  name?: string;
  birth_year?: number;
  death_year?: number;
}

interface Book {
  id: number;
  title: string;
  authors: Author[];
  translators?: Translator[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Formats;
  download_count: number;
}

interface ApiResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Book[];
}
