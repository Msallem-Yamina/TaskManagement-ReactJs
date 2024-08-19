import React, { useContext } from 'react';
import TaskContext from '../context/TaskContext'; 
import { Col, Row } from 'reactstrap';
import StatCard from './StatCard/StatCard';
import { useTranslation } from 'react-i18next';


const TaskStats = () => {
  const { t } = useTranslation();
  const { tasks } = useContext(TaskContext);

  const todos = tasks.filter(task => !task.completed);
  const completed = tasks.filter(task => task.completed);

  return (
    <Row className='pt-4'>
      <Col md={4}>
        <StatCard
          title={t('all tasks')}
          to='/TaskList'
          length={tasks.length}
          borderColor='grey'
          icon='AiOutlineUnorderedList'
        />
      </Col>
     
      <Col md={4} className='mt-3 mt-md-0'>
        <StatCard
          title={t('in progress')} 
          length={todos.length}
          to='/Inprogress'
          borderColor='#8884d8'
          icon='AiOutlineRise'
        />
      </Col>
      <Col md={4} className='mt-3 mt-md-0'>
        <StatCard
          title={t('completed')} 
          length={completed.length}
          to='/CompletedTasks'
          borderColor='#82ca9d'
          icon='AiOutlineCheck'
        />
      </Col>
    </Row>
  );
}

export default TaskStats;
