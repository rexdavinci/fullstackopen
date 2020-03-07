// const initialState = {
//   message: '',
//   type: ''
// }

const initialState = null

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
      data: { message: `New blog '${title}' created`, type: 'green' }
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
      data: { message: `blog "${title}" deleted`, type: 'green' }
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
      data: { message: error.response.data.error, type: 'red' }
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