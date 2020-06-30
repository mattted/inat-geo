import API from '../api'

const partitionData = () => {
   
  return dispatch => {
    dispatch({type: 'LOADING_PARTITION'})
    API.fetch(geoType)
      .then(data => dispatch({type: 'CHANGE_BASE_MAP', payload: {shp: data, type: geoType}}))
  }
} 
