import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import * as uuid from 'uuid'
import * as d3 from 'd3'

import {partitionData} from '../../actions/partitionActions'

class Partition extends Component {
  constructor(props){
    super(props)
    props.partitionData()
  }

  componentDidMount() {
    this.drawPartition()
  }

  componentDidUpdate() {
    this.drawPartition()
  }

  drawPartition = () => {

    const svg = this.partitionRef
    // nest flat tabular data by keys 
    const entries = d3.nest()
      .key(d => d.phylum)
      .key(d => d.klass)
      .key(d => d.order)
      .key(d => d.family)
      .key(d => d.genus)
      .key(d => d.species)
      .entries(this.props.partition.aggData)
    console.log(entries)
    // convert to hierarchy format with nodes/data/children
    const root = d3.hierarchy({values: entries}, d => d.values)
      .sum(data => data.count)
      .sort((a,b) => b.value - a.value)

    const color = () => d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, root.children.length + 1))

    const g = svg.append('g')
      .selectAll('path')
      .data(root.descendants.slice(1))
      .join('path')
      .attr('fill', d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr('fill-opacity', d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr('d', d => arc(d.current))
  }

  render(){
    return (
      <Container fluid>
        <Row className='justify-content-center mb-4'>
          <svg ref={el => (this.partitionRef = el)} />
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    partitionData: () => dispatch(partitionData()),
  }
}

function mapStateToProps(state) {
  return {
    ...state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Partition)
