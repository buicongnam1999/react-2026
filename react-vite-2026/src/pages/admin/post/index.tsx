import { usePosts } from "@/hooks/usePosts"

export default function PostPage() {
  const { data, isLoading, error } = usePosts()

  if (isLoading) return <div>Loading...</div>
  
  if (error instanceof Error) return <div>{error.message}</div>

  return (
    <div style={{ padding: 20 }}>
      <h1>Posts</h1>
      {data?.slice(0, 5).map((post) => (
        <div key={post.id} style={{ marginBottom: 16 }}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}
