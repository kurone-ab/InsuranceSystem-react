import React, {lazy} from "react";
import {useGetAxios} from "../../global/useAxios";
import {loadInsurance} from "../../../globalStore";
import {connect} from 'react-redux'

const CustomizableTable = lazy(() => import('../../global/CustomizableTable'))
const DesignForm = lazy(() => import('./DesignForm'))

const header = {
    number: '상품 번호',
    productName: {
        title: '상품명',
        className: 'w-50'
    },
    author: '작성자',
    update: '수정 시각'
}
const Design = ({load, typeList}) => {
    useGetAxios({url: '/insurance/info', callback: load, necessary: !typeList})
    return (
        <div className='animated fadeIn'>
            <CustomizableTable tableTitle='설계 중인 보험 상품' tableHeader={header} activeModal
                               modalProps={{
                                   modalTitle: '설계하기',
                                   uploadAction: () => console.log(document.getElementsByClassName('assuranceAmount')),
                                   InputForm: DesignForm
                               }}/>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {insurance: {typeList} = {}} = state
    return typeList ? {
        typeList,
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (insurance) => {
            dispatch(loadInsurance(insurance))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Design)