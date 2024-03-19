import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
	const [isSidebarVisible, setSidebarVisible] = useState(true);
	const toggleSidebar = () => {
		setSidebarVisible(!isSidebarVisible);
	};
	return (
		<div className={cx('wrapper')}>
			<Sidebar isSidebarVisible={isSidebarVisible} />
			<div className={cx('container')}>
				<Header toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
				<div className={cx('content')}>{children}</div>
			</div>
		</div>
	);
}

export default DefaultLayout;
