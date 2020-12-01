import React, {lazy, useEffect, useState} from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {connect, useStore} from 'react-redux';
import {Button, ListGroupItem, Select, Input} from 'reactstrap'
import {useGetAxios, useGetAxiosWithParams} from "../../global/useAxios";
import Loading from "../../global/Loading";
import {loadLossRateData} from "../../../globalStore";
import axios from "axios";

const header = {
    companyName: '회사',
    insuranceName: '상품명',
    lossRate: '손해율',
}

const LossRateManagement = ({lossRateList, load}) => {
    const [state, setState] = useState({
        target: 0,
        tableData: [],
        loading: true
    })


    useEffect(() => {
        const getAxios = async () => {
            // if(state.target==null){setState({target:3, loading: state.loading, tableData: state.tableData})}
            console.log("부름")
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

    // useGetAxiosWithParams({
    //     url: '/contract/loss_rate',
    //     callback: load,
    //     necessary: !lossRateList,
    //     params: {term: state.target}
    // })

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
            <br/>
            {state.target !== 0 ?

                 renderData ?
                        <CustomizableTable tableTitle={'최근 ' + state.target + '개월 손해율'} tableHeader={header}
                                           tableRowData={renderData}/>
                        : <Loading/>

                :  <CustomizableTable tableTitle={'옵션을 먼저 선택해주세요'} tableHeader={header}
                                     />

            }
            <hr/>
            {/*<form>*/}
            {/*    <Button color='primary'>손해율 데이터 수집</Button>&nbsp;&nbsp;*/}
            {/*    <Button color='primary'>손해율 분석</Button>&nbsp;&nbsp;*/}
            {/*    <Button color='primary'>예상 손해율 시뮬레이션</Button>*/}
            {/*</form>*/}
        </div>
    )

}

// const mapStateToProps = (state) => {
//     const {authorizeDoc: {lossRateList} = {}} = state
//     return lossRateList ? {lossRateList} : {}
// }
//
// const mapDispatchToProps = (dispatch) => {
//     // console.log("mapDispatchToProps")
//
//
//     return {
//
//         load: (content) => dispatch(loadLossRateData(content))
//     }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(LossRateManagement)
export default LossRateManagement