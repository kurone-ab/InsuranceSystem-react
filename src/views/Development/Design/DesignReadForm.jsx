import React from "react";
import {connect} from 'react-redux'
import {loadInsuranceDetail} from "../../../globalStore";
import {useGetAxios} from "../../global/useAxios";

const BASE_URL = '/insurance/product'

const DesignReadForm = ({id, detail, detailDispatcher}) => {
    const insuranceDetail = detail[id]
    useGetAxios({url: `${BASE_URL}?id=${id}`, necessary: !insuranceDetail, callback: detailDispatcher})
    // const {guaranteeInfoList, salesTargetList, type, name} = insuranceDetail

    return(
        <>

        </>
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