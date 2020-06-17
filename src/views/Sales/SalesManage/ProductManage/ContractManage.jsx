import React, {Fragment, useState} from "react";
import {connect, useStore} from 'react-redux'
import {loadContractList} from "../../../../globalStore";
import {useGetAxios} from "../../../global/useAxios";
import {Collapse, ListGroup, ListGroupItem} from 'reactstrap'
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
                    return (
                        <Fragment key={idx}>
                            <ListGroupItem tag="a" href='#' action className='border-0' onClick={() => {
                                openTarget[contract] = !openTarget[contract]
                                setOpen({...openTarget})
                            }}>
                                {`계약 ID : ${contract}`}
                            </ListGroupItem>
                            <Collapse isOpen={open[contract]}>
                                <ListGroupItem>
                                    {`계약 ID ${contract} 조회`}
                                </ListGroupItem>
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