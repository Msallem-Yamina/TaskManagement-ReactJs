import React from 'react';
import { Container } from "reactstrap";
import TaskChart from "../components/reChart/TaskChart";
import TaskCalendar from '../components/TaskCalendar';
import TaskStats from '../components/TaskStats';

const Home = () => {
  return (
    <Container className='Home pb-5 pt-2'>
      <TaskStats />
      <TaskCalendar />
      <TaskChart />
    </Container>
  )
}

export default Home;