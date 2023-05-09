import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
  pageSize: number;
}

const usePosts = (query: PostQuery) => {
  // const fetchPosts = (pageParam: number) =>
  //   axios
  //     .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
  //       params: {
  //         _start: (pageParam - 1) * query.pageSize,
  //         _limit: query.pageSize,
  //       },
  //     })
  //     .then((res) => res.data);

  // In axios, errors are instances of the Error class that is available in all browsers.
  return useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) =>
      axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _start: (pageParam - 1) * query.pageSize,
            _limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    staleTime: 1000 * 60, // 1 minutes
    keepPreviousData: true,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length < query.pageSize ? undefined : allPages.length + 1;
    },
    refetchOnWindowFocus: false,
  });
};
export default usePosts;
