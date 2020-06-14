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

const tempArray = [''];
const tempArray2 = [''];
const DesignForm = ({typeList}) => {
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('CAR')
    const [assuranceCount, setAssuranceCount] = useState(1)
    const [targetCount, setTargetCount] = useState(1)

    if (tempArray.length > assuranceCount) tempArray.splice(0, 1)
    else if (tempArray.length < assuranceCount) tempArray.push('')

    if (tempArray2.length > targetCount) tempArray2.splice(0, 1)
    else if (tempArray2.length < targetCount) tempArray2.push('')


    return (
        <>
            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>상품 종류</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Dropdown isOpen={open} toggle={() => setOpen(!open)}
                              required={true}>
                        <DropdownToggle caret className='nanum-gothic'>{typeList[type]}</DropdownToggle>
                        <DropdownMenu>
                            {Object.keys(typeList).map((type, idx) => {
                                return (
                                    <DropdownItem key={idx}
                                                  className='border-0 nanum-gothic'
                                                  value={type}
                                                  onClick={() => setType(String(type))}
                                    >{typeList[type]}</DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>상품명</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic'/>
                </Col>
            </FormGroup>
            {
                tempArray.map((item, idx) => {
                    return (
                        <FormGroup row key={idx}>
                            <Col md={3} lg={2}>
                                <Label className='nanum-gothic'>{`보장 ${idx + 1}`}</Label>
                            </Col>
                            <Col md={12} lg={5}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <Input addon type="checkbox" id={`special${idx}`}/>
                                            <UncontrolledTooltip target={`#special${idx}`} className='nanum-gothic'>
                                                특약인 경우 선택하세요
                                            </UncontrolledTooltip>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type='text' className='nanum-gothic assuranceDescription'/>
                                </InputGroup>
                            </Col>
                            <Col md={10} lg={3} className='mt-1'>
                                <InputGroup>
                                    <Input type='number' className='nanum-gothic assuranceAmount'/>
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
                        </FormGroup>
                    )
                })
            }
            {
                tempArray2.map((item, idx) => {
                    return (
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
                })
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