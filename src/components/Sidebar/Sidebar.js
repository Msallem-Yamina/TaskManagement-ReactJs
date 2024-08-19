import React from "react";
import { Link } from "react-router-dom";
import {  Col, Nav, NavItem, NavLink } from "reactstrap";
import {  AiOutlineCheck, AiOutlineDashboard, AiOutlineRise, AiOutlineUnorderedList } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
    const { t } = useTranslation();

    return (
        <div className="sidebar position-fixed bg-white">
           <Col>
           <Nav vertical className="pt-4 ps-3">
                <NavItem>
                    <NavLink tag={Link} to="/"
                        className='d-flex align-items-center '
                    >
                        <AiOutlineDashboard size={20} />
                        <span className="d-none d-md-inline-block ms-3"> {t("dashboard")}</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/TaskList"
                        className='d-flex align-items-center '
                    >
                        <AiOutlineUnorderedList size={20} className="me-1" />
                        <span className="d-none d-md-inline-block ms-3 ">{t("all tasks")}</span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/Inprogress"
                        className='d-flex align-items-center '
                      >
                        <AiOutlineRise size={20} />
                        <span className="d-none d-md-inline-block ms-3"> {t("in progress")} </span>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/CompletedTasks"
                       
                        className='d-flex align-items-center '>
                        <AiOutlineCheck size={20} />
                        <span className="d-none d-md-inline-block ms-3"> {t('completed')} </span>
                    </NavLink>
                </NavItem>
            </Nav>
           </Col>
        </div>
    )
}

export default Sidebar;