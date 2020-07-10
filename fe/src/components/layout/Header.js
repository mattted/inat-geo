import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import {Link} from 'react-router-dom'

const Header = () => (
  <Container fluid className="mt-2">
    <Row>
      <Col>
      </Col>
      <Col className='text-center col-10'>
        <h1>GeoDiv</h1>
        <h6>A geographic exploration of biodiversity observations from <a href='https://www.inaturalist.org'>iNaturalist</a></h6>
      </Col>
      <Col>
        <Dropdown>
          <Dropdown.Toggle variant='light' size='sm'>Menu</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item><Link to='/'>Map</Link></Dropdown.Item>
            <Dropdown.Item><Link to='/taxonomy'>Taxonomy</Link></Dropdown.Item>
            <Dropdown.Item><Link to='/about'>About</Link></Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  </Container>
)
export default Header
