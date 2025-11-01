export type User = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  avatar_url?: string;
  is_active: boolean;
  is_phone_verified?: boolean;
};

export type CreateUser = Omit<User, "id">;
