import API from '../api'

const changeObs = (selection, subcat, kingdom, geo, geoid) => {
  return dispatch => {
    dispatch({type: 'LOADING_OBS'})
    let geoURL = `${geo}_obs_by_query?selection=${selection};kingdom=${kingdom};subcat=${subcat}`
    API.fetch(geoURL)
      .then(data => dispatch({type: 'CHANGE_OBS', payload: {data: data, selection: selection}}))

    const tableURL = geoid === ''
      ? `obs_for_inforec?column=${subcat};search=${selection};page=${1}`
      : `obs_for_inforec?column=${subcat};search=${selection};geotype=${geo};geoid=${geoid};page=${1}`
    API.fetch(tableURL)
      .then(data => dispatch({ 
        type: 'OBS_TABLE', 
        payload: {
          table: data,
          county: data[0] ? data[0].name : '',
          state: data[0] ? data[0].state : '',
          page: 1,
        } 
      }))
  }
} 

const changeSel = selection => {
  return {
    type: 'CHANGE_SELECTION',
    payload: {selection}
  }
}

const setGeoData = (selection, subcat, kingdom, geo) => {
  return dispatch => {
    dispatch({type: 'LOADING_OBS'})
    let geoURL = `${geo}_obs_by_query?selection=${selection};kingdom=${kingdom};subcat=${subcat}`
    API.fetch(geoURL)
      .then(data => dispatch({type: 'CHANGE_OBS', payload: {data: data, selection: selection}}))
  }
}

const getObs = id => {
  return dispatch => {
    dispatch({type: 'LOADING_OBS'})
    API.fetch(`observations/${id}`)
      .then(data => dispatch({type: 'GET_SINGLE', payload: {sobs: data[0]}} ))
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
          obsCount: data.length,
          page: page,
          county: data[0] ? data[0].name : '',
          state: data[0] ? data[0].state : '',
        } 
      }))
  }
} 
export {changeObs, changeTable, changeSel, getObs, setGeoData}
