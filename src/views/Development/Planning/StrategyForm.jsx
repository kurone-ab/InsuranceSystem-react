import React, { useState} from "react";
import {Form, FormGroup, Col, Label, Input, DropdownMenu, DropdownItem, Dropdown, DropdownToggle} from 'reactstrap'
import {connect} from 'react-redux'

const StrategyForm = ({companyList, productNameList}) => {
    const [open, setOpen] = useState({company: false, product: false})
    const [company, setCompany] = useState('own')
    const [product, setProduct] = useState('')

    return (
        <Form>
            <FormGroup row>
                <Col md='4'>
                    <Label htmlFor='title' className='nanum-gothic'>제목</Label>
                </Col>
                <Col xs="12" md="8">
                    <Input type='text' id='title' required={true}/>
                </Col>
            </FormGroup>
            <hr className="my-3"/>
            <FormGroup row>
                <Col md='4'>
                    <Label htmlFor='targetConsumer' className='nanum-gothic'>보험사</Label>
                </Col>
                <Col xs="12" md="8">
                    <Dropdown isOpen={open.company} toggle={() => setOpen({company: !open.company, product: false})}
                              required={true}>
                        <DropdownToggle caret className='nanum-gothic'>{companyList[company]}</DropdownToggle>
                        <DropdownMenu>
                            {Object.keys(companyList).map((company, idx) => {
                                return (
                                    <DropdownItem key={idx}
                                                  className='border-0 nanum-gothic'
                                                  value={company}
                                                  onClick={() => setCompany(String(company))}
                                    >{companyList[company]}</DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md='4'>
                    <Label htmlFor='needs' className='nanum-gothic'>주 타깃 고객들이 많이 찾는 보험</Label>
                </Col>
                <Col xs="12" md="8">
                    <Dropdown isOpen={open.product} toggle={() => setOpen({company: false, product: !open.product})}>
                        <DropdownToggle caret className='nanum-gothic'>{productNameList[product]}</DropdownToggle>
                        <DropdownMenu>
                            {Object.keys(productNameList).map((product, idx) => {
                                return (
                                    <DropdownItem key={idx}
                                                  className='border-0 nanum-gothic'
                                                  value={product}
                                                  onClick={() => setProduct(String(product))}
                                    >{productNameList[product]}</DropdownItem>
                                )
                            })}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </FormGroup>
        </Form>
    )
}

const mapStateToProps = (state) => {
    const {insuranceInfoList: {companyList, productNameList} = {}} = state
    return companyList ? {
        companyList,
        productNameList
    } : {}
}

export default connect(mapStateToProps)(StrategyForm)