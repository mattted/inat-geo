import API from '../api'

const partitionData = (sel, subcat, kingdom, treeCat) => {
  let url = `partition?kingdom=${kingdom};subcat=${subcat};sel=${sel}`
  return dispatch => {
    dispatch({type: 'LOADING_PARTITION'})
    API.fetch(url)
      .then(data => dispatch({type: 'ADDING_PARTITION', payload: {data: data, treeHead: sel, treeCat}}))
  }
} 

export {partitionData}
