import React from "react";
import { Table } from 'reactstrap';
import  TaskItem  from './Task/TaskItem';

const TableComponent  = ({tasks}) => {
    return (
        <div className='table-responsive'>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default TableComponent;