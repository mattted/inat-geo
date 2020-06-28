import React, {Component} from 'react'
import {connect} from 'react-redux'
import WindowedSelect from 'react-windowed-select'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import {populateDatalist} from '../../actions/filterActions'
import {changeGeo} from '../../actions/geoActions'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.geoRadios = [
      {name: 'County', value: 'counties'},
      {name: 'State', value: 'states'},
    ]
    this.orgRadios =  [
      {name: 'Kingdom', value: 'kingdom'},
      {name: 'Phylum', value: 'phylum'},
      {name: 'Class', value: 'klass'},
      {name: 'Order', value: 'order'},
      {name: 'Family', value: 'family'},
      {name: 'Genus', value: 'genus'},
      {name: 'Species', value: 'species'},
      {name: 'Common Name', value: 'common'},
    ]
  }

  render() {
    return (
      <Container>
        <Row className='justify-content-center mt-1'>
          <Col className='col-10 mx-auto text-center'>
            <ButtonGroup toggle>
              {this.geoRadios.map((radio, i) => (
                <ToggleButton
                  key={i}
                  size='sm'
                  type='radio'
                  variant='primary'
                  name={radio.name}
                  value={radio.value}
                  checked={radio.value === this.props.geoType}
                  onChange={(e) => this.props.changeGeo(e.target.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        <Row className='justify-content-center mt-1'>
          <Col className='col-10 mx-auto text-center'>
            <ButtonGroup toggle>
              {this.orgRadios.map((radio, i) => (
                <ToggleButton
                  key={i}
                  size='sm'
                  type='radio'
                  variant='primary'
                  name={radio.name}
                  value={radio.value}
                  checked={radio.value === this.props.orgFilter}
                  onChange={(e) => this.props.populateDatalist(e.target.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        <Row className='justify-content-center mt-1'>
          <Col className='col-10 mx-auto text-center'>
            <WindowedSelect options={this.props.list} />
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    populateDatalist: (selected) => dispatch(populateDatalist(selected)),
    changeGeo: (selected) => dispatch(changeGeo(selected)),
  } 
}

function mapStateToProps(state) {
  console.log({...state.filter, geoType: state.geo.type})
  return {...state.filter, geoType: state.geo.type}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
