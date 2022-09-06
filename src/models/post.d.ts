import { CommentCodable } from './comment';

export type PostsCodable = {
  list: PostCodable[];
};

export type PostCodable = {
  id?: string;
  text: string;
  ownerId: string;
  created_at: Date;
  updated_at?: Date;
  comment: CommentCodable[] | never[];
};

export type PostCodablePOSTResponse = {
  name: string; // Firebase returns id
};

export type PostsCodableServerFormat = {
  id: PostCodableServerFormat;
};

export type PostCodableServerFormat = {
  text: string;
  ownerId: string;
  created_at: Date;
  updated_at?: Date;
  comment: CommentCodable[] | never[];
};
