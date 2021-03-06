import React, {Component} from 'react'
import {connect} from 'react-redux'
import {partitionData} from '../actions/partitionActions'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'

import Partition from '../components/partition/Partition'
import PartitionFilter from '../components/partition/PartitionFilter'
import Obs from '../components/obs/Obs'

class PartitionContainer extends Component {

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate() {
    this.getData()
  }

  getData = () => {
    if (this.props.selection !== this.props.treeHead) {
      if (this.props.subcat === 'common' || this.props.subcat === 'species') {
        if (this.props.aggData[0] && (this.props.table[0].genus === this.props.treeHead)) {
          return
        } else {
          this.props.partitionData(this.props.table[0].genus, 'genus', this.props.kingdom, 'genus')
        }
      } else {
        this.props.partitionData(this.props.selection, this.props.subcat, this.props.kingdom, this.props.subcat)
      }
    }
  }
  
  render() {
    return (
      <>
        <PartitionFilter />
        {this.props.loading 
          ? <Row className='justify-content-center m-4'>
              <Col className='text-center mx-auto' >
                <Spinner animation='border' variant='danger' />
                <p><small>Building Tree</small></p>
              </Col>
            </Row> 
          : <Partition />}
        <Obs loc='partition' />    
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  ...state.partition,
  selection: state.obs.selection,
  subcat: state.filter.subcat,
  kingdom: state.filter.kingdom,
  table: state.obs.table,
})

const mapDispatchToProps = dispatch => {
  return {
    partitionData: (sel, subcat, kingdom, treeCat) => dispatch(partitionData(sel, subcat, kingdom, treeCat)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartitionContainer)

