export type Post = {
  id: number
  title: string
  body: string
}

export const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts")
  if (!res.ok) {
    throw new Error("Failed to fetch posts")
  }
  return res.json()
}
