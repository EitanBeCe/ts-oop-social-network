export type CommentsCodable = {
  list: CommentCodable[];
};

export type CommentCodable = {
  id?: string;
  ownerId: string; // User.id (publisher)
  text: string;
  created_at: Date; // (datetime)
  updated_at?: Date; // (datetime)
  module: string; // posts
  module_id: string; // post.id
};

export type CommentCodablePOSTResponse = {
  name: string; // Here Firebase returns id
};

export type CommentsCodableServerFormat = {
  id: CommentCodableServerFormat;
};

export type CommentCodableServerFormat = {
  ownerId: string;
  text: string;
  created_at: Date;
  updated_at?: Date;
  module: string;
  module_id: string;
};
