import { UserService } from "./UserInterface";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "@/lib/utils";
import axiosClient from "../axios.config";
import { users } from "@/lib/AppwriteConfig/CustomClient";

export const AppwriteUserService: UserService = {
  /**
   * Creates a new user with the provided user data.
   * If a user with the same email already exists, returns the existing user.
   *
   * @param {Object} userData - The user data.
   * @param {string} userData.name - The name of the user.
   * @param {string} userData.email - The email of the user.
   * @param {string | null} userData.phone - The phone number of the user.
   * @returns {Promise<User>} - The created user or the existing user if a conflict occurs.
   * @throws Will throw an error if user creation fails for reasons other than email conflict.
   * The Appwrite API: users.create(userId, email, phone, password, name);
   */
  async createUser(userData: {
    name: string;
    email: string;
    phone: string | null;
  }): Promise<User | null> {
    const { name, email, phone } = userData;
    try {
      // Because of Safari issue with UserAgent
      const user = await users.create(
        ID.unique(),
        email,
        phone as string,
        undefined,
        name
      );

      return user;
    } catch (error: any) {
      if (error?.code === 409) {
        const user = await this.getUsersByQueryString(email);
        return user;
      }
      console.log(error?.response?.data?.message || error?.message);
      throw error;
    }
  },

  /**
   * Gets a user by the provided user ID.
   *
   * @param {string} userId - The ID of the user to retrieve.
   * @returns {Promise<any>} - The user if found, or an error if not.
   * @throws Will throw an error if user lookup fails.
   * The Appwrite API: users.get(userId);
   */
  async getUserById(userId: string): Promise<any> {
    try {
      const user = await axiosClient.get(`/users/${userId}`);
      return parseStringify(user);
    } catch (error: any) {
      console.error(error?.message);
      throw error;
    }
  },

  /**
   * Retrieves a user based on the provided query string.
   *
   * @param {string} query - The query string to match against user properties.
   * @returns {Promise<User | null>} - A promise that resolves to the user if found, otherwise null.
   * @throws Will throw an error if the user lookup fails.
   * The Appwrite API: users.list([Query.equal("email", email)]);
   */
  async getUsersByQueryString(query: string): Promise<User | null> {
    try {
      const userDocuments = await axiosClient.get("/users", {
        params: { query: [Query.equal(`${query}`, query)] },
      });
      if (userDocuments.data.users.length > 0) {
        return userDocuments.data?.users[0];
      } else {
        return null;
      }
    } catch (error: any) {
      console.error(error?.response?.data?.message || error?.message);
      throw error;
    }
  },
};
