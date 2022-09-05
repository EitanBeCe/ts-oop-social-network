export type PostsCodable = {
  list: PostCodable[];
};

export type PostCodable = {
  id?: string;
  text: string;
  ownerId: string;
  created_at: Date;
  updated_at?: Date;
};

export type PostsCodableServerFormat = {
  id: PostServerFormat;
};

export type PostServerFormat = {
  text: string;
  ownerId: string;
  created_at: Date;
  updated_at?: Date;
};
