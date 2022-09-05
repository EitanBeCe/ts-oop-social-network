export type AccountsCodable = {
  list: AccountCodable[];
};

export type AccountCodable = {
  id?: string;
  name?: string;
  password: string;
};

export type AccountCodablePOSTResponse = {
  name: string; // Here Firebase returns id
};

export type AccountCodableServerFormat = {
  id: Acc;
};
export type Acc = {
  name: string;
  password: string;
};
