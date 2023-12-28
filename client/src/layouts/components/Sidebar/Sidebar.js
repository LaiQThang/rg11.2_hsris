import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faChevronUp, faGear, faMortarBoard } from '@fortawesome/free-solid-svg-icons';

import config from '~/config';
import img from '~/assets/img';
import Image from '~/Components/Image';
import Menu from '~/Components/Menu';
import { MenuItem } from '~/Components/Menu';
const cx = classNames.bind(styles);

function Sidebar() {
	const [isChildVisible, setIsChildVisible] = useState(false);
	const toggleMenuItems = () => {
		setIsChildVisible(!isChildVisible);
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
						<div className={cx('user-name')}>Phạm Quang Thắng</div>
						<div className={cx('user-class')}>21A100100100</div>
					</div>
				</div>

				{/* ----------------Menu Sidebar----------------- */}
				<Menu className={cx('menu-list')}>
					<div className={cx('menu-item')}>
						<div className={cx('menu-item-parent')} onClick={toggleMenuItems}>
							<FontAwesomeIcon icon={faBox} className={cx('icon')} />
							<div className={cx('menu-item-text')}>Hướng Nghiên Cứu</div>
							<FontAwesomeIcon icon={faChevronUp} className={cx('icon')} />
						</div>
						<div className={cx('menu-item-child ' /*hidden*/)}>
							<MenuItem title={'Đăng Ký'} to={config.routes.registerResearch} />
							<MenuItem title={'Lịch Sử Đăng Ký'} to={config.routes.historyRegisterResearch} />
						</div>
					</div>

					<div className={cx('menu-item')}>
						<div className={cx('menu-item-parent')} onClick={toggleMenuItems}>
							<FontAwesomeIcon icon={faMortarBoard} className={cx('icon')} />
							<div className={cx('menu-item-text')}>Quản Lý Đề Tài</div>
							<FontAwesomeIcon icon={faChevronUp} className={cx('icon')} />
						</div>
						<div className={cx('menu-item-child ' /*hidden*/)}>
							<MenuItem title={'Đăng Ký Đề Tài'} to={config.routes.registerTopic} />
							<MenuItem title={'Tiến Độ Đề Tài'} to={config.routes.progressTopic} />
							<MenuItem title={'Lịch Sử Đăng Ký'} to={config.routes.historyRegisterTopic} />
						</div>
					</div>

					<div className={cx('menu-item')}>
						<div className={cx('menu-item-parent')} onClick={toggleMenuItems}>
							<FontAwesomeIcon icon={faGear} className={cx('icon')} />
							<div className={cx('menu-item-text')}>Quản Lý Đề Tài</div>
							<FontAwesomeIcon icon={faChevronUp} className={cx('icon')} />
						</div>
						<div className={cx('menu-item-child ' /*hidden*/)}>
							<MenuItem title={'Hồ Sơ Cá Nhân'} to={config.routes.profile} />
							<MenuItem title={'Thành Tích'} to={config.routes.achievement} />
						</div>
					</div>
				</Menu>
			</div>
		</div>
	);
}

export default Sidebar;
