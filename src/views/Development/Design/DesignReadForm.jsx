import React from "react";
import {connect} from 'react-redux'
import {loadInsuranceDetail} from "../../../globalStore";
import {useGetAxios} from "../../global/useAxios";
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

const BASE_URL = '/insurance/product/detail'

const DesignReadForm = ({id, detail, detailDispatcher}) => {
    const insuranceDetail = detail[id]
    useGetAxios({url: `${BASE_URL}?id=${id}`, necessary: !insuranceDetail, callback: detailDispatcher})
    if (!insuranceDetail) return <Loading/>
    const {type, name, guaranteeInfoList, salesTargetList} = insuranceDetail

    return(
        <div className='flex-grow-1'>
            <FormGroup row>
                <input type='hidden' id='productType' value={type}/>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>상품 종류</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Dropdown disabled>
                        <DropdownToggle caret className='nanum-gothic'>{type}</DropdownToggle>
                    </Dropdown>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col md={3} lg={2}>
                    <Label className='nanum-gothic'>상품명</Label>
                </Col>
                <Col md={9} sm={12} lg={10}>
                    <Input type='text' className='nanum-gothic' value={name} disabled/>
                </Col>
            </FormGroup>
            {
                Object.values(guaranteeInfoList).map((item, idx) =>
                    <FormGroup row key={idx}>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic mt-1'>{`보장 ${idx + 1}`}</Label>
                        </Col>
                        <Col md={12} lg={7}>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText className='mt-1'>
                                        <Input addon type="checkbox" id={`specialShow${idx}`} checked={item.special} disabled/>
                                        <UncontrolledTooltip target={`#specialShow${idx}`} className='nanum-gothic'>
                                            특약인 경우 선택하세요
                                        </UncontrolledTooltip>
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input type='text' className='nanum-gothic mt-1' value={item.condition} disabled/>
                            </InputGroup>
                        </Col>
                        <Col md={10} lg={3} className='mt-1'>
                            <InputGroup>
                                <Input type='number' className='nanum-gothic' value={item.limit/1000} disabled/>
                                <InputGroupAddon addonType='append'>
                                    <InputGroupText>0,000</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Col>
                    </FormGroup>)
            }
            {
                Object.values(salesTargetList).map((item, idx) =>
                    <FormGroup row key={idx}>
                        <Col md={3} lg={2}>
                            <Label className='nanum-gothic'>{`판매 대상 ${idx + 1}`}</Label>
                        </Col>
                        <Col md={7} lg={10}>
                            <Input type='text' className='nanum-gothic' value={item} disabled/>
                        </Col>
                    </FormGroup>
                )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const {insurance: {detail} = {}} = state
    return detail ? {
        detail
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        detailDispatcher: (content) => dispatch(loadInsuranceDetail(content))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesignReadForm)