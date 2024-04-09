import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faChevronDown, faChevronUp, faGear, faMortarBoard, faReceipt } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import img from '~/assets/img';
import Image from '~/Components/Image';
import Menu from '~/Components/Menu';
import { MenuItem } from '~/Components/Menu';
import * as Result from '~/apiService/authService'
import './Sidebar.css';
import { useAuth } from '~/Components/Auth';
const cx = classNames.bind(styles);

function ParentMenuItem({ icon, text, children }) {
	const [isChildVisible, setIsChildVisible] = useState(false);
	const toggleMenuItems = () => {
		setIsChildVisible(!isChildVisible);
	};
	return (
		<div className={cx('menu-item')}>
			<div className={cx('menu-item-parent')} onClick={toggleMenuItems}>
				<FontAwesomeIcon icon={icon} className={cx('icon')} />
				<div className={cx('menu-item-text')}>{text}</div>
				<FontAwesomeIcon icon={isChildVisible ? faChevronUp : faChevronDown} className={cx('icon')} />
			</div>
			{isChildVisible && <div className={cx('menu-item-child' /*hidden*/)}>{children}</div>}
		</div>
	);
}

function Sidebar() {
	const [permission,setPermission] = useState('')
	const [infor,setInfor] = useState({})
	const auth = useAuth()
	const username = auth.getEmails()
	const tokenBearer = auth.getTokens()
	const fetchApi = async()=>{
		let result;
		result = await Result.profileStudent(username,tokenBearer.access_token);
		return result;
	}
	const fetchApiPermission = async(id)=>{
		let result;
		result = await Result.permission(id, tokenBearer.access_token);
		return result;
	}
	function callApi(){
		return new Promise(function(resolve,reject){
			console.log("call API create User");
			const res = fetchApi();
			if(res){
				resolve(res);
			} 
			reject('Error');
		});
	}
	useEffect(()=>{
	callApi()
		.then(function(res){
			setInfor(res)
			return  fetchApiPermission(res.permissionId)
		})
		.then(function(res) {
			setPermission(res.data);
		})
		.catch(function(error){
			console.log(error);
		});
	},[])
	console.log(infor)
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('img-frame')}>
					<Link to={config.routes.home}>
						<img className={cx('img-logo')} src={img.logo} alt="HSRIS" />
					</Link>
					{/* {console.log(closeButton)} */}
				</div>
				<div className={cx('user-infor')}>
				<img className={cx('user-avatar')} alt="" src={infor.avatar}/>
					<div className={cx('user-decs')}>
						<div className={cx('user-name')}>{infor.name}</div>
						<div className={cx('user-class')}>{infor.code}</div>
					</div>
				</div>

				{/* ----------------Menu Sidebar----------------- */}
				<Menu className={cx('menu-list')}>
					{
						permission === 'sinhvien' && (
							<>
							<ParentMenuItem icon={faMortarBoard} text="Hướng nghiên cứu">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Đăng ký'} to={config.routes.registerResearch} />
							<MenuItem text={'Lịch sử đăng ký'} to={config.routes.historyRegisterResearch} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faMortarBoard} text="Quản lý đề tài">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Đăng ký đề tài'} to={config.routes.registerTopic} />
							<MenuItem text={'Tiến độ đề tài'} to={config.routes.progressTopic} />
							<MenuItem text={'Lịch sử đăng ký'} to={config.routes.historyRegisterTopic} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faGear} text="Quản lý tài khoản">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Hồ sơ cá nhân'} to={config.routes.profile} />
							<MenuItem text={'Thành tích'} to={config.routes.achievement} />
						</div>
					</ParentMenuItem>
							</>
						)
					}
					{
						permission === 'giangvien' && (
							<>
					<ParentMenuItem icon={faBox} text="Quản lý chung">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Phân nhóm đề tài'} to={config.routes.topicGroup} />
							<MenuItem text={'Lập đợt tiến độ'} to={config.routes.setupProgress} />
							<MenuItem text={'Theo dõi tiến độ'} to={config.routes.trackProgress} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faMortarBoard} text="Quản lý đề tài">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Thêm đề tài'} to={config.routes.addTopic} />
							<MenuItem text={'Đề tài chờ duyệt'} to={config.routes.approvalTopic} />
							<MenuItem text={'Danh sách đề tài (UPDATING)'} to={config.routes.listTopic} />
							<MenuItem text={'Đề tài phụ trách (UPDATING)'} to={config.routes.chargeOfTopic} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faReceipt} text="Quản lý hội đồng">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Lập phiếu đểm'} to={config.routes.makeScoreCard} />
							<MenuItem text={'Danh sách hội đồng (UPDATING)'} to={config.routes.listCouncil} />
							<MenuItem text={'Danh sách phiếu điểm (UPDATING)'} to={config.routes.listScoreCard} />
						</div>
					</ParentMenuItem>
							</>
						)
					}
					{
						permission === 'admin' && (
							<>
					<ParentMenuItem icon={faBox} text="Quản lý tài khoản">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Quản lý sinh viên'} to={config.routes.studentManagement} />
							<MenuItem text={'Quản lý giảng viên'} to={config.routes.teacherManagement} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faBox} text="Quản lý phân quyền">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Quản lý phân quyền'} to={config.routes.addStudent} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faBox} text="Quản lý chung">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Thêm hướng nghiên cứu'} to={config.routes.addResearch} />
							<MenuItem text={'Xét duyệt đề tài'} to={config.routes.reviewTopic} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faMortarBoard} text="Quản lý hội đồng">
						<div className={cx('menu-frame')}>
							{/*<MenuItem text={'Phân công giảng viên'} to={config.routes.appointmentOfTeacher}/>*/}
							<MenuItem text={'Thêm hội đồng'} to={config.routes.addCouncil} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faMortarBoard} text="Quản lý giải">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Xét giải'} to={config.routes.awardReview} />
						</div>
					</ParentMenuItem>
							</>
						)
					}
				</Menu>
			</div>
			<div className={cx('logout')}>
				<a href="/auth/login">Đăng xuất</a>
				<p>Phiên bản 1.0</p>
				<p>Website được phát triển bởi RG11.11</p>
				<p>Nghiên cứu khoa học 2023-2024</p>
			</div>
		</div>
	);
}

export default Sidebar;
