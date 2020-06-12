import {lazy} from "react";

const Home = lazy(() => import('./views/Home/Home'))
const Planning = lazy(() => import('./views/Development/Planning/Planning'))
const Design = lazy(() => import('./views/Development/Design/Design'))
const RateCollection = lazy(() => import('./views/Development/Design/RateCollection/RateCollection'))
const Authorize = lazy(() => import('./views/Development/Authorize/Authorize'))

const routes = [
    { path: '/home', name: 'Home', component: Home },
    { path: '/planning', name: 'Planning', component: Planning },
    { path: '/design', exact: true, name: 'Design', component: Design },
    { path: '/design/rate_collection', name: 'RateCollection', component: RateCollection },
    { path: '/authorize', name: 'Authorize', component: Authorize },
];

export default routes;