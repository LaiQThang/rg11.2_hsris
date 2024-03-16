import config from '~/config';

import Home from '~/pages/headerPages/Home/homePage';
import Notification from '~/pages/headerPages/Notification';
import Work from '~/pages/headerPages/Work';
import Achievement from '~/pages/sidebarPages/Achievement/Achievement';
import HistoryRegisterResearch from '~/pages/sidebarPages/HistoryRegisterResearch/HistoryRegisterResearch';
import HistoryRegisterTopic from '~/pages/sidebarPages/HistoryRegisterTopic/HistoryRegisterTopic';
import ProFile from '~/pages/sidebarPages/ProFile/ProFile';
import ProgressTopic from '~/pages/sidebarPages/ProgressTopic/ProgressTopic';
import RegisterResearch from '~/pages/sidebarPages/RegisterResearch/RegisterResearch';
import DetailResearch from '~/pages/sidebarPages/DetailResearch/DetailResearch';
import DetailTopic from '~/pages/sidebarPages/HistoryProgressTopic/DetailTopic';
import RegisterTopic from '~/pages/sidebarPages/RegisterTopic/RegisterTopic';
import Login from '~/pages/Login/login';
import AddTopic from '~/pages/sidebarPages/AddTopic/AddTopic';
import TrackProgress from '~/pages/sidebarPages/TrackProgress/TrackProgress';
import TrackProgressDetail from '~/pages/sidebarPages/TrackProgress/TrackProgressDetail';
import SetupProgress from '~/pages/sidebarPages/SetupProgress/SetupProgress';
import TopicGroup from '~/pages/sidebarPages/TopicGroup/TopicGroup';
import Logout from '~/pages/Logout';
import reviewTopic from '~/pages/sidebarPages/reviewTopic/reviewTopic';
import RequireAuth from '~/Components/Auth/RequiedAuth';
import addResearch from '~/pages/sidebarPages/addResearch/addResearch';
const publicRoutes = [
	{ path: config.routes.home, component: Home, auth: RequireAuth },
	{ path: config.routes.notification, component: Notification, auth: RequireAuth },
	{ path: config.routes.work, component: Work, auth: RequireAuth },
	{ path: config.routes.achievement, component: Achievement, auth: RequireAuth },
	{ path: config.routes.historyRegisterResearch, component: HistoryRegisterResearch, auth: RequireAuth },
	{ path: config.routes.historyRegisterTopic, component: HistoryRegisterTopic, auth: RequireAuth },
	{ path: config.routes.profile, component: ProFile, auth: RequireAuth },
	{ path: config.routes.progressTopic, component: ProgressTopic, auth: RequireAuth },
	{ path: config.routes.registerResearch, component: RegisterResearch, auth: RequireAuth },
	{ path: config.routes.registerTopic, component: RegisterTopic, auth: RequireAuth },
	{ path: config.routes.detailResearch, component: DetailResearch, auth: RequireAuth},
	{ path: config.routes.detailTopic, component: DetailTopic, auth: RequireAuth},
	{ path: config.routes.login, component: Login, layout: null},
	// { path: config.routes.login, component: Login, layout: null },
	{ path: config.routes.logout, component: Logout, auth: RequireAuth },
	{ path: config.routes.addTopic, component: AddTopic, auth: RequireAuth },
	{ path: config.routes.trackProgress, component: TrackProgress, auth: RequireAuth },
	{ path: config.routes.setupProgress, component: SetupProgress, auth: RequireAuth },
	{ path: config.routes.topicGroup, component: TopicGroup, auth: RequireAuth },
	{ path: config.routes.trackProgressDetail, component: TrackProgressDetail, auth: RequireAuth },
	{ path: config.routes.reviewTopic, component: reviewTopic, auth: RequireAuth },
	{ path: config.routes.addResearch, component: addResearch, auth: RequireAuth },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
