import React from "react";

const CustomizableModalHeader = ({title, className = 'font-weight-bold nanum-gothic font-2xl'}) =>
    <div className='modal-header'>
        <div className={`modal-title ${className}`}>{title}</div>
    </div>

export default CustomizableModalHeader