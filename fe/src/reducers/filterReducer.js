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
      const frag = document.createDocumentFragment()
      action.payload.list.forEach((item, i) => {
          let option = document.createElement('option')
          option.value= item
          option.key = i
          frag.appendChild(option)
        })
      console.log(frag)
      return {
        ...state,
        orgFilter: action.payload.orgFilter,
        loading: false,
        list: frag
      }
    default:
      return state
  }
}

export default filterReducer
