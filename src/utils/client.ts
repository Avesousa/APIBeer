import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface Options {
  baseUrl?: string;
  headers?: { [key: string]: string };
}

class Client {
  private axios: AxiosInstance;

  constructor(options: Options) {
    this.axios = axios.create({
      baseURL: options.baseUrl,
      headers: {
        ...options.headers,
      },
    });
  }

  get<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
    return this.axios.get(endpoint, options);
  }

  post<T>(
    endpoint: string,
    data: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    return this.axios.post(endpoint, data, options);
  }

  put<T>(
    endpoint: string,
    data: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    return this.axios.put(endpoint, data, options);
  }

  delete<T>(endpoint: string, options?: AxiosRequestConfig): Promise<T> {
    return this.axios.delete(endpoint, options);
  }
}

export default Client;