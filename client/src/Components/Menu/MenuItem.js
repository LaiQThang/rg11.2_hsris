import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);

function MenuItem({ title, to, icon }) {
	const [isActive, setIsActive] = useState(false);

	// Hàm xử lý sự kiện onClick
	const handleClick = () => {
		setIsActive(true);
	};
	return (
		<NavLink to={to} className={cx('menu-item')} onClick={handleClick}>
			<div className={cx('icon')}>{icon}</div>
			<span className={cx('title')}>{title}</span>
		</NavLink>
	);
}

export default MenuItem;
