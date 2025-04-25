export type RegisterResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    created_at: Date;
  };
};

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};
