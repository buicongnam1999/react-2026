import { useQuery } from "@tanstack/react-query"
import { fetchPosts } from "@/services/post.api"
import type { PostSearch } from "@/models/admin/post.model"

export const useQueryPost = (search: PostSearch) => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(search),
  })
}