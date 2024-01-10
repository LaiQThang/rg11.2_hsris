import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./Profile.module.scss"
import classNames from "classnames/bind";
import images from "~/assets/images";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showToast } from "~/Components/ToastMessage/Toast";
const cx = classNames.bind(Styles)
function ProFile() {
	const id ='2'
	const [userInfo, setUserInfo] = useState([]);
	const userId = userInfo.filter(data=>data.id === id)
	const handleToast = ()=>{
		showToast('error','Hiện tại không thể thay đổi thông tin!')
	}
	  useEffect(()=>{
        fetchApi()
    },[])
    const fetchApi = async ()=>{
        try{
            const res = await axios.get('https://64dc69d1e64a8525a0f672e2.mockapi.io/data')
            const data = res.data
            setUserInfo(data)
        }
        catch(e){
            console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', e);
        }
    }
	const handleInputChange = (e) => {
		// Cập nhật state khi người dùng thay đổi thông tin
		setUserInfo({
		  ...userInfo,
		  [e.target.name]: e.target.value,
		});
	  };
	return (
		<div className={cx('container')}>
			<ToastContainer/>
			<div className={cx('table')}>
				<div className ={cx('header')}>Trang chủ - Thông tin tài khoản</div>
				<div className={cx('line')}></div>
				
					{
						userId.map(userInfo=>(
							<div className={cx('content')} key ={userInfo.id}>
							<div className={cx('id')}>| Thông tin cá nhân - {userInfo.id}</div>
							<div className={cx('information')}>
								<div className={cx('info-left')}>
									<img className = {cx('avatar')} src={images.avatar}/>
									<div className={cx('text')}>Mã sinh viên</div>
									<div className={cx('box-info-default')}>{userInfo.id}</div>
									<div className={cx('text')}>Họ tên</div>
									<input type="text" name="name" value={userInfo.name} onChange={handleInputChange} />
									<div className={cx('text')}>Lớp hành chính</div>
									<input type="text" name="name" value={userInfo.class} onChange={handleInputChange} />
									<div className={cx('text')}>Ngày sinh</div>
									<input type="text" name="name" value={userInfo.date} onChange={handleInputChange} />
									<div className={cx('text')}>Giới tính</div>
									<input type="text" name="name" value={userInfo.sex} onChange={handleInputChange} />
								</div>
								<div className={cx('info-right')}>
									<div className={cx('text')}>Tình trạng</div>
									<input type="text" name="name" value={userInfo.status} onChange={handleInputChange} />
									<div className={cx('text')}>Căn cước công dân</div>
									<input type="text" name="name" value={userInfo.CardId} onChange={handleInputChange} />
									<div className={cx('text')}>Sở thích</div>
									<input type="text" name="name" value={userInfo.interest} onChange={handleInputChange} />
									<div className={cx('text')}>Email</div>
									<input type="text" name="name" value={userInfo.email} onChange={handleInputChange} />
									<div className={cx('text')}>Địa chỉ</div>
									<input type="text" name="name" value={userInfo.address} onChange={handleInputChange} />
									<div className={cx('text')}>Số điện thoại</div>
									<input type="text" name="name" value={userInfo.PhoneNumber} onChange={handleInputChange} />
								</div>
							</div>
						</div>
						
						))
					}
				<div className={cx('update')}>
					<button className={cx('btn-update')} onClick = {handleToast}>Cập nhật</button>
				</div>
			</div>
		</div>
	);
}

export default ProFile;
