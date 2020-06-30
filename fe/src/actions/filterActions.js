import API from '../api'

const populateDatalist = (orgType, orgCat) => {
  return dispatch => {
    dispatch({type: 'LOADING_DATALIST'})
    API.fetch(orgType)
      .then(data => dispatch({type: 'POPULATE_DATALIST', payload: {list: data, orgFilter: orgType, orgCat: orgCat}}))
  }
} 

export {populateDatalist}

