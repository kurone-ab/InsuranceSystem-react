import React, {lazy, useState, Fragment} from "react";
import {connect} from 'react-redux'
import {
    Button,
    Collapse,
    ListGroup,
    ListGroupItem,
    Modal,
    ModalBody,
    ModalFooter,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap'
import axios from 'axios'
import Loading from "../../global/Loading";
import classnames from 'classnames'
import {loadInsuranceInfoList} from "../../../globalStore";
import {useGetAxios} from "../../global/useAxios";
import CustomizableModalHeader from "../../global/CustomiableModalHeader";
import FileUploadButton from "../../global/FileUploadButton";
import InsuranceDetailReadForm from "./InsuranceDetailReadForm";
import ReadContentModal from '../../global/ReadContentModal'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const openTarget = {}

const FollowUpManage = ({productList, typeList, load}) => {
    useGetAxios({url: '/insurance/info', callback: load, necessary: !typeList})
    const [selectedType, setSelectedType] = useState('FIRE')
    const [open, setOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [success, setSuccess] = useState({open: false, message: '파일이 성공적으로 업로드 되었습니다.', title: '업로드 성공'})
    const [selectedInsurance, setSelectedInsurance] = useState(-1)
    if (!productList || !typeList)
        return (<Loading/>)
    const typeListKeys = Object.keys(typeList)
    // const filteredList = Object.values(productList).filter(value => value.company === 'HANHWA')
    const filteredList = Object.values(productList)
    if (!open) {
        filteredList.forEach(item => openTarget[item.id] = false)
        setOpen({...openTarget});
    }

    const fileInput = document.getElementById('evalReportSelector')

    const modalClose = () => {
        setConfirmOpen(false)
    }

    const fileUpload = () => {
        const fileList = fileInput.files
        const formData = new FormData();
        for (const fileListElement of fileList) {
            formData.append('report', fileListElement)
        }
        formData.append('insuranceId', selectedInsurance)
        setSuccess({
            open: true,
            message: <Loading/>,
            title: '업로드 중'
        });
        axios.post('/insurance/evaluation', formData).then(r => {
            setSuccess({
                open: true,
                message: success.message,
                title: success.title
            });
            modalClose()
            fileInput.value = ''
        }).catch(reason => {
            setSuccess({
                open: true,
                message: '업로드에 실패 했습니다.',
                title: '업로드 실패'
            });
        });
    }

    return (
        <div className='animated fadeIn'>
            <Nav tabs>
                {
                    typeListKeys.map((type, idx) => {
                        return (
                            <NavItem key={idx}>
                                <NavLink
                                    className={classnames({active: selectedType === type})}
                                    onClick={() => {
                                        setSelectedType(type)
                                    }}>
                                    <div className='nanum-gothic'>
                                        {typeList[type]}
                                    </div>
                                </NavLink>
                            </NavItem>
                        )
                    })
                }

            </Nav>
            <TabContent activeTab={selectedType}>
                {
                    typeListKeys.map((type, idx) => {
                        return (
                            <TabPane tabId={type} key={idx}>
                                <Modal isOpen={confirmOpen} toggle={modalClose}>
                                    <CustomizableModalHeader title='올리기 전 확인하셨나요?'/>
                                    <ModalBody>
                                        <ListGroup flush>
                                            <ListGroupItem className='nanum-gothic border-0'>
                                                선택하신 파일(들)은 아래와 같습니다.
                                            </ListGroupItem>
                                            {
                                                fileInput ? Array.from(fileInput.files).map((file, idx) =>
                                                    <ListGroupItem className='border-0' key={idx}>
                                                        {`${idx + 1} : ${file.name}`}
                                                    </ListGroupItem>
                                                ) : null
                                            }
                                        </ListGroup>
                                    </ModalBody>
                                    <ModalFooter key={Math.random()}>
                                        <Button color='primary' onClick={fileUpload} key={Math.random()}>확인</Button>
                                        <Button color='secondary' onClick={modalClose} key={Math.random()}>취소</Button>
                                    </ModalFooter>
                                </Modal>
                                <ListGroup flush>
                                    {
                                        filteredList.filter((product) => product.type === type).map((product, idx) => {
                                            const {id, name} = product
                                            return (
                                                <Fragment key={idx}>
                                                    <ListGroupItem tag="a" href='#' action
                                                                   className='border-0' onClick={(e) => {
                                                        e.preventDefault()
                                                        openTarget[id] = !openTarget[id]
                                                        setSelectedInsurance(id)
                                                        setOpen({...openTarget})
                                                    }}>
                                                        <div className='my-auto nanum-gothic font-xl'>{name}</div>
                                                    </ListGroupItem>
                                                    <Collapse isOpen={open[id]}>
                                                        <FileUploadButton fileElementId={'evalReportSelector'}
                                                                          buttonText='평가 보고서 업로드' multiple
                                                                          className='my-2'
                                                                          selectedAction={() => setConfirmOpen(true)}
                                                                          size='md' />
                                                        <InsuranceDetailReadForm id={id}/>
                                                    </Collapse>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </ListGroup>
                            </TabPane>
                        )
                    })
                }
            </TabContent>
            <ReadContentModal open={success.open} toggleFunc={() => setSuccess({
                open: false,
                message: success.message,
                title: success.title
            })}
                              content={success.message} title={success.title}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {insurance: {infoList: {typeList, productList} = {}} = {}} = state
    return typeList ? {
        typeList,
        productList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (insurance) => {
            dispatch(loadInsuranceInfoList(insurance))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpManage)