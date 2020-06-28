import API from '../api'

const changeGeo = (geoType) => {
  return dispatch => {
    dispatch({type: 'LOADING_GEO'})
    API.fetch(geoType)
      .then(data => dispatch({type: 'CHANGE_BASE_MAP', payload: {geo: data, geoType: geoType}}))
  }
} 

export {changeGeo}
