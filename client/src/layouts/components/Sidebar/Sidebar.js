import { useState } from 'react';
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
						<div className={cx('user-name')}>Phạm Quang Thắng</div>
						<div className={cx('user-class')}>21A100100100</div>
					</div>
				</div>

				{/* ----------------Menu Sidebar----------------- */}
				<Menu className={cx('menu-list')}>
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
				</Menu>
			</div>
		</div>
	);
}

export default Sidebar;
