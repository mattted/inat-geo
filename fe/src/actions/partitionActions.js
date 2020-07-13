import API from '../api'

const partitionData = (sel, subcat, kingdom) => {
  let url = `partition?kingdom=${kingdom};subcat=${subcat};sel=${sel}`
  console.log(url)
  return dispatch => {
    dispatch({type: 'LOADING_PARTITION'})
    API.fetch(url)
      .then(data => dispatch({type: 'ADDING_PARTITION', payload: {data: data, treeHead: sel}}))
  }
} 

export {partitionData}
