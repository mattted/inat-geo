import API from '../api'

const partitionData = (sel='Chordata', subcat='phylum', kingdom='Animalia') => {
  let url = `partition?kingdom=${kingdom};subcat=${subcat};sel=${sel}`
  return dispatch => {
    dispatch({type: 'LOADING_PARTITION'})
    API.fetch(url)
      .then(data => dispatch({type: 'ADDING_PARTITION', payload: {data: data}}))
  }
} 

export {partitionData}
