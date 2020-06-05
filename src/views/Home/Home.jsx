import React, {useState} from "react";
import axios from 'axios';
import {asc, desc} from "../../comparator";

const Home = (props) => {
    const [state, setState] = useState({});

    const listTest = () => {
        axios.post("/api/auth", {}, {
            baseURL: 'http://localhost:8080',
            withCredentials: true
        }).then(r => console.log(r.data))
    }

    return (
        <div>
            <div>id &nbsp;&nbsp; {window.sessionStorage.getItem('id')}</div>
            <div>name &nbsp;&nbsp; {window.sessionStorage.getItem('name')}</div>
            <div>authority &nbsp;&nbsp; {window.sessionStorage.getItem('authority')}</div>
            <button onClick={listTest}/>
        </div>
    )
}

export default Home