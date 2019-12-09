import React from 'react'
// import { clearNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  return (
    props.notifications.length > 0 ? (
      <div style={style}>
        {
          props.notifications
        }
      </div>
    ) : null
  )
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications
  }
}

// const mapDispatchToProps = {
//   clearNotification
// }

export default connect(mapStateToProps)(Notification)