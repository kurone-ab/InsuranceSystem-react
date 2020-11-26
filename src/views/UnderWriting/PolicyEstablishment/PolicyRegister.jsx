import React, {lazy} from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {useGetAxios} from "../../global/useAxios";
import {connect} from "react-redux";
import {loadUWPolicyData} from "../../../globalStore";

const Loading = lazy(() => import('../../global/Loading'))

const header = {
    id: '상품 번호',
    name: {
        title: '상품명',
        className: 'w-50'
    },
    date: '수정 시각'
}

const PolicyRegister = ({uwPolicyList, load}) => {
    console.log("PolicyRegister")
    useGetAxios({
        url: '/uw/uw_policy/list',
        callback: load,
        necessary: !uwPolicyList
    })

    const renderData = uwPolicyList ? uwPolicyList.map((detail) => {
        console.log("renderData")

        const {id, name, date, physicalPolicy, environmentalPolicy, financialPolicy} = detail
        return {
            id,
            name: {
                title: name,
                aTag: true,
                id
            },
            date
        }
    }) : null

    return (
        <div className='animated fadeIn'>
            {renderData ?
                <CustomizableTable tableTitle='인수 정책 수립 및 수정' tableHeader={header} tableRowData={renderData}/>
                : <Loading/>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log("mapStateToProps")
    const {uwPolicy: {uwPolicyList} = {}} = state
    return uwPolicyList ? {uwPolicyList} : {}
}

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")
    return {
        load: (content) => dispatch(loadUWPolicyData(content))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PolicyRegister)