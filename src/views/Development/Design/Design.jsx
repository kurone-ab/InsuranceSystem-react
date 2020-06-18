import React, {lazy} from "react";
import {useGetAxios} from "../../global/useAxios";
import {loadDevelopingInsuranceList, loadInsuranceInfoList} from "../../../globalStore";
import {connect, useStore} from 'react-redux'
import DesignReadForm from "./DesignReadForm";
import {uploadAction} from "./DesignForm";

const CustomizableTable = lazy(() => import('../../global/CustomizableTable'))
const DesignForm = lazy(() => import('./DesignForm'))
const Loading = lazy(() => import('../../global/Loading'))

const header = {
    id: '상품 번호',
    name: {
        title: '상품명',
        className: 'w-50'
    },
    author: '작성자',
    date: '수정 시각'
}

const Design = ({load, typeList, loadList, developingList}) => {
    useGetAxios({url: '/insurance/info', callback: load, necessary: !typeList})
    useGetAxios({url: '/insurance/product/developing', callback: loadList, necessary: !developingList})
    const {user:{id:eid}} = useStore().getState()

    const renderData = developingList ? developingList.map((insurance) => {
        const {id, name, author, date} = insurance
        return {
            id,
            name: {
                title: name,
                aTag: true,
                id
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
                                       tableRowData={renderData} activeModal retrieveForm={DesignReadForm}
                                       modalProps={{
                                           modalTitle: '설계하기',
                                           uploadAction: (e, closeModal) => uploadAction(eid, e, closeModal),
                                           inputForm: <DesignForm/>,
                                           fileUpload: true,
                                           fileElementId: 'designFormFile'
                                       }}/> : <Loading/>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const {insurance:{infoList:{typeList} = {}, developingList} = {}} = state
    return !!typeList && !!developingList ? {
        typeList,
        developingList
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