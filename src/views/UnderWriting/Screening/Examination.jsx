import React, {Fragment, useEffect, useState} from "react";
import {connect} from 'react-redux'
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
import {useGetAxios} from "../../global/useAxios";
import Loading from "../../global/Loading";
import axios from "axios";
const openTarget = []

const Examination = ({list, loadList}) => {

    //고객의 factor불러오기.
    useGetAxios({url: 'client/registering/list', callback: loadList, necessary: !list})
    const [open, setOpen] = useState(false)
    const [state, setState] =useState({})
    if (!list) return <Loading/>
    const listKeys = Object.keys(list)
    if (!open) {
        listKeys.forEach((cl) => {
            openTarget[cl] = false
        })
        setOpen({...openTarget})
    }

    //보험의 인수조건 보여주기
    // useEffect(async ()=>{
    //         console.log("부름")
    //         await axios.get(`/uw/uw_policy/list`,[])
    //             .then(({data}) => {
    //                 setState({loading: false, ItemList: data})
    //             })
    //             .catch(e => {
    //                 console.error(e);
    //                 setState({loading: false, ItemList: null})
    //             })
    // },[])

    // const findOpened = (element)=>{
    //     if(element.insuranceName===)
    // }

    return (
        <ListGroup flush>
            {
                listKeys.map((cl, idx) => {
                    return (
                        <Fragment key={idx}>
                            <ListGroupItem tag="a" href='#' action className='border-0' onClick={() => {
                                openTarget[cl] = !openTarget[cl]
                                setOpen({...openTarget})
                            }}>
                                {`고객 ID : ${cl}`}
                            </ListGroupItem>
                            <Collapse isOpen={open[cl]}>


                                <h3>보험 인수 조건</h3>
                                <FormGroup row>
                                    <input type='hidden' id='insuranceType' value="{state.ItemList.find()}" disabled/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>상품 번호</Label>
                                    </Col>
                                    <Col md={9} sm={12} lg={10}>
                                        <Dropdown disabled>
                                            <DropdownToggle caret className='nanum-gothic'>{"{uwPolicyId}"}</DropdownToggle>
                                        </Dropdown>
                                    </Col>
                                    <input type='hidden' id='insuranceName' value="{name}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>상품 이름</Label>
                                    </Col>
                                    <Col md={9} sm={12} lg={10}>
                                        <Input type='text' className='nanum-gothic' value="{name}" disabled/>
                                    </Col>
                                </FormGroup>
                                <hr/>


                                <FormGroup row>
                                    <input type='hidden' id='physicalSmokeFrequency' value="{physicalPolicy}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>신체적 인수 조건</Label>
                                    </Col>
                                    <Col md={9} sm={12} lg={10}>
                                        <Input type='text' className='nanum-gothic' value='{physicalPolicy}' disabled/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <input type='hidden' id='physicalDrinkingFrequency' value="{environmentalPolicy}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>환경적 인수 조건</Label>
                                    </Col>
                                    <Col md={9} sm={12} lg={10}>
                                        <Input type='text' className='nanum-gothic' value="{environmentalPolicy}" disabled/>
                                    </Col>
                                </FormGroup>
                                <hr/>

                                <FormGroup row>
                                    <input type='hidden' id='environmentalDangerousArea' value="{financialPolicy}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>금전적 인수 조건</Label>
                                    </Col>
                                    <Col md={9} sm={12} lg={10}>
                                        <Input type='text' className='nanum-gothic' value="{financialPolicy}" disabled/>
                                    </Col>
                                </FormGroup>
                                <hr/>

                                    <h3>고객 factor</h3>
                                <FormGroup row>
                                    <input type='hidden' id='physicalSmokeFrequency' value="{physicalSmokeFrequency}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>흡연빈도</Label>
                                    </Col>
                                    <Col md={9} sm={12} lg={10}>
                                        <Input type='text' className='nanum-gothic' value="{physicalSmokeFrequency}" disabled/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <input type='hidden' id='physicalDrinkingFrequency' value="{physicalDrinkingFrequency}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>음주빈도</Label>
                                    </Col>
                                    <Col md={9} sm={12} lg={10}>
                                        <Input type='text' className='nanum-gothic' value="{physicalDrinkingFrequency}" disabled/>
                                    </Col>
                                </FormGroup>
                                <hr/>

                                <FormGroup row>
                                    <input type='hidden' id='environmentalDangerousArea' value="{environmentalDangerousArea}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>위험한 거주지</Label>
                                    </Col>
                                    <Col md={9} sm={12} lg={10}>
                                        <Input type='text' className='nanum-gothic' value="{environmentalDangerousArea}" disabled/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <input type='hidden' id='environmentalDangerousHobby' value="{environmentalDangerousHobby}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>위험한 취미 </Label>
                                    </Col>
                                    <Col md={9} sm={12} lg={10}>
                                        <Input type='text' className='nanum-gothic' value="{environmentalDangerousHobby}" disabled/>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <input type='hidden' id='environmentalJob' value="{environmentalJob}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>직업</Label>
                                    </Col>
                                    <Col md={9} sm={12} lg={10}>
                                        <Input type='text' className='nanum-gothic' value="{environmentalJob}" disabled/>
                                    </Col>
                                </FormGroup>

                                <hr/>
                                <FormGroup row>
                                    <input type='hidden' id='financialIncome' value="{financialIncome}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>수입</Label>
                                    </Col>
                                    <Col md={10} lg={3} className='mt-1'>
                                        <InputGroup>
                                            <Input type='number' className='nanum-gothic' value="{financialIncome}" disabled/>
                                            <InputGroupAddon addonType='append'>
                                                <InputGroupText>0,000</InputGroupText>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <input type='hidden' id='financialCreditRating' value="{financialCreditRating}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>신용등급</Label>
                                    </Col>
                                    <Col md={10} lg={3} className='mt-1'>
                                        <InputGroup>
                                            <Input type='number' className='nanum-gothic' value="{financialCreditRating}" disabled/>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <input type='hidden' id='financialProperty' value="{financialProperty}"/>
                                    <Col md={3} lg={2}>
                                        <Label className='nanum-gothic'>property</Label>
                                    </Col>
                                    <Col md={10} lg={3} className='mt-1'>
                                        <InputGroup>
                                            <Input type='number' className='nanum-gothic' value="{financialProperty}" disabled/>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>

                                <Button color="primary">인수 하기</Button>&nbsp; &nbsp; <Button color="primary">거절 하기</Button>


                            </Collapse>
                        </Fragment>
                    )
                })
            }
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