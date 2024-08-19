import React, { useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import TaskContext from '../../context/TaskContext';
import { Col, Row } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import './Calendar.scss';

const localizer = momentLocalizer(moment);

const TaskCalendar = () => {
  const { tasks } = useContext(TaskContext);
  const { t } = useTranslation();

  // Update date to Object
  const updatedTasks = tasks.map(task => ({
    ...task,
    start: new Date(task.start),
    end: new Date(task.end),
  }));

  // Personilaze the background event 
  const eventStyleGetter = (event) => {
    const className = event.completed ? 'completed-task' : 'active-task';
    return {
      className, // Assign the CSS class based on the task's completion status
    };
  };



  return (
    <Row className='py-4 mt-2'>
      <Col>
        <div className='calendar bg-white p-3'>
          <h4 className='mb-3 fw-bold text-secondary'>{t("Calendar Tasks")}</h4>
          <Calendar
            localizer={localizer}
            events={updatedTasks}
            startAccessor="start"
            endAccessor="end"
            eventPropGetter={eventStyleGetter}
            style={{ height: '700px' }}          
          />
        </div>
      </Col>
    </Row>
  );
};

export default TaskCalendar;
