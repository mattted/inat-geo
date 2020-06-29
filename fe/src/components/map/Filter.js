import React, {Component} from 'react'
import {connect} from 'react-redux'
import WindowedSelect, {createFilter} from 'react-windowed-select'

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import {populateDatalist} from '../../actions/filterActions'
import {changeGeo} from '../../actions/geoActions'
import {changeObs} from '../../actions/obsActions'

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

  handleGeoChange = (e) => {
    console.log(e.target.value)
    if(this.props.listSel !== '') {
      this.props.changeObs(this.props.listSel, this.props.orgFilter, e.target.value)
    } else {
      console.log('no change') 
    }
    this.props.changeGeo(e.target.value) 
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
                  onChange={this.handleGeoChange}
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
          <Col />
          <Col>
            <WindowedSelect 
              options={this.props.list}
              filterOption={createFilter({ignoreAccents: false})}
              onChange={(sel) => this.props.changeObs(sel.value, this.props.orgFilter, this.props.geoType)}
            />
          </Col>
          <Col />
        </Row>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    populateDatalist: (selected) => dispatch(populateDatalist(selected)),
    changeGeo: (selected) => dispatch(changeGeo(selected)),
    changeObs: (selected, orgFilter, geoType) => dispatch(changeObs(selected, orgFilter, geoType)),
  } 
}

function mapStateToProps(state) {
  return {...state.filter, listSel: state.obs.type, geoType: state.geo.type}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
