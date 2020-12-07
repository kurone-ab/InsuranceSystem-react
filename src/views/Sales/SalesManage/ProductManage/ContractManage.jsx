import React, {Fragment, useState} from "react";
import {connect, useStore} from 'react-redux'
import {loadContractList} from "../../../../globalStore";
import {useGetAxios} from "../../../global/useAxios";
import {Card, Col, Collapse, FormGroup, Input, Label, ListGroup, ListGroupItem, Table} from 'reactstrap'
import Loading from "../../../global/Loading";

const BASE_URL = 'contract/list/responsibility'

const openTarget = []

const ContractManage = ({list, loadList}) => {
    const {user: {id}} = useStore().getState()
    const contractList = list ? list[id] : null
    useGetAxios({url: `${BASE_URL}?eid=${id}`, necessary: !contractList, callback: loadList})
    const [open, setOpen] = useState(false)
    if (!contractList) return <Loading/>
    if (!open) {
        contractList.forEach((cont) => {
            openTarget[cont] = false
        })
        setOpen({...openTarget})
    }
    return (
        <ListGroup flush>
            {
                contractList.map((contract, idx) => {
                    const{id,clientName, clientId, insuranceName, insurancePayment}=contract
                    return (
                        <Fragment key={idx}>
                            <ListGroupItem tag="a" href='#' action className='border-0' onClick={() => {
                                openTarget[id] = !openTarget[id]
                                setOpen({...openTarget})
                            }}>
                                {`계약 ID : ${id}`}
                            </ListGroupItem>
                            <Collapse isOpen={open[id]}>

                                <div className='nanum-gothic font-weight-bold font-lg m-2'>고객 정보</div>
                                <Card className='border-primary'>
                                    <Table responsive borderless>
                                        <thead>
                                        <tr>
                                            <th className='nanum-gothic font-weight-bold'>고객 id</th>
                                            <th className='nanum-gothic font-weight-bold'>고객 이름</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                                    <tr key={idx}>
                                                        <td className='nanum-gothic'>{clientId}</td>
                                                        <td className='nanum-gothic'>{clientName}</td>
                                                    </tr>
                                        }
                                        </tbody>
                                    </Table>
                                    
                                </Card>
                                <div className='nanum-gothic font-weight-bold font-lg m-2'>상품 정보</div>
                                <Card className='border-primary'>
                                    <Table responsive borderless>
                                        <thead>
                                        <tr>
                                            <th className='nanum-gothic font-weight-bold'>상품 id</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            <tr key={idx}>
                                                <td className='nanum-gothic'>{insuranceName}</td>
                                            </tr>
                                        }
                                        </tbody>
                                    </Table>
                                </Card>

                                <div className='nanum-gothic font-weight-bold font-lg m-2'>보상 정보</div>
                                <Card className='border-primary'>
                                    <Table responsive borderless>
                                        <thead>
                                        <tr>
                                            <th className='nanum-gothic font-weight-bold'>보상</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            <tr key={idx}>
                                                <td className='nanum-gothic'>{""}</td>
                                            </tr>
                                        }
                                        </tbody>
                                    </Table>
                                </Card>










                            </Collapse>
                        </Fragment>

                    )
                })
            }
        </ListGroup>
    )
}

const mapStateToProps = (state) => {
    const {contract: {list} = {}} = state
    return list ? {
        list
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadList: (list) => {
            dispatch(loadContractList(list))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractManage)