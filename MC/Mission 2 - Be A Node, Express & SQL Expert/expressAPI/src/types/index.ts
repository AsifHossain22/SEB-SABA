export const role = ['user', 'admin', 'super_admin'] as const;

type TRole = (typeof role)[number];

export type TUser = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  age: number;
  role: TRole;
  createdAt: Date;
  updatedAt: Date;
};

export type TReturnUser = Omit<
  TUser,
  'id' | 'createdAt' | 'updatedAt' | 'passwordHash'
>;

export type TOrder = {
  id: number;
  customerId: number;
  quantity: number;
  food: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};
