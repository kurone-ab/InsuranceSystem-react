import {configureStore, createSlice} from "@reduxjs/toolkit";

const {actions, reducer} = createSlice({
    name: 'globalReducers',
    initialState: {user: JSON.parse(sessionStorage.getItem('user'))},
    reducers: {
        login: (state, action) => {
            const {payload} = action
            const {id, name, auth} = payload
            sessionStorage.setItem('user', JSON.stringify(payload))
            return {
                user: {
                    id,
                    name,
                    auth,
                }
            }
        },
        logout: () => {
            sessionStorage.removeItem('user')
            return {
                user: null
            }
        },
        loadAnnouncement: ((state, action) => {
            const {payload:list} = action
            const important = list instanceof Array ? list.find(({priority}) => priority) : list
            return list ? {
                ...state,
                announcement: {
                    list,
                    important,
                    contentList: {
                        [important.id]: important.content
                    }
                }
            } : {
                ...state
            }
        }),
        loadInsuranceInfoList: (state, action) => {
            const {payload: {companyList, productList, typeList} = {}} = action
            const {insurance, ...rest} = state
            return companyList ? {
                ...rest,
                insurance: {
                    ...insurance,
                    infoList: {
                        companyList,
                        productList,
                        typeList
                    },
                    detail: {}
                }
            } : {
                ...state
            }
        },
        loadDevelopingInsuranceList: (state, action) => {
            const {payload: developingList} = action
            const {insurance, ...rest} = state
            return developingList ? {
                ...rest,
                insurance: {
                    ...insurance,
                    developingList
                }
            } : {
                ...state
            }
        },
        loadAnnouncementContent: (state, action) => {
            const {payload: {id, content}} = action
            const {announcement: {contentList, ...aRest}, ...rest} = state
            return content ? {
                ...rest,
                announcement: {
                    ...aRest,
                    contentList: {
                        ...contentList,
                        [id]: content
                    }
                }
            } : {
                ...state
            }
        },
        loadInsuranceDetail: (state, action) => {
            const {payload: {id, ...pRest}} = action
            const {insurance:{detail, ...iRest}, ...rest} = state
            return {
                ...rest,
                insurance: {
                    ...iRest,
                    detail: {
                        ...detail,
                        [id]: {...pRest}
                    }
                }
            }
        },
        loadSalesInstructionList: (state, action) => {
            const {payload: instructionList} = action
            const {sales, ...rest} = state
            return {
                ...state,
                sales: {
                    ...rest,
                    instructionList
                }
            }
        },
        loadContractList: (state, action) => {
            const {contract ={}, ...rest} = state
            const {list} = contract
            const {user: {id}} = state
            const {payload} = action
            return {
                ...rest,
                contract: {
                    list: {
                        ...list,
                        [id]: payload
                    },
                    ...contract
                }
            }
        },
        loadRegisteringClientList: (state, action) => {
            const {payload: list} = action
            const {client, client: {registering, detail = {}, ...rRest} = {}, ...rest} = state
            return list ? {
                ...rest,
                client: {
                    registering: {
                        ...rRest,
                        list,
                        detail
                    }
                }
            } : {
                ...state
            }
        },
        loadRegisteringClientDetail: (state, action) => {
            const {payload: {id, ...payloadRest}} = action
            const {client, client: {registering, registering: {detail, ...dRest} = {}, ...rRest} = {}, ...rest} = state
            return id ? {
                ...rest,
                client: {
                    registering: {
                        ...rRest,
                        detail: {
                            ...dRest,
                            [id]: {...payloadRest}
                        }
                    }
                }
            } : {
                ...state
            }
        },
    }
})

export const {login,
    logout,
    loadAnnouncement,
    loadInsuranceInfoList,
    loadDevelopingInsuranceList,
    loadAnnouncementContent,
    loadInsuranceDetail,
    loadSalesInstructionList,
    loadContractList,
    loadRegisteringClientList,
    loadRegisteringClientDetail
} = actions;

export default configureStore({reducer})