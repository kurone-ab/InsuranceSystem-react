import React, {lazy, useState} from "react";
import {Card, CardBody, CardHeader, Table} from 'reactstrap'

const sort = 'fa-sort', desc = 'fa-sort-asc', asc = 'fa-sort-desc'

const GenerateDocumentModal = lazy(() => import('../global/GenerateDocumentModal'))

const BasicTable = ({contentData, tableHeader, activeModal, modalHeader, className, uploadAction, InputForm}) => {

    const modalProps = {modalHeader, className, uploadAction, InputForm}

    const [align, setAlign] = useState({
        number: sort,
        title: sort,
        date: sort,
        author: sort
    })
    const [content, setContent] = useState(contentData)

    const switching = (current) => {
        if (current === asc) return desc
        else return asc
    }

    console.log(contentData)

    const columnAlign = (column) => {
        switch (column) {
            case 'number':
                setAlign({
                    number: switching(align.number),
                    title: sort,
                    date: sort,
                    author: sort
                })
                break
            case 'title':
                setAlign({
                    number: sort,
                    title: switching(align.title),
                    date: sort,
                    author: sort
                })
                break
            case 'date':
                setAlign({
                    number: sort,
                    title: sort,
                    date: switching(align.date),
                    author: sort
                })
                break
            case 'author':
                setAlign({
                    number: sort,
                    title: sort,
                    date: sort,
                    author: switching(align.author)
                })
                break
            default:
                break
        }
    }

    return (
        <Card className="card-accent-primary">
            <CardHeader className='d-flex'>
                <span className='my-auto nanum-gothic font-xl font-weight-bold'>
                    <i className='fa fa-align-justify mr-2'/>{tableHeader}</span>
                {activeModal ? <GenerateDocumentModal {...modalProps}/> : null}
            </CardHeader>
            <CardBody>
                <Table responsive striped className='font-lg'>
                    <thead>
                    <tr>
                        <th>글 번호<i className={`fa ${align.number} ml-2`}
                                                           onClick={() => columnAlign('number')}/></th>
                        <th className='w-50'>제목<i className={`fa ${align.title} ml-2`}
                                                                             onClick={() => columnAlign('title')}/></th>
                        <th>업로드 날짜<i className={`fa ${align.date} ml-2`}
                                                               onClick={() => columnAlign('date')}/></th>
                        <th>작성자<i className={`fa ${align.author} ml-2`}
                                                              onClick={() => columnAlign('author')}/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {contentData.map((row, idx) => {
                        const {id, title, date, authName} = row
                        return(
                            id ? <tr key={idx}>
                                <td>{id}</td>
                                <td>{title}</td>
                                <td>{date}</td>
                                <td>{authName}</td>
                            </tr> : null
                        )
                    })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}

export default BasicTable
