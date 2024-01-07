import { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faChevronDown, faChevronUp, faGear, faMortarBoard } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import img from '~/assets/img';
import Image from '~/Components/Image';
import Menu from '~/Components/Menu';
import { MenuItem } from '~/Components/Menu';
const cx = classNames.bind(styles);

function Sidebar() {
	const [isHNCVisible, setIsHNCVisible] = useState(true);
	const [isQLDTVisible, setIsQLDTVisible] = useState(true);
	const [isQLTKVisible, setIsQLTKVisible] = useState(true);
	const [sideBarActive,setSideBarActive] = useState(null);

	const handleActiveSideBar = (item) =>{
		if(sideBarActive !== item){
			setSideBarActive(item)
		}
	}
	const toggleMenuHNC = () => {
		setIsHNCVisible(!isHNCVisible);
	};
	const toggleMenuQLDT = () => {
		setIsQLDTVisible(!isQLDTVisible);
	};
	const toggleMenuQLTK = () => {
		setIsQLTKVisible(!isQLTKVisible);
	};

	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('img-frame')}>
					<Link to={config.routes.home}>
						<img className={cx('img-logo')} src={img.logo} alt="HSRIS" />
					</Link>
				</div>
				<div className={cx('user-infor')}>
					<Image className={cx('user-avatar')} alt="NO-IMAGE" src={img.noImage} />
					<div className={cx('user-decs')}>
						<div className={cx('user-name')}>Phạm Văn Long</div>
						<div className={cx('user-class')}>21A100100212</div>
					</div>
				</div>

				{/* ----------------Menu Sidebar----------------- */}
				<Menu className={cx('menu-list')}>
					<div className={cx('menu-item')}>
						<div className={cx('menu-item-parent')} onClick={toggleMenuHNC}>
							<FontAwesomeIcon icon={faBox} className={cx('icon')} />
							<div className={cx('menu-item-text')}>Hướng Nghiên Cứu</div>
							{isHNCVisible ? <FontAwesomeIcon icon={faChevronDown} className={cx('icon')} />: <FontAwesomeIcon icon={faChevronUp} className={cx('icon')} />}
						</div>
						{
							isHNCVisible && (<div className={cx('menu-item-child' /*hidden*/)}>
							<MenuItem isSideBar active ={sideBarActive === 'registerResearch'} title={'Đăng Ký'} to={config.routes.registerResearch} onClick ={()=>handleActiveSideBar('registerResearch')}/>
							<MenuItem isSideBar active ={sideBarActive === 'historyRegister'} title={'Lịch Sử Đăng Ký'} to={config.routes.historyRegisterResearch} onClick ={()=>handleActiveSideBar('historyRegister')}/>
						</div>)
						}
					</div>

					<div className={cx('menu-item')}>
						<div className={cx('menu-item-parent')} onClick={toggleMenuQLDT}>
							<FontAwesomeIcon icon={faMortarBoard} className={cx('icon')} />
							<div className={cx('menu-item-text')}>Quản Lý Đề Tài</div>
							{isQLDTVisible ? <FontAwesomeIcon icon={faChevronDown} className={cx('icon')} />: <FontAwesomeIcon icon={faChevronUp} className={cx('icon')} />}
						</div>
						{
							isQLDTVisible && (<div className={cx('menu-item-child' /*hidden*/)}>
							<MenuItem isSideBar active ={sideBarActive === 'registerTopic'} title={'Đăng Ký Đề Tài'} to={config.routes.registerTopic} onClick ={()=>handleActiveSideBar('registerTopic')}/>
							<MenuItem isSideBar active ={sideBarActive === 'progressTopic'} title={'Tiến Độ Đề Tài'} to={config.routes.progressTopic} onClick ={()=>handleActiveSideBar('progressTopic')}/>
							<MenuItem isSideBar active ={sideBarActive === 'historyRegisterTopic'} title={'Lịch Sử Đăng Ký'} to={config.routes.historyRegisterTopic} onClick ={()=>handleActiveSideBar('historyRegisterTopic')}/>
						</div>)
						}
					</div>

					<div className={cx('menu-item')}>
						<div className={cx('menu-item-parent')} onClick={toggleMenuQLTK}>
							<FontAwesomeIcon icon={faGear} className={cx('icon')} />
							<div className={cx('menu-item-text')}>Quản Lý Tài Khoản</div>
							{isQLTKVisible ? <FontAwesomeIcon icon={faChevronDown} className={cx('icon')} /> : <FontAwesomeIcon icon={faChevronUp} className={cx('icon')} />}
						</div>
						{isQLTKVisible && (<div className={cx('menu-item-child' /*hidden*/)}>
							<MenuItem isSideBar active ={sideBarActive === 'profile'} title={'Hồ Sơ Cá Nhân'} to={config.routes.profile} onClick ={()=>handleActiveSideBar('profile')}/>
							<MenuItem isSideBar active ={sideBarActive === 'achievement'} title={'Thành Tích'} to={config.routes.achievement} onClick ={()=>handleActiveSideBar('achievement')}/>
						</div>)}
					</div>
				</Menu>
			</div>
		</div>
	);
}

export default Sidebar;
