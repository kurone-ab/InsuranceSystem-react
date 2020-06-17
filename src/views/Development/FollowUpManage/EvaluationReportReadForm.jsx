import React, {Fragment, useState} from "react";
import {ListGroup, ListGroupItem} from 'reactstrap'
import Loading from "../../global/Loading";
import {fileDownload} from "../../../utils";
import ReadContentModal from "../../global/ReadContentModal";

const openTarget = {}

const EvaluationReportReadForm = ({evalList}) => {
    const evalKeys = Object.keys(evalList)
    const [open, setOpen] = useState(false)
    if (!open) {
        evalKeys.forEach(item => openTarget[item] = false)
        setOpen({...openTarget})
    }

    return (evalList ?
            <ListGroup flush>
                {evalKeys.length === 0 ?
                    <div className='nanum-gothic m-1'>업로드 된 평가 보고서가 없습니다!</div> : null}
                {
                    evalKeys.map((evaluation, idx) => {
                        return (
                            <Fragment key={idx}>
                                <ListGroupItem className='nanum-gothic' tag="div" style={{cursor: 'pointer'}} action
                                               onClick={() => {
                                                   openTarget[evaluation] = true
                                                   setOpen({...openTarget})
                                               }}>
                                    <div className='my-auto nanum-gothic'>{evalList[evaluation]}</div>
                                </ListGroupItem>
                                {
                                    openTarget[evaluation] ?
                                        <ReadContentModal open={open[evaluation]} toggleFunc={() => {
                                            openTarget[evaluation] = false
                                            setOpen({...openTarget})
                                        }} title='파일을 다운로드 하시겠습니까?' addCancel confirmAction={() => fileDownload({
                                            url: 'insurance/evaluation',
                                            id: evaluation,
                                            filename: evalList[evaluation]
                                        })}
                                                          content={`${evalList[evaluation]} 파일을 다운로드 하시겠습니까?`}
                                                          size='md'/> : null
                                }
                            </Fragment>
                        )
                    })
                }
            </ListGroup> : <Loading/>
    )
}
export default EvaluationReportReadForm