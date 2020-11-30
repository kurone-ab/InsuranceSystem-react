import React, {useState} from "react";
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

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

let guaranteeCondition = [''];
let targetClient = [''];

export const uploadAction = (eid, e, closeModal) => {
    // e.preventDefault()
    // const type = document.getElementById('productType').value
    // const designProductName = document.getElementById('designProductName').value
    // const guaranteeConditionList = document.getElementsByClassName('guaranteeCondition')
    // const guaranteeLimitList = document.getElementsByClassName('guaranteeLimit')
    // const targetClientList = document.getElementsByClassName('guaranteeLimit')
    // const data = new FormData()
    // data.append('type', type)
    // data.append('eid', eid)
    // data.append('name', designProductName)
    // console.log(eid)
    // for (let i = 0; i < targetClientList.length; i++) {
    //     const targetClientListElement = targetClientList[i]
    //     data.append('targetClient', targetClientListElement.value)
    // }
    //
    // for (let i = 0; i < guaranteeConditionList.length; i++) {
    //     const condition = guaranteeConditionList[i]
    //     const checked = document.getElementById(`special${i}`).checked
    //     data.append('condition', condition.value)
    //     data.append('special', checked)
    //     const limit = guaranteeLimitList[i]
    //     data.append('limit', `${limit.value}0000`)
    // }
    // axios.post('insurance/product/design', data).then(()=>closeModal())
}

export const CustomerGetEditForm = ({typeList}) => {
    // const [open, setOpen] = useState(false)
    // const [type, setType] = useState('CAR')
    // const [assuranceCount, setAssuranceCount] = useState(1)
    // const [targetCount, setTargetCount] = useState(1)
    //
    // if (guaranteeCondition.length > assuranceCount) guaranteeCondition.splice(0, 1)
    // else if (guaranteeCondition.length < assuranceCount) guaranteeCondition.push('')
    //
    // if (targetClient.length > targetCount) targetClient.splice(0, 1)
    // else if (targetClient.length < targetCount) targetClient.push('')

    return (
        <div className='flex-grow-1'>


            <FormGroup row>
                <input type='hidden' id='name' value={"name"}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>고객이름</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' />
                </Col>
            </FormGroup>

            <FormGroup row>
                <input type='hidden' id='insuranceName' value={"contact"}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>연락처</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' />
                </Col>
            </FormGroup>

            <FormGroup row>
                <input type='hidden' id='age' value={"age"}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>연령</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic'/>
                </Col>
            </FormGroup>

            <FormGroup row>
                <input type='hidden' id='insuranceName' value={"sex"}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>성별</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' />
                </Col>
            </FormGroup>

            <FormGroup row>
                <input type='hidden' id='insuranceName' value={"email"}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>email</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic'/>
                </Col>
            </FormGroup>

        </div>
    )
}

const mapStateToProps = (state) => {
    const {insurance: {infoList:{typeList} = {}} = {}} = state
    return typeList ? {
        typeList,
    } : {}
}

export default connect(mapStateToProps)(CustomerGetEditForm)