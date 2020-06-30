const filterReducer = (state = {
  orgFilter: '',
  list: [],
  loading: false,
} , action) => {
  switch(action.type) {
    case 'LOADING_DATALIST':
      return {
        ...state,
        loading: true
      }
    case 'POPULATE_DATALIST':
      let options = action.payload.list.map(item => ({value: item, label: item}))
      return {
        ...state,
        orgFilter: action.payload.orgFilter,
        orgCat: action.payload.orgCat,
        loading: false,
        list: options,
      }
    default:
      return state
  }
}

export default filterReducer
