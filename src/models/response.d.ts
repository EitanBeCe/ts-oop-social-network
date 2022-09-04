import { ErrorCodable } from './error';

export interface ResponseCodable<T> {
  data?: T;
  errors?: ErrorCodable[];
  status: number;
}
