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
      .then(data => dispatch({ 
        type: 'OBS_TABLE', 
        payload: {
          table: data,
          county: data[0] ? data[0].name : '',
          state: data[0] ? data[0].state : '',
        } 
      }))
  }
} 

const changeTable = (selection, subcat, geo, geoid, page=1, ordered='date') => {
  return dispatch => {
    dispatch({type: 'LOADING_OBS'})

    const tableURL = geoid === ''
      ? `obs_for_inforec?column=${subcat};search=${selection};page=${page};ordered=${ordered}`
      : `obs_for_inforec?column=${subcat};search=${selection};geotype=${geo};geoid=${geoid};page=${page};ordered=${ordered}`
    API.fetch(tableURL)
      .then(data => dispatch({ 
        type: 'OBS_TABLE', 
        payload: {
          table: data,
          county: data[0] ? data[0].name : '',
          state: data[0] ? data[0].state : '',
        } 
      }))
  }
} 
export {changeObs, changeTable}
