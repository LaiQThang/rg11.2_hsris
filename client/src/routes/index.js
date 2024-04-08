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
import reviewTopic from '~/pages/sidebarPages/reviewTopic/reviewTopic';
import RequireAuth from '~/Components/Auth/RequiedAuth';
import addResearch from '~/pages/sidebarPages/addResearch/addResearch';
import detailReviewTopic from '~/pages/sidebarPages/detailReviewTopic/detailReviewTopic';
import awardReview from '~/pages/sidebarPages/awardReview/awardReview';
import AddStudent from '~/pages/sidebarPages/AddStudent/AddStudent';
import AddTeacher from '~/pages/sidebarPages/AddTeacher/AddTeacher';
import PermissionType from '~/pages/sidebarPages/PermissionType/PermissionType';
import Decentralization from '~/pages/sidebarPages/Decentralization/Decentralization';
import AddStudentFile from '~/pages/sidebarPages/AddStudentFile/AddStudentFile';
import AddTeacherFile from '~/pages/sidebarPages/AddTeacherFile/AddTeacherFile';

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
	{ path: config.routes.detailResearch, component: DetailResearch, auth: RequireAuth },
	{ path: config.routes.detailTopic, component: DetailTopic, auth: RequireAuth },
	{ path: config.routes.login, component: Login, layout: null },
	// { path: config.routes.login, component: Login, layout: null },
	{ path: config.routes.logout, component: Logout, auth: RequireAuth },
	{ path: config.routes.addTopic, component: AddTopic, auth: RequireAuth },
	{ path: config.routes.trackProgress, component: TrackProgress, auth: RequireAuth },
	{ path: config.routes.setupProgress, component: SetupProgress, auth: RequireAuth },
	{ path: config.routes.topicGroup, component: TopicGroup, auth: RequireAuth },
	{ path: config.routes.trackProgressDetail, component: TrackProgressDetail, auth: RequireAuth },
	{ path: config.routes.reviewTopic, component: reviewTopic, auth: RequireAuth },
	{ path: config.routes.addResearch, component: addResearch, auth: RequireAuth },
	{ path: config.routes.approvalTopic, component: ApprovalTopic, auth: RequireAuth },
	{ path: config.routes.chargeOfTopic, component: ChargeOfTopic, auth: RequireAuth },
	{ path: config.routes.listTopic, component: ListTopic, auth: RequireAuth },
	{ path: config.routes.listTopicDetail, component: ListTopicDetail, auth: RequireAuth },
	{ path: config.routes.approvalTopicDetail, component: ApprovalTopicDetail, auth: RequireAuth },
	{ path: config.routes.chargeOfTopicDetail, component: ChargeOfTopicDetail, auth: RequireAuth },
	{ path: config.routes.listCouncil, component: ListCouncil, auth: RequireAuth },
	{ path: config.routes.makeScoreCard, component: MakeScoreCard, auth: RequireAuth },
	{ path: config.routes.listScoreCard, component: ListScoreCard, auth: RequireAuth },
	{ path: config.routes.appointmentOfTeacher, component: AppointmentOfTeacher, auth: RequireAuth },
	{ path: config.routes.addCouncil, component: AddCouncil, auth: RequireAuth },
	{ path: config.routes.detailReviewTopic, component: detailReviewTopic, auth: RequireAuth },
	{ path: config.routes.awardReview, component: awardReview, auth: RequireAuth },
	{ path: config.routes.addStudent, component: AddStudent, auth: RequireAuth },
	{ path: config.routes.addTeacher, component: AddTeacher, auth: RequireAuth },
	{ path: config.routes.permissionType, component: PermissionType, auth: RequireAuth },
	{ path: config.routes.decentralization, component: Decentralization, auth: RequireAuth },
	{ path: config.routes.addStudentFile, component: AddStudentFile, auth: RequireAuth },
	{ path: config.routes.addTeacherFile, component: AddTeacherFile, auth: RequireAuth },

];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
