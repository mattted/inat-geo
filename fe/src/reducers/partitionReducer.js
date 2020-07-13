const partitionReducer = (state = {
  aggData: {},
  treeHead: '',
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
        treeHead: action.payload.treeHead
      }
    default:
      return state
  }
}

export default partitionReducer

