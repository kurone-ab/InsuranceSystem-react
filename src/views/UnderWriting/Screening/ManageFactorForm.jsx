import React, {useState} from "react";
import {connect} from 'react-redux'
import {loadFactorDetail} from "../../../globalStore";
import axios from "axios";
import {useGetAxios, useGetAxiosWithParams} from "../../global/useAxios";
import Loading from "../../global/Loading";
import {
    Col,
    Dropdown,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    UncontrolledTooltip
} from 'reactstrap'

const ManageFactorForm = ({id}) => {

    const [state, setState] = useState({
        loading:true,
        ItemList:{
            insuranceName:"",
            insuranceType:"",
            physicalSmokeFrequency:"",
            physicalDrinkingFrequency:"",
            environmentalJob:"",
            environmentalDangerousHobby:"",
            environmentalDangerousArea:"",
            financialIncome:"",
            financialProperty:"",
            financialCreditRating:""
        }
    });


    axios.get(`/uw/factor_manage/client?contractId=${id}`)
        .then(({data}) => {
            setState({loading: false, ItemList: data})
        })
        .catch(e => {
            console.error(e);
            setState({loading: false, ItemList: null})
        })


        const {
            insuranceName, insuranceType, physicalSmokeFrequency,
            physicalDrinkingFrequency, environmentalJob, environmentalDangerousHobby, environmentalDangerousArea,
            financialIncome, financialProperty, financialCreditRating
        } = state.ItemList

    return (
        !state.loading ?
            <div className='flex-grow-1'>
                <FormGroup row>
                    <input type='hidden' id='insuranceType' value={insuranceType}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>상품 종류</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Dropdown disabled>
                            <DropdownToggle caret className='nanum-gothic'>{insuranceType}</DropdownToggle>
                        </Dropdown>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <input type='hidden' id='insuranceName' value={insuranceName}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>상품 이름</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={insuranceName} disabled/>
                    </Col>
                </FormGroup>
                <hr/>
                <FormGroup row>
                    <input type='hidden' id='physicalSmokeFrequency' value={physicalSmokeFrequency}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>흡연빈도</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={physicalSmokeFrequency} disabled/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='physicalDrinkingFrequency' value={physicalDrinkingFrequency}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>음주빈도</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={physicalDrinkingFrequency} disabled/>
                    </Col>
                </FormGroup>
                <hr/>

                <FormGroup row>
                    <input type='hidden' id='environmentalDangerousArea' value={environmentalDangerousArea}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>위험한 거주지</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={environmentalDangerousArea} disabled/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='environmentalDangerousHobby' value={environmentalDangerousHobby}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>위험한 취미 </Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={environmentalDangerousHobby} disabled/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='environmentalJob' value={environmentalJob}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>직업</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={environmentalJob} disabled/>
                    </Col>
                </FormGroup>

                <hr/>
                <FormGroup row>
                    <input type='hidden' id='financialIncome' value={financialIncome}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>수입</Label>
                    </Col>
                    <Col md={10} lg={3} className='mt-1'>
                        <InputGroup>
                            <Input type='number' className='nanum-gothic' value={financialIncome} disabled/>
                            <InputGroupAddon addonType='append'>
                                <InputGroupText>0,000</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='financialCreditRating' value={financialCreditRating}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>신용등급</Label>
                    </Col>
                    <Col md={10} lg={3} className='mt-1'>
                        <InputGroup>
                            <Input type='number' className='nanum-gothic' value={financialCreditRating} disabled/>
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='financialProperty' value={financialProperty}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>property</Label>
                    </Col>
                    <Col md={10} lg={3} className='mt-1'>
                        <InputGroup>
                            <Input type='number' className='nanum-gothic' value={financialProperty} disabled/>
                        </InputGroup>
                    </Col>
                </FormGroup>
            </div>:<Loading/>
    )
}

// const mapStateToProps = (state) => {
//     const {detail: {detail} = {}} = state
//     return detail ? {
//         detail
//     } : {}
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         detailDispatcher: (content) => dispatch(loadFactorDetail(content))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ManageFactorForm)
export default ManageFactorForm