import React, {lazy} from "react";
import {Card, Table} from 'reactstrap'
import {connect} from "react-redux"
import {loadInsuranceDetail} from "../../../globalStore";
import {useGetAxios} from "../../global/useAxios";
import Loading from "../../global/Loading";
import EvaluationReportReadForm from "./EvaluationReportReadForm";

const BASE_URL = 'insurance/product/detail'

const KEYS = (ob) => Object.keys(ob)

const InsuranceDetailReadForm = ({id, detail, productList, load, showEvaluation}) => {
    const insuranceDetail = detail[id]
    useGetAxios({url: `${BASE_URL}?id=${id}`, callback: load, necessary: !insuranceDetail})
    if (!insuranceDetail)
        return (<Loading/>)
    const {guaranteeInfoList, salesTargetList, evaluationReportList: evalList} = insuranceDetail
    const {type} = productList[id]

    return (type && evalList ?
            <>
                <div className='nanum-gothic font-weight-bold font-lg m-2'>보장 정보</div>
                <Card className='border-primary'>
                    <Table responsive borderless>
                        <thead>
                        <tr>
                            <th className='nanum-gothic font-weight-bold w-75'>보장 조건</th>
                            <th className='nanum-gothic font-weight-bold'>보장 한도</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            KEYS(guaranteeInfoList).map((guaranteeInfo, idx) => {
                                const {condition, limit} = guaranteeInfoList[guaranteeInfo]
                                return (
                                    <tr key={idx}>
                                        <td className='nanum-gothic'>{condition}</td>
                                        <td className='nanum-gothic'>{limit}원</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </Card>
                <div className='nanum-gothic font-weight-bold font-lg m-2'>판매 대상</div>
                <Card className='border-primary'>
                    <Table borderless responsive>
                        <tbody>
                        {
                            KEYS(salesTargetList).map((salesTarget, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td className='nanum-gothic'>{salesTargetList[salesTarget]}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </Card>
                {showEvaluation ? <EvaluationReportReadForm evalList={evalList}/>:null}
            </>
            : <Loading/>

    )
}

const mapStateToProps = (state) => {
    const {insurance: {detail, infoList: {productList} = {}} = {}} = state
    return detail ? {
        detail,
        productList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (detail) => dispatch(loadInsuranceDetail(detail)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceDetailReadForm)