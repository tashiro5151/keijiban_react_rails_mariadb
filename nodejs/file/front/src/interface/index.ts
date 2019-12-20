export interface i_roomsList {
  id: string;
  name: string;
  genreId: string;
  updated_at: Date;
  count: number;
}

export interface i_messagesList {
  id: string;
  name: string;
  message: string;
  created_at: Date;
  updated_at: Date;
}
