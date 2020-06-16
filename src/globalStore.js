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
        }
    }
})

export const {login, logout, loadAnnouncement, loadInsuranceInfoList, loadDevelopingInsuranceList, loadAnnouncementContent, loadInsuranceDetail, loadSalesInstructionList} = actions;

export default configureStore({reducer})