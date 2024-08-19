import React, { useContext, useState } from 'react';
import TaskContext from '../../context/TaskContext';
import { Button, Label, Col, Form, FormGroup, Input, Modal, ModalHeader, ModalBody, Row, Toast, ToastBody } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import { } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { AiOutlinePlus } from 'react-icons/ai';
import './AddTaskForm.scss';

const AddTaskForm = () => {
  const { t } = useTranslation();
  const { tasks, addTask } = useContext(TaskContext);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [modal, setModal] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const toggle = () => setModal(!modal);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 4000);
  };
  const isOverlapping = (task1, task2) => {
    return !(task1.end <= task2.start || task2.end <= task1.start);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTaskStart = new Date(start);
    const newTaskEnd = new Date(end);

    // Check for overlapping tasks
    const overlap = tasks.some(existingTask => {
      const existingTaskStart = new Date(existingTask.start);
      const existingTaskEnd = new Date(existingTask.end);
      return isOverlapping(
        { start: newTaskStart, end: newTaskEnd },
        { start: existingTaskStart, end: existingTaskEnd }
      );
    });

    if (overlap) {
      alert('There is already a task scheduled during this time.');
    } else if (title && start && end) {
      addTask({
        id: uuidv4(),
        title,
        start: newTaskStart,
        end: newTaskEnd,
        completed: false
      });
      setTitle('');
      setStart('');
      setEnd('');
      toggle();
      showToast();
    }
  };
  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <>
      <Row className='mb-2'>
        <Col lg={12} className='d-flex justify-content-end'>
          {toastVisible && (
            <Toast>
              <ToastBody >
                Your task has been successfully added!
              </ToastBody>
            </Toast>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <h4 className='text-secondary fw-bold mb-3'>All Tasks</h4>
        </Col>
        <Col xs={6} className='d-flex justify-content-end'>
          <Button className='bg-transparent border-0 text-info justify-content-end' onClick={toggle}>
            <AiOutlinePlus size={33}/>
          </Button>
          <Modal isOpen={modal} toggle={toggle} >
            <ModalHeader toggle={toggle} className='fw-bold text-info' tag={'h2'}> {t("add task")}</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit} >
                <FormGroup>
                  <Label for="title" className='mb-2'>
                    Title
                  </Label>
                  <Input
                    id='title'
                    name="title"
                    placeholder="Task Title"
                    type="text"
                    className=' shadow-none'
                    max={20}
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="start">Start Date:</Label>
                  <Input
                    id="start"
                    name="start"
                    className='shadow-none'
                    type="datetime-local"
                    value={start}
                    min={currentDateTime}
                    onChange={(e) => setStart(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="end">End Date:</Label>
                  <Input
                    id="end"
                    name="end"
                    type="datetime-local"
                    value={end}
                    min={start}
                    className='shadow-none'
                    onChange={(e) => setEnd(e.target.value)}
                  />
                </FormGroup>
                <Button color='info text-white ms-2 w-100'>
                  Add New Task
                </Button>
              </Form>
            </ModalBody>

          </Modal>
        </Col>
      </Row>
    </>
  );
};

export default AddTaskForm;
