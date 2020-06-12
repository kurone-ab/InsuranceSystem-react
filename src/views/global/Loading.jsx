import React from "react";
import {Spinner} from 'reactstrap'

const Loading = () =>
    <div className="animated fadeIn pt-1 d-flex justify-content-center">
        <Spinner color="primary"/>
    </div>

export default Loading