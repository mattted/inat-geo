import API from '../api'

const changeObs = (selection, subcat, kingdom, geo, geoid) => {
  return dispatch => {
    dispatch({type: 'LOADING_OBS'})
    let geoURL = `${geo}_obs_by_query?selection=${selection};kingdom=${kingdom};subcat=${subcat}`
    API.fetch(geoURL)
      .then(data => dispatch({type: 'CHANGE_OBS', payload: {data: data, selection: selection}}))

    const tableURL = geoid === ''
      ? `obs_for_inforec?column=${subcat};search=${selection}`
      : `obs_for_inforec?column=${subcat};search=${selection};geotype=${geo};geoid=${geoid}`
    API.fetch(tableURL)
      .then(data => dispatch({ type: 'OBS_TABLE', payload: {table: data} }))
  }
} 

export {changeObs}
