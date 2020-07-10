import React, {Component} from 'react'
// import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {changeGeo} from '../actions/geoActions'
import {partitionData} from '../actions/partitionActions'
import {populateDatalist} from '../actions/filterActions'
import About from '../components/layout/About'
import ObsCard from '../components/obs/ObsCard'

import Header from '../components/layout/Header'
import MapContainer from './MapContainer'
import PartitionContainer from './PartitionContainer'
import Obs from '../components/obs/Obs'

class App extends Component {
  componentDidMount() {
    this.props.changeGeo('counties')
    this.props.populateDatalist('Animalia', 'phylum')
    this.props.partitionData()
  }
  
  render() {
    return (
      <Router>
        <>
          <Header />
          <Route exact path="/" component={MapContainer} />
          <Route path="/about" component={About} />
          <Route path="/observation/:id" component={ObsCard} />
          <Route path="/taxonomy" component={PartitionContainer} />
        </>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeGeo: (geoType) => dispatch(changeGeo(geoType)),
    populateDatalist: (kingdom, subcat) => dispatch(populateDatalist(kingdom, subcat)),
    partitionData: () => dispatch(partitionData()),
  }
}

export default connect(null, mapDispatchToProps)(App)
