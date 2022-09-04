export type PostsCodable = {
  list: PostCodable[] | [];
};

export type PostCodable = {
  id?: string;
  text: string;
  owner: string;
  created_at: Date;
  updated_at?: Date;
};
