export type LoginUser = {
  username: string;
  email: string;
  id: string;
  role: number | null;
  imageUrl: string | null;
};

export type ActionResponse<T = unknown> = {
  success: boolean;
  message: string;
  data: T;
};
