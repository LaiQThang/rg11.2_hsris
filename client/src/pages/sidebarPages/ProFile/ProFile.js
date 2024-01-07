import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./Profile.module.scss"
import classNames from "classnames/bind";
import images from "~/assets/images";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(Styles)
function ProFile() {
	return (
		<div className={cx('container')}>
			<div className={cx('table')}>
				<div className ={cx('header')}>Trang chủ - Thông tin tài khoản</div>
				<div className={cx('line')}></div>
				<div className={cx('content')}>
					<div className={cx('id')}>| Thông tin cá nhân - 10010223</div>
					<div className={cx('information')}>
						<div className={cx('info-left')}>
							<img className = {cx('avatar')} src={images.avatar}/>
							<div className={cx('text')}>Mã sinh viên</div>
							<div className={cx('box-info-default')}>21A100100212</div>
							<div className={cx('text')}>Họ tên</div>
							<div className={cx('box-info')}>Phạm Văn Long</div>
							<div className={cx('text')}>Lớp hành chính</div>
							<div className={cx('box-info')}>2110A05</div>
							<div className={cx('text')}>Ngày sinh</div>
							<div className={cx('box-info')}>
								<FontAwesomeIcon className={cx('icon')} icon={faCalendarDays} />
								07/07/2003
							</div>
							<div className={cx('text')}>Giới tính</div>
							<div className={cx('box-info')}>Nam</div>
						</div>
						<div className={cx('info-right')}>
							<div className={cx('text')}>Tình trạng</div>
							<div className={cx('box-info')}>Đang học</div>
							<div className={cx('text')}>Căn cước công dân</div>
							<div className={cx('box-info')}>034203033333</div>
							<div className={cx('text')}>Sở thích</div>
							<div className={cx('box-info')}>Đọc sách</div>
							<div className={cx('text')}>Email</div>
							<div className={cx('box-info')}>21A100100212@students.hou.edu.vn</div>
							<div className={cx('text')}>Địa chỉ</div>
							<div className={cx('box-info')}>Thái Bình</div>
							<div className={cx('text')}>Số điện thoại</div>
							<div className={cx('box-info')}>0325973636</div>
						</div>
					</div>
				</div>
				<div className={cx('update')}>
					<button className={cx('btn-update')}>Cập nhật</button>
				</div>
			</div>
		</div>
	);
}

export default ProFile;
