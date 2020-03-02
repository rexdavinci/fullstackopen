import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const { notify } = props
  if(notify !== null){
    const { message, type } = notify
    return  (
      <span className={type}>
        {message}
      </span>
    )
  }
  return null
}

const mapStateToProps = state => {
  return {
    notify: state.notification
  }
}

const connectedNotification = connect(mapStateToProps, null)(Notification)

export default connectedNotification
