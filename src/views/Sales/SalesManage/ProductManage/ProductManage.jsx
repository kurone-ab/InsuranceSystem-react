import React, {Fragment, useState} from "react";
import {Collapse, ListGroup, ListGroupItem} from 'reactstrap'
import {useGetAxios} from "../../../global/useAxios";
import {loadInsuranceInfoList} from "../../../../globalStore";
import {connect} from 'react-redux'
import FileUploadButton from "../../../global/FileUploadButton";
import InsuranceDetailReadForm from "../../../Development/FollowUpManage/InsuranceDetailReadForm";


const header = {
    id: '번호',
    clientID: '고객 번호',
    compensationProvision: '보상 타입',
    salesPerson: '담당 영업사원',
    date: '수정 시각',
}

const openTarget = {}

const ProductManage = ({productList}) => {
    const [open, setOpen] = useState(false)

    return (
        <div className='animated fadeIn'>
            <ListGroup flush>
                {
                    productList.map((product, idx) => {
                        const {id, name} = product
                        return (
                            <Fragment key={idx}>
                                <ListGroupItem tag="a" href='#' action
                                               className='border-0' onClick={(e) => {
                                    e.preventDefault()
                                    openTarget[id] = !openTarget[id]
                                    setOpen({...openTarget})
                                }}>
                                    <div className='my-auto nanum-gothic font-xl'>{name}</div>
                                </ListGroupItem>
                                <Collapse isOpen={open[id]}>
                                    <InsuranceDetailReadForm id={id}/>
                                </Collapse>
                            </Fragment>
                        )
                    })
                }
            </ListGroup>
        </div>
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