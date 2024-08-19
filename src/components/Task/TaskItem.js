import React, { useContext, useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import TaskContext from '../../context/TaskContext';
import { format } from 'date-fns';
import { AiFillDelete, AiFillCheckCircle, AiFillEdit } from "react-icons/ai";
import './taskItem.scss';

const TaskItem = ({ task }) => {
  const { removeTask, completeTask, updateTask } = useContext(TaskContext);
  const formattedStartDate = format(new Date(task.start), 'yyyy-MM-dd HH:mm');
  const formattedEndDate = format(new Date(task.end), 'yyyy-MM-dd HH:mm');

  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [start, setStart] = useState(format(new Date(task.start), "yyyy-MM-dd'T'HH:mm"));
  const [end, setEnd] = useState(format(new Date(task.end), "yyyy-MM-dd'T'HH:mm"));

  const toggle = () => setModal(!modal);
  const Edit = () => setModalEdit(!modalEdit);

  const rowClass = task.completed ? 'task-completed' : 'task-active';

  const handleDelete = (id) => {
    removeTask(id);
    toggle();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      start,
      end,
    };
    updateTask(task.id, updatedTask);
    Edit();
  };

  return (
    <>
      <tr className={rowClass}>
        <th scope="row"  className={rowClass}>
          {task.title}
        </th>
        <td>{formattedStartDate}</td>
        <td>{formattedEndDate}</td>
        <td>
          <Button onClick={Edit} className="border-0 bg-white">
            <AiFillEdit className='text-black' size={25} />
          </Button>
          <Button onClick={() => completeTask(task.id)} className="border-0 bg-white">
            <AiFillCheckCircle className='text-success' size={25} />
          </Button>
          <Button className="border-0 bg-white" onClick={toggle}>
            <AiFillDelete className='text-danger' size={25} />
          </Button>
        </td>
      </tr>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirm Deletion</ModalHeader>
        <ModalBody className='text-danger'>Are you sure you want to delete this task?</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          <Button color="danger" onClick={() => handleDelete(task.id)}>Delete</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit} toggle={Edit}>
        <ModalHeader toggle={Edit} className='text-info fw-bold'>Update Task</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleEdit}>
            <FormGroup>
              <Label for="title" className='mb-2'>Title</Label>
              <Input
                id='title'
                name="title"
                placeholder="Task Title"
                type="text"
                className='shadow-none'
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
                className='shadow-none'
                onChange={(e) => setEnd(e.target.value)}
              />
            </FormGroup>
            <Button color='info text-white ms-2 w-100'>Update Task</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TaskItem;
