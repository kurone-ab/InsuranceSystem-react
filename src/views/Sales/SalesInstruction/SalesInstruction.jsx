import React, {lazy} from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {uploadAction} from "./SalesInstructionForm";
import {connect} from 'react-redux'
import {useGetAxios} from "../../global/useAxios";
import {loadSalesInstructionList} from "../../../globalStore";
import Loading from "../../global/Loading";

const SalesInstructionForm = lazy(() => import('./SalesInstructionForm'))

const header = {
    id: '번호',
    title: {
        title: '제목',
        className: 'w-50'
    },
    author: '작성자',
    date: '수정 시각'
}


const SalesInstruction = ({instructionList, load}) => {
    useGetAxios({url: 'instruction/sales/list', callback: load, necessary: !instructionList})

    const renderData = []
    if (instructionList)
        instructionList.forEach((item) => {
            const {id, title, date, author} = item
            renderData.push({id, title: {title, aTag: true, id}, author, date})
        })

    return (instructionList ?
            <CustomizableTable tableRowData={renderData} tableTitle='영업 지침' tableHeader={header} activeModal modalProps={{
                modalTitle: '영업 지침 등록하기',
                buttonTitle: '영업 지침 등록하기',
                uploadAction,
                inputForm: <SalesInstructionForm/>
            }}/> : <Loading/>
    )
}

const mapStateToProps = (state) => {
    const {sales: {instructionList} = {}} = state
    return instructionList ? {
        instructionList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (list) => {
            dispatch(loadSalesInstructionList(list))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalesInstruction)