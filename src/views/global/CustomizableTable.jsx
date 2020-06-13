import React, {lazy, useState} from "react";
import {Card, CardBody, CardHeader, Table} from 'reactstrap'
import propTypes from 'prop-types'
import ReadContentModal from "./ReadContentModal";
import axios from 'axios';

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const sort = 'fa-sort', desc = 'fa-sort-asc', asc = 'fa-sort-desc'

const GenerateDocumentModal = lazy(() => import('../global/GenerateDocumentModal'))
const readContentModal = lazy(() => import('../global/ReadContentModal'))

const defaultHeader = {
    number: '글 번호',
    title: {
        title: '제목',
        className: 'w-50'
    },
    date: '업로드 날짜',
    author: '작성자'
}

const KEYS = (target) => Object.keys(target)
const CustomizableTable = ({
                               tableRowData, tableTitle, tableHeader = defaultHeader, retrieveDataList, activeModal, modalProps
                           }) => {
    //set default
    const temp = {}
    const contentOpenState = {}

    KEYS(tableHeader).forEach((header) => {
        temp[header] = sort
    })
    KEYS(retrieveDataList).forEach((data) => {
        contentOpenState[data] = false
    })
    const [align, setAlign] = useState(temp)
    const [content, setContent] = useState(tableRowData)
    const [open, setOpen] = useState(contentOpenState)

    const switching = (current) => current === asc ? desc : asc

    const columnAlign = (column) => {
        const newAlign = {}
        KEYS(align).forEach((header) => {
            newAlign[header] = header === column ? switching(align[column]) : sort
        })
        setAlign(newAlign);
    }

    const specificOpenState = (id) => {
        contentOpenState[id] = true
        setOpen({...contentOpenState});
    }

    return (
        <Card className="card-accent-primary">
            <CardHeader className='d-flex'>
                <span className='my-auto nanum-gothic font-xl font-weight-bold'>
                    <i className='fa fa-align-justify mr-2'/>{tableTitle}</span>
                {activeModal ? <GenerateDocumentModal {...modalProps}/> : null}
            </CardHeader>
            <CardBody>
                <Table responsive striped className='font-lg'>
                    <thead>
                    <tr>
                        {
                            KEYS(tableHeader).map((header, idx) => {
                                const {title = tableHeader[header], className = ''} = tableHeader[header]
                                return <th key={idx} className={`${className} nanum-gothic`}>
                                    {title}
                                    <i className={`fa ${align[header]} ml-2`} onClick={() => columnAlign(header)}/>
                                </th>
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        content ? content.map((row, idx) => {
                            return (
                                <tr key={idx}>
                                    {KEYS(row).map((key, idx) => {
                                        const {title, baseUrl, id, contentDispatcher} = row[key];
                                        return (
                                            <td key={idx}>
                                                {
                                                    //eslint-disable-next-line
                                                    title ?
                                                        <a href='#' onClick={(e) => {
                                                            e.preventDefault()
                                                            specificOpenState(id)
                                                            axios.get(`${baseUrl}?id=${id}`).then(r => contentDispatcher(r.data))
                                                        }}>{title}</a> :
                                                        <div className='nanum-gothic'>{row[key]}</div>
                                                }
                                                {title ? <ReadContentModal open={open[id] ? open[id] : false}
                                                                           toggleFunc={() => {
                                                                               specificOpenState(-1)
                                                                           }} title={title}
                                                                           content={retrieveDataList[id]}
                                                                           url={`${baseUrl}?id=${id}`}
                                                                           contentDispatcher={contentDispatcher}/> : null}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        }) : null
                    }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

CustomizableTable.propTypes = {
    contentData: propTypes.array,
    tableTitle: propTypes.string.isRequired,
    tableHeader: propTypes.object,
    activeModal: propTypes.bool,
    modalProps: propTypes.object
}

export default CustomizableTable
