import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import { Col, Container, Row } from 'reactstrap';

const MainLayout = ({ children }) => {
  return (
    <Container fluid >
      <Row>
        <Col> 
        <Header />
        </Col>
      </Row>
      <Row className='py-5'>
        <Col xs={2} >
          <Sidebar />
        </Col>
        <Col xs={10} style={{ background: '#F0F0F0', minHeight: '100vh' }}>
          <main>
            {children}
          </main>
        </Col>
      </Row>
      <Row className='d-flex justify-content-end'>
        <Col xs={10} className=' text-center bg-white text-dark'>
          <Footer />
        </Col>
      </Row>
    </Container>

  );
};

export default MainLayout;
