import React, {lazy} from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {connect} from 'react-redux'
import {useGetAxios} from "../../global/useAxios";
import {loadSalesInstructionList} from "../../../globalStore";
import Loading from "../../global/Loading";

const header = {
    id: '번호',
    title: '이름',
    employeeNum: '사원번호',
    workingDistrict: '관할 구역',
}

const SalesManage = ({loadSalesInstructionList}) => {
    useGetAxios({url: 'instruction/employee/Employee'})

    const renderData = []
    

    return(
        <CustomizableTable tableRowData={renderData} tableTitle = '영업 관리' tableHeader = {header}>

        </CustomizableTable>
    )
}

export default SalesManage