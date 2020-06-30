import API from '../api'

const changeGeo = (geoType) => {
  return dispatch => {
    dispatch({type: 'LOADING_GEO'})
    API.fetch(geoType)
      .then(data => dispatch({type: 'CHANGE_BASE_MAP', payload: {shp: data, type: geoType}}))
  }
} 

const zoomGeo = (gid, shp) => {
  return {
    type: 'ZOOM_GEO'
  }
}

export {changeGeo, zoomGeo}
