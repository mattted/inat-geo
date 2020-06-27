import API from '../api'

const populateDatalist = (orgType) => {
  return dispatch => {
    dispatch({type: 'LOADING_DATALIST'})
    API.fetch(orgType)
      .then(data => dispatch({type: 'POPULATE_DATALIST', payload: {list: data, selected: orgType}}))
  }
} 

export {populateDatalist}

