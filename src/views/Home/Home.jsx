import React,{useState, useEffect} from "react";
import axios from 'axios';

const Home = (props) => {
    const [state, setState] = useState({});
    const callback = (data) => {
        console.log(data)
        // setState({id: data.id});
    }

    const ax = () => {
        axios.post('/test', {name: "sj99@pheonix.com", password: 'psj'}, {baseURL: 'http://localhost:8080', withCredentials: true,}).then(r => callback(r.data))
    }

    return(
        <div>Home {state.id} <input type="button" onClick={ax}/></div>
    )
}

export default Home