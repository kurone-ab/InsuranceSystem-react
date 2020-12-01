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
    e.preventDefault()
    const type = document.getElementById('productType').value
    const designProductName = document.getElementById('designProductName').value
    const guaranteeConditionList = document.getElementsByClassName('guaranteeCondition')
    const guaranteeLimitList = document.getElementsByClassName('guaranteeLimit')
    const targetClientList = document.getElementsByClassName('guaranteeLimit')
    const data = new FormData()
    data.append('type', type)
    data.append('eid', eid)
    data.append('name', designProductName)
    console.log(eid)
    for (let i = 0; i < targetClientList.length; i++) {
        const targetClientListElement = targetClientList[i]
        data.append('targetClient', targetClientListElement.value)
    }

    for (let i = 0; i < guaranteeConditionList.length; i++) {
        const condition = guaranteeConditionList[i]
        const checked = document.getElementById(`special${i}`).checked
        data.append('condition', condition.value)
        data.append('special', checked)
        const limit = guaranteeLimitList[i]
        data.append('limit', `${limit.value}0000`)
    }
    axios.post('insurance/product/design', data).then(()=>closeModal())
}

const DesignForm = ({typeList}) => {
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('CAR')
    const [assuranceCount, setAssuranceCount] = useState(1)
    const [targetCount, setTargetCount] = useState(1)

    if (guaranteeCondition.length > assuranceCount) guaranteeCondition.splice(0, 1)
    else if (guaranteeCondition.length < assuranceCount) guaranteeCondition.push('')

    if (targetClient.length > targetCount) targetClient.splice(0, 1)
    else if (targetClient.length < targetCount) targetClient.push('')



    return (
        <>


            <FormGroup row>
                <input type='hidden' id='productType' value={type}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>상품 종류</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Dropdown isOpen={open} toggle={() => setOpen(!open)}
                              required={true}>
                        <DropdownToggle caret className='nanum-gothic'>{typeList[type]}</DropdownToggle>
                        <DropdownMenu>
                            {Object.keys(typeList).map((type, idx) =>
                                    <DropdownItem key={idx}
                                                  className='border-0 nanum-gothic'
                                                  value={type}
                                                  onClick={() => setType(String(type))}
                                    >{typeList[type]}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>상품명</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' id='designProductName'/>
                </Col>
            </FormGroup>
            {
                guaranteeCondition.map((item, idx) =>
                        <FormGroup row key={idx}>
                            <Col md={3} lg={2}>
                                <Label className='nanum-gothic mt-1'>{`보장 ${idx + 1}`}</Label>
                            </Col>
                            <Col md={12} lg={5}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className='mt-1'>
                                            <Input addon type="checkbox" id={`special${idx}`}/>
                                            <UncontrolledTooltip target={`#special${idx}`} className='nanum-gothic'>
                                                특약인 경우 선택하세요
                                            </UncontrolledTooltip>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' className='nanum-gothic guaranteeCondition mt-1'/>
                                </InputGroup>
                            </Col>
                            <Col md={10} lg={3} className='mt-1'>
                                <InputGroup>
                                    <Input type='number' className='nanum-gothic guaranteeLimit'/>
                                    <InputGroupAddon addonType='append'>
                                        <InputGroupText>0,000</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Col>
                            <Col md={1} lg={1} className='mt-1'>
                                <Button onClick={() => setAssuranceCount(assuranceCount + 1)}>+</Button>
                            </Col>
                            {assuranceCount > 1 ?
                                <Col md={1} lg={1} className='mt-1'>
                                    <Button onClick={() => setAssuranceCount(assuranceCount - 1)}>-</Button>
                                </Col> : null}
                        </FormGroup>)
            }
            {
                targetClient.map((item, idx) =>
                        <FormGroup row key={idx}>
                            <Col md={3} lg={2}>
                                <Label className='nanum-gothic'>{`판매 대상 ${idx + 1}`}</Label>
                            </Col>
                            <Col md={7} lg={8}>
                                <Input type='text' className='nanum-gothic salesTarget'/>
                            </Col>
                            <Col lg={1} className='mt-1'>
                                <Button onClick={() => setTargetCount(targetCount + 1)}>+</Button>
                            </Col>
                            {targetCount > 1 ?
                                <Col lg={1} className='mt-1'>
                                    <Button onClick={() => setTargetCount(targetCount - 1)}>-</Button>
                                </Col> : null}
                        </FormGroup>
                )
            }
        </>
    )
}

const mapStateToProps = (state) => {
    const {insurance: {infoList:{typeList} = {}} = {}} = state
    return typeList ? {
        typeList,
    } : {}
}

export default connect(mapStateToProps)(DesignForm)