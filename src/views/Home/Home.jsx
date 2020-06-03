import React, {useState, useEffect} from "react";
import axios from 'axios';

const Home = (props) => {
    const [state, setState] = useState({});


    return (
        <div>
            <div>id &nbsp;&nbsp; {window.sessionStorage.getItem('id')}</div>
            <div>name &nbsp;&nbsp; {window.sessionStorage.getItem('name')}</div>
            <div>authority &nbsp;&nbsp; {window.sessionStorage.getItem('authority')}</div>
        </div>
    )
}

export default Home