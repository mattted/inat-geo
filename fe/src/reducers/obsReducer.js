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
      console.log(action.payload)
      return {
        ...state,
        type: action.payload.type,
        data: action.payload.data,
        loading: false
      }
    default:
      return state
  }
}

export default obsReducer
