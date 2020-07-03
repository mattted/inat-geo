const geoReducer = (state = {
  type: '',
  geoid: '',
  shp: {},
  zoom: false,
  focus: '',
  loading: false,
} , action) => {
  switch(action.type) {
    case 'LOADING_GEO':
      return {
        ...state,
        loading: true
      }
    case 'CHANGE_BASE_MAP':
      return {
        ...state,
        type: action.payload.type,
        shp: action.payload.shp,
        loading: false
      }
    case 'SELECT_GEO':
      return {
        ...state,
        geoid: action.payload.geoid
      }
    default:
      return state
  }
}

export default geoReducer
