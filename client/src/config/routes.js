const routes = {
	logout: '/auth/logout',
	home: '/',
	notification: '/notification',
	work: '/work',

	//Sinh Vien
	achievement: '/achievement',
	historyRegisterResearch: '/historyRegisterResearch',
	historyRegisterTopic: '/historyRegisterTopic',
	profile: '/profile',
	progressTopic: '/progressTopic',
	registerResearch: '/registerResearch',
	registerTopic: '/registerTopic',
	detailResearch: '/detailResearch/:id',
	detailTopic:'/detailTopic/:id',
	login: '/auth/login',
	//Giang Vien
	topicGroup: '/topicGroup',
	addTopic: '/addTopic',
	trackProgress: '/trackProgress',
	trackProgressDetail: '/trackProgressDetail',
	setupProgress: '/setupProgress',
	approvalTopic: '/approvalTopic',
	listTopic: '/listTopic',
	chargeOfTopic: '/chargeOfTopic',
	listTopicDetail: '/listTopicDetail',
	approvalTopicDetail: '/approvalTopicDetail',
	chargeOfTopicDetail: '/chargeOfTopicDetail',
	listCouncil: '/listCouncil',
	makeScoreCard: '/makeScoreCard',
	listScoreCard: '/listScoreCard',
	//admin
	appointmentOfTeacher: '/appointmentOfTeacher',
	addCouncil: '/addCouncil',
	addResearch: '/addResearch',
	reviewTopic: '/reviewTopic',
};

export default routes;
