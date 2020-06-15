import React, {lazy, useState} from "react";
import {Nav, NavItem, NavLink, TabContent, TabPane,} from 'reactstrap'
import classnames from 'classnames'
import {connect} from 'react-redux'
import {loadInsuranceInfoList} from "../../../globalStore";
import {useGetAxios} from "../../global/useAxios";
import {uploadAction as marketUpload} from "./MarketForm";
import {uploadAction as strategyUpload} from "./StrategyForm";
import FileUploadButton from "../../global/FileUploadButton";

const CustomizableTable = lazy(() => import('../../global/CustomizableTable'))
const StrategyForm = lazy(() => import('./StrategyForm'))
const MarketForm = lazy(() => import('./MarketForm'))

const Planning = ({companyList, load}) => {
    const [active, setActive] = useState(1)
    const changeTab = (tabID) => {
        setActive(tabID)
    }

    useGetAxios({url: '/insurance/info', callback: load, necessary: !companyList})

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
                    <CustomizableTable tableTitle='시장 조사 정보' activeModal
                                       modalProps={{
                                           modalTitle: '새로운 글 작성',
                                           uploadAction: marketUpload,
                                           inputForm: <MarketForm/>
                                       }}/>
                </TabPane>
                <TabPane tabId={2}>
                    <CustomizableTable tableTitle='전략 정보' activeModal
                                       modalProps={{
                                           modalTitle: '새로운 글 작성',
                                           uploadAction: strategyUpload,
                                           inputForm: <StrategyForm/>
                                       }}/>
                                       <FileUploadButton color='primary' fileElementId='testFile' multiple/>
                </TabPane>
            </TabContent>
        </div>
    )
}

const mapStateToProps = (state) => {
    const {insurance: {infoList:{companyList} = {}} = {}} = state
    return companyList ? {
        companyList,
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (insurance) => {
            dispatch(loadInsuranceInfoList(insurance))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Planning)