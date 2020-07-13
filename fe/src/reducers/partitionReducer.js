const partitionReducer = (state = {
  aggData: {},
  treeHead: '',
  treeCat: '',
  loading: false,
} , action) => {
  switch(action.type) {
    case 'LOADING_PARTITION':
      return {
        ...state,
        loading: true
      }
    case 'ADDING_PARTITION':
      return {
        ...state,
        loading: false,
        aggData: action.payload.data,
        treeHead: action.payload.treeHead,
        treeCat: action.payload.treeCat
      }
    default:
      return state
  }
}

export default partitionReducer

