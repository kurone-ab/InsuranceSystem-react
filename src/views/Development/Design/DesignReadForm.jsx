import React from "react";
import {connect} from 'react-redux'
import {loadInsuranceDetail} from "../../../globalStore";
import {useGetAxios} from "../../global/useAxios";
import Loading from "../../global/Loading";

const BASE_URL = '/insurance/product/detail'

const DesignReadForm = ({id, detail, detailDispatcher}) => {
    const insuranceDetail = detail[id]
    useGetAxios({url: `${BASE_URL}?id=${id}`, necessary: !insuranceDetail, callback: detailDispatcher})
    if (!insuranceDetail) return <Loading/>
    const {guaranteeInfoList, salesTargetList, name} = insuranceDetail
    console.log(insuranceDetail)

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