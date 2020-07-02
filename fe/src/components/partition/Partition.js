import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import * as d3 from 'd3'

import {partitionData} from '../../actions/partitionActions'

class Partition extends Component {
  constructor(props){
    super(props)
    this.width = 300
    this.radius = this.width / 6
  }

  componentDidMount() {
    this.drawPartition()
  }

  componentDidUpdate() {
    this.drawPartition()
  }

  arcVisible = d => d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0

  labelVisible = d => d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03

  labelTransform = d => {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI
    const y = (d.y0 + d.y1) / 2 * this.radius;
    return `rotate(${x-90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
  }

  partition = (root) => d3.partition().size([2 * Math.PI, root.height + 1])(root)

  format = d3.format(",d")

  arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 -d.x0) / 2, 0.005))
    .padRadius(this.radius * 1.5)
    .innerRadius(d => d.y0 * this.radius)
    .outerRadius(d => Math.max(d.y0 * this.radius, d.y1 * this.radius -1))


  drawPartition = () => {

    const svg = d3.select(this.partitionRef).attr('viewBox', [0, 0, this.width, this.width]).style('font', '9px sans-sefif')
    // nest flat tabular data by keys 
    const entries = d3.nest()
      .key(d => d.phylum)
      .key(d => d.klass)
      .key(d => d.order)
      .key(d => d.family)
      .key(d => d.genus)
      // .key(d => d.species)
      .entries(this.props.partition.aggData)
    // convert to hierarchy format with nodes/data/children
    const nested = d3.hierarchy({values: entries}, d => d.values)
      .sum(data => data.count)
      .sort((a, b) => b.value - a.value)

    const root = this.partition(nested)
    root.each(d => d.current = d)

    const color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, root.children.length))
    // const color = d3.scaleLog()
    //   .domain([1, root.children.length])
    //   .interpolate(d3.interpolateHclLong)
    //   .range(["#ECEFF4", "#4C566A"])

    console.log('where are we getting jammed up')
    const g = svg.append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.width / 2})`)

    console.log('probably about here')
    const path = g.append('g')
      .selectAll('path')
      .data(root.descendants().slice(1))
      .join('path')
      .attr('fill', d => {while (d.depth > 1) d = d.parent; return color(d.data.key);})
      .attr('fill-opacity', d => this.arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr('d', d => this.arc(d.current))


    console.log('yes?')

    path.filter(d => d.children)
      .style('cursor', 'pointer')
      // .on('click', this.handleClick)

    path.append('title')
      .text(d => `${d.ancestors().map(d => d.data.key).reverse().join("/")}\n${this.format(d.value)}`)

    const label = g.append('g')
      .attr('pointer-events', 'none')
      .attr('text-anchor', 'middle')
      .style('user-select', 'none')
      .selectAll('text')
      .data(root.descendants().slice(1))
      .join('text')
      .attr('dy', '0.35rem')
      .attr('fill-opacity', d => +this.labelVisible(d.current))
      .attr('transform', d => this.labelTransform(d.current))
      .text(d => d.data.key)

    const parent = g.append('circle')
      .datum(root)
      .attr('r', this.radius)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      // .on('click', this.handleClick)

  }

  render(){
    return (
      <Container fluid>
        <Row className='justify-content-center mb-4'>
          <svg width={this.width} height={this.height} ref={el => (this.partitionRef = el)} />
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
