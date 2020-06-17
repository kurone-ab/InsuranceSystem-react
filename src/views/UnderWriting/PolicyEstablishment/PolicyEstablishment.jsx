import React from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {connect} from 'react-redux';
import {useGetAxios} from "../../global/useAxios";
import Loading from "../../global/Loading";

const header = {
    id: '번호',
    title: '보험 종류',
    employeeNum: '적/부 판단율',
    workingDistrict: 'U/W 요청 건수',
}

const PolicyEstablishment = () => {
    const renderData = []

    return(
        <CustomizableTable tableRowData={renderData} tableTitle = '인수 지침 관리' tableHeader = {header}>

        </CustomizableTable>
    )
}

export default PolicyEstablishment