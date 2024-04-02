import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Menu from '~/Components/Menu';
import { MenuItem } from '~/Components/Menu';
import config from '~/config';
import { faBars, faBell, faFile, faHome, faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '~/Components/Button';
import img from '~/assets/img';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Sidebar from '~/layouts/components/SidebarResponsive';
import Buttonn from 'react-bootstrap/Button';
import './Header.css'
const cx = classNames.bind(styles);

function Header() {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	return (
		<div className={cx('wrapper')}>
			<div className={cx('img-frame')}>
				<Link to={config.routes.home}>
					<img className={cx('img-logo')} src={img.logo} alt="HSRIS" />
				</Link>
			</div>
			<div className={cx('inner')}>
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

					<button
						className={cx('button-offcanvas')}
						onClick={handleShow}
					>
						<FontAwesomeIcon icon={faBars} />
					</button>

					<Offcanvas show={show} onHide={handleClose}>
						<Offcanvas.Header closeButton></Offcanvas.Header>
						<Sidebar></Sidebar>
					</Offcanvas>

				</Menu>
			</div>
		</div>
	);
}
export default Header;
