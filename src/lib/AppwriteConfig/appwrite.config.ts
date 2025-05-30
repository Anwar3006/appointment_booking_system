import * as sdk from "node-appwrite";
const { VITE_PUBLIC_ENDPOINT, VITE_API_KEY, VITE_PROJECT_ID } = import.meta.env;

let client = new sdk.Client();

client
  .setEndpoint(VITE_PUBLIC_ENDPOINT) // Your API Endpoint
  .setProject(VITE_PROJECT_ID) // Your project ID
  .setKey(VITE_API_KEY) // Your secret API key
  .addHeader("User-Agent", "Vite App");

export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
