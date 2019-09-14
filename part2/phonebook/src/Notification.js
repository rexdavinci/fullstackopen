import React from 'react'

const Notification = ({notification}) => {
  const {message, classType} = notification
  return !notification.message ? null : (
    <div className={classType}>
      <h2>{message}</h2>
    </div>
  )

}

export default Notification