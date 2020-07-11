import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import * as d3 from 'd3'

import {selectGeo} from '../../actions/geoActions'
import {changeTable} from '../../actions/obsActions'
import {partitionData} from '../../actions/partitionActions'

class Partition extends Component {
  constructor(props){
    super(props)
    this.width = 600 
    this.radius = this.width / 6
  }

  componentDidMount() {
    this.props.selectGeo('', '')
    this.props.aggData[0] && this.drawPartition()
  }

  partition = (root) => d3.partition().size([2 * Math.PI, root.height + 1])(root)

  format = d3.format(",d")

  drawPartition = () => {
    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03
    }

    const labelTransform = d => {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI
      const y = (d.y0 + d.y1) / 2 * this.radius;
      return `rotate(${x-90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`
    }

    const arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(this.radius * 1.5)
      .innerRadius(d => d.y0 * this.radius)
      .outerRadius(d => Math.max(d.y0 * this.radius, d.y1 * this.radius -1))

    const svg = d3.select(this.partitionRef).attr('viewBox', [0, 0, this.width, this.width]).style('font', '8px sans-serif')
    // nest flat tabular data by keys 
    let entries
    switch(this.props.subcat) {
      case 'phylum':
        console.log(this.props.subcat)
        entries = d3.nest()
          .key(d => d.klass)
          .key(d => d.order)
          .key(d => d.family)
          .key(d => d.genus)
          .key(d => d.species)
          .entries(this.props.aggData)
        break
      case 'klass':
        entries = d3.nest()
          .key(d => d.order)
          .key(d => d.family)
          .key(d => d.genus)
          .key(d => d.species)
          .entries(this.props.aggData)
        break
      case 'order':
        entries = d3.nest()
          .key(d => d.family)
          .key(d => d.genus)
          .key(d => d.species)
          .entries(this.props.aggData)
        break
      case 'family':
        entries = d3.nest()
          .key(d => d.genus)
          .key(d => d.species)
          .entries(this.props.aggData)
        break
      case 'genus':
        entries = d3.nest()
          .key(d => d.species)
          .entries(this.props.aggData)
        break
    }
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

    const g = svg.append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.width / 2})`)

    const path = g.append('g')
      .selectAll('path')
      .data(root.descendants().slice(1))
      .join('path')
      .attr('fill', d => {while (d.depth > 1) d = d.parent; return color(d.data.key);})
      .attr('fill-opacity', d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr('d', d => arc(d.current))

    path.filter(d => d.children)
      .style('cursor', 'pointer')
      .on('click', clicked)

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
      .attr('fill-opacity', d => +labelVisible(d.current))
      .attr('transform', d => labelTransform(d.current))
      .text(d => d.data.key)

    const parent = g.append('circle')
      .datum(root)
      .attr('r', this.radius)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('click', clicked)

    function clicked(p) {
      console.log(p)
      parent.datum(p.parent || root)
      root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });

      const t = g.transition().duration(500)

      path.transition(t)
        .tween('data', d => {
          const i = d3.interpolate(d.current, d.target)
          return t => d.current = i(t)
        })
        .filter(function (d) {
          return +this.getAttribute('fill-opacity') || arcVisible(d.target)
        })
        .attr('fill-opacity', d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attrTween('d', d => () => arc(d.current));

      label.filter(function(d) {
         return +this.getAttribute('fill-opacity') || labelVisible(d.target)
        })
        .transition(t)
        .attr('fill-opacity', d => +labelVisible(d.target))
        .attrTween('transform', d => () => labelTransform(d.current));
    }
  }

  render(){
    return (
      <Container fluid>
        <Row className='justify-content-center my-4'>
          <svg width={this.width} height={this.height} ref={el => (this.partitionRef = el)} />
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectGeo: (geoid, geoName) => dispatch(selectGeo(geoid, geoName)),
    partitionData: () => dispatch(partitionData()),
    changeTable: (selection, subcat, geo, geoid) => dispatch(changeTable(selection, subcat, geo, geoid)),
  }
}

function mapStateToProps(state) {
  return {
    ...state.partition,
    subcat: state.filter.subcat 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Partition)
