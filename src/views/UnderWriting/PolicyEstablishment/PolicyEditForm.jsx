import React, {useEffect, useState} from "react";
import {
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    Label,
} from 'reactstrap'
import {connect} from 'react-redux'
import axios from "axios";
import Loading from "../../global/Loading";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

export const uploadAction = (e, closeModal) => {
    e.preventDefault()
    const insuranceId = document.getElementById('insuranceId').value
    const physicalFactor = document.getElementById('physicalFactor').value
    const financialFactor = document.getElementById('financialFactor').value
    const environmentalFactor = document.getElementById('environmentalFactor').value

    const data = new FormData()
    data.append('insuranceId',insuranceId)
    data.append('physicalFactor', physicalFactor)
    data.append('financialFactor', financialFactor)
    data.append('environmentalFactor', environmentalFactor)

    axios.post('uw/noPolicyInsurance/save', data).then(()=>closeModal())
}

export const PolicyEditForm = ({typeList}) => {
    const [open, setOpen] = useState(false)
    const [target, setTarget] = useState("");
    const [state, setState] = useState({
        loading: true, ItemList: []
    })

    useEffect(() => {
        const getAxios = async () => {
            await axios.get(`/uw/noPolicyInsurance/list`, [])
                .then(({data}) => {
                    setState({loading: false, ItemList: data})
                })
                .catch(e => {
                    console.error(e);
                    setState({loading: false, ItemList: null})
                })
        }
        getAxios();
    }, [])

    return (
        !state.loading ?
        <div className='flex-grow-1'>
            <FormGroup row>
                <input type='hidden' id='insuranceId' value={target}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>상품 번호</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Dropdown isOpen={open} toggle={() => setOpen(!open)} required={true}>
                        <DropdownToggle caret className='nanum-gothic'>{target}</DropdownToggle>
                        <DropdownMenu>
                            {Object.keys(state.ItemList).map((key, idx) =>
                                <DropdownItem key={idx}
                                              className='border-0 nanum-gothic'
                                              value={key}
                                              onClick={() => setTarget(key)}
                                >{key}</DropdownItem>)}
                        </DropdownMenu>
                    </Dropdown>
                </Col>

                <input type='hidden' id='insuranceInfo'value={state.ItemList[target]}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>상품 정보</Label>
                </Col>
                <Col md={9} sm={12} lg={6}>
                    <Input type='text' className='nanum-gothic' value={state.ItemList[target]} disabled/>
                </Col>
            </FormGroup>
            <hr/>


            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>신체적 인수 조건</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' id='physicalFactor' className='nanum-gothic'/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>환경적 인수 조건</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' id='environmentalFactor' className='nanum-gothic'/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>금전적 인수 조건</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' id='financialFactor' className='nanum-gothic'/>
                </Col>
            </FormGroup>
            <hr/>
        </div>
                :<Loading/>

    )
}

const mapStateToProps = (state) => {
    const {insurance: {infoList: {typeList} = {}} = {}} = state
    return typeList ? {
        typeList,
    } : {}
}

export default connect(mapStateToProps)(PolicyEditForm)