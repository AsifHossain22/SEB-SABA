export const TUserRole = {
  admin: 'admin',
  agent: 'agent',
  user: 'user',
} as const;

export type TRoles = 'admin' | 'agent' | 'user';
