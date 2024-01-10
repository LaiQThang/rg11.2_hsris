import classNames from "classnames/bind";
import  Styles from "./homePage.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import config from "~/config";
import images from "~/assets/images";
import { useState } from "react";
const cx = classNames.bind(Styles)
function Notification() {
	const [hideNote,setHideNote] = useState(true)
	const handleHideNote = ()=>{
		setHideNote(false)
	}
	return (
		<div className={cx('container')}>
			<div className= {cx('block')}>
				<div className={cx('text')}>Chào mừng bạn đến với hệ thống thông tin Nghiên cứu khoa học</div>
				<div className={cx('text-dark')}>HOU Scientific Research Information System</div>
				{
					hideNote && (<div className={cx('box-note')}>
					<FontAwesomeIcon icon={faCircleExclamation} className={cx('icon-note')}/>
					<div className={cx('text-note')}>Để có trải nghiệm tốt hơn, hãy hoàn thành hồ sơ cá nhân 
						<Link to={config.routes.profile} className={cx('link')}>
							ở đây
						</Link>
					</div>
					<FontAwesomeIcon icon={faXmark} className={cx('icon-close')} onClick ={handleHideNote}/>
				</div>)
				}
				<img className={cx('img-logo')} src={images.logo} alt="" />
			</div>
		</div>
	);
}

export default Notification;
