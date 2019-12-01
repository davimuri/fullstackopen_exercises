const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter
        default:
            return state
    }
  }
  
  export const setFilterAction = (filter) => {
    return {
      type: 'SET_FILTER',
      filter: filter
    }
  }
  
  export default filterReducer