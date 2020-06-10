import axios from 'axios'
import {useEffect, useState} from "react";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

export const usePostAxios = ({instance = axios, url, data}) => {
    const [res, setRes] = useState({
        load: false,
        error: null,
        data: null
    })

    useEffect(() => {
        instance.post(url, data).then(({data}) => {
            setRes({
                load: true,
                error: null,
                data: data
            })
        }).catch(({error})=>{
            setRes({
                load: false,
                error: error,
                data: null
            })
        })
        // eslint-disable-next-line
    }, [])

    return res
}

export const useGetAxios = ({instance = axios, url, callback, necessary}) => {
    const [res, setRes] = useState({
        load: false,
        error: null,
        data: null
    })
    useEffect(() => {
        if (necessary) {
            instance.get(url).then(({data}) => {
                callback ? callback(data) :
                    setRes({
                        load: true,
                        error: null,
                        data: data
                    })
            }).catch(({error})=>{
                setRes({
                    load: false,
                    error: error,
                    data: null
                })
            })
        }
        // eslint-disable-next-line
    }, [])

    return res
}