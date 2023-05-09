import { useQuery } from "@tanstack/react-query";
import { CACHE_KEY_TODOS } from "../constants";
import todoService, { Todo } from "../services/todoService";

const useTodos = () => {
  // In axios, errors are instances of the Error class that is available in all browsers.
  return useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    /**
     * ! this keyword lose context and become undefined
     * * solution 1: use bind
     * * apiClient.getAll.bind(apiClient),
     * * solution 2: use arrow function
     * * () => apiClient.getAll(),
     * * so that this keyword will be apiClient
     */
    queryFn: () => todoService.getAll(),
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
};
export default useTodos;
