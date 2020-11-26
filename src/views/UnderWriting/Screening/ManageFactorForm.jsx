import React from "react";
import {connect} from 'react-redux'
import {loadFactorDetail} from "../../../globalStore";
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

const ManageFactorForm = ({detailList, detailDispatcher}) => {
    useGetAxios({url: '/uw/factor_manage/client', necessary: !detailList, callback: detailDispatcher})

        const {insuranceName, insuranceType, physicalSmokeFrequency,
            physicalDrinkingFrequency,environmentalJob,environmentalDangerousHobby,environmentalDangerousArea,
            financialIncome,financialProperty,financialCreditRating} = detailList


    return (
        <div className='flex-grow-1'>
            <label>이름</label><label>{insuranceName}</label>
        </div>
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