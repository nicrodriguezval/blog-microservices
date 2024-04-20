// import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

const STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
}

export default function CommentList({ comments }) {
  // const [commentList, setCommentList] = useState([])

  // const fetchComments = useCallback(async () => {
  //   const res = await fetch(`http://localhost:4001/posts/${postId}/comments`)
  //   const data = await res.json()
  //   setCommentList(data)
  // }, [postId])

  // useEffect(() => {
  //   fetchComments()
  // }, [fetchComments])

  return (
    <ul className="max-w-md space-y-1 text-gray-700 list-disc list-inside">
      {comments.map(({ id, content, status }) => (
        <li
          key={id}
          style={{
            textDecoration:
              status === STATUSES.REJECTED ? 'line-through' : 'none',
            color: status === STATUSES.REJECTED ? 'red' : 'inherit',
            opacity: status === STATUSES.PENDING ? 0.5 : 1
          }}
        >
          {content}
        </li>
      ))}
    </ul>
  )
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired
}
