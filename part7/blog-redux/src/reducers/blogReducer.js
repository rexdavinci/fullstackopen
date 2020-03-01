import blogService from '../services/blogService'
import { notifyCreate, notifyError, notifyDelete } from './notificationReducer'
import { addNewBlogToUser } from './userReducer'

export const getBlogs = () => {
  return async dispatch => {
    try{
      const blogs = await blogService.getBlogs()
      dispatch({
        type: 'FETCH_BLOGS',
        data: blogs
      })
    }catch(error){
      dispatch(notifyError(error))
    }
  }
}

export const deleteBlog = (id, title) => {
  return async dispatch => {
    try{
      await blogService.del(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: { id }
      })
      dispatch(notifyDelete(title))
    }catch(error){
      dispatch(notifyError(error))
    }
  }
}

export const create = (detail, creator) => {
  return async dispatch => {
    try{
      const blog = await blogService.create(detail)
      dispatch({
        type: 'CREATE_BLOG',
        data: {...blog, user: creator}
      })
      dispatch(addNewBlogToUser(blog))
      dispatch(notifyCreate(blog.title))
    }catch(error){
      dispatch(notifyError(error))
    }
  }
}

export const newComment = (id, comment) => {
  return async dispatch => {
    try{
      await blogService.addComment(id, comment)
      console.log(comment)
      dispatch({
        type: 'ADD_COMMENT',
        data: {id, comment: comment}
      })
    }catch(error){
      dispatch(notifyError(error))
    }
  }
}

export const upvote = body => {
  return async dispatch => {
    try{
      let likes = body.likes+1
      await blogService.updateLikes(body.id, {...body, user: body.user.id, likes})
      dispatch({
        type: 'UPVOTE_BLOG',
        data: { votedBlog: {...body, likes} }
      })
      // dispatch(notifyCreate(blog.title))
    }catch(error){
      dispatch(notifyError(error))
    }
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_BLOGS':
      return [...state, ...action.data]
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.id)
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'UPVOTE_BLOG':
      return state.map(blog => blog.id !== action.data.votedBlog.id ? blog : action.data.votedBlog)
    case 'ADD_COMMENT':
      return state.map(blog => blog.id !== action.data.id ? blog : {...blog, comments: [...blog.comments, action.data.comment]})
    default:
      return state
  }
}

export default reducer