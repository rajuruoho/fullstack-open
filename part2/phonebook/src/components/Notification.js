const Notification = ({message, errorStatus}) => {
  let messageColor = 'green'
console.log(errorStatus)
  if (errorStatus === 1) {
    messageColor = 'red'
console.log(messageColor)
  }
console.log(messageColor)
  const notificationStyle = {
    color: messageColor,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification

