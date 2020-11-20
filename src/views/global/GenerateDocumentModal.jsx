import React, {Fragment, Suspense, useState} from "react";
import {
    Button,
    Collapse,
    Form,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    TabPane
} from 'reactstrap'
import Loading from "./Loading";
import FileUploadButton from "./FileUploadButton";
import CustomizableModalHeader from "./CustomiableModalHeader";
import InsuranceDetailReadForm from "../Development/FollowUpManage/InsuranceDetailReadForm";

const GenerateDocumentModal = ({modalTitle, buttonTitle = '보고서 작성하기', className, uploadAction, inputForm: InputForm, fileUpload, fileElementId}) => {
    const [modalOpen, setModalOpen] = useState(false)

    const modalControl = () => {
        setModalOpen(!modalOpen)
    }

    const action = () =>{
        //여기에 넣어준다. 첨부파일 이름을 알아내서 표시해주는 것을
        //일단 함수가 없어서 오류가 나므로 지금은 임시
             console.log("첨부 버튼 눌림~!")
    }

    return (
        <>
            <Button color="primary" onClick={modalControl} className="ml-auto" size='sm'><i
                className='fa fa-upload mr-1'/>{buttonTitle}</Button>
            <Modal isOpen={modalOpen} toggle={modalControl}
                   className={'modal-lg ' + className} backdrop={'static'}>
                <Form onSubmit={(e) => uploadAction(e, modalControl)}>
                    <CustomizableModalHeader title={modalTitle}/>
                    <ModalBody>
                        <Suspense fallback={Loading()}>
                            {InputForm}
                        </Suspense>
                    </ModalBody>
                    <ModalFooter>
                        {fileUpload ? <FileUploadButton fileElementId={fileElementId} selectedAction={()=>action()}
                                                        size='md' className='mr-auto'/> : null}
                        <Button type='submit' color="primary">등록</Button>{' '}
                        <Button color="secondary" onClick={modalControl}>취소</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )
}


export default GenerateDocumentModal