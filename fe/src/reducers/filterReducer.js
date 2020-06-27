const filterReducer = (state = {
  radios: [
    {name: 'Kingdom', value: 'kingdom'},
    {name: 'Phylum', value: 'phylum'},
    {name: 'Class', value: 'klass'},
    {name: 'Order', value: 'order'},
    {name: 'Family', value: 'family'},
    {name: 'Genus', value: 'genus'},
    {name: 'Species', value: 'species'},
    {name: 'Common Name', value: 'common'},
  ],
  selected: '',
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
        selected: action.payload.selected,
        loading: false,
        list: action.payload.list
      }
    default:
      return state
  }
}

export default filterReducer
