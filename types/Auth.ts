export type UserType = "user" | "reporter";

export interface LoginformData {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: "string";
  token_type: "bearer";
  user_id: 0;
  email: "string";
  role: "string";
  region_id: 0;
}
