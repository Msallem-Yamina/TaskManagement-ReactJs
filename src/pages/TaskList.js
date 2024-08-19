import React, { useContext, useEffect, useState } from 'react';
import TaskContext from '../context/TaskContext';
import { Col, Container, Row } from 'reactstrap';
import AddTaskForm from '../components/AddTask/AddTaskForm';
import SearchTask from '../components/SearchTask';
import Drop from '../components/Drop';
import Paginat from '../components/Paginat';
import TableComponent from '../components/TableComponent';

const TaskList = () => {

    const { tasks } = useContext(TaskContext);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    // Hnadle Search By title 
    const handleSearchByTerm = (query) => {
        const filtered = tasks.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredTasks(filtered);
        setCurrentPage(1);
    };

    // handle Filter Search 
    const handleFilterSearch = (statut) => {
        if (statut === 'All') {
            setFilteredTasks(tasks)
        } else if (statut === 'Active') {
            const filtered = tasks.filter(task => !task.completed);
            setFilteredTasks(filtered);
        } else {
            const filtered = tasks.filter(task => task.completed);
            setFilteredTasks(filtered);
        }
        setCurrentPage(1);
    }

    // Get paginated tasks
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container className='py-4 mt-4 bg-white'>
            <Row className='mb-3'>
                <Col>
                    <AddTaskForm />
                </Col>
            </Row>
            <Row className='pb-3'>
                <Col xs={6}>
                    <SearchTask onSearch={handleSearchByTerm} />
                </Col>
                <Col xs={6} className='d-flex justify-content-end'>
                    <Drop Filter={handleFilterSearch} />
                </Col>
            </Row>
            <Row>
                <Col >
                    {paginatedTasks && paginatedTasks.length > 0 ? (
                        <TableComponent tasks={paginatedTasks}/>

                    ) : (
                        <p className='text-info'>No Tasks</p>
                    )}

                </Col>
            </Row>
            <Row >
                <Col className='d-flex justify-content-end'>
                    <Paginat
                        totalItems={filteredTasks.length}
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />               
                </Col>
            </Row>
        </Container>

    );
};

export default TaskList;
