import React, {useEffect, useState} from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {Input} from 'reactstrap'
import Loading from "../../global/Loading";
import axios from "axios";

const header = {
    companyName: '회사',
    insuranceName: '상품명',
    lossRate: '손해율',
}


const LossRateManagement = ({lossRateList, load}) => {
    const [state, setState] = useState({
        target: "0",
        tableData: [],
        loading: true
    })
    if(state.target==="0")setState({target:"3",tableData: state.tableData,loading: state.loading})

    useEffect(() => {
        const getAxios = async () => {
            if(state.target!=="0")
            await axios.get(`/contract/loss_rate?term=${state.target}`)
                .then(({data}) => {
                    setState({target: state.target, loading: false, tableData: data})
                })
                .catch(e => {
                    console.error(e);
                    setState({target: state.target, loading: false, tableData: null})
                })
        }
        getAxios();
    }, [state.target])


    const renderData = state.tableData ? state.tableData.map((lossRateData) => {

        const {companyName, insuranceName, lossRate} = lossRateData
        return {
            companyName,
            insuranceName,
            lossRate
        }
    }) : null


    const handleSelectChange = (event) => {
        event.preventDefault();
        setState({target: event.target.value})
    }

    return (
        <div className='animated fadeIn'>
            <Input type="select" value={state.target} onChange={handleSelectChange}>
                <option value={"3"}>최근 3개월</option>
                <option value={"6"}>최근 6개월</option>
                <option value={"12"}>최근 1년</option>
            </Input>
            {state.target !== "0" ?
                 renderData ?
                        <CustomizableTable tableTitle={'최근 ' + state.target + '개월 손해율'} tableHeader={header}
                                           tableRowData={renderData}/>
                        : <Loading/>
                :  <CustomizableTable tableTitle={'옵션을 먼저 선택해주세요'} tableHeader={header} tableRowData={null}/>}
            <hr/>
        </div>
    )
}

export default LossRateManagement