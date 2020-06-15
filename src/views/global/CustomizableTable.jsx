import React, {lazy, useState} from "react";
import {Card, CardBody, CardHeader, Table} from 'reactstrap'
import propTypes from 'prop-types'
import ReadContentModal from "./ReadContentModal";
import axios from 'axios';
import {asc as ascSort, desc as descSort} from "../../comparator";

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8080'

const sort = 'fa-sort', desc = 'fa-sort-asc', asc = 'fa-sort-desc'

const GenerateDocumentModal = lazy(() => import('../global/GenerateDocumentModal'))

const defaultHeader = {
    id: '글 번호',
    title: {
        title: '제목',
        className: 'w-50'
    },
    date: '업로드 날짜',
    author: '작성자'
}

const BaseTable = ({tableHeader, tableRowData, retrieveForm: RetrieveForm}) => {
    //set default
    const temp = {}
    const contentOpenState = {}

    KEYS(tableHeader).forEach((header) => {
        temp[header] = sort
    })
    const [align, setAlign] = useState(temp)
    const [content, setContent] = useState(tableRowData)
    const [open, setOpen] = useState(contentOpenState)

    const switching = (current) => current === asc ? desc : asc
    const sortSwitching = (current) => current === asc ? ascSort : descSort

    const columnAlign = (column) => {
        const newAlign = {}
        KEYS(align).forEach((header) => {
            newAlign[header] = header === column ? switching(align[column]) : sort
        })
        const newContent = content.sort((a, b) => {
            const {title: aTitle} = a[column]
            const {title: bTitle} = b[column]
            return sortSwitching(newAlign[column])(aTitle ? aTitle : a[column], bTitle ? bTitle : b[column])
        })
        setContent(newContent)
        setAlign(newAlign)
    }

    const specificOpenState = (id) => {
        contentOpenState[id] = true
        setOpen({...contentOpenState})
    }
    return(
        <Table responsive borderless striped className='font-lg'>
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
                                const {title, id} = row[key];
                                contentOpenState[id] = false
                                return (
                                    <td key={idx}>
                                        {
                                            title ?
                                                //eslint-disable-next-line
                                                <a href='#' onClick={(e) => {
                                                    e.preventDefault()
                                                    specificOpenState(id)
                                                }}>{title}</a> :
                                                <div className='nanum-gothic'>{row[key]}</div>
                                        }
                                        {
                                            title ? <ReadContentModal open={open[id] ? open[id] : false}
                                                                      toggleFunc={() => {
                                                                          specificOpenState(-1)
                                                                      }} title={title}
                                                                      content={<RetrieveForm id={id}/>}/> : null
                                        }
                                    </td>
                                )
                            })}
                        </tr>
                    )
                }) : null
            }
            </tbody>
        </Table>
    )
}

const KEYS = (target) => Object.keys(target)
const CustomizableTable = ({
                               tableRowData, tableTitle, tableHeader = defaultHeader, retrieveForm: RetrieveForm, activeModal, modalProps, noCard
                           }) => {

    return (noCard ?
            <>
                <div className='d-flex align-content-end'>{activeModal ? <GenerateDocumentModal {...modalProps}/> : null}</div>
                <BaseTable tableHeader={tableHeader} tableRowData={tableRowData} retrieveForm={RetrieveForm}/>
            </> :
            <Card className="card-accent-primary">
                <CardHeader className='d-flex'>
                <span className='my-auto nanum-gothic font-lg'>
                    <i className='fa fa-align-justify mr-2'/>{tableTitle}</span>
                    {activeModal ? <GenerateDocumentModal {...modalProps}/> : null}
                </CardHeader>
                <CardBody>
                    <BaseTable tableHeader={tableHeader} tableRowData={tableRowData} retrieveForm={RetrieveForm}/>
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
