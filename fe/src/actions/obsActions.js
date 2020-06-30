import API from '../api'

const changeObs = (orgType, orgFilter, geoType, orgCat) => {
  return dispatch => {
    dispatch({type: 'LOADING_OBS'})
    let url = `${geoType}_obs_by_query?search=${orgType};column=${orgFilter}`
    API.fetch(url)
      .then(data => dispatch({type: 'CHANGE_OBS', payload: {data: data, type: orgType, category: orgCat }}))
  }
} 

export {changeObs}
