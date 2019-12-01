const notificationReducer = (state = '', action) => {
  switch (action.type) {
      case 'NOTIFY':
          return action.notification
      case 'STOP':
          return null
      default:
          return state
  }
}

const showNotification = (notification) => {
  return {
    type: 'NOTIFY',
    notification: notification
  }
}

const stopNotification = () => {
  return {
    type: 'STOP'
  }
}

export const notifyAction = (notification, seconds) => {
  return async dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => { dispatch(stopNotification()) }, seconds * 1000)
  }
}

export default notificationReducer