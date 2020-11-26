import React from "react";
import {loadPolicyEstablishmentDoc} from "../../../globalStore";
import {connect, useStore} from "react-redux";
import {useGetAxiosWithParams} from "../../global/useAxios";
import CustomizableTable from "../../global/CustomizableTable";
import Loading from "../../global/Loading";
import ManageFactorForm from "./ManageFactorForm"


const header = {
    id: '번호',
    clientName: {
        title: '고객명',
        className: 'w-30'
    },
    insuranceType: '보험 종류',
    compensationProvision: '적/부 판단율',
    pass: '적/부 판단 완료여부',
    count: 'U/W 요청 건수',
}
const ManageFactor = ({policyEstablishmentDocList, load}) => {
    const {user: {id: eid}} = useStore().getState()
    useGetAxiosWithParams({
        url: 'uw/factor_manage/list',
        callback: load,
        necessary: !policyEstablishmentDocList,
        params: {eid: eid}
    })


    const renderData = policyEstablishmentDocList ? policyEstablishmentDocList.map((policyEstablishmentDoc) => {
            const {id, insuranceType, compensationProvision, count, clientName, underWritingPassed} = policyEstablishmentDoc
            const comp = compensationProvision + ""
            const pass = underWritingPassed + ""

            return {
                id,
                clientName: {
                    title: clientName,
                    aTag: true,
                    id
                },
                insuranceType,
                comp,
                pass,
                count
            }
        }) :
        null

    return (
        <div className='animated fadeIn'>
            {
                renderData ?
                    <CustomizableTable tableTitle='인수 지침 관리' tableRowData={renderData} tableHeader={header}
                                       retrieveForm={ManageFactorForm}              />
                    : <Loading/>
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
    return {
        load: (policyEstablishmentDoc) => dispatch(loadPolicyEstablishmentDoc(policyEstablishmentDoc))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ManageFactor)

// export default ManageFactor