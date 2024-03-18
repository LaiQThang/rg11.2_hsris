import Styles from "./Profile.module.scss"
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { showToast } from "~/Components/ToastMessage/Toast";
import * as Result from '~/apiService/authService'
import { useAuth } from '~/Components/Auth'
import images from "~/assets/images";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const cx = classNames.bind(Styles)
function ProFile() {
	const [userInfo, setUserInfo] = useState([]);
	const [avatar,setAvatar] = useState(null)
	const [idCard,setIdCard] = useState('')
	const [favorite,setFavorite] = useState('')
	const [address,setAddress] = useState('')
	const [phone,setPhone] = useState('')
	const auth = useAuth()
	const username = auth.getEmails()
	const tokenBearer = auth.getTokens()
	const handleUpdate = ()=>{
		const fetchApi = async()=>{
			let result;
			result = await Result.updateProfileStudent(username,tokenBearer,avatar,idCard,favorite,address,phone);
			setUserInfo(result)
		}
		fetchApi()
		// showToast('error','Hiện tại không thể thay đổi thông tin!')
	}
	const handleIdCardChange = (e) => {
		// Cập nhật state khi người dùng thay đổi thông tin
		setIdCard(e.target.value)
	  };
	  const handleFavoriteChange= (e) => {
		// Cập nhật state khi người dùng thay đổi thông tin
		setFavorite(e.target.value)
	  };
	  const handleAddressChange = (e) => {
		// Cập nhật state khi người dùng thay đổi thông tin
		setAddress(e.target.value)
	  };
	  const handlePhoneChange= (e) => {
		// Cập nhật state khi người dùng thay đổi thông tin
		setPhone(e.target.value)
	  };
	const handleAvatarChange = (event) => {
		const file = event.target.files[0];
		setAvatar(file);
	};
	  useEffect(()=>{
        fetchApi()
    },[])
	const fetchApi = async()=>{
		let result;
		result = await Result.profileStudent(username,tokenBearer);
		setUserInfo(result)
	}
	return (
		<div className={cx('container')}>
			<ToastContainer/>
			<div className={cx('table')}>
				<div className ={cx('header')}>Trang chủ - Thông tin tài khoản</div>
				<div className={cx('line')}></div>
				<div className={cx('content')} key ={userInfo.id}>
							<div className={cx('id')}>| Thông tin cá nhân - {userInfo.code}</div>
							<div className={cx('information')}>
								<div className={cx('info-left')}>
									<div className = {cx('img')} >
										<img src={userInfo.avatar} alt="" className = {cx('avatar')}/>
										<label htmlFor="avatar" ><FontAwesomeIcon className={cx('camera')} icon={faCamera} /></label>
										<input type="file" id="avatar" className={cx('hide')} onChange={handleAvatarChange}/>
									</div>
									<div htmlFor = "code" className={cx('text',)}>Mã sinh viên</div>
									<input type="text" name="name" className={cx('disabled')} value={userInfo.code} disabled/>
									<div htmlFor="name" className={cx('text')}>Họ tên</div>
									<input type="text" name="name" className={cx('disabled')} value={userInfo.name}disabled/>
									<div className={cx('text')}>Lớp hành chính</div>
									<input type="text" name="name" className={cx('disabled')} value={userInfo.class}disabled/>
									<div className={cx('text')}>Ngày sinh</div>
									<input type="text" name="name" className={cx('disabled')} value={userInfo.birthday} disabled/>
									<div className={cx('text')}>Giới tính</div>
									<input type="text" name="name" className={cx('disabled')} value={userInfo.sex === '0' ? 'Nam' : 'Nữ'} disabled/>
								</div>
								<div className={cx('info-right')}>
									<div className={cx('text')} >Tình trạng</div>
									<input type="text" name="name" className={cx('disabled')} value={userInfo.status} disabled/>
									<div className={cx('text')}>Căn cước công dân</div>
									<input type="text" name="name" value={userInfo.idCard} onChange={handleIdCardChange} />
									<div className={cx('text')}>Sở thích</div>
									<input type="text" name="name" value={userInfo.favorite} onChange={handleFavoriteChange} />
									<div className={cx('text')} >Email</div>
									<input type="text" name="name" className={cx('disabled')} value={userInfo.email} disabled/>
									<div className={cx('text')}>Địa chỉ</div>
									<input type="text" name="name" value={userInfo.address} onChange={handleAddressChange} />
									<div className={cx('text')}>Số điện thoại</div>
									<input type="text" name="name" value={userInfo.phone} onChange={handlePhoneChange} />
								</div>
							</div>
						</div>
						
				<div className={cx('update')}>
					<button className={cx('btn-update')} onClick = {handleUpdate}>Cập nhật</button>
				</div>
			</div>
		</div>
	);
}

export default ProFile;
