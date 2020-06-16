import React, {useState} from "react";
import {Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, Label} from 'reactstrap'
import {connect} from 'react-redux'
import Loading from "../../global/Loading";

let selectedProduct
export const uploadAction = (e, modalClose) => {
    e.preventDefault()
    const title = document.getElementById('strategyFormTitle').value
    console.log(title, selectedProduct)
    modalClose()
}

const StrategyForm = ({companyList, productList}) => {
    const [open, setOpen] = useState({company: false, product: false})
    const [company, setCompany] = useState('HANHWA')
    const [product, setProduct] = useState(0)
    const selectedCompanyProductList = productList.filter((product)=>product.company === company)
    selectedCompanyProductList.push({id: 'addProduct', name: '보험 상품 추가하기'})
    selectedProduct = selectedCompanyProductList[product] ? selectedCompanyProductList[product].id : null

    return (companyList ?
            <>
                <FormGroup row>
                    <Col md='4'>
                        <Label htmlFor='title' className='nanum-gothic'>제목</Label>
                    </Col>
                    <Col xs="12" md="8">
                        <Input type='text' id='strategyFormTitle' required/>
                    </Col>
                </FormGroup>
                <hr className="my-3"/>
                <FormGroup row>
                    <Col md='4'>
                        <Label htmlFor='targetConsumer' className='nanum-gothic'>보험사</Label>
                    </Col>
                    <Col xs="12" md="8">
                        <Dropdown isOpen={open.company} toggle={() => setOpen({company: !open.company, product: false})}
                                  required>
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
                        <Dropdown isOpen={open.product}
                                  toggle={() => setOpen({company: false, product: !open.product})} required>
                            <DropdownToggle caret
                                            className='nanum-gothic'>{selectedCompanyProductList[product].name}</DropdownToggle>
                            <DropdownMenu>
                                {selectedCompanyProductList.map((product, idx) => {
                                    return (
                                        <DropdownItem key={idx}
                                                      className='border-0 nanum-gothic'
                                                      value={product.id}
                                                      onClick={() => {
                                                          setProduct(idx)
                                                          selectedProduct = product.id
                                                      }}
                                        >{product.name}</DropdownItem>
                                    )
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </FormGroup>
            </> : <Loading/>

    )
}

const mapStateToProps = (state) => {
    const {insurance: {infoList: {companyList, productList} = {}} = {}} = state
    return companyList ? {
        companyList,
        productList
    } : {}
}

export default connect(mapStateToProps)(StrategyForm)