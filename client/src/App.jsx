import './App.css'
import PostCreate from './components/PostCreate'
import PostList from './components/PostList'

function App() {
  return (
    <main className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold text-slate-700">Create Post</h1>
      <PostCreate />
      <hr />
      <h1 className="text-3xl font-bold text-slate-700">Posts</h1>
      <PostList />
    </main>
  )
}

export default App
