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
    const margin = {top: 20, bottom: 20, right: 20, left: 20},
        width = 800 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const entries = d3.nest()
      .key(d => d.kingdom)
      .entries(this.props.partition.aggData)

    const tree = d3.treemap()
      .size([width, height])
      .padding(0)
      .tile(d3.treemapSquarify.ratio(1))

    const colorScale = d3.scaleOrdinal()
      .domain(entries.map(el => el.key))
      .range(d3.range(0, entries.length + 1).map(i => d3.interpolateSpectral(i/entries.length)))

    const chart = d3.select(this.partitionRef)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    const legend = chart.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(0, ${height})`)

    legend.selectAll('rect')
      .data(colorScale.domain())
      .enter()
      .append('rect')
      .attr('x', (d,i) => i * 50)
      .attr('fill', colorScale)
      .attr('width', 100)
      .attr('height', 20)

    legend.selectAll('text')
      .data(colorScale.domain())
      .enter()
      .append('text')
      .attr('x', (d,i) => i * 50)
      .attr('dy', 15)
      .attr('dx', 2)
      .text(d => d)

    const root = d3.hierarchy({values: entries}, d => d.values)
      .sum(data => data.count)
      .sort((a,b) => b.value - a.value)

    tree(root)
    console.log(root)

    const groups = chart.selectAll('.node')
      .data(root.leaves(), d => d.data.phylum) 

    const newGroups = groups
      .enter()
      .append('g')
      .attr('class', 'node')
      .on('click', d => console.log(d))
      // .on('mouseover', mouseover)
    
    newGroups.append('rect')
      .style('fill', d => colorScale(d.parent ? d.parent.data.key : 'red'))
      .style('stroke', 'black')
      .attr('width', (d,i) => d.x1 - d.x0)
      .attr('height', (d,i) => d.y1 - d.y0)

    const allGroups = groups.merge(newGroups)

    allGroups.transition().duration(2000)
      .attr('transform', d => `translate(${d.x0}, ${d.y0})`)

    allGroups.select('rect')
      .transition().duration(2000)
      .attr('width', (d,i) => d.x1 - d.x0)
      .attr('height', (d,i) => (d.y1 - d.y0))

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
