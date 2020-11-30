import React, {useEffect, useState} from "react";
import {
    Button,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    UncontrolledTooltip
} from 'reactstrap'
import {connect} from 'react-redux'
import axios from "axios";
import Loading from "../../global/Loading";



axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

let guaranteeCondition = [''];
let targetClient = [''];



const ManageFactorEditForm = ({typeList}) => {



    // useEffect(()=>{
    //     const getAxios = async ()=> {
    //         console.log("부름")
    //         await axios.get(`/uw/factor_manage/client/list`,[])
    //             .then(({data}) => {
    //                 setState({loading: false, ItemList: data})
    //             })
    //             .catch(e => {
    //                 console.error(e);
    //                 setState({loading: false, ItemList: null})
    //             })
    //     }
    //     getAxios();
    // },[])


    // axios.get(`/uw/factor_manage/client?contractId=5`)
    //     .then(({data}) => {
    //         setState({loading: false, ItemList: data})
    //     })
    //     .catch(e => {
    //         console.error(e);
    //         setState({loading: false, ItemList: null})
    //     })
    //
    // const {
    //     insuranceName, insuranceType, physicalSmokeFrequency,
    //     physicalDrinkingFrequency, environmentalJob, environmentalDangerousHobby, environmentalDangerousArea,
    //     financialIncome, financialProperty, financialCreditRating
    // } = state.ItemList

    // if (guaranteeCondition.length > assuranceCount) guaranteeCondition.splice(0, 1)
    // else if (guaranteeCondition.length < assuranceCount) guaranteeCondition.push('')
    //
    // if (targetClient.length > targetCount) targetClient.splice(0, 1)
    // else if (targetClient.length < targetCount) targetClient.push('')

    return (
        // !state.loading ?
            <div className='flex-grow-1'>
                <FormGroup row>
                    <input type='hidden' id='insuranceType' />
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>상품 종류</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Dropdown disabled>
                            <DropdownToggle caret className='nanum-gothic'></DropdownToggle>
                        </Dropdown>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <input type='hidden' id='insuranceName' />
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>상품 이름</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' />
                    </Col>
                </FormGroup>
                <hr/>
                <FormGroup row>
                    <input type='hidden' id='physicalSmokeFrequency' />
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>흡연빈도</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Dropdown >
                            <DropdownToggle caret className='nanum-gothic'></DropdownToggle>
                        </Dropdown>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='physicalDrinkingFrequency' />
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>음주빈도</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Dropdown >
                            <DropdownToggle caret className='nanum-gothic'></DropdownToggle>
                        </Dropdown>
                    </Col>
                </FormGroup>
                <hr/>

                <FormGroup row>
                    <input type='hidden' id='environmentalDangerousArea' />
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>위험한 거주지</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='environmentalDangerousHobby' />
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>위험한 취미 </Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic'  />
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='environmentalJob' />
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>직업</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Dropdown >
                            <DropdownToggle caret className='nanum-gothic'></DropdownToggle>
                        </Dropdown>
                    </Col>
                </FormGroup>

                <hr/>
                <FormGroup row>
                    <input type='hidden' id='financialIncome' />
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>수입</Label>
                    </Col>
                    <Col md={10} lg={3} className='mt-1'>
                        <InputGroup>
                            <Input type='number' className='nanum-gothic' />
                            <InputGroupAddon addonType='append'>
                                <InputGroupText>0,000</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='financialCreditRating' />
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>신용등급</Label>
                    </Col>
                    <Col md={10} lg={3} className='mt-1'>
                        <InputGroup>
                            <Input type='number' className='nanum-gothic'  />
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='financialProperty' />
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>property</Label>
                    </Col>
                    <Col md={10} lg={3} className='mt-1'>
                        <InputGroup>
                            <Input type='number' className='nanum-gothic' />
                        </InputGroup>
                    </Col>
                </FormGroup>
                <hr/>
            </div>
        // :<Loading/>
    )
}

const mapStateToProps = (state) => {
    const {insurance: {infoList:{typeList} = {}} = {}} = state
    return typeList ? {
        typeList,
    } : {}
}

export default connect(mapStateToProps)(ManageFactorEditForm)