import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import * as d3 from 'd3'

class Partition extends Component {
  constructor(props){
    super(props)

  }

  render(){
    return (
      <Container>
        <Row className='justify-content-center'>
          <p>partition</p>
        </Row>
      </Container>
    )
  }
}

export default Partition
