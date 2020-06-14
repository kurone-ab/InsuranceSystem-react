import React, {lazy} from "react";
import {useGetAxios} from "../../global/useAxios";
import {loadDevelopingInsuranceList, loadInsuranceInfoList} from "../../../globalStore";
import {connect} from 'react-redux'

const CustomizableTable = lazy(() => import('../../global/CustomizableTable'))
const DesignForm = lazy(() => import('./DesignForm'))
const Loading = lazy(() => import('../../global/Loading'))

const header = {
    number: '상품 번호',
    productName: {
        title: '상품명',
        className: 'w-50'
    },
    author: '작성자',
    update: '수정 시각'
}
const Design = ({load, typeList, loadList, developingInsuranceList}) => {
    useGetAxios({url: '/insurance/info', callback: load, necessary: !typeList})
    useGetAxios({url: '/insurance/product/developing', callback: loadList, necessary: !developingInsuranceList})

    let renderData = developingInsuranceList ? developingInsuranceList.map((insurance) => {
        const {id, name, author, date} = insurance
        return {
            id,
            name: {
                title: name,
                aTag: true
            },
            author,
            date
        }
    }) : null

    return (
        <div className='animated fadeIn'>
            {
                renderData ?
                    <CustomizableTable tableTitle='설계 중인 보험 상품' tableHeader={header}
                                       tableRowData={renderData} activeModal
                                       modalProps={{
                                           modalTitle: '설계하기',
                                           uploadAction: () => console.log(document.getElementsByClassName('assuranceAmount')),
                                           InputForm: DesignForm
                                       }}/> : <Loading/>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const {insuranceInfo: {typeList} = {}, developingInsuranceList} = state
    return !typeList || !developingInsuranceList ? {
        typeList,
        developingInsuranceList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (insurance) => {
            dispatch(loadInsuranceInfoList(insurance))
        },
        loadList: (list) => {
            dispatch(loadDevelopingInsuranceList(list))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Design)