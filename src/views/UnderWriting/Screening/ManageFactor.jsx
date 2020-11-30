import React from "react";
import {loadPolicyEstablishmentDoc} from "../../../globalStore";
import {connect, useStore} from "react-redux";
import {useGetAxiosWithParams} from "../../global/useAxios";
import CustomizableTable from "../../global/CustomizableTable";
import Loading from "../../global/Loading";
import ManageFactorForm from "./ManageFactorForm"
import ManageFactorEditForm from "./ManageFactorEditForm";


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

export const uploadAction = (eid, e, closeModal) => {
    // e.preventDefault()
    // const type = document.getElementById('productType').value
    // const designProductName = document.getElementById('designProductName').value
    // const guaranteeConditionList = document.getElementsByClassName('guaranteeCondition')
    // const guaranteeLimitList = document.getElementsByClassName('guaranteeLimit')
    // const targetClientList = document.getElementsByClassName('guaranteeLimit')
    // const data = new FormData()
    // data.append('type', type)
    // data.append('eid', eid)
    // data.append('name', designProductName)
    // console.log(eid)
    // for (let i = 0; i < targetClientList.length; i++) {
    //     const targetClientListElement = targetClientList[i]
    //     data.append('targetClient', targetClientListElement.value)
    // }
    //
    // for (let i = 0; i < guaranteeConditionList.length; i++) {
    //     const condition = guaranteeConditionList[i]
    //     const checked = document.getElementById(`special${i}`).checked
    //     data.append('condition', condition.value)
    //     data.append('special', checked)
    //     const limit = guaranteeLimitList[i]
    //     data.append('limit', `${limit.value}0000`)
    // }
    // axios.post('insurance/product/design', data).then(()=>closeModal())
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

// export default ManageFactor