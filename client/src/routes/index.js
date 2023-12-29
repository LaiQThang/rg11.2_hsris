import config from '~/config';

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
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };