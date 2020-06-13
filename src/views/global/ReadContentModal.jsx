import React from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner} from 'reactstrap'
import propTypes from 'prop-types'

const ReadContentModal = ({open, toggleFunc, title, content}) => {
    const CustomHeader = () =>
        <div className='modal-header'>
            <div className='modal-title font-weight-bold nanum-gothic font-2xl'>{title}</div>
        </div>

    return (
        <Modal isOpen={open} toggle={toggleFunc} size='lg'>
            <ModalHeader wrapTag={CustomHeader}/>
            <ModalBody className='nanum-gothic font-lg d-flex justify-content-center'>
                {content ? content : <Spinner color='primary'/>}
            </ModalBody>
            <ModalFooter><Button color="primary" onClick={toggleFunc}>확인</Button></ModalFooter>
        </Modal>
    )
}

ReadContentModal.propTypes = {
    open: propTypes.bool.isRequired,
    toggleFunc: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
    content: propTypes.string,
    url: propTypes.string
}

export default ReadContentModal