import React from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner} from 'reactstrap'
import propTypes from 'prop-types'
import CustomizableModalHeader from "./CustomiableModalHeader";

const ReadContentModal = ({open, toggleFunc, title, content, addCancel, confirmAction = toggleFunc, size = 'lg'}) =>
        <Modal isOpen={open} toggle={toggleFunc} size={size}>
            <CustomizableModalHeader title={title}/>
            <ModalBody className='nanum-gothic font-lg d-flex justify-content-center'>
                {content ? content : <Spinner color='primary'/>}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={confirmAction}>확인</Button>
                {addCancel ? <Button color="secondary" onClick={toggleFunc}>취소</Button> : null}
            </ModalFooter>
        </Modal>


ReadContentModal.propTypes = {
    open: propTypes.bool.isRequired,
    toggleFunc: propTypes.func.isRequired,
    title: propTypes.string.isRequired,
    content: propTypes.any,
}

export default ReadContentModal