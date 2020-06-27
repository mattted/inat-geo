import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Header = () => (
      <Container>
        <Row>
          <Col className='text-center'>
            <h1>GeoDiv</h1>
            <h6>A geographic display of biodiversity observations from <a href='https://www.inaturalist.org'>iNaturalist</a></h6>
          </Col>
        </Row>
      </Container>
)
export default Header
