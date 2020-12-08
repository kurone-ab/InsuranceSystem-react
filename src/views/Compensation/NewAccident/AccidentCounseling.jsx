import React, {Fragment, Suspense, useEffect, useState} from "react";
import axios from "axios";
import {
    Button,
    Col,
    Label,
    FormGroup,
    Input,
 Collapse, Card, Table, ListGroupItem, Modal, Form, ModalBody, ModalFooter
} from 'reactstrap'
import { uploadAction} from "./AccidentRegisterForm";
import AccidentRegisterForm from "./AccidentRegisterForm";
import CustomizableModalHeader from "../../global/CustomiableModalHeader";
import Loading from "../../global/Loading";

const openTarget=[]
const AccidentCounseling = () => {
    const [state, setState] = useState({loading: true, ItemList: {name:"", insurances:[]}})
    const [update, setUpdate] = useState(false)
    const [open, setOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const modalControl = () => {
        setModalOpen(!modalOpen)
    }
    const [target, setTarget] = useState({contact: "", name: ""})
    useEffect(() => {
        const getAxios = async () => {
            if (update) {
                console.log(`/accident/new_accident/insurance_subscription_check?name=${target.name}&contact=${target.contact}`)
                await axios.get(`/accident/new_accident/insurance_subscription_check?name=${target.name}&contact=${target.contact}`)
                    .then(({data}) => {
                        setState({loading: false, ItemList: data})
                        if (!data) {
                            alert("해당 고객은 존재하지 않습니다.")
                            setTarget({contact: "", name: ""})
                        }
            console.log(state.ItemList)
                    })
                    .catch(e => {
                        console.error(e);
                        setState({loading: false, ItemList: null})
                    })
                setUpdate(false)
            }
        }
        getAxios()
    }, [update])

    const {id, insurances} = state.ItemList

    //
    return (
        <div className='flex-grow-1'>
            <h3>보험가입확인</h3>
            <br/>
                    <FormGroup row>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>고객 이름</Label>
                        </Col>

                        <Col md={9} sm={12} lg={2}>
                            <Input type='text' id='name' className='nanum-gothic'/>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>고객 전화번호</Label>
                        </Col>
                        <Col md={9} sm={12} lg={3}>
                            <Input type='text' id='contact' className='nanum-gothic'/>
                        </Col>
                    </FormGroup>

                    <Button onClick={() => {
                        let name = document.getElementById('name').value
                        let contact = document.getElementById('contact').value
                        setTarget({contact: contact, name: name})
                        setUpdate(true)
                    }} color='primary'>검색</Button>
            <hr/>

            {target.name!=="" && state.ItemList?
                Object.keys(insurances).map((key,idx)=>{
                            const{name,guaranteeInfoList,salesTargetList,evaluationReportList}=insurances[key]
                    openTarget[idx]=false
                    return (
                        <Fragment key={idx}>
                            <ListGroupItem tag="a" href='#' action
                                           className='border-0' onClick={(e) => {
                                e.preventDefault()
                                openTarget[idx] = !openTarget[idx]
                                setOpen({...openTarget})
                            }}>
                                <div className='my-auto nanum-gothic font-xl'>{name}</div>
                            </ListGroupItem>
                            <Collapse isOpen={open[idx]}>

                                <div className='nanum-gothic font-weight-bold font-lg m-2'>보장 정보</div>
                                <Card className='border-primary'>
                                    <Table responsive borderless>
                                        <thead>
                                        <tr>
                                            <th className='nanum-gothic font-weight-bold w-75'>보장 조건</th>
                                            <th className='nanum-gothic font-weight-bold'>보장 한도</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            Object.keys(guaranteeInfoList).map((guaranteeInfo, idx) => {
                                                const {condition, limit} = guaranteeInfoList[guaranteeInfo]
                                                return (
                                                    <tr key={idx}>
                                                        <td className='nanum-gothic'>{condition}</td>
                                                        <td className='nanum-gothic'>{limit}원</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                </Card>
                                <div className='nanum-gothic font-weight-bold font-lg m-2'>판매 대상</div>
                                <Card className='border-primary'>
                                    <Table borderless responsive>
                                        <tbody>
                                        {
                                            Object.keys(salesTargetList).map((salesTarget, idx) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td className='nanum-gothic'>{salesTargetList[salesTarget]}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                </Card>

                                <Button color="primary" onClick={modalControl} className="ml-auto" size='sm'><i
                                    className='fa fa-upload mr-1'/>{'사고접수하기'}</Button>
                                <Modal isOpen={modalOpen} toggle={modalControl}
                                       className={'modal-lg ' } backdrop={'static'}>
                                    <Form onSubmit={(e) => uploadAction(e, modalControl)}>
                                        <CustomizableModalHeader title={'사고 접수하기'}/>
                                        <ModalBody>
                                            <Suspense fallback={Loading()}>
                                                {<AccidentRegisterForm iid={insurances[key].id} cid={id} />}
                                            </Suspense>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button type='submit' color="primary">등록</Button>{' '}
                                            <Button color="secondary" onClick={modalControl}>취소</Button>
                                        </ModalFooter>
                                    </Form>
                                </Modal>

                            </Collapse>
                        </Fragment>
                    )

                        }):null

            }

        </div>
)
            }
            export default AccidentCounseling
