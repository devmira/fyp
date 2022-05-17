import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import('./Pages/Dashboard/Default'));
const Dashboard = React.lazy(() => import('./Pages/Dashboard/index'));

const UIBasicButton = React.lazy(() => import('./Pages/UIElements/Basic/Button'));
const UIBasicBadges = React.lazy(() => import('./Pages/UIElements/Basic/Badges'));
const UIBasicBreadcrumbPagination = React.lazy(() => import('./Pages/UIElements/Basic/BreadcrumbPagination'));

const UIBasicCollapse = React.lazy(() => import('./Pages/UIElements/Basic/Collapse'));
const UIBasicTabsPills = React.lazy(() => import('./Pages/UIElements/Basic/TabsPills'));
const UIBasicBasicTypography = React.lazy(() => import('./Pages/UIElements/Basic/Typography'));

const FormsElements = React.lazy(() => import('./Pages/Forms/FormsElements'));

const BootstrapTable = React.lazy(() => import('./Pages/Tables/BootstrapTable'));

const Nvd3Chart = React.lazy(() => import('./Pages/Charts/Nvd3Chart/index'));

const GoogleMap = React.lazy(() => import('./Pages/Maps/GoogleMap/index'));

const CreateCoupon = React.lazy(() => import('./Pages/Other/CreateCoupon'));
const MyCart = React.lazy(() => import('./Pages/Other/MyCart'));
const OtherDocs = React.lazy(() => import('./Pages/Other/Docs'));

const routes = [
    { path: '/dashboard/default', exact: true, name: 'Default', component: DashboardDefault },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/basic/button', exact: true, name: 'Basic Button', component: UIBasicButton },
    { path: '/basic/badges', exact: true, name: 'Basic Badges', component: UIBasicBadges },
    { path: '/basic/breadcrumb-paging', exact: true, name: 'Basic Breadcrumb Pagination', component: UIBasicBreadcrumbPagination },
    { path: '/basic/collapse', exact: true, name: 'Basic Collapse', component: UIBasicCollapse },
    { path: '/basic/tabs-pills', exact: true, name: 'Basic Tabs & Pills', component: UIBasicTabsPills },
    { path: '/basic/typography', exact: true, name: 'Basic Typography', component: UIBasicBasicTypography },
    { path: '/forms/form-basic', exact: true, name: 'Forms Elements', component: FormsElements },
    { path: '/tables/bootstrap', exact: true, name: 'Bootstrap Table', component: BootstrapTable },
    { path: '/charts/nvd3', exact: true, name: 'Nvd3 Chart', component: Nvd3Chart },
    { path: '/maps/google-map', exact: true, name: 'Google Map', component: GoogleMap },
    { path: '/create-coupon', exact: true, name: 'Create Coupon', component: CreateCoupon },
    { path: '/my-cart', exact: true, name: 'MyCart', component: MyCart },
    { path: '/docs', exact: true, name: 'Documentation', component: OtherDocs },
];

export default routes;