import { DefaultResponse } from "@/api/index.types";

export interface LoginUserResponse extends DefaultResponse {
  data: {
    token: string;
    user: {
      email: string
      firstName: string;
    };
  }
}