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
    case 'CHANGE_BASE_MAP':
      console.log("geoReducer action: CHANGE_BASE_MAP")
      console.log(action)
      return {
        ...state,
        type: action.payload.type,
        shp: action.payload.shp,
        loading: false
      }
    default:
      return state
  }
}

export default geoReducer
