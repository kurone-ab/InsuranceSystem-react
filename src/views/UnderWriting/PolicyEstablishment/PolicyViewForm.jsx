import React, {useState, useEffect} from "react";
import axios from "axios";
import Loading from "../../global/Loading";
import {
    Col,
    Dropdown,
    DropdownToggle,
    FormGroup,
    Input,
    Label,
} from 'reactstrap'
import {loadUWPolicyData} from "../../../globalStore";
import {connect} from "react-redux";

export const PolicyViewForm = ({id}) => {

    const [state, setState] = useState({
        target: 0,
        ids: [],
        loading: true,
        ItemList: []
    });


    useEffect(()=>{
        const getAxios = async ()=> {
            await axios.get(`/uw/uw_policy?pid=${id}`,[])
                .then(({data}) => {
                    setState({target:state.target, ids:state.ids, loading: false, ItemList: data})
                })
                .catch(e => {
                    console.error(e);
                    setState({target:state.target, ids:state.ids,loading: false, ItemList: null})
                })
        }
        getAxios();
    },state.target)


    const handleSelectChange = (event) => {
        event.preventDefault();
        setState({target: event.target.value, ids: state.ids, loading: false, ItemList: state.ItemList})
    }

    if(!state.ItemList)return <Loading/>
    const {uwPolicyId, name, date, physicalPolicy, environmentalPolicy, financialPolicy} = state.ItemList
    return (

        <div className='flex-grow-1'>


                    <FormGroup row>
                        <input type='hidden' id='insuranceType' value={uwPolicyId}/>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>상품 번호</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Dropdown disabled>
                                <DropdownToggle caret className='nanum-gothic'>{uwPolicyId}</DropdownToggle>
                            </Dropdown>
                        </Col>


                        <input type='hidden' id='insuranceName' value={name}/>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>상품 이름</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Input type='text' className='nanum-gothic' value={name} disabled/>
                        </Col>
                    </FormGroup>
                    <hr/>


                    <FormGroup row>
                        <input type='hidden' id='physicalSmokeFrequency' value={physicalPolicy}/>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>신체적 인수 조건</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Input type='text' className='nanum-gothic' value={physicalPolicy} disabled/>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <input type='hidden' id='physicalDrinkingFrequency' value={environmentalPolicy}/>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>환경적 인수 조건</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Input type='text' className='nanum-gothic' value={environmentalPolicy} disabled/>
                        </Col>
                    </FormGroup>
                    <hr/>

                    <FormGroup row>
                        <input type='hidden' id='environmentalDangerousArea' value={financialPolicy}/>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>금전적 인수 조건</Label>
                        </Col>
                        <Col md={9} sm={12} lg={10}>
                            <Input type='text' className='nanum-gothic' value={financialPolicy} disabled/>
                        </Col>
                    </FormGroup>
                    <hr/>
        </div>
    )
}
const mapStateToProps = (state) => {
    const {uwPolicy: {uwPolicyList} = {}} = state
    return uwPolicyList ? {uwPolicyList} : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (detail) => dispatch(loadUWPolicyData(detail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolicyViewForm)
