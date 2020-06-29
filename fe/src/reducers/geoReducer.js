const geoReducer = (state = {
  type: '',
  shp: {},
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
    case 'ZOOM_GEO':
      console.log('inside zoomgeo')
      return state
    default:
      return state
  }
}

export default geoReducer
