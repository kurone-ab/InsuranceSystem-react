import React, {Fragment, lazy, useEffect, useState} from "react";
import {Card, Collapse, ListGroup, ListGroupItem, Table} from 'reactstrap'
import {loadInsuranceInfoList} from "../../../../globalStore";
import {connect} from 'react-redux'
import InsuranceDetailReadForm from "../../../Development/FollowUpManage/InsuranceDetailReadForm";
import axios from "axios";
import {useGetAxios} from "../../../global/useAxios";
import EvaluationReportReadForm from "../../../Development/FollowUpManage/EvaluationReportReadForm";
const Loading = lazy(() => import('../../../global/Loading'))

const openTarget = {}
const productList={}
const ProductManage = ({}) => {
    const [state,setState]= useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    //
    useEffect(() => {
        const getAxios = async () => {
            await axios.get('/insurance/product/onSale')
                .then(({data}) => {
                    setState(data)
                    setLoading(false)
                    console.log(data)
                })
                .catch(e => {
                    console.error(e);
                })
        }
        getAxios();
    }, [])


    return (!loading?

        <div className='animated fadeIn'>
            <ListGroup flush>
                {
                    Object.keys(state).map((key,idx) => {
                        const {name,guaranteeInfoList,salesTargetList,evaluationReportList} = state[key]
                        openTarget[idx]=false
                        return (
                            <Fragment key={idx}>
                                <ListGroupItem tag="a" href='#' action
                                               className='border-0' onClick={(e) => {
                                    e.preventDefault()
                                    openTarget[idx] = !openTarget[idx]
                                    setOpen({...openTarget})
                                }}>
                                    <div className='my-auto nanum-gothic font-xl'>{name}</div>
                                </ListGroupItem>
                                <Collapse isOpen={open[idx]}>

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
                                                Object.keys(guaranteeInfoList).map((guaranteeInfo, idx) => {
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
                                                Object.keys(salesTargetList).map((salesTarget, idx) => {
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
                                    {/*{showEvaluation ? <EvaluationReportReadForm evalList={evaluationReportList}/>:null*/}











                                </Collapse>
                            </Fragment>
                        )
                    })
                }
            </ListGroup>
        </div>:<Loading/>
)


}

const mapStateToProps = (state) => {
    const {insurance: {infoList: {productList} = {}} = {}} = state
    return productList ? {
        productList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (insurance) => {
            dispatch(loadInsuranceInfoList(insurance))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage)