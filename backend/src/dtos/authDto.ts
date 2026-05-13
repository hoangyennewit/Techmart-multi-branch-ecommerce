import { UserRole } from "../interfaces/roleInterface";

export interface LoginResponseDTO {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    ho_ten: string;
    ma_vai_tro: UserRole;
  };
}