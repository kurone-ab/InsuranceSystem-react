import React, {lazy, useState} from "react";
import {Card, CardBody, CardHeader, Table} from 'reactstrap'
import propTypes from 'prop-types'

const sort = 'fa-sort', desc = 'fa-sort-asc', asc = 'fa-sort-desc'

const GenerateDocumentModal = lazy(() => import('../global/GenerateDocumentModal'))

const defaultHeader = {
    number: '글 번호',
    title: {
        title: '제목',
        className: 'w-50'
    },
    date: '업로드 날짜',
    author: '작성자'
}

const CustomizableTable = ({
                               contentData, tableTitle, tableHeader = defaultHeader, activeModal, modalProps
                           }) => {
    //set default
    const temp = {}
    Object.keys(tableHeader).forEach((header) => {
        temp[header] = sort
    })

    const [align, setAlign] = useState(temp)
    const [content, setContent] = useState(contentData)

    const switching = (current) => current === asc ? desc : asc


    const columnAlign = (column) => {
        const newAlign = {}
        Object.keys(align).forEach((header) => {
            newAlign[header] = header === column ? switching(align[column]) : sort
        })
        setAlign(newAlign);
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
                            Object.keys(tableHeader).map((header, idx) => {
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
                                    {Object.keys(row).map((key, idx) => {
                                        return (
                                            <td key={idx} className='nanum-gothic'>{row[key]}</td>
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
