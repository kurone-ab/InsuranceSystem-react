import React from "react";
import {ListGroup, ListGroupItem} from 'reactstrap'
import Loading from "../../global/Loading";
import {fileDownload} from "../../../utils";

const BASE_URL = 'insurance/product/detail'

const EvaluationReportReadForm = ({evalList}) => {

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
export default EvaluationReportReadForm