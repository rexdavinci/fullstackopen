import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = props => {
  const { notify } = props
  return (
    <div className='notification'>
      {
        !notify ? null : notify.type === 'red' ? (
          <Message
              error
              header='Error'
              content={notify.message}
            />
        ) : notify.type === 'green' ? (
          <Message
              success
              header='Success'
              content={notify.message}
            />
        ) : null
      }
  </div>
  )
}

const mapStateToProps = state => {
  return {
    notify: state.notification
  }
}

const connectedNotification = connect(mapStateToProps, null)(Notification)

export default connectedNotification
