import React, { useState, useEffect, useContext } from 'react';
import {
  XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import TaskContext from '../../context/TaskContext';
import { Button, Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import Chart from './Chart';
import './taskChart.scss';


// Filter Tasks 
const filterTask = (period, index, tasks, periodType) => {
  // console.log(period)
  return {
    period: period,
    completed: tasks.filter(task => {
      const taskDate = new Date(task.start);
      return getPeriodValue(taskDate, periodType) === index && task.completed;
    }).length,
    active: tasks.filter(task => {
      const taskDate = new Date(task.start);
      return getPeriodValue(taskDate, periodType) === index && !task.completed;
    }).length,
  };
}

// Helper function to get the appropriate date value based on periodType
const getPeriodValue = (taskDate, periodType) => {
  switch (periodType) {
    case 'hour':
      return taskDate.getHours();
    case 'day':
      return taskDate.getDate();
    case 'month':
      return taskDate.getMonth();
    case 'week':
      return taskDate.getDay();
    default:
      return null;
  }
}


const TaskChart = () => {
  const { t } = useTranslation();

  const { tasks } = useContext(TaskContext);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState('day');
  const [data, setData] = useState([]);
  const getTasksByHour = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayDateString = today.toDateString();

    const filteredTasks = tasks.filter(task => {
      const taskDate = new Date(task.start);
      return taskDate.toDateString() === todayDateString;
    });

    return Array.from({ length: 24 }, (_, i) => {
      return filterTask(`${i}:00`, i, filteredTasks, 'hour');
    });
  };

  const getTasksByWeek = () => {
    const today = new Date(); 
    const dayOfWeek = today.getDay(); // Get the current day of the week (0-6)
    const startOfWeek = new Date(today); // Clone today's date
  
    startOfWeek.setDate(today.getDate() - (dayOfWeek - 1));

    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const dayName = day.toLocaleDateString('en-US', { weekday: 'short' });
      return filterTask(dayName, i, tasks, 'week');
    });
  };
  

  const getTasksByMonth = () => {
    return Array.from({ length: 31 }, (_, i) => {
      const day = i + 1;
      return filterTask(day, i, tasks, 'day')
    });
  };

  const getTasksByYear = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const month = new Date(0, i).toLocaleString('en-US', { month: 'short' });
      return filterTask(month, i, tasks, 'month');
    });
  };

  useEffect(() => {
    switch (view) {
      case 'day':
        setData(getTasksByHour());
        break;
      case 'week':
        setData(getTasksByWeek());
        break;
      case 'month':
        setData(getTasksByMonth());
        break;
      case 'year':
        setData(getTasksByYear());
        break;
      default:
        setData([]);
    }
  }, [view, date, tasks]);

  return (
    <Row>
      <Col lg={12}>
        <div className='p-3 bg-white'>
          <Row>
            <Col md={8}>
              <h4 className='fw-bold text-secondary'>{t("Task Chart")}</h4>
            </Col>
            <Col md={4}>
              <div className='d-flex justify-content-md-end'>
                <Button className='bg-info border-0 rounded-0' onClick={() => setView('day')}>Day</Button>
                <Button className='ms-2 bg-info border-0 rounded-0' onClick={() => setView('week')}>Week</Button>
                <Button className='ms-2 bg-info border-0 rounded-0' onClick={() => setView('month')}>Month</Button>
                <Button className='ms-2 bg-info border-0 rounded-0' onClick={() => setView('year')}>Year</Button>
              </div>
            </Col>
          </Row>
        </div>

      </Col>
      <Col lg={12}>
        <div className='p-3 bg-white'>

          {view === 'day' ? (
            <div>
              <h3 className='text-center text-info mb-3'>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopOpacity={0.8} />
                      <stop offset="95%"  stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorNotCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopOpacity={0.8} />
                      <stop offset="95%"  stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={40}/>
                  <Area
                    type="monotone"
                    dataKey="active"
                    fillOpacity={1}
                    stroke="#8884d8"
                    fill="url(#colorNotCompleted)"
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    fillOpacity={1}
                     stroke="#82ca9d"
                    fill="url(#colorCompleted)"
                  />
                </AreaChart>
              </ResponsiveContainer> 
             
            </div>
          ) : view === 'week' ? (
            <div>
              <h3 className='text-center text-info mb-3'>
                Week of {new Date(date.setDate(date.getDate() - date.getDay())).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </h3>
              <Chart data={data} />
            </div>
          ) : view === 'month' ? (
            <div>
              <h3 className='text-center text-info mb-3'>
                {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <Chart data={data} />
             
            </div>
          ) : (
            <div>
              <h3 className='text-center text-info mb-3'>{date.getFullYear()}</h3>
              <Chart data={data} />
            </div>
          )}
        </div>
      </Col>
    </Row>

  );
};

export default TaskChart;
