import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faClose } from '@fortawesome/free-solid-svg-icons';

import img from '~/assets/img';
const cx = classNames.bind(styles);
function Home() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('text-desc')}>
					<div className={cx('text-welcome')}>Chào mừng bạn đến với hệ thống thông tin NCKH</div>
					<div className={cx('text-name-infor')}>HOU Scientific Research Information System</div>
				</div>

				<div className={cx('notify-frame')}>
					<FontAwesomeIcon icon={faCircleExclamation} className={cx('icon')} />
					<div className={cx('nofify-text')}>
						Để có trải nghiệm tốt hơn, hãy hoàn thành hồ sơ cá nhân
						<button href="#" className={cx('notify-link')}>
							ở đây
						</button>
					</div>
					<FontAwesomeIcon icon={faClose} className={cx('icon')} />
				</div>

				<div className={cx('img-frame')}>
					<img className={cx('img-logo')} src={img.logo} alt="HSRIS" />
				</div>
			</div>
		</div>
	);
}

export default Home;