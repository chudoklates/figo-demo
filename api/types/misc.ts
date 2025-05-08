export type PrepareUploadData = {
  id: string;
  upload_url: string;
};

export type FileObject = {
  id_file: string;
  url: string;
  file_name: string;
  extension: string;
  name: string | null;
  description: string | null;
};

export type Pagination<T> = {
  total_count: number;
  page_info: {
    has_next_page: boolean;
    has_previous_page: boolean;
    start_cursor: string;
    end_cursor: string;
  };
  edges: {
    cursor: string;
    node: T;
  }[];
};

export type GoogleReview = {
  text?: string;
  rating: number;
  publish_time: string;
  author_name: string;
  author_photo_uri?: string;
};
