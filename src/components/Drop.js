import React, { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

const Drop = ({ Filter }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const drop = () => setDropdownOpen(prevState => !prevState);
    const [search, setSearch] = useState('All');

    // Handle the search filter change
    const handleSearch = (e) => {
        e.preventDefault(); // Prevent any default behavior (just in case)
        const selectedFilter = e.target.textContent; // Get the text content of the clicked item
        // console.log(selectedFilter)
        setSearch(selectedFilter); // Update the search state
        Filter(selectedFilter); // Call the Filter function with the selected option
    };
    return (
        <Dropdown isOpen={dropdownOpen} toggle={drop}>
            <DropdownToggle caret
                className='bg-info text-white shadow-none border-info text-dark py-1 px-3 rounded-0' >
                {search}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={handleSearch}>All</DropdownItem>
                <DropdownItem onClick={handleSearch}>Active</DropdownItem>
                <DropdownItem onClick={handleSearch}>Done</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default Drop;