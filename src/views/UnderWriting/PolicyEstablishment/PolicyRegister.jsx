import React, {lazy, useEffect, useState} from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {useGetAxios} from "../../global/useAxios";
import {connect} from "react-redux";
import {loadUWPolicyData} from "../../../globalStore";
import axios from "axios";
import ManageFactorForm from "../Screening/ManageFactorForm";
import {uploadAction} from "./PolicyEditForm";
import {PolicyViewForm} from "./PolicyViewForm";
import {PolicyEditForm} from "./PolicyEditForm";

const Loading = lazy(() => import('../../global/Loading'))

const header = {
    id: '상품 번호',
    title: {
        title: '상품명',
        className: 'w-50'
    },
    date: '수정 시각'
}

const PolicyRegister = ({detailList, load}) => {

    const [state, setState] = useState({
        loading: true,
        ItemList: []
    });

    useEffect(() => {
        const getAxios = async () => {
            await axios.get('/uw/uw_policy/list')
                .then(({data}) => {
                    setState({loading: false, ItemList: data})
                })
                .catch(e => {
                    console.error(e);
                    setState({loading: false, ItemList: null})
                })
        }
        getAxios();
    }, [])

    const renderData = state.ItemList ? state.ItemList.map((detail) => {
        console.log("renderData")
        const {id, name, date} = detail
        return {
            id,
            title: {
                title: name,
                aTag: false,
                id
            },
            date
        }
    }) : null

    console.log(renderData)

    return (
        <div className='animated fadeIn'>
            {!state.loading ?

                renderData ?
                    <CustomizableTable tableTitle='인수 정책 수립 및 수정' tableHeader={header} tableRowData={renderData}
                                       activeModal modalProps={{
                        modalTitle: '인수 정책 수립하기',
                        uploadAction: (e, closeModal) => uploadAction( e, closeModal),
                        inputForm: <PolicyEditForm/>,
                        fileUpload: false,
                        fileElementId: 'designFormFile'
                    }}/>
                    : <Loading/>

                : null
            }
        </div>
    )
}
//
// const mapStateToProps = (state) => {
//     // console.log("mapStateToProps")
//     const {uwPolicy: {uwPolicyList} = {}} = state
//     return uwPolicyList ? {uwPolicyList} : {}
// }
//
// const mapDispatchToProps = (dispatch) => {
//     console.log("mapDispatchToProps")
//     return {
//         load: (detail) => dispatch(loadUWPolicyData(detail))
//     }
// }

export default PolicyRegister