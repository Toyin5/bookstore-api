export interface IUser {
  id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
}
export type UserCreationType = Pick<IUser, 'first_name' | 'last_name' | 'email' | 'password'>;
export default IUser;
