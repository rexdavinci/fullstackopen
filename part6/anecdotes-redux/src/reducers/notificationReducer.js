
export const addedNew = (message, time) => {
  return async dispatch => { 
    dispatch({
      type: 'ADDED_NEW',
      data: { message }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        data: ''
      })
    }, time*1000)
  }
}

export const voted = (message, time) => {
  return async dispatch => {
    dispatch({type: 'VOTED',
      data: { message }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        data: ''
      })
    }, time*1000)
  }
}

export const addFailed = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_FAILED',
      data: { message }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR',
        data: ''
      })
    }, time*1000)
  }
}

const notificationReducer = (state = '', action) => {
  switch(action.type){
    case 'ADDED_NEW':
      return action.data.message
    case 'VOTED':
      return action.data.message
    case 'ADD_FAILED':
      return action.data.message
    case 'CLEAR':
      return action.data
    default:
      return state
  }
}

export default notificationReducer