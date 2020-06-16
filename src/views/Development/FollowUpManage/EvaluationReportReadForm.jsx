import React from "react";
import {ListGroup, ListGroupItem} from 'reactstrap'
import {connect} from 'react-redux'
import {loadInsuranceDetail} from "../../../globalStore";
import {useGetAxios} from "../../global/useAxios";
import Loading from "../../global/Loading";
import axios from "axios";
import {fileDownload} from "../../../utils";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const BASE_URL = 'insurance/product/detail'

const EvaluationReportReadForm = ({id, detail, load}) => {
    const insuranceDetail = detail[id]
    useGetAxios({url: `${BASE_URL}?id=${id}`, callback: load, necessary: !insuranceDetail})
    const {evaluationReportList: evalList} = insuranceDetail ? insuranceDetail : {}
    return (evalList ?
            <ListGroup flush>
                {
                    Object.keys(evalList).map((evaluation, idx) => {
                        return (
                            <ListGroupItem tag="a" href="#" action key={idx} onClick={(e) => {
                                e.preventDefault()
                                fileDownload({
                                    url: 'insurance/evaluation',
                                    id: evaluation,
                                    filename: evalList[evaluation]
                                })
                            }}>
                                <div className='my-auto nanum-gothic'>{evalList[evaluation]}</div>
                            </ListGroupItem>
                        )
                    })
                }
            </ListGroup> : <Loading/>
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
        load: (detail) => dispatch(loadInsuranceDetail(detail))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationReportReadForm)