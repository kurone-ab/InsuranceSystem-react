import React, {Suspense, useState} from "react";
import {Button, Form, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import Loading from "./Loading";
import FileUploadButton from "./FileUploadButton";

const GenerateDocumentModal = ({modalTitle, buttonTitle = '보고서 작성하기', className, uploadAction, inputForm: InputForm, fileUpload, fileElementId}) => {
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
                className='fa fa-upload mr-1'/>{buttonTitle}</Button>
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
                        {fileUpload ? <FileUploadButton fileElementId={fileElementId} size='md' className='mr-auto'/> : null}
                        <Button type='submit' color="primary">등록</Button>{' '}
                        <Button color="secondary" onClick={modalControl}>취소</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )
}

export default GenerateDocumentModal