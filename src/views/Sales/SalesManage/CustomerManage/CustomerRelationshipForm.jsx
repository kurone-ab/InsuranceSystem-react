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

}

const CustomerRelationshipForm = () => {
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('CAR')
    const [assuranceCount, setAssuranceCount] = useState(1)
    const [targetCount, setTargetCount] = useState(1)

    if (guaranteeCondition.length > assuranceCount) guaranteeCondition.splice(0, 1)
    else if (guaranteeCondition.length < assuranceCount) guaranteeCondition.push('')

    if (targetClient.length > targetCount) targetClient.splice(0, 1)
    else if (targetClient.length < targetCount) targetClient.push('')

    return (
        <div className='flex-grow-1'>


            <FormGroup row>
                <input type='hidden' id='name' value={"clientName"}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>고객이름</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' value={"clientName"} disabled/>
                </Col>
            </FormGroup>

            {/*<FormGroup row>*/}
            {/*    <input type='hidden' id='insuranceName' value={"content"}/>*/}
            {/*    <Col md={3} lg={2}>*/}
            {/*        <Label className='nanum-gothic'>연락처</Label>*/}
            {/*    </Col>*/}
            {/*    <Col md={9} sm={12} lg={10}>*/}
            {/*        <Input type='text' className='nanum-gothic' />*/}
            {/*    </Col>*/}
            {/*</FormGroup>*/}

            <FormGroup row>
                <input type='hidden' id='content' value={"content"}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>상담내용</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' />
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

export default CustomerRelationshipForm