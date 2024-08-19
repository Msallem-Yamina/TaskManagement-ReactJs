import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginat = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {

    // Calculate total Pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <Pagination>
            <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                    first
                    onClick={() => handlePageChange(1)}
                />
            </PaginationItem>
            <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                    onClick={() => handlePageChange(currentPage - 1)}
                    previous
                />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem
                    key={index + 1}
                    active={currentPage === index + 1}
                >
                    <PaginationLink
                        className={`shadow-none ${currentPage === index + 1 ? 'bg-info border-info' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </PaginationLink>
                </PaginationItem>
            ))}


            <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                    next
                    onClick={() => handlePageChange(currentPage + 1)}
                />
            </PaginationItem>
            <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                    last
                    onClick={() => handlePageChange(totalPages)}
                />
            </PaginationItem>
        </Pagination>
    )
}
export default Paginat;