import config from '~/config';

import Logout from '~/pages/Logout';
import Home from '~/pages/headerPages/Home';
import Notification from '~/pages/headerPages/Notification';
import Work from '~/pages/headerPages/Work';
import Achievement from '~/pages/sidebarPages/Achievement/Achievement';
import HistoryRegisterResearch from '~/pages/sidebarPages/HistoryRegisterResearch/HistoryRegisterResearch';
import HistoryRegisterTopic from '~/pages/sidebarPages/HistoryRegisterTopic/HistoryRegisterTopic';
import ProFile from '~/pages/sidebarPages/ProFile/ProFile';
import ProgressTopic from '~/pages/sidebarPages/ProgressTopic/ProgressTopic';
import RegisterResearch from '~/pages/sidebarPages/RegisterResearch/RegisterResearch';
import RegisterTopic from '~/pages/sidebarPages/RegisterTopic/RegisterTopic';
import Login from '~/pages/Login/login';

import AddTopic from '~/pages/sidebarPages/AddTopic/AddTopic';
import TrackProgress from '~/pages/sidebarPages/TrackProgress/TrackProgress';
import TrackProgressDetail from '~/pages/sidebarPages/TrackProgress/TrackProgressDetail';
import SetupProgress from '~/pages/sidebarPages/SetupProgress/SetupProgress';
import TopicGroup from '~/pages/sidebarPages/TopicGroup/TopicGroup';
const publicRoutes = [
	{ path: config.routes.home, component: Home },
	{ path: config.routes.notification, component: Notification },
	{ path: config.routes.work, component: Work },
	{ path: config.routes.achievement, component: Achievement },
	{ path: config.routes.historyRegisterResearch, component: HistoryRegisterResearch },
	{ path: config.routes.historyRegisterTopic, component: HistoryRegisterTopic },
	{ path: config.routes.profile, component: ProFile },
	{ path: config.routes.progressTopic, component: ProgressTopic },
	{ path: config.routes.registerResearch, component: RegisterResearch },
	{ path: config.routes.registerTopic, component: RegisterTopic },
	{ path: config.routes.login, component: Login, layout: null },
	{ path: config.routes.logout, component: Logout },

	{ path: config.routes.addTopic, component: AddTopic },
	{ path: config.routes.trackProgress, component: TrackProgress },
	{ path: config.routes.setupProgress, component: SetupProgress },
	{ path: config.routes.topicGroup, component: TopicGroup },
	{ path: config.routes.trackProgressDetail, component: TrackProgressDetail },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
