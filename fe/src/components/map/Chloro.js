import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as d3 from 'd3'

class Chloro extends Component {
  render() {
    console.log(this.props.geo)
    return <p>testing</p>
    // const projection = d3.geoAlbersUsa()
    // const pathGen = d3.geoPath().projection(projection)
    // const boundaries = this.props.geo.shp.features.map((d,i) => <path
    //     key={"path"+i}
    //     d={pathGen(d)}
    //     className='boundaries'
    //   />)
    // return (
    //   <svg width={500} height={500}>
    //     {boundaries}
    //   </svg>
    // )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // populateDatalist: (selected) => dispatch(populateDatalist(selected)),
    // changeGeo: (selected) => dispatch(changeGeo(selected)),
    // changeObs: (selected, orgFilter, geoType) => dispatch(changeObs(selected, orgFilter, geoType)),
  }
}

function mapStateToProps(state) {
  return {...state}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chloro)
