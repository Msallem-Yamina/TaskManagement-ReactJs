import React, { useState } from 'react';
import {
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Navbar,
  Form,
  Input,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  UncontrolledPopover,
  PopoverBody,
  ListGroup,
  ListGroupItem,
  Button,
  PopoverHeader,
} from 'reactstrap';

import { NavLink } from 'react-router-dom';
import { AiFillSetting, AiOutlineBell, AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import './Header.scss';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const drop = () => setDropdownOpen(prevState => !prevState);

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    setDropdownOpen(false);
  };

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Row>
      <Navbar color='white' className='header position-fixed' expand='sm'>
        <Col xs="2">
          <NavbarBrand tag={NavLink} to="/" className="me-auto">
            <h2 className='fw-bold fs-2'>
              {t('my tasks')}
            </h2>
          </NavbarBrand>
        </Col>
        <NavbarToggler onClick={toggleNavbar} className="me-2 shadow-none" />

        <Collapse isOpen={!collapsed} navbar className='d-xs-none d-md-flex justify-content-between'>
          <Form className='position-relative'>
            <Input
              id="search"
              name="search"
              placeholder={t("search task")}
              type="search"
              className='shadow-none mt-3 mt-md-0 rounded-0'
            />
            <span className="bottom line"></span>
            <span className="right line"></span>
            <span className="top line"></span>
            <span className="left line"></span>
          </Form>
          <div className='d-flex align-items-center mt-3 mt-md-0'>
            <Dropdown isOpen={dropdownOpen} toggle={drop}>
              <DropdownToggle caret className='bg-transparent border-0 text-dark py-1 px-3 rounded-0'>
                {selectedLanguage.toUpperCase()}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handleLanguageChange('en')}>EN</DropdownItem>
                <DropdownItem onClick={() => handleLanguageChange('fr')}>FR</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <AiOutlineBell size={20}/>
            <Button id="PopoverFocus" type="button" className='bg-transparent border-0 text-dark'>
              <AiOutlineUser size={29} />
            </Button>
            <UncontrolledPopover
              placement="bottom"
              target="PopoverFocus"
              trigger="legacy"
            >
              <PopoverHeader>
                Yamina Msallem
              </PopoverHeader>
              <PopoverBody>
                <ListGroup>
                  <ListGroupItem className='border-0 px-0 d-flex align-items-center' tag="button">
                    <AiFillSetting size={18} className='me-2' />
                    {t("settings")}
                  </ListGroupItem>
                  <ListGroupItem className='border-0 px-0 d-flex align-items-center' tag="button">
                    <AiOutlineLogout size={18} className='me-2' />
                    {t("logout")}
                  </ListGroupItem>
                </ListGroup>
              </PopoverBody>
            </UncontrolledPopover>
          </div>
        </Collapse>
      </Navbar>
    </Row>
  );
}

export default Header;
