import React, {lazy} from "react";

const CustomizableTable = lazy(() => import('../../global/CustomizableTable'))
const DesignForm = lazy(() => import('./DesignForm'))

const header = {
    number: '상품 번호',
    productName: {
        title: '상품명',
        className: 'w-50'
    },
    author: '작성자',
    update: '수정 시각'
}
const Design = () => {
    return (
        <div className='animated fadeIn'>
            <CustomizableTable tableTitle='설계 중인 보험 상품' tableHeader={header} activeModal
                               modalProps={{
                                   modalTitle: '설계하기',
                                   uploadAction: () => console.log('upload'),
                                   InputForm: DesignForm
                               }}/>
        </div>
    )
}

export default Design