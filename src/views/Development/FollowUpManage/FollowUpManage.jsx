import React, {useState} from "react";
import {connect} from 'react-redux'
import {ListGroup, ListGroupItem, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap'
import Loading from "../../global/Loading";
import classnames from 'classnames'
import {loadInsuranceInfoList} from "../../../globalStore";
import {useGetAxios} from "../../global/useAxios";

const FollowUpManage = ({productList, typeList, load}) => {
    useGetAxios({url: '/insurance/info', callback: load, necessary: !typeList})
    const [selectedType, setSelectedType] = useState('FIRE')
    const [product, setProduct] = useState(0)
    const typeListKeys = typeList ? Object.keys(typeList) :  null

    return (typeList ?
            <div className='animated fadeIn'>
                <Nav tabs>
                    {
                        typeListKeys.map((type, idx) => {
                            return (
                                <NavItem key={idx}>
                                    <NavLink
                                        className={classnames({active: selectedType === type})}
                                        onClick={() => {
                                            setSelectedType(type)
                                        }}>
                                        <div className='nanum-gothic'>
                                            {typeList[type]}
                                        </div>
                                    </NavLink>
                                </NavItem>
                            )
                        })
                    }

                </Nav>
                <TabContent activeTab={selectedType}>
                    {
                        typeListKeys.map((type, idx) => {
                            return (
                                <TabPane tabId={type} key={idx}>
                                    <ListGroup flush>
                                        {
                                            productList.filter((product) => product.type === type).map((product, idx) => {
                                                return (
                                                    <ListGroupItem tag="a" href="#" action key={idx} onClick={(e)=> {
                                                        e.preventDefault()
                                                        console.log(product)
                                                    }}>
                                                        <div className='my-auto nanum-gothic'>{product.name}</div>
                                                    </ListGroupItem>
                                                )
                                            })
                                        }
                                    </ListGroup>
                                </TabPane>
                            )
                        })
                    }

                    <TabPane tabId={2}>

                    </TabPane>
                </TabContent>
            </div> : <Loading/>
    )
}

const mapStateToProps = (state) => {
    const {insurance: {infoList: {typeList, productList} = {}} = {}} = state
    return typeList ? {
        typeList,
        productList
    } : {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        load: (insurance) => {
            dispatch(loadInsuranceInfoList(insurance))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowUpManage)