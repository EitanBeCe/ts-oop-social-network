export type UsersCodable = {
  list: UserCodable[] | [];
};
export type UserCodable = {
  id?: string;
  name?: string;
  password: string;
};
