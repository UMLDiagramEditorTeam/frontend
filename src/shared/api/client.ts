import { HttpClient } from "./generated/http-client";

export const httpClient = new HttpClient({
  baseURL: "https://virtserver.swaggerhub.com/bbb-7fb/spec/1.1.1",
  securityWorker: () => {
    const token = localStorage.getItem("token");

    return token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
  },
});