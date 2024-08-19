import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

import { AiOutlineUnorderedList, AiOutlineRise, AiOutlineCheck, AiOutlineRightCircle } from 'react-icons/ai';

const iconMap = {
  AiOutlineUnorderedList: AiOutlineUnorderedList,
  AiOutlineRise: AiOutlineRise,
  AiOutlineCheck: AiOutlineCheck,
};

const StatCard = ({ title, length, to, borderColor, icon }) => {
  const IconComponent = iconMap[icon];

  const cardStyle = {
    borderTop: `4px solid ${borderColor}`,
    // background: `${color}`
  };
  const titleStyle ={
    color:`${borderColor}`,
  }

  return (
    <Card className='shadow-sm mb-md-0 rounded-0' style={cardStyle} >
      <CardBody>
        <CardTitle tag="h5" className='fw-bold d-flex align-items-center justify-content-between'>
          <div className="d-flex align-items-center" style={titleStyle}>
            {IconComponent && <IconComponent className="me-2"/>}
            {title}
          </div>
          <NavLink tag={NavLink} to={to}>
            <AiOutlineRightCircle size={25} className="icon-rotate" color={borderColor}/>
          </NavLink>
        </CardTitle>
        <CardText >
          <h4 className="fw-bold">
            {length}
          </h4>
        </CardText>
      </CardBody>
    </Card>
  );
};


export default StatCard;
