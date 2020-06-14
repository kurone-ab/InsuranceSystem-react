import React, {Suspense, useState} from "react";
import {Button, Form, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import Loading from "./Loading";

const GenerateDocumentModal = ({modalTitle, className, uploadAction, InputForm}) => {
    const [modalOpen, setModalOpen] = useState(false)

    const modalControl = () => {
        setModalOpen(!modalOpen)
    }

    const CustomHeader = () => {
        return (
            <div className='modal-header'>
                <div className='modal-title font-weight-bold nanum-gothic font-2xl'>{modalTitle}</div>
            </div>
        )
    }

    return (
        <>
            <Button color="primary" onClick={modalControl} className="ml-auto" size='sm'><i
                className='fa fa-upload mr-1'/>보고서 작성하기</Button>
            <Modal isOpen={modalOpen} toggle={modalControl}
                   className={'modal-lg ' + className} backdrop={'static'}>
                <Form onSubmit={(e) => uploadAction(e, modalControl)}>
                    <ModalHeader wrapTag={CustomHeader}/>
                    <ModalBody>
                        <Suspense fallback={Loading()}>
                            {InputForm}
                        </Suspense>
                    </ModalBody>
                    <ModalFooter>
                        <Button type='submit' color="primary">등록</Button>{' '}
                        <Button color="secondary" onClick={modalControl}>취소</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )
}

export default GenerateDocumentModal