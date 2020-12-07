export default {
    items: [
        {
            name: 'Home',
            url: '/home',
            icon: 'cui-dashboard'
        },
        {
            title: true,
            name: '주요 업무 메뉴',
        },
        {
            name: '상품 개발',
            icon: 'fa fa-flask',
            children: [
                {
                    title: true,
                    name: '상품 기획'
                },
                {
                    name: '상품 기획',
                    url: '/planning',
                },
                {
                    title: true,
                    name: '상품 설계'
                },
                {
                    name: '상품 설계',
                    url: '/design'
                },
                {
                    title: true,
                    name: '상품 인가'
                },
                {
                    name: '상품 인가',
                    url: '/authorize',
                },
                {
                    title: true,
                    name: '상품 사후관리'
                },
                {
                    name: '상품 사후관리',
                    url: '/follow_up_manage',
                },
            ]
        },
        {
            name: 'U/W 관리',
            icon: 'fa fa-gavel',
            children: [
                {
                    title: true,
                    name: '인수 정책 관리'
                },
                {
                    name: '인수 정책 수립',
                    icon: 'fa fa-angle-right',
                    children: [
                        {
                            name: '손해율 관리',
                            url: '/policy_establishment/loss_rate_management',
                            icon: 'fa fa-angle-right',
                        },
                        {
                            name: '인수 지침 등록',
                            url: '/policy_establishment/policy_register',
                            icon: 'fa fa-angle-right',
                        },
                    ]
                },
                {
                    title: true,
                    name: '인수 심사'
                },
                {
                    name: '인수 심사',
                    children: [
                        {
                            name: 'U/W Factor 관리',
                            url: '/screening/manage_factor',
                            icon: 'fa fa-angle-right'
                        },
                        {
                            name: '적부 심사',
                            url: '/screening/examination',
                            icon: 'fa fa-angle-right'
                        },
                    ]
                }
            ]
        },
        {
            name: '상품 영업',
            icon: 'cui-briefcase',
            children: [
                {
                    title: true,
                    name: '영업 지침 관리'
                },
                {
                    name: '영업 지침 관리',
                    url: '/sales_instruction'
                },
                {
                    title: true,
                    name: '영업 관리'
                },
                {
                    name: '영업 관리',
                    children: [
                        {
                            name: '영업 관리',
                            url: '/sales_manage'
                        },
                        {
                            name: '고객 관리',
                            icon: 'fa fa-angle-right',
                            children: [
                                {
                                    name: '고객 관리',
                                    url: '/sales_manage/customer_manage',
                                    icon: 'fa fa-angle-right'
                                },
                                {
                                    name: '가망 고객 확보',
                                    url: '/sales_manage/customer_manage/customer_get',
                                    icon: 'fa fa-angle-double-right'
                                },
                                {
                                    name: '고객 관계 형성',
                                    url: '/sales_manage/customer_manage/customer_relationship',
                                    icon: 'fa fa-angle-double-right'
                                }
                            ]
                        },
                        {
                            name: '상품 관리',
                            icon: 'fa fa-angle-right',
                            children: [
                                {
                                    name: '상품 관리',
                                    url: '/sales_manage/product_manage',
                                    icon: 'fa fa-angle-right'
                                },
                                {
                                    name: '계약 체결',
                                    url: '/sales_manage/product_manage/contract_create',
                                    icon: 'fa fa-angle-double-right'
                                },
                                {
                                    name: '계약 후 관리',
                                    url: '/sales_manage/product_manage/contract_manage',
                                    icon: 'fa fa-angle-double-right'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            name: '상품 보상',
            icon: 'fa fa-dollar',
            children: [
                {
                    title: true,
                    name: '사고 접수'
                },
                {
                    name: '사고 접수 상담',
                    url: '/new_accident/accident_counseling'
                },
                {
                    name: '보험 가입 확인',
                    url: '/new_accident/insurance_subscription_check'
                },
                {
                    name: '사고 접수 진행',
                    url: '/new_accident/accident_register'
                },
                {
                    title: true,
                    name: '사고 현장 처리'
                },
                {
                    name: '사고 현장 처리',
                    url: '/handle_accident'
                },
                {
                    title: true,
                    name: '면/부책 관리'
                },
                {
                    name: '면/부책 판단',
                    url: '/manage_immunity/immunity_judgement'
                },
                {
                    title: true,
                    name: '손해 사정 관리'
                },
                {
                    name: '손해 사정',
                    url: '/manage_damage/damage_assessment'
                }
            ]
        }
    ]
}