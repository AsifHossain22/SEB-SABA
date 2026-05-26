export const role = ['user', 'admin', 'super_admin'] as const;

type TRole = (typeof role)[number];

export type TUsers = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  age: number;
  role: TRole;
  createdAt: Date;
  updatedAt: Date;
};

export type TRUser = Omit<
  TUsers,
  'id' | 'passwordHash' | 'createdAt' | 'updatedAt'
>;

export type TOrders = {
  id: number;
  customerId: number;
  food: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};
