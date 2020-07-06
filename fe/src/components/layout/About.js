import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import gbif from '../img/gbif.png'
import inat from '../img/inat.png'

const About = () => (
  <Container className="mt-4">
    <Row className='justify-content-center'>
      <Col className='text-center'>
        {/* <h4 className='about-header'>About</h4> */}
        <CardDeck>
          <Card className="text-center mb-3">
            <Card.Header>iNaturalist</Card.Header>
            <Card.Body>
              <img src={inat} height='40' className='mb-2' />
              <Card.Text>
                iNaturalist is a website that allows users to record, share, and discuss organism observations with the intent of collecting and providing research quality observations for biodiversity research. All observation data collected by iNaturalist is shared with scientific data repositories, such as the Global Biodiversity Information Facility, that provide open access to the collected information.
              </Card.Text>
              <Button href='https://inaturalist.org' variant="primary" size='sm'>Visit iNaturalist</Button>
            </Card.Body>
          </Card>
          <Card className="text-center mb-3">
            <Card.Header>Global Biodiversity Information Facility</Card.Header>
            <Card.Body>
              <img src={gbif} height='50' />
              <Card.Text>
                The Global Biodiversity Information Facility is a scientific data repository funded by the world's governments that provides open access to data about all types of life on earth. GBIF has established data standards that allow the integration of information from numerous sources and varying focus.
              </Card.Text>
              <Button href='https://gbif.org' variant="primary" size='sm'>Visit GBIF</Button>
            </Card.Body>
          </Card>
        </CardDeck>
        <Card className="text-center mb-3">
          <Card.Header>Data</Card.Header>
          <Card.Body>
            <Card.Text>
              The observation and image data used on this site is derived from iNaturalist records, which were provided to the Global Biodiversity Information Facility for distribution under their data standards. Common names for taxonomic classifications were derived using the 'Backbone' dataset provided by GBIF.
            </Card.Text>
            <Button href='https://www.gbif.org/dataset/50c9509d-22c7-4a22-a47d-8c48425ef4a7'
              className='mx-2' variant="primary" size='sm'>iNat Research Grade Observations</Button>
            <Button href='https://www.gbif.org/dataset/d7dddbf4-2cf0-4f39-9b2a-bb099caae36c' 
              className='mx-2' variant="primary" size='sm'>GBIF Backbone Taxonomy</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
)
export default About
