import React, {useEffect, useState} from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {connect, useStore} from 'react-redux';
import {useGetAxiosWithParams} from "../../global/useAxios";
import Loading from "../../global/Loading";
import {loadPolicyEstablishmentDoc} from "../../../globalStore";



const header = {
    id: '번호',
    insuranceType: '보험 종류',
    compensationProvision: '적/부 판단율',
    count: 'U/W 요청 건수',
}

const PolicyEstablishment = ({load, policyEstablishmentDocList}) => {
    const {user: {id: eid}} = useStore().getState()
    useGetAxiosWithParams({
        url: '/contract/list/responsibility',
        callback: load,
        necessary: !policyEstablishmentDocList,
        params: {eid: eid}
    })


    const renderData = policyEstablishmentDocList ? policyEstablishmentDocList.map((policyEstablichmentDoc) => {
            const {id, insuranceType, compensationProvision, count} = policyEstablichmentDoc
            return {
                id,
                insuranceType,
                compensationProvision,
                count
            }
        }) :
        null

    return (
        <div className='animated fadeIn'>
            {
                renderData ?
                    <CustomizableTable tableTitle='인수 지침 관리' tableRowData={renderData} tableHeader={header}>
                    </CustomizableTable> : <Loading/>
            }
        </div>
    )
}


const mapStateToProps = (state) => {
    const {authorizeDoc: {policyEstablishmentDocList} = {}} = state
    return policyEstablishmentDocList ? {
        policyEstablishmentDocList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    console.log("로그로그")
    return {
        load: (policyEstablichmentDoc) => dispatch(loadPolicyEstablishmentDoc(policyEstablichmentDoc))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PolicyEstablishment)
// export default PolicyEstablishment