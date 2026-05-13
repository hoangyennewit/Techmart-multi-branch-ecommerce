import { UserRole } from "./roleInterface";

export interface JWTPayload {
  id: number;
  email: string;
  ma_vai_tro: UserRole; 
  ho_ten: string;
}