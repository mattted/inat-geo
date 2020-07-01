const filterReducer = (state = {
  kingdom: 'Animalia',
  subcat: 'phylum',
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
      // transform list data for windowed select
      let options = action.payload.list.map(item => ({value: item, label: item}))
      return {
        ...state,
        kingdom: action.payload.kingdom,
        subcat: action.payload.subcat,
        loading: false,
        list: options,
      }
    default:
      return state
  }
}

export default filterReducer
