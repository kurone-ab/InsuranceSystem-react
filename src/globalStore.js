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
            const {payload} = action
            const important = payload instanceof Array ? payload.find(({priority}) => priority) : payload
            return payload ? {
                ...state,
                announcement: {
                    list: payload,
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
            const {payload: {companyList, productNameList, typeList} = {}} = action
            return companyList ? {
                ...state,
                insuranceInfoList: {
                    companyList,
                    productNameList,
                    typeList
                }
            } : {
                ...state
            }
        },
        loadInsuranceList: (state, action) => {
            const {payload: insuranceList} = action
            return insuranceList ? {
                ...state,
                insuranceList
            } : {
                ...state
            }
        },
        loadDevelopingInsuranceList: (state, action) => {
            const {payload: developingInsuranceList} = action
            return developingInsuranceList ? {
                ...state,
                developingInsuranceList
            } : {
                ...state
            }
        },
        loadAnnouncementContent: (state, action) => {
            const {payload: {id, content}} = action
            const {announcement, announcement: {contentList, ...aRest}, ...rest} = state
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
        }
    }
})

export const {login, logout, loadAnnouncement, loadInsuranceInfoList, loadInsuranceList, loadDevelopingInsuranceList, loadAnnouncementContent} = actions

export default configureStore({reducer})