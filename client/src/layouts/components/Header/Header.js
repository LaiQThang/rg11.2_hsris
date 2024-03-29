import classNames from 'classnames/bind';
import styles from './Header.module.scss';
//import Offcanvas from 'react-bootstrap/Offcanvas';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '~/Components/Menu';
import { MenuItem } from '~/Components/Menu';
import config from '~/config';
import { faBell, faFile, faHome, faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '~/Components/Button';
const cx = classNames.bind(styles);

function toggleSidebar() {
	var sidebar = document.getElementById('sidebar');
	sidebar.classList.toggle('open');
}

function Header() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('language')}>
					<div className={cx('text')}>ENGLISH</div>
					<span className={cx('text')}>|</span>
					<div className={cx('text')}>Tiếng Việt</div>
				</div>
				<Menu className={cx('nav-list')}>
					<MenuItem
						className={cx('nav-item')}
						title={'Trang Chủ'}
						to={config.routes.home}
						icon={<FontAwesomeIcon icon={faHome} />}
					/>
					<MenuItem
						className={cx('nav-item')}
						title={'Hoạt Động'}
						to={config.routes.work}
						icon={<FontAwesomeIcon icon={faFile} />}
					/>
					<MenuItem
						className={cx('nav-item')}
						title={'Thông Báo'}
						to={config.routes.notification}
						icon={<FontAwesomeIcon icon={faBell} />}
					/>
					<MenuItem title={'Hoạt Động'} to={config.routes.work} icon={<FontAwesomeIcon icon={faFile} />} />
					<Button text leftIcon={<FontAwesomeIcon icon={faPen} />}>
						Đăng Ký Đề Tài
					</Button>
				</Menu>
			</div>
		</div>
	);
}
export default Header;
