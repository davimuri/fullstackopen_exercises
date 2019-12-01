import React from 'react'
import { connect } from 'react-redux'
import { setFilterAction } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    props.setFilterAction(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
    setFilterAction
}

const ConnectedFilter = connect(
    null, mapDispatchToProps
  )(Filter)
  
  export default ConnectedFilter
  