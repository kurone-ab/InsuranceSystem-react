import React from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

const ReadContentModal = ({open, toggleFunc, title, content}) => {
    const CustomHeader = () =>
        <div className='modal-header'>
            <div className='modal-title font-weight-bold nanum-gothic font-2xl'>{title}</div>
        </div>


    return (
        <Modal isOpen={open} toggle={toggleFunc} size='lg'>
            <ModalHeader wrapTag={CustomHeader}/>
            <ModalBody className='nanum-gothic font-lg'>
                {content}
            </ModalBody>
            <ModalFooter><Button color="primary" onClick={toggleFunc}>확인</Button></ModalFooter>
        </Modal>
    )
}

export default ReadContentModal