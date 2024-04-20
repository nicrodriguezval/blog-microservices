import { useState } from 'react'

export default function PostCreate() {
  const [title, setTitle] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })

    await res.json()

    setTitle('')
  }

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <div>
          <label className="block mb-1 font-bold text-slate-600">Title</label>
          <input
            className="block w-[30rem] px-2 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <button
          className="max-w-[10rem] rounded-full bg-slate-500 text-white font-bold py-1"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
