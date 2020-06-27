import React, {Component} from 'react'
import {connect} from 'react-redux'
// import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import {populateDatalist} from '../../actions/filterActions'

class Filter extends Component {

  componentDidUpdate(){
    console.log(this.props)
  }

  render() {
    return (
      <>
        <ButtonGroup toggle>
          {this.props.radios.map((radio, i) => (
            <ToggleButton
              key={i}
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
      </>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    populateDatalist: (orgType) => dispatch(populateDatalist(orgType)),
  } 
}

function mapStateToProps(state) {
  return {...state.filter}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
