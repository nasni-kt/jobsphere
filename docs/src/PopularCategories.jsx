import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaUniversity, FaHome, FaUsers, FaShoppingCart, FaMoneyCheckAlt, FaHeadset, FaCalendarAlt, FaLaptopCode, FaDatabase, FaServer, FaPaintBrush, FaBullhorn } from 'react-icons/fa';

const categories = [
  { name: 'Banking', icon: <FaUniversity /> },
  { name: 'Work From Home', icon: <FaHome /> },
  { name: 'HR', icon: <FaUsers /> },
  { name: 'Sales', icon: <FaShoppingCart /> },
  { name: 'Accounting', icon: <FaMoneyCheckAlt /> },
  { name: 'Customer Support', icon: <FaHeadset /> },
  { name: 'Event Management', icon: <FaCalendarAlt /> },
  { name: 'IT', icon: <FaLaptopCode /> },
  { name: 'SQL', icon: <FaDatabase /> },
  { name: 'Oracle', icon: <FaServer /> },
  { name: 'Graphic Design', icon: <FaPaintBrush /> },
  { name: 'Digital Marketing', icon: <FaBullhorn /> }
];

const PopularCategories = () => {
  return (
    <section className="popular-categories px-5 py-4 text-center">
      <h2 className='fw-bold text-muted'>Popular<span style={{color:"#5A5EAB"}}> Categories</span> </h2>
      <Container>
        <Row className="mt-4">
          {categories.map((category, index) => (
            <Col 
              key={index} 
              xs={6} 
              sm={4} 
              md={3} 
              lg={2} 
              className="mb-3 d-flex justify-content-center"
            >
              <Card 
  className="category-card text-center p-0 shadow-sm" 
  style={{ fontSize: '0.8rem', width: '100%', maxWidth: '150px', height: 'auto' }}
>
  <Card.Body className="d-flex flex-column align-items-center p-2">
    <div className="icon mb-1" style={{ fontSize: '0.9rem' }}>
      {category.icon}
    </div>
    <Card.Text style={{ marginBottom: '0.5rem' }}>{category.name}</Card.Text>
  </Card.Body>
</Card>

            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default PopularCategories;
