// This interface allows us to acheive loose coupling so in the future
// we can switch from Appwrite to any other Backend service we want

export interface UserService {
  createUser(userData: {
    name: string;
    email: string;
    phone: string | null;
  }): Promise<User | null>;

  getUserById(userId: string): Promise<any>;

  getUsersByQueryString(query: string): Promise<User | null>;
}
