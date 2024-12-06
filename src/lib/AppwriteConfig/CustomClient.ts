import * as sdk from "node-appwrite";
const { VITE_PUBLIC_ENDPOINT, VITE_API_KEY, VITE_PROJECT_ID } = import.meta.env;

type Headers = {
  [key: string]: string;
};

// Create the Appwrite client
export default class CustomClient extends sdk.Client {
  constructor() {
    super();
    this.setEndpoint(VITE_PUBLIC_ENDPOINT) // Your API Endpoint
      .setProject(VITE_PROJECT_ID) // Your project ID
      .setKey(VITE_API_KEY); // Your secret API key

    // Override the headers to remove 'user-agent'
    this.headers = {
      ...this.headers,
      // Remove the user-agent header by not including it
    };
    delete this.headers["user-agent"];
  }

  async call(
    method: string,
    url: URL,
    headers: Headers = {},
    params: sdk.Payload = {},
    responseType = "json"
  ): Promise<any> {
    // Remove the User-Agent header
    const modifiedHeaders = { ...this.headers, ...headers };
    delete modifiedHeaders["User-Agent"];
    return super.call(method, url, modifiedHeaders, params, responseType);
  }
}

// Use the custom client
const client = new CustomClient();

// Export the modified SDK instances
export const database = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
