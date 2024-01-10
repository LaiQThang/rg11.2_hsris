import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '~/Components/Menu';
import { MenuItem } from '~/Components/Menu';
import config from '~/config';
import { faBell, faFile, faHome, faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '~/Components/Button';
const cx = classNames.bind(styles);

function Header() {
	return (
		<div className={cx('wrapper')}>
	@@ -21,6 +27,19 @@ function Header() {
				<Menu className={cx('nav-list')}>
					<MenuItem title={'Trang Chủ'} to={config.routes.home} icon={<FontAwesomeIcon icon={faHome} />} />
					<MenuItem
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
