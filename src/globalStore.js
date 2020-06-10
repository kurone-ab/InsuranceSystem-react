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
                    id: action.payload.id,
                    name: action.payload.name,
                    auth: action.payload.auth,
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
            return payload ? {
                ...state,
                announcement: {
                    list: payload,
                    important: payload instanceof Array ? payload.find(({priority}) => priority) : payload
                }
            } : {
                ...state
            }
        }),
        loadInsurance: (state, action) => {
            const {payload} = action
            return payload ? {
                ...state,
                insurance: {
                    companyList: payload.companyList,
                    productList: payload.productList
                }
            } : {
                ...state
            }
        }
    }
})

export const {login, logout, loadAnnouncement, loadInsurance} = actions

export default configureStore({reducer})