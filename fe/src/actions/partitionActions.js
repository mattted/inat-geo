import API from '../api'

const partitionData = (sel, subcat, kingdom, treeCat) => {
  let url = `partition?kingdom=${kingdom};subcat=${subcat};sel=${sel}`
  return dispatch => {
    dispatch({type: 'LOADING_PARTITION'})
    API.fetch(url)
      .then(data => dispatch({type: 'ADDING_PARTITION', payload: {data: data, treeHead: sel, treeCat}}))
  }
} 

const setNode = (node, cat) => {
  return { 
    type: 'SET_NODE',
    payload: {
      treeNode: node,
      treeCat: cat,
    } 
  }
}

export {partitionData, setNode}
