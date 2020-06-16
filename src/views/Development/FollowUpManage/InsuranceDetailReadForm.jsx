import React, {lazy} from "react";
import {connect} from "react-redux"
import {loadInsuranceDetail} from "../../../globalStore";
import {ListGroup, ListGroupItem, UncontrolledCollapse, Table} from 'reactstrap'
import {useGetAxios} from "../../global/useAxios";
import {fileDownload} from "../../../utils";
import Loading from "../../global/Loading";

const BASE_URL = 'insurance/product/detail'

const EvaluationReportReadForm = lazy(() => import('./EvaluationReportReadForm'))

const InsuranceDetailReadForm = ({id, detail, productList, load}) => {
    const insuranceDetail = detail[id]
    useGetAxios({url: `${BASE_URL}?id=${id}`, callback: load, necessary: !insuranceDetail})

    const {guaranteeInfoList, salesTargetList, evaluationReportList: evalList} = insuranceDetail
    const {type, name} = productList[id]

    return ((evalList || type) ? <div></div> : <div></div>

    )
}

const mapStateToProps = (state) => {
    const {insurance: {detail, info: {productList} = {}} = {}} = state
    return detail ? {
        detail,
        productList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (detail) => dispatch(loadInsuranceDetail(detail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceDetailReadForm)