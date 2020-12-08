import React from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {connect, useStore} from 'react-redux';
import {useGetAxiosWithParams} from "../../global/useAxios";
import Loading from "../../global/Loading";
import {loadPolicyEstablishmentDoc} from "../../../globalStore";



// const header = {
//     id: '번호',
//     clientName:'고객명',
//     insuranceType: '보험 종류',
//     compensationProvision: '보상',
//     pass: '적/부 판단 완료여부',
//     count: 'U/W 요청 건수',
// }

const PolicyEstablishment = ({ policyEstablishmentDocList,load}) => {
    return(<div>policyEstablishment</div>)
    // const {user: {id: eid}} = useStore().getState()
    // useGetAxiosWithParams({
    //     url: '/contract/policy_establishment',
    //     callback: load,
    //     necessary: !policyEstablishmentDocList,
    //     params: {eid: eid}
    // })
    //
    //
    // const renderData = policyEstablishmentDocList ? policyEstablishmentDocList.map((policyEstablishmentDoc) => {
    //         const {id, insuranceType, compensationProvision, count, clientName, underWritingPassed} = policyEstablishmentDoc
    //         const comp= compensationProvision+""
    //     const pass=underWritingPassed+""
    //
    //         return {
    //             id,
    //             clientName,
    //             insuranceType,
    //             comp,
    //             pass,
    //             count
    //         }
    //     }) :
    //     null
    //
    // return (
    //     <div className='animated fadeIn'>
    //         {
    //             renderData ?
    //                 <CustomizableTable tableTitle='인수 지침 관리' tableRowData={renderData} tableHeader={header}>
    //                 </CustomizableTable> : <Loading/>
    //         }
    //     </div>
    // )
}


const mapStateToProps = (state) => {
    const {authorizeDoc: {policyEstablishmentDocList} = {}} = state
    return policyEstablishmentDocList ? {
        policyEstablishmentDocList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (policyEstablishmentDoc) => dispatch(loadPolicyEstablishmentDoc(policyEstablishmentDoc))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PolicyEstablishment)