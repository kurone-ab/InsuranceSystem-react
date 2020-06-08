import {asc, desc} from "./comparator";
import axios from "axios";
import FileDownload from "js-file-download";

const fileDownload = (url, id, filename) => {
    axios.get(`${url}?id=${id}`, {
        baseURL: 'http://localhost:8080',
        withCredentials: true,
        responseType: "blob"
    }).then(r=>FileDownload(new Blob([r.data]), filename))
}

export {asc, desc, fileDownload}