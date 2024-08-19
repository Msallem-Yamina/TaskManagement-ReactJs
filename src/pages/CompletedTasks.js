import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import { Col, Container, Row } from 'reactstrap';
import TableComponent from '../components/TableComponent';

const CompletedTasks = () => {
  const { tasks } = useContext(TaskContext);

  const completed = tasks.filter(task => task.completed);
  return (
    <Container className='py-4 mt-4 bg-white'>
      <h4 className='text-secondary fw-bold mb-3'>Completed Tasks</h4>
      <Row>
        <Col >
          {completed && completed.length > 0 ? (
            <TableComponent tasks={completed}/>

          ) : (
            <p className='text-danger'>There are no completed tasks</p>
          )}
        </Col>
      </Row>
    </Container>

  );
};

export default CompletedTasks;
