import classNames from 'classnames/bind';
import styles from './Header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '~/Components/Menu';
import { MenuItem } from '~/Components/Menu';
import config from '~/config';
import { faBell, faFile, faHome, faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '~/Components/Button';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Header() {
	const [isClickedEN, setIsClickedEN] = useState(false);
	const [isClickedVI, setIsClickedVI] = useState(true);
	const handleActiveEN =()=>{
		setIsClickedVI(false);
		setIsClickedEN(true);
	}
	const handleActiveVI =()=>{
		setIsClickedVI(true);
		setIsClickedEN(false);
	}
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('language')}>
					<div onClick = {handleActiveEN} className={cx(isClickedEN ? 'text-active' : 'text')}>EN</div>
					<span className={cx('text-line')}>|</span>
					<div onClick = {handleActiveVI} className={cx(isClickedVI ? 'text-active' : 'text')}>Tiếng Việt</div>
				</div>
				<Menu className={cx('nav-list')}>
					<MenuItem isSideBar = {false} title={'Trang Chủ'} to={config.routes.home} icon={<FontAwesomeIcon icon={faHome} />}/>
					<MenuItem
					isSideBar = {false}
						title={'Thông Báo'}
						to={config.routes.notification}
						icon={<FontAwesomeIcon icon={faBell} />}
					/>
					<MenuItem isSideBar = {false} title={'Hoạt Động'} to={config.routes.work} icon={<FontAwesomeIcon icon={faFile} />}/>
					<Button text leftIcon={<FontAwesomeIcon icon={faPen} />}>
						Đăng Ký Đề Tài
					</Button>
				</Menu>
			</div>
		</div>
	);
}
export default Header;
