import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll() {
    const res = await axiosInstance.get<T[]>(this.endpoint);
    return res.data;
  }

  post(data: T) {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  }
}
export default APIClient;
