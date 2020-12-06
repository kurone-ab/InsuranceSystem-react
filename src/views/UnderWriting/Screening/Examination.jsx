import React, {Fragment, useEffect, useState} from "react";
import {connect, useStore} from 'react-redux'
import {
    Col,
    Collapse,
    Dropdown,
    DropdownToggle,
    FormGroup,
    Button,
    Input,
    InputGroup, InputGroupAddon, InputGroupText,
    Label,
    ListGroup,
    ListGroupItem
} from 'reactstrap'
import {loadRegisteringClientList} from "../../../globalStore";
import Loading from "../../global/Loading";
import axios from "axios";

const openTarget = []
const data= new FormData()

const save=(target,close)=>{
    data.append('status',"PASSED")
    data.append('contractId',target)
    console.log("승인!")

    axios.post('/uw/contractStatus/save', data).then(() => close(-1))
}
const refuse=(target,close)=>{
    data.append('status',"REJECTED")
    data.append('contractId',target)
    console.log("거절!")

    axios.post('/uw/contractStatus/save', data).then(() => close(-1))
}

const Examination = ({list, loadList}) => {
    const {user: {id: eid}} = useStore().getState()
    const[target,setTarget]= useState();
    const [state, setState] = useState({loading: true, ItemList: []})

    useEffect(() => {
        const getAxios = async () => {
            await axios.get(`/client/onProgress/list?eid=${eid}`, [])
                .then(({data}) => {
                    setState({loading: false, ItemList: data})
                    // Object.keys(state.ItemList).map((key, idx) => {
                    //     console.log(idx+state.ItemList[key])
                    //     openTarget[key] = false
                    //     setOpen({...openTarget})
                    // })
                })
                .catch(e => {
                    console.error(e);
                    setState({loading: false, ItemList: null})
                })
        }
        getAxios()

    }, [])

    return (
        <ListGroup flush>
            {!state.ItemList ? <Loading/> :

                Object.keys(state.ItemList).map((cl, idx) =>
                    <Fragment key={idx}>
                        <ListGroupItem tag="a" href='#' action className='border-0' onClick={() => {
                            cl===target?setTarget(-1):setTarget(cl)
                        }}>
                            {`계약 ID : ${cl}`}
                        </ListGroupItem>
                        <Collapse isOpen={cl===target? true:false}>

                            <h3>보험 인수 지침</h3>
                            <FormGroup row>
                                <input type='hidden' id='insuranceType' value={state.ItemList[cl].insuranceType} disabled/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>상품 종류</Label>
                                </Col>
                                <Col md={9} sm={12} lg={3}>
                                    <Dropdown disabled>
                                        <DropdownToggle caret className='nanum-gothic'>{state.ItemList[cl].insuranceType}</DropdownToggle>
                                    </Dropdown>
                                </Col>


                                <input type='hidden' id='insuranceName' value={state.ItemList[cl].insuranceName}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>상품 이름</Label>
                                </Col>
                                <Col md={9} sm={12} lg={3}>
                                    <Input type='text' className='nanum-gothic' value={state.ItemList[cl].insuranceName} disabled/>
                                </Col>
                            </FormGroup>
                            <hr/>


                            <FormGroup row>
                                <input type='hidden' id='physicalSmokeFrequency' value={state.ItemList[cl].physicalPolicy}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>신체적 인수 조건</Label>
                                </Col>
                                <Col md={9} sm={12} lg={6}>
                                    <Input type='text' className='nanum-gothic' value={state.ItemList[cl].physicalPolicy} disabled/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <input type='hidden' id='physicalDrinkingFrequency' value={state.ItemList[cl].environmentalPolicy}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>환경적 인수 조건</Label>
                                </Col>
                                <Col md={9} sm={12} lg={6}>
                                    <Input type='text' className='nanum-gothic' value={state.ItemList[cl].environmentalPolicy} disabled/>
                                </Col>
                            </FormGroup>
             

                            <FormGroup row>
                                <input type='hidden' id='environmentalDangerousArea' value={state.ItemList[cl].financialPolicy}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>금전적 인수 조건</Label>
                                </Col>
                                <Col md={9} sm={12} lg={6}>
                                    <Input type='text' className='nanum-gothic' value={state.ItemList[cl].financialPolicy} disabled/>
                                </Col>
                            </FormGroup>
                            <hr/>

                            <h3>고객 factor</h3>
                            <FormGroup row>
                                <input type='hidden' id='physicalSmokeFrequency' value={state.ItemList[cl].physicalSmokeFrequency}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>흡연빈도</Label>
                                </Col>
                                <Col md={9} sm={12} lg={6}>
                                    <Input type='text' className='nanum-gothic' value={state.ItemList[cl].physicalSmokeFrequency} disabled/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <input type='hidden' id='physicalDrinkingFrequency' value={state.ItemList[cl].physicalDrinkingFrequency}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>음주빈도</Label>
                                </Col>
                                <Col md={9} sm={12} lg={6}>
                                    <Input type='text' className='nanum-gothic' value={state.ItemList[cl].physicalDrinkingFrequency} disabled/>
                                </Col>
                            </FormGroup>
                            <hr/>

                            <FormGroup row>
                                <input type='hidden' id='environmentalDangerousArea' value={state.ItemList[cl].environmentalDangerousArea}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>위험한 거주지</Label>
                                </Col>
                                <Col md={9} sm={12} lg={6}>
                                    <Input type='text' className='nanum-gothic' value={state.ItemList[cl].environmentalDangerousArea} disabled/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <input type='hidden' id='environmentalDangerousHobby' value={state.ItemList[cl].environmentalDangerousHobby}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>위험한 취미 </Label>
                                </Col>
                                <Col md={9} sm={12} lg={6}>
                                    <Input type='text' className='nanum-gothic' value={state.ItemList[cl].environmentalDangerousHobby} disabled/>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <input type='hidden' id='environmentalJob' value={state.ItemList[cl].environmentalJob}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>직업</Label>
                                </Col>
                                <Col md={9} sm={12} lg={6}>
                                    <Input type='text' className='nanum-gothic' value={state.ItemList[cl].environmentalJob} disabled/>
                                </Col>
                            </FormGroup>

                            <hr/>
                            <FormGroup row>
                                <input type='hidden' id='financialIncome' value={state.ItemList[cl].financialIncome/10000}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>수입</Label>
                                </Col>
                                <Col md={10} lg={3} className='mt-1'>
                                    <InputGroup>
                                        <Input type='number' className='nanum-gothic' value={state.ItemList[cl].financialIncome/10000} disabled/>
                                        <InputGroupAddon addonType='append'>
                                            <InputGroupText>0,000</InputGroupText>
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <input type='hidden' id='financialCreditRating' value={state.ItemList[cl].financialCreditRating}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>신용등급</Label>
                                </Col>
                                <Col md={10} lg={3} className='mt-1'>
                                    <InputGroup>
                                        <Input type='number' className='nanum-gothic' value={state.ItemList[cl].financialCreditRating} disabled/>
                                    </InputGroup>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <input type='hidden' id='financialProperty' value={state.ItemList[cl].financialProperty}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>재산</Label>
                                </Col>
                                <Col md={10} lg={3} className='mt-1'>
                                    <InputGroup>
                                        <Input type='number' className='nanum-gothic' value={state.ItemList[cl].financialProperty} disabled/>
                                    </InputGroup>
                                </Col>
                            </FormGroup>

                            <hr/>
                            <FormGroup row>
                                <input type='hidden' id='calculatedPayment' value={state.ItemList[cl].calculatedPayment}/>
                                <Col md={3} lg={2}>
                                    <Label className='nanum-gothic'>계산된 보험료</Label>
                                </Col>
                                <Col md={10} lg={3} className='mt-1'>
                                    <InputGroup>
                                        <Input type='number' className='nanum-gothic' value={state.ItemList[cl].calculatedPayment} disabled/>
                                    </InputGroup>
                                </Col>
                            </FormGroup>
                            <hr/>

                            <Button color="primary" onClick={()=>{
                                save(target,setTarget)
                            }}>인수 하기</Button>
                            &nbsp; &nbsp;
                            <Button color="primary" onClick={()=>{
                                refuse(target,setTarget)
                            }}>거절 하기</Button>
                            <br/><br/>
                        </Collapse>
                    </Fragment>
                )}


        </ListGroup>
    )
}

const mapStateToProps = (state) => {
    const {client: {registering: {list} = {}} = {}} = state
    return list ? {
        list,
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadList: (list) => dispatch(loadRegisteringClientList(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Examination)