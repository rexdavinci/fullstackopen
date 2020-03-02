const initialState = {
  message: '',
  type: ''
}

const clear = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_NOTIFICATION',
      data: initialState
    })
  }
}

export const notifyCreate = title => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY_SUCCESS',
      data: { message: `New blog '${title}' created`, type: 'success' }
    })
    setTimeout(() => {
      dispatch(clear())
    }, 5000);
  }
}

export const notifyDelete = title => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY_SUCCESS',
      data: { message: `blog "${title}" deleted`, type: 'success' }
    })
    setTimeout(() => {
      dispatch(clear())
    }, 5000);
  }
}

export const notifyError = error => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFY_ERROR',
      data: { message: error.response.data.error, type: 'error' }
    })
    setTimeout(() => {
      dispatch(clear())
    }, 5000);
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY_SUCCESS':
      return action.data
    case 'NOTIFY_ERROR':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default reducer