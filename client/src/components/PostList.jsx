import { useState, useEffect } from 'react'
import Post from './Post'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

export default function PostList() {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:4002/posts')
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="flex gap-8">
      {posts.map(({ id, title, comments }) => (
        <section key={id} className="flex flex-col gap-3">
          <Post id={id} title={title} />
          <h2 className="text-xl font-bold">Comentarios</h2>
          <CommentList comments={comments} />
          <CommentCreate postId={id} />
        </section>
      ))}
    </div>
  )
}
