export type AccountsCodable = {
  list: AccountCodable[];
};

export type AccountCodable = {
  id?: string;
  name?: string;
  password: string;
};

export type ServerFormatAccountCodable = {
  id: keyof Acc;
};

export type Acc = {
  name: string;
  password: string;
};
