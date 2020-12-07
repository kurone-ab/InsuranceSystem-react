import React, {lazy, useEffect, useState} from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {loadUWPolicyData} from "../../../globalStore";
import axios from "axios";
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

const PolicyRegister = ({uwPolicyList, load}) => {
    const [state, setState] = useState({loading: true, ItemList: []});
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
        const {uwPolicyId, name, date} = detail
        const id=uwPolicyId
        return {
            id,
            title: {
                title: name,
                aTag: true,
                id
            },
            date
        }
    }) : null

    return (
        <div className='animated fadeIn'>
            {!state.loading ?
                renderData ?
                    <CustomizableTable tableTitle='인수 정책 수립 및 수정' tableHeader={header} tableRowData={renderData}
                                       activeModal retrieveForm={PolicyViewForm} modalProps={{
                        modalTitle: '인수 정책 수립하기',
                        uploadAction: (e, closeModal) => uploadAction(e, closeModal),
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

export default PolicyRegister