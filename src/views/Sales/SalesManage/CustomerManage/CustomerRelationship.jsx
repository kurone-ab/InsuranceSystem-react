import React, {lazy, useEffect, useState} from "react";
import axios from "axios";
import {useStore} from "react-redux";
import CustomerRelationshipViewForm from "./CustomerRelationshipViewForm";
import CustomerRelationshipForm from "./CustomerRelationshipForm";
const CustomizableTable = lazy(() => import('../../../global/CustomizableTable'))
const Loading = lazy(() => import('../../../global/Loading'))

const header = {
    id: ' 상담번호',
    date: '날짜',
    clientName: {
        title: '고객명',
        className: 'w-50'
    }

}

const CustomerRelationship = () => {
    const {user:{id:eid}} = useStore().getState()

    const [state, setState] = useState({
        loading: true,
        tableData: []
    })


    useEffect(() => {
        const getAxios = async () => {
            console.log("부름")
            await axios.get(`/counseling/record/get?eid=${eid}`)
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

    const renderData = state.tableData ? state.tableData.map((counseling) => {
        const {id, clientName, content, date} = counseling
        return {
            id,

            date,
            clientName: {
                title: clientName,
                aTag: true,
                id
            },
        }
    }) : null


    return (
        <div className='animated fadeIn'>
            {!state.loading ?
                ( renderData ?
                    <CustomizableTable tableTitle='고객 관계 형성: 상담 목록' tableHeader={header} tableRowData={renderData}
                                       retrieveForm={CustomerRelationshipViewForm} activeModal modalProps={{
                        modalTitle:'고객 상담 기록하기',
                        inputForm:<CustomerRelationshipForm/>,
                    }} />
                    : <Loading/>)
                : null
            }
        </div>
    )
}

export default CustomerRelationship