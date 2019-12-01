import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (!props.notification) {
    return null
  }

  return (
    <div className={props.notification.type}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotification = connect(
  mapStateToProps
)(Notification)

export default ConnectedNotification
