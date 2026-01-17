import { api } from "@/config/ky-config"
import type { Post, PostSearch } from "@/models/admin/post.model";

export const fetchPosts = async (search: PostSearch): Promise<Post[]> => {
  return await api.get(`posts?limit=${search.pageSize}`).json();
}
