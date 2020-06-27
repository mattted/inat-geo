import React, {Component} from 'react'
import {connect} from 'react-redux'
import {initGeo} from '../actions/geoActions'
import '../styles/App.scss'

class App extends Component {

  componentDidMount() {
    console.log("Calling initGeo()")
    this.props.initGeo()
  }
  
  render() {
    return (
      <>
        <h1>GeoDiv</h1>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    initGeo: () => dispatch(initGeo())
  }
}

export default connect(null, mapDispatchToProps)(App)
