import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSearch } from "react-icons/ai";
import { Button, Form, Input, InputGroup } from "reactstrap";

const SearchTask = ({ onSearch }) => {

    // Translation
    const { t } = useTranslation();

    // Initial Search Term
    const [searchQuery, setSearchQuery] = useState("");

    // Handler to update state as user types
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle to perform search on button click
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchQuery);
    };


    return (
        <Form >
            <InputGroup className='d-flex align-items-center'>
                <Input
                    id="search"
                    name="search"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder={t("search task")}
                    type="search"
                    className='shadow-none rounded-0'
                />
                <Button
                    onClick={handleSearch}
                    className="bg-transparent text-dark rounded-0 "
                >
                    <AiOutlineSearch size={20} />
                </Button>
            </InputGroup>
        </Form>
    )
}
export default SearchTask;