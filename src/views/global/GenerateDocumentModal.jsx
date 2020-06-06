import React, {Fragment, useState} from "react";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'

const GenerateDocumentModal = ({header, className, uploadAction, inputForm}) => {
    const [modalOpen, setModalOpen] = useState(false)

    const modalControl = () => {
        setModalOpen(!modalOpen)
    }

    const CustomHeader = () => {
        return (
            <div className='modal-header'>
                <div className='modal-title font-weight-bold nanum-gothic font-2xl'>{header}</div>
            </div>
        )
    }

    return (
        <Fragment>
            <Button color="primary" onClick={modalControl} className="ml-auto" size='sm'><i
                className='fa fa-upload mr-1'/>보고서 작성하기</Button>
            <Modal isOpen={modalOpen} toggle={modalControl}
                   className={'modal-lg ' + className} backdrop={'static'}>
                <ModalHeader wrapTag={CustomHeader}/>
                <ModalBody>
                    {<inputForm/>}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={uploadAction}>등록</Button>{' '}
                    <Button color="secondary" onClick={modalControl}>취소</Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

export default GenerateDocumentModal