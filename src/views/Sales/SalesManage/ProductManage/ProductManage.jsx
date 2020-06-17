import React, {lazy} from "react";
import CustomizableTable from "../../../global/CustomizableTable";
import {connect} from 'react-redux';
import {useGetAxios} from "../../../global/useAxios";
import Loading from "../../../global/Loading";


const header = {
    id: '번호',
    clientID: '고객 번호',
    compensationProvision: '보상 타입',
    salesPerson: '담당 영업사원',
    date: '수정 시각',
}

const ProductManage = ({loadSalesInstructionList}) => {
    useGetAxios({url: 'instruction/employee/Employee'})

    const renderData = []
    

    return(
        <CustomizableTable tableRowData={renderData} tableTitle = '계약 후 관리' tableHeader = {header}>

        </CustomizableTable>
    )
}

export default ProductManage