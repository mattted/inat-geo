import API from '../api'

const changeObs = (selection, subcat, kingdom, geo) => {
  return dispatch => {
    dispatch({type: 'LOADING_OBS'})
    let url = `${geo}_obs_by_query?selection=${selection};kingdom=${kingdom};subcat=${subcat}`
    API.fetch(url)
      .then(data => dispatch({type: 'CHANGE_OBS', payload: {data: data, selection: selection}}))
  }
} 

export {changeObs}
