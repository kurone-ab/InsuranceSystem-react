import React, {lazy} from "react";
import CustomizableTable from "../../global/CustomizableTable";
import {connect, useStore} from 'react-redux';
import {Button} from 'reactstrap'
import {useGetAxios, useGetAxiosWithParams} from "../../global/useAxios";
import Loading from "../../global/Loading";
import {loadLossRateData} from "../../../globalStore";

const header = {
    companyName: '회사명',
    insuranceName: '보험명',
    lossRate: '손해율',
}

const LossRateManagement= ({lossRateList, load}) => {
    console.log("LossRateManagement")
    useGetAxiosWithParams({
        url: '/contract/loss_rate',
        callback: load,
        necessary: !lossRateList,
        params: {term: 0}
    })

    const renderData = lossRateList ? lossRateList.map((lossRateData) => {
        console.log("renderData")

        const {companyName, insuranceName, lossRate} = lossRateData
        return {
            companyName,
            insuranceName,
            lossRate
        }
    }) : null


    return (
        <div className='animated fadeIn'>

            {renderData ?
                <CustomizableTable tableTitle='최근 3개월 손해율' tableHeader={header} tableRowData={renderData} />
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
    console.log("mapStateToProps")


    const {authorizeDoc: {lossRateList} = {}} = state
    return lossRateList ? {lossRateList} : {}
}

const mapDispatchToProps = (dispatch) => {
    console.log("mapDispatchToProps")


    return {

        load: (lossRateData) => dispatch(loadLossRateData(lossRateData))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LossRateManagement)
// export default LossRateManagement