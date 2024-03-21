import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faChevronDown, faChevronUp, faGear, faMortarBoard, faReceipt } from '@fortawesome/free-solid-svg-icons';

import * as Result from '~/apiService/authService'
import config from '~/config';
import img from '~/assets/img';
import Image from '~/Components/Image';
import Menu from '~/Components/Menu';
import { MenuItem } from '~/Components/Menu';
import { Button } from 'react-bootstrap';
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
		result = await Result.permission(id);
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
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('img-frame')}>
					<Link to={config.routes.home}>
						<img className={cx('img-logo')} src={img.logo} alt="HSRIS" />
					</Link>
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
						permission === 'sinhvien' && (<>
						<ParentMenuItem icon={faMortarBoard} text="Hướng Nghiên Cứu">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Đăng Ký'} to={config.routes.registerResearch} />
							<MenuItem text={'Lịch Sử Đăng Ký'} to={config.routes.historyRegisterResearch} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faMortarBoard} text="Quản Lý Đề Tài">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Đăng ký đề tài'} to={config.routes.registerTopic} />
							<MenuItem text={'Tiến Độ Đề Tài'} to={config.routes.progressTopic} />
							<MenuItem text={'Lịch Sử Đăng Ký'} to={config.routes.historyRegisterTopic} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faGear} text="Quản Lý Tài Khoản">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Hồ Sơ Cá Nhân'} to={config.routes.profile} />
							<MenuItem text={'Thành Tích'} to={config.routes.achievement} />
						</div>
					</ParentMenuItem>
						</>)
					}
					{
						permission === 'giangvien' && (
							<>
							<ParentMenuItem text="Giáo Viên"></ParentMenuItem>
					<ParentMenuItem icon={faBox} text="Quản Lý Chung">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Phân Nhóm Đề Tài'} to={config.routes.topicGroup} />
							<MenuItem text={'Lập Đợt Tiến Độ'} to={config.routes.setupProgress} />
							<MenuItem text={'Theo Dõi Tiến Độ'} to={config.routes.trackProgress} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faMortarBoard} text="Quản Lý Đề Tài">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Thêm đề tài'} to={config.routes.addTopic} />
							<MenuItem text={'Danh Sách Đề Tài'} to={config.routes.listTopic} />
							<MenuItem text={'Đề Tài Chờ Duyệt'} to={config.routes.approvalTopic} />
							<MenuItem text={'Đề Tài Phụ Trách'} to={config.routes.chargeOfTopic} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faReceipt} text="Quản Lý Hội Đồng">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Danh Sách Hội Đồng'} to={config.routes.listCouncil} />
							<MenuItem text={'Lập Phiếu Điểm'} to={config.routes.makeScoreCard} />
							<MenuItem text={'Danh Sách Phiếu Điểm'} to={config.routes.listScoreCard} />
						</div>
					</ParentMenuItem>
							</>
						)
					}
					{
						permission === 'admin' && (
							<>
							<ParentMenuItem text="Quản Trị Viên"></ParentMenuItem>
					<ParentMenuItem icon={faBox} text="Quản Lý HNC">
						<div className={cx('menu-frame')}>
							<MenuItem text={'Phân Công Giảng Viên'} to={config.routes.appointmentOfTeacher} />
							<MenuItem text={'Thêm Hội Đồng'} to={config.routes.addCouncil} />
							<MenuItem text={'Theo Dõi Tiến Độ'} to={config.routes.trackProgress} />
						</div>
					</ParentMenuItem>
					<ParentMenuItem icon={faMortarBoard} text="Quản Lý Đề Tài">
						<div className={cx('menu-frame')}>
							<MenuItem title={'Thêm HNC'} to={config.routes.addResearch} />
							<MenuItem title={'Xét duyệt đề tài'} to={config.routes.reviewTopic} />
						</div>
					</ParentMenuItem>
							</>
						)
					}
				</Menu>
			</div>
			<div className={cx('logout')}>
				<a href="auth/login">Đăng xuất</a>
				<p>Phiên bản 1.0</p>
				<p>Website được phát triển bởi RG11.11</p>
				<p>Nghiên cứu khoa học 2023-2024</p>
			</div>
		</div>
	);
}

export default Sidebar;
