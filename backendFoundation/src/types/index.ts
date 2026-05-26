export const role = ['user', 'admin', 'super_admin'] as const;

type TRole = (typeof role)[number];

export type TUsers = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  age: number;
  role: TRole;
  created_at: Date;
  updated_at: Date;
};

export type TRUser = Omit<
  TUsers,
  'id' | 'password_hash' | 'created_at' | 'updated_at'
>;

export type TOrders = {
  id: number;
  customer_id: number;
  food: string;
  quantity: number;
  price: number;
  created_at: Date;
  updated_at: Date;
};
