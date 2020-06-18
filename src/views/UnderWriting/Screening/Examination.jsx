import React, {Fragment, useState} from "react";
import {connect} from 'react-redux'
import {Collapse, ListGroup, ListGroupItem} from 'reactstrap'
import {loadRegisteringClientList} from "../../../globalStore";
import {useGetAxios} from "../../global/useAxios";
import Loading from "../../global/Loading";
const openTarget = []

const Examination = ({list, loadList}) => {
    useGetAxios({url: 'client/registering/list', callback: loadList, necessary: !list})
    const [open, setOpen] = useState(false)
    if (!list) return <Loading/>
    const listKeys = Object.keys(list)
    if (!open) {
        listKeys.forEach((cl) => {
            openTarget[cl] = false
        })
        setOpen({...openTarget})
    }

    return (
        <ListGroup flush>
            {
                listKeys.map((cl, idx) => {
                    return (
                        <Fragment key={idx}>
                            <ListGroupItem tag="a" href='#' action className='border-0' onClick={() => {
                                openTarget[cl] = !openTarget[cl]
                                setOpen({...openTarget})
                            }}>
                                {`고객 ID : ${cl}`}
                            </ListGroupItem>
                            <Collapse isOpen={open[cl]}>
                                <ListGroupItem>
                                    {`고객 ID ${cl} 조회`}
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
    const {client: {registering: {list} = {}} = {}} = state
    return list ? {
        list,
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadList: (list) => dispatch(loadRegisteringClientList(list)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Examination)