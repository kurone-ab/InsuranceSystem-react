import React, {lazy, useState} from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {connect, useStore} from 'react-redux';
import {Button, ListGroupItem,Select,Input} from 'reactstrap'
import {useGetAxios, useGetAxiosWithParams} from "../../global/useAxios";
import Loading from "../../global/Loading";
import {loadLossRateData} from "../../../globalStore";

const header = {
    companyName: '회사',
    insuranceName: '상품명',
    lossRate: '손해율',
}

const LossRateManagement= ({lossRateList, load}) => {
    const [state,setState] = useState({
        target:3
    })

    useGetAxiosWithParams({
        url: '/contract/loss_rate',
        callback: load,
        necessary: !lossRateList,
        params: {term: state.target}
    })

    const renderData = lossRateList ? lossRateList.map((lossRateData) => {

        const {companyName, insuranceName, lossRate} = lossRateData
        return {
            companyName,
            insuranceName,
            lossRate
        }
    }) : null

    const handleSelectChange = (event)=> {
        console.log(event.target.value)
    event.preventDefault();
     setState({target:event.target.value})
    }

    return (
        <div className='animated fadeIn'>

            <Input type="select" value={state.target} onChange={handleSelectChange}>
                <option value={"3"}>최근 3개월</option>
                <option value={"6"}>최근 6개월</option>
                <option value={"12"}>최근 1년</option>
            </Input>
            {renderData ?
                <CustomizableTable tableTitle={'최근 '+state.target+'개월 손해율'} tableHeader={header} tableRowData={renderData} />
                : <Loading/>
            }
            <hr/>
            <form>
                <Button color='primary'>손해율 데이터 수집</Button>&nbsp;&nbsp;
                <Button color='primary'>손해율 분석</Button>&nbsp;&nbsp;
                <Button color='primary'>예상 손해율 시뮬레이션</Button>
            </form>
        </div>
    )

}

const mapStateToProps = (state) => {
    // console.log("mapStateToProps")


    const {authorizeDoc: {lossRateList} = {}} = state
    return lossRateList ? {lossRateList} : {}
}

const mapDispatchToProps = (dispatch) => {
    // console.log("mapDispatchToProps")


    return {

        load: (lossRateData) => dispatch(loadLossRateData(lossRateData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LossRateManagement)
// export default LossRateManagement