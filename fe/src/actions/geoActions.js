import API from '../api'

const initGeo = () => {
  return dispatch => {
    dispatch({type: 'LOADING_GEO'})
    API.fetch('counties')
      .then(data => dispatch({type: 'BASE_MAP_COUNTY', payload: data}))
  }
} 

export {initGeo}
