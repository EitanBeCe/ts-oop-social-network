export type AccountsCodable = {
  list: AccountCodable[];
};

export type AccountCodable = {
  id?: string;
  name?: string;
  password: string;
};
