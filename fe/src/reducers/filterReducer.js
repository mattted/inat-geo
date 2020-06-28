const filterReducer = (state = {
  orgFilter: '',
  list: [],
  loading: false,
} , action) => {
  switch(action.type) {
    case 'LOADING_DATALIST':
      console.log("filterReducer action: LOADING_DATALIST")
      return {
        ...state,
        loading: true
      }
    case 'POPULATE_DATALIST':
      console.log("filterReducer action: POPULATE_DATALIST")
      console.log(action.payload)
      return {
        ...state,
        orgFilter: action.payload.orgFilter,
        loading: false,
        list: action.payload.list.map(item => ({value: item, label: item}))
      }
    default:
      return state
  }
}

export default filterReducer
