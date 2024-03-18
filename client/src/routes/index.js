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
import ListTopic from '~/pages/sidebarPages/ListTopic/ListTopic';
import ApprovalTopic from '~/pages/sidebarPages/ApprovalTopic/ApprovalTopic';
import ChargeOfTopic from '~/pages/sidebarPages/ChargeOfTopic/ChargeOfTopic';
import ListTopicDetail from '~/pages/sidebarPages/ListTopic/ListTopicDetail';
import ApprovalTopicDetail from '~/pages/sidebarPages/ApprovalTopic/ApprovalTopicDetail';
import ChargeOfTopicDetail from '~/pages/sidebarPages/ChargeOfTopic/ChargeOfTopicDetail';
import ListCouncil from '~/pages/sidebarPages/ListCouncil/ListCouncil';
import MakeScoreCard from '~/pages/sidebarPages/MakeScoreCard/MakeScoreCard';
import ListScoreCard from '~/pages/sidebarPages/ListScoreCard/ListScoreCard';
import AppointmentOfTeacher from '~/pages/sidebarPages/AppointmentOfTeacher/AppointmentOfTeacher';
import AddCouncil from '~/pages/sidebarPages/AddCouncil/AddCouncil';
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
	{ path: config.routes.detailResearch, component: DetailResearch },
	{ path: config.routes.login, component: Login, layout: null },
	{ path: config.routes.login, component: Login, layout: null },
	{ path: config.routes.logout, component: Logout },
	{ path: config.routes.addTopic, component: AddTopic },
	{ path: config.routes.trackProgress, component: TrackProgress },
	{ path: config.routes.setupProgress, component: SetupProgress },
	{ path: config.routes.topicGroup, component: TopicGroup },
	{ path: config.routes.trackProgressDetail, component: TrackProgressDetail },
	{ path: config.routes.approvalTopic, component: ApprovalTopic },
	{ path: config.routes.chargeOfTopic, component: ChargeOfTopic },
	{ path: config.routes.listTopic, component: ListTopic },
	{ path: config.routes.listTopicDetail, component: ListTopicDetail },
	{ path: config.routes.approvalTopicDetail, component: ApprovalTopicDetail },
	{ path: config.routes.chargeOfTopicDetail, component: ChargeOfTopicDetail },
	{ path: config.routes.listCouncil, component: ListCouncil },
	{ path: config.routes.makeScoreCard, component: MakeScoreCard },
	{ path: config.routes.listScoreCard, component: ListScoreCard },
	{ path: config.routes.appointmentOfTeacher, component: AppointmentOfTeacher },
	{ path: config.routes.addCouncil, component: AddCouncil },

const privateRoutes = [];

export { publicRoutes, privateRoutes };
