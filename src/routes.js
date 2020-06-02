import {lazy} from "react";

const Home = lazy(() => import('./views/Home/Home'))
const Planning = lazy(() => import('./views/Development/Planning/Planning'))
const Design = lazy(() => import('./views/Development/Design/Design'))
const RateCollection = lazy(() => import('./views/Development/Design/RateCollection/RateCollection'))

const routes = [
    { path: '/home', exact: true, name: 'Home', component: Home },
    { path: '/planning', exact: true, name: 'Planning', component: Planning },
    { path: '/design', exact: true, name: 'Design', component: Design },
    { path: '/design/rate_collection', exact: true, name: 'RateCollection', component: RateCollection },
];

export default routes;