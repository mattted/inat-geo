const geoReducer = (state = {
  type: '',
  shp: {},
  loading: false,
} , action) => {
  switch(action.type) {
    case 'LOADING_GEO':
      console.log("geoReducer action: LOADING_GEO")
      return {
        ...state,
        loading: true
      }
    case 'BASE_MAP_COUNTY':
      console.log("geoReducer action: BASE_MAP_COUNTY")
      return {
        ...state,
        type: 'county',
        shp: action.payload,
        loading: false
      }
    default:
      return state
  }
}

export default geoReducer
