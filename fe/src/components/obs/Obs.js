import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns'

import * as d3 from 'd3'

class Obs extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    console.log(this.props.table)
  }

  componentDidMount() {
  }
      
  render() {
    return (
      <Container>
        <Row className='justify-content-center card-deck'>
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

function mapStateToProps(state) {
  return {
    table: state.obs.table,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Obs)
