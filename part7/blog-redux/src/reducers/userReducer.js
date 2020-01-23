import loginService from '../services/loginService'
import userService from '../services/userService'
import blogService from '../services/blogService'
import { notifyError } from './notificationReducer'

const initialState = {
  authUser: null,
  usersList: []
}

export const login = credentials => {
  return async dispatch => {
    try{
      const userInfo = await loginService.login(credentials)
      blogService.setToken(userInfo.token)
      window.localStorage.setItem(
        'loggedBlogger', JSON.stringify(userInfo)
      )
      dispatch({
        type: 'LOGIN',
        data: userInfo
      })
    }catch(error){
      dispatch(notifyError(error))
    }
  }
}

export const addNewBlogToUser = blog => {
  return async dispatch => {
    dispatch({
      type: 'ADD_NEW_BLOG_TO_USER',
      data: {blog}
    })
  }
}

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getUsers()
    dispatch({
      type: 'FETCH_USERS',
      data: users
    })
  }
}

export const reloadUser = userInfo => {
  return async dispatch => {
    const user = JSON.parse(userInfo)
    blogService.setToken(user.token)
    dispatch({
      type: 'RELOAD_USER',
      data: user
    })
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, authUser: action.data}
    case 'RELOAD_USER':
      return {...state, authUser: action.data}
    case 'FETCH_USERS':
      return {...state, usersList: [...action.data]}
    case 'ADD_NEW_BLOG_TO_USER':
      return {...state, usersList: state.usersList.map(user=>user.id !== action.data.blog.user ? user : {...user, blogs: [...user.blogs, action.data]})}
    default:
      return state
  }
}

export default reducer