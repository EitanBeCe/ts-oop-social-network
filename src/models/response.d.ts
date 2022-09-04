import { ErrorCodable } from './error';

export type ResponseCodable<T> = {
  data: T;
  errors: ErrorCodable[];
  status: number;
};
