import React, {lazy, useState} from "react";
import {Nav, NavItem, NavLink, TabContent, TabPane,} from 'reactstrap'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {loadInsuranceInfoList, loadMarketInvestigationList, loadMarketInvestigationDetail, loadStrategyInvestigationList, loadStrategyInvestigationDetail} from "../../../globalStore";
import {useGetAxios} from "../../global/useAxios";
import {uploadAction as marketUpload} from "./MarketForm";
import {uploadAction as strategyUpload} from "./StrategyForm";
import Loading from "../../global/Loading";

const CustomizableTable = lazy(() => import('../../global/CustomizableTable'))
const StrategyForm = lazy(() => import('./StrategyForm'))
const MarketForm = lazy(() => import('./MarketForm'))

const Planning = ({companyList, load, mList, sList, loadStrategyInvestigationList, loadMarketInvestigationList}) => {
    const [active, setActive] = useState(1)
    const changeTab = (tabID) => {
        setActive(tabID)
    }

    useGetAxios({url: '/insurance/info', callback: load, necessary: !companyList})
    useGetAxios({url: '/investigation/market/list', callback: loadMarketInvestigationList, necessary: !mList})
    useGetAxios({url: '/investigation/strategy/list', callback: loadStrategyInvestigationList, necessary: !sList})
    // if (!mList || !sList) return <Loading/>
    // const renderMarket = []
    // const renderStrategy = []
    //
    // const mListKeys = Object.keys(mList)
    // const sListKeys = Object.keys(sList)
    //
    // mListKeys.forEach(market=>{
    //     const {title, date, author} = mList[market]
    //     renderMarket.push({market, title, date, author})
    // })
    // sListKeys.forEach(strategy=>{
    //     const {title, date, author} = sList[strategy]
    //     renderStrategy.push({strategy, title, date, author})
    // })


    return (
        <div className='animated fadeIn'>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({active: active === 1})}
                        onClick={() => {changeTab(1);}}>
                        <div className='nanum-gothic'>
                            시장 조사 정보
                        </div>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({active: active === 2})}
                             onClick={() => {changeTab(2);}}>
                        <div className='nanum-gothic'>
                            전략 정보
                        </div>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={active}>
                <TabPane tabId={1}>
                    <CustomizableTable noCard tableRowData={[]} tableTitle='시장 조사 정보' activeModal
                                       modalProps={{
                                           modalTitle: '새로운 글 작성',
                                           uploadAction: marketUpload,
                                           inputForm: <MarketForm/>
                                       }}/>
                </TabPane>
                <TabPane tabId={2}>
                    <CustomizableTable noCard tableRowData={[]} tableTitle='전략 정보' activeModal
                                       modalProps={{
                                           modalTitle: '새로운 글 작성',
                                           uploadAction: strategyUpload,
                                           inputForm: <StrategyForm/>
                                       }}/>
                </TabPane>
            </TabContent>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {insurance: {infoList:{companyList} = {}, market:{mList} = {}, strategy: {sList} = {}} = {}} = state
    return companyList ? {
        companyList,
        mList,
        sList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (insurance) => {
            dispatch(loadInsuranceInfoList(insurance))
        },
        loadStrategyInvestigationList: (list) => {
            dispatch(loadStrategyInvestigationList(list))
        },
        loadMarketInvestigationList: (list) => {
            dispatch(loadMarketInvestigationList(list))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Planning)