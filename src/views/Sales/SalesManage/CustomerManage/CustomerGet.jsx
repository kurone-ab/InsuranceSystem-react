import React, {lazy, useEffect, useState} from "react";
import axios from "axios";
import DesignReadForm from "../../../Development/Design/DesignReadForm";
import CustomerGetViewForm from "./CustomerGetViewForm";
import CustomerGetEditForm from "./CustomerGetEditForm";
import {uploadAction} from "./CustomerGetEditForm";

const CustomizableTable = lazy(() => import('../../../global/CustomizableTable'))
const Loading = lazy(() => import('../../../global/Loading'))

const header = {
    id: '고객 번호',
    name: {
        title: '고객명',
        className: 'w-50'
    },
    sex: '성별',
    age: '나이'
}

const CustomerGet = () => {

    const [state, setState] = useState({
        loading: true,
        tableData: []
    })


    useEffect(() => {
        const getAxios = async () => {
            console.log("부름")
            await axios.get('/client/unregistered/list')
                .then(({data}) => {
                    setState({loading: false, tableData: data})
                })
                .catch(e => {
                    console.error(e);
                    setState({loading: false, tableData: state.tableData})
                })
        }
        getAxios();
    }, [])

    const renderData = state.tableData ? state.tableData.map((unregisteredClient) => {
        const {id, name, sex, age, gift} = unregisteredClient
        // console.log(id + "/" + name + "/" + sex + "/" + age + "/" + "불러옴")
        return {
            id,
            name: {
                title: name,
                aTag: true,
                id
            },
            sex,
            age
        }
    }) : null


    return (
        <div className='animated fadeIn'>
            {!state.loading ?
                ( renderData ?
                    <CustomizableTable tableTitle='가망 고객 확보하기' tableHeader={header} tableRowData={renderData}
                                       retrieveForm={CustomerGetViewForm} activeModal modalProps={{
                modalTitle: '가망 고객 신규 등록',
                uploadAction: (e, closeModal) => uploadAction(e, closeModal),
                inputForm: <CustomerGetEditForm/>,
            }}

                    />
                    : <Loading/>)
                : null
            }
        </div>
    )
}

export default CustomerGet