import React from "react";
import {loadPolicyEstablishmentDoc} from "../../../globalStore";
import {connect, useStore} from "react-redux";
import {useGetAxiosWithParams} from "../../global/useAxios";
import CustomizableTable from "../../global/CustomizableTable";
import Loading from "../../global/Loading";
import ManageFactorForm from "./ManageFactorForm"
import ManageFactorEditForm from "./ManageFactorEditForm";
import {uploadAction} from "./ManageFactorEditForm";


const header = {
    id: '번호',
    clientName: {
        title: '고객명',
        className: 'w-30'
    },
    insuranceType: '보험 종류',
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
                count
            }
        }) :
        null

    return (
        <div className='animated fadeIn'>
            {
                renderData ?
                    <CustomizableTable tableTitle='인수 지침 관리' tableRowData={renderData} tableHeader={header}
                                       activeModal retrieveForm={ManageFactorForm} modalProps={{
                        modalTitle: '고객 Factor 수정하기',
                        uploadAction: (e, closeModal) => uploadAction(eid, e, closeModal),
                        inputForm: <ManageFactorEditForm/>,
                        fileUpload: false,
                        fileElementId: 'designFormFile'
                    }}/>
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