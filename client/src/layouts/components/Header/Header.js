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

import Sidebar from '../Sidebar';
const cx = classNames.bind(styles);

function Header() {
	const [show, setShow] = useState(false);

	const handleOpen = ()=>{
		setShow(true)
	}

	const handleClose = ()=>{
		setShow(false)
	}
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
						className="btn btn-primary"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasWithBackdrop"
						aria-controls="offcanvasWithBackdrop"
						onClick={handleOpen}
					>
						<FontAwesomeIcon icon={faBars} />
					</button>

					<div
						className="offcanvas offcanvas-start"
						tabIndex={-1}
						id="offcanvasWithBackdrop"
						aria-labelledby="offcanvasWithBackdropLabel"
						show = {show}
					>
						<div className="offcanvas-header">
							<h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
								Offcanvas with backdrop
							</h5>
							<button
								type="button"
								className="btn-close text-reset"
								data-bs-dismiss="offcanvas"
								aria-label="Close"
							/>
						</div>
						<div className="offcanvas-body">
							<Sidebar />
						</div>
					</div>

					<Button text leftIcon={<FontAwesomeIcon icon={faPen} />}>
						Đăng Ký Đề Tài
					</Button>
				</Menu>
			</div>
		</div>
	);
}
export default Header;
