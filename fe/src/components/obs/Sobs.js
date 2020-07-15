import React from 'react'

import ObsCard from '../obs/ObsCard'
import ObsImages from '../obs/ObsImages'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import Image from 'react-bootstrap/Image'


const Sobs = ({sobs}) => {
  return (
    <Container>
      <hr />
      <Row>
        <Col className='col-6'>
          <ObsCard sobs={sobs} />        
        </Col>
        <Col className='col-6'>
          <ObsImages img={sobs.img} />
        </Col>
      </Row>
    </Container>
  )
}

export default Sobs
