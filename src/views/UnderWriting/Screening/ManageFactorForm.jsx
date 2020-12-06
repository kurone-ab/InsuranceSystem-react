import React, {useState, useEffect} from "react";
import {connect} from 'react-redux'
import {loadFactorDetail} from "../../../globalStore";
import axios from "axios";
import {useGetAxios, useGetAxiosWithParams} from "../../global/useAxios";
import Loading from "../../global/Loading";
import {
    Button,
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
        ItemList:[]
    });

    useEffect(()=>{
        const getAxios = async ()=> {
            console.log("부름")
            await axios.get(`/uw/factor_manage/client?contractId=${id}`,[])
                .then(({data}) => {
                    setState({loading: false, ItemList: data})
                })
                .catch(e => {
                    console.error(e);
                    setState({loading: false, ItemList: null})
                })
        }
        getAxios();
    },[])

    // const {
    //     insuranceName, insuranceType, physicalSmokeFrequency,
    //     physicalDrinkingFrequency, environmentalJob, environmentalDangerousHobby, environmentalDangerousArea,
    //     financialIncome, financialProperty, financialCreditRating
    // } = state.ItemList

    return (
        !state.loading ?
            state.ItemList ?
            <div className='flex-grow-1'>
                <FormGroup row>
                    <input type='hidden' id='insuranceType' value={state.ItemList.insuranceType}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>상품 종류</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Dropdown disabled>
                            <DropdownToggle caret className='nanum-gothic'>{state.ItemList.insuranceType}</DropdownToggle>
                        </Dropdown>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <input type='hidden' id='insuranceName' value={state.ItemList.insuranceName}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>상품 이름</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={state.ItemList.insuranceName} disabled/>
                    </Col>
                </FormGroup>
                <hr/>
                <FormGroup row>
                    <input type='hidden' id='physicalSmokeFrequency' value={state.ItemList.physicalSmokeFrequency}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>흡연빈도</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={state.ItemList.physicalSmokeFrequency} disabled/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='physicalDrinkingFrequency' value={state.ItemList.physicalDrinkingFrequency}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>음주빈도</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={state.ItemList.physicalDrinkingFrequency} disabled/>
                    </Col>
                </FormGroup>
                <hr/>

                <FormGroup row>
                    <input type='hidden' id='environmentalDangerousArea' value={state.ItemList.environmentalDangerousArea}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>위험한 거주지</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={state.ItemList.environmentalDangerousArea} disabled/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='environmentalDangerousHobby' value={state.ItemList.environmentalDangerousHobby}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>위험한 취미 </Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={state.ItemList.environmentalDangerousHobby} disabled/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='environmentalJob' value={state.ItemList.environmentalJob}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>직업</Label>
                    </Col>
                    <Col md={9} sm={12} lg={10}>
                        <Input type='text' className='nanum-gothic' value={state.ItemList.environmentalJob} disabled/>
                    </Col>
                </FormGroup>

                <hr/>
                <FormGroup row>
                    <input type='hidden' id='financialIncome' value={state.ItemList.financialIncome}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>수입</Label>
                    </Col>
                    <Col md={10} lg={3} className='mt-1'>
                        <InputGroup>
                            <Input type='number' className='nanum-gothic' value={state.ItemList.financialIncome} disabled/>
                            <InputGroupAddon addonType='append'>
                                <InputGroupText>0,000</InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='financialCreditRating' value={state.ItemList.financialCreditRating}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>신용등급</Label>
                    </Col>
                    <Col md={10} lg={3} className='mt-1'>
                        <InputGroup>
                            <Input type='number' className='nanum-gothic' value={state.ItemList.financialCreditRating} disabled/>
                        </InputGroup>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <input type='hidden' id='financialProperty' value={state.ItemList.financialProperty}/>
                    <Col md={3} lg={2}>
                        <Label className='nanum-gothic'>재산</Label>
                    </Col>
                    <Col md={10} lg={3} className='mt-1'>
                        <InputGroup>
                            <Input type='number' className='nanum-gothic' value={state.ItemList.financialProperty} disabled/>
                        </InputGroup>
                    </Col>
                </FormGroup>
                <hr/>
            </div>
                :<div> 아직 고객의 Factor가 저장되어 있지 않습니다.</div>

                :<Loading/>
    )
}

const mapStateToProps = (state) => {
    const {detail: {detail} = {}} = state
    return detail ? {
        detail
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        detailDispatcher: (content) => dispatch(loadFactorDetail(content))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageFactorForm)
// export default ManageFactorForm