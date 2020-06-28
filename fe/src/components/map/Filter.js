import React, {Component} from 'react'
import {connect} from 'react-redux'
// import Button from 'react-bootstrap/Button'
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
  render() {
    return (
      <Container>
        <Row className='justify-content-center'>
          <Col className='col-10 mx-auto text-center'>
            <ButtonGroup toggle>
              {this.props.radios.map((radio, i) => (
                <ToggleButton
                  key={i}
                  size='sm'
                  type='radio'
                  variant='primary'
                  name={radio.name}
                  value={radio.value}
                  checked={radio.value === this.props.selected}
                  onChange={(e) => this.props.populateDatalist(e.target.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col className='col-8 mx-auto'>
            <InputGroup size="sm" className="mt-2">
              <InputGroup.Prepend>
                <InputGroup.Text>Search</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl/>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    populateDatalist: (orgType) => dispatch(populateDatalist(orgType)),
    changeGeo: (geoType) => dispatch(changeGeo(geoType)),
  } 
}

function mapStateToProps(state) {
  return {...state.filter}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
