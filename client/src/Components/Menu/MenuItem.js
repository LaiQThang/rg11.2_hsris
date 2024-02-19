import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ title, to, icon, onClick, active,isSideBar= true }) {
	return (
		<NavLink to={to} className={cx( active && isSideBar ? 'active' : 'menu-item')} onClick={onClick}>
			<div className={cx('icon')}>{icon}</div>
			<span className={cx('title')}>{title}</span>
		</NavLink>
	);
}

export default MenuItem;
