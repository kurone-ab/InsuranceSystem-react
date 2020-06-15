import {lazy} from "react";

const Home = lazy(() => import('./views/Home/Home'))
const Planning = lazy(() => import('./views/Development/Planning/Planning'))
const Design = lazy(() => import('./views/Development/Design/Design'))
const RateCollection = lazy(() => import('./views/Development/Design/RateCollection/RateCollection'))
const Authorize = lazy(() => import('./views/Development/Authorize/Authorize'))
const FollowUpManage = lazy(() => import('./views/Development/FollowUpManage/FollowUpManage'))
const PolicyEstablishment = lazy(() => import('./views/UnderWriting/PolicyEstablishment/PolicyEstablishment'))
const LossRateManagement = lazy(() => import('./views/UnderWriting/PolicyEstablishment/LossRateManagement'))
const PolicyRegister = lazy(() => import('./views/UnderWriting/PolicyEstablishment/PolicyRegister'))
const Screening = lazy(() => import('./views/UnderWriting/Screening/Screening'))
const ManageFactor = lazy(() => import('./views/UnderWriting/Screening/ManageFactor'))
const Examination = lazy(() => import('./views/UnderWriting/Screening/Examination/Examination'))
const Reinsurance = lazy(() => import('./views/UnderWriting/Screening/Examination/Reinsurance'))
const JointInsurance = lazy(() => import('./views/UnderWriting/Screening/Examination/JointInsurance'))
const SalesInstruction = lazy(() => import('./views/Sales/SalesInstruction/SalesInstruction'))
const SalesManage = lazy(() => import('./views/Sales/SalesManage/SalesManage'))
const CustomerGet = lazy(() => import('./views/Sales/SalesManage/CustomerManage/CustomerGet'))
const CustomerRelationship = lazy(() => import('./views/Sales/SalesManage/CustomerManage/CustomerRelationship'))
const ProductManage = lazy(() => import('./views/Sales/SalesManage/ProductManage/ProductManage'))
const ContractCreate = lazy(() => import('./views/Sales/SalesManage/ProductManage/ContractCreate'))
const ContractManage = lazy(() => import('./views/Sales/SalesManage/ProductManage/ContractManage'))
const AccidentCounseling = lazy(() => import('./views/Compensation/NewAccident/AccidentCounseling'))
const InsuranceSubscriptionCheck = lazy(() => import('./views/Compensation/NewAccident/InsuranceSubscriptionCheck'))
const AccidentRegister = lazy(() => import('./views/Compensation/NewAccident/AccidentRegister'))
const HandleAccident = lazy(() => import('./views/Compensation/HandleAccident/HandleAccident'))
const ImmunityJudgement = lazy(() => import('./views/Compensation/ManageImmunity/ImmunityJudgement'))
const DamageAssessment = lazy(() => import('./views/Compensation/ManageDamage/DamageAssessment'))

const routes = [
    { path: '/home', name: 'Home', component: Home },
    { path: '/planning', name: '상품 기획', component: Planning },
    { path: '/design', exact: true, name: '상품 설계', component: Design },
    { path: '/design/rate_collection', name: '요율 수집/관리', component: RateCollection },
    { path: '/authorize', name: '상품 인가', component: Authorize },
    { path: '/follow_up_manage', name: '상품 사후관리', component: FollowUpManage },
    { path: '/policy_establishment', exact: true, name: '인수 정책 수립', component: PolicyEstablishment },
    { path: '/policy_establishment/loss_rate_management', name: '손해율 관리', component: LossRateManagement },
    { path: '/policy_establishment/policy_register', name: '인수 지침 등록', component: PolicyRegister },
    { path: '/screening', exact: true, name: '인수 심사', component: Screening },
    { path: '/screening/manage_factor', name: 'U/W Factor 관리', component: ManageFactor },
    { path: '/screening/examination', exact: true, name: '적부 심사', component: Examination },
    { path: '/screening/examination/reinsurance', name: '재보험', component: Reinsurance },
    { path: '/screening/examination/joint_insurance', name: '공동 인수', component: JointInsurance },
    { path: '/sales_instruction', name: '영업 지침 관리', component: SalesInstruction },
    { path: '/sales_manage', exact: true, name: '영업 관리', component: SalesManage },
    // { path: '/sales_manage/customer_manage', exact: true, name: '고객 관리', component: Customer },
    { path: '/sales_manage/customer_manage/customer_get', name: '가망 고객 확보', component: CustomerGet },
    { path: '/sales_manage/customer_manage/customer_relationship', name: '고객 관계 형성', component: CustomerRelationship },
    { path: '/sales_manage/product_manage', exact: true, name: '상품 관리', component: ProductManage },
    { path: '/sales_manage/product_manage/contract_create', name: '계약 체결', component: ContractCreate },
    { path: '/sales_manage/product_manage/contract_manage', name: '계약 후 관리', component: ContractManage },
    { path: '/new_accident/accident_counseling', name: '사고 접수 상담', component: AccidentCounseling },
    { path: '/new_accident/insurance_subscription_check', name: '보험 가입 확인', component: InsuranceSubscriptionCheck },
    { path: '/new_accident/accident_register', name: '사고 접수 진행', component: AccidentRegister },
    { path: '/handle_accident', name: '사고 현장 처리', component: HandleAccident },
    { path: '/manage_immunity/immunity_judgement', name: '면/부책 판단', component: ImmunityJudgement },
    { path: '/manage_damage/damage_assessment', name: '손해 사정', component: DamageAssessment },
];

export default routes;