const obsReducer = (state = {
  type: '',
  data: {},
  loading: false,
} , action) => {
  switch(action.type) {
    case 'LOADING_OBS':
      console.log("obsReducer action: LOADING_OBS")
      return {
        ...state,
        loading: true
      }
    case 'CHANGE_OBS':
      console.log("obsReducer action: CHANGE_OBS")
      console.log(action)
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default obsReducer
