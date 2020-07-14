import API from '../api'

const populateDatalist = (kingdom, subcat) => {
  let url = `datalist?kingdom=${kingdom};subcat=${subcat}`
  return dispatch => {
    dispatch({type: 'LOADING_DATALIST'})
    API.fetch(url)
      .then(data => dispatch({type: 'POPULATE_DATALIST', payload: {list: data, kingdom: kingdom, subcat: subcat}}))
  }
} 

const changeSubcat = subcat => {
  return {
    type: "CHANGE_SUBCAT",
    payload: {subcat}
  } 
}

export {populateDatalist, changeSubcat}

