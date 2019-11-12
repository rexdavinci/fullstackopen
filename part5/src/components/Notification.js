import React from 'react'

const Notification = ({ notify }) => {
  if(notify !== null){
    const { message, type } = notify
    return  (
      <div className={type}>
        <h2>{message}</h2>
      </div>
    )
  }
  return null
}

export default Notification
