import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
import * as Result from '~/apiService/adminService'
import { useAuth } from "~/Components/Auth";
import styles from './AddTeacher.module.scss'
import * as XLSX from 'xlsx';
import config from '~/config';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles)

function AddTeacher() {
    const [idSV,setIDSV] = useState('')
    const [name,setName] = useState('')
    const [birthday,setBirthday] = useState('')
    const [sex,setSex] = useState(0)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const auth = useAuth()
	const tokenBearer = auth.getTokens()

    const handleSetIDSV = (e) => {
        setIDSV(e.target.value)
    }
    const handleSetName = (e) => {
        setName(e.target.value)
    }
    const handleSetBirthday = (e) => {
        setBirthday(e.target.value)
    }
    const handleSetSex = (e) => {
        setSex(e.target.value)
    }
    const handleSetEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleSetPhone = (e) => {
        setPhone(e.target.value)
    }
    const handleSetAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleSetPassword = (e) => {
        setPassword(e.target.value)
    }

    const handleAddTeacher = () => {
        const show = window.confirm("Bạn có chắc chắn với lựa chọn này?");
		if (show) {
			posthApi()
				.then((res) => {
					if (res) {
						showToast('success', 'Thêm giảng viên thành công!');
					} else {
						showToast('error', 'Thêm giảng viên thất bại!');
					}
				})
				.catch((error) => {
					console.error('Lỗi khi xử lý yêu cầu:', error);
					showToast('error', 'Đã xảy ra lỗi khi gửi yêu cầu!');
				});
		}
    }
    //POST API
	const posthApi = async () => {
		try {
			const result = await Result.postAddTeacher(idSV,name,birthday, phone,email, sex,address,password, tokenBearer.access_token);
			return result;
		} catch (error) {
			console.error('Đã xảy ra lỗi khi gửi dữ liệu:', error);
			throw error;
		}
	}  

    return ( 
        <div className={cx('wrapper')}>
        <ToastContainer/>
        <div className={cx('inner')}>
            <div className={cx('name-page')}>Quản lý giảng viên - Thêm giảng viên</div>
            <div className={cx('frame-container')}>
            <div className={cx('list-btn')}>
                    <Link  className={cx('item-btn')}to={config.routes.addStudent}>Thêm sinh viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.addTeacher}>Thêm giảng viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.addStudentFile}>Nhập file sinh viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.addTeacherFile}>Nhập file giảng viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.permissionType}>Loại quyền</Link>
                </div>
                <div className={cx('frame-desc')}>
                    <div className={cx('text')}>Thêm giảng viên</div>
                </div>
                    <div className={cx('border')}>
                    <div className={cx('content')}>
                        <div className={cx('content-list-card')}>
                            <div className={cx('content-item-card')}>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Mã giảng viên</div>
                                <div className={cx('item-content')}>
                                <input value={idSV} onChange={handleSetIDSV} className={cx('input')} type='text' required/>
                                </div>
                            </div>
                            </div>

                            <div className={cx('content-item-card')}>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Họ và tên</div>
                                <div className={cx('item-content')}>
                                <input value={name} onChange={handleSetName} className={cx('input')} type='text' required/>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className={cx('content-list-card')}>
                            <div className={cx('content-item-card')}>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Email</div>
                                <div className={cx('item-content')}>
                                <input value={email} onChange={handleSetEmail} className={cx('input')} type='email' required/>
                                </div>
                            </div>
                            
                            </div>
                            <div className={cx('content-item-card')}>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Mật khẩu</div>
                                <div className={cx('item-content')}>
                                <input value={password} onChange={handleSetPassword} className={cx('input')} type='password' required/>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className={cx('content-list-card')}>
                            <div className={cx('content-item-card')}>
                                <div className={cx('item')}>
                                    <div className={cx('item-title')}>Ngày sinh</div>
                                    <div className={cx('item-content')}>
                                    <input value={birthday} onChange={handleSetBirthday} className={cx('input')} type='date'  required/>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('content-item-card')}>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Số điện thoại</div>
                                <div className={cx('item-content')}>
                                <input value={phone} onChange={handleSetPhone} className={cx('input')} type="number"  required/>									</div>
                            </div>
                            </div>
                        </div>

                        <div className={cx('content-list-card')}>
                            <div className={cx('content-item-card')}>
                                <div className={cx('item')}>
                                    <div className={cx('item-title')}>Giới tính</div>
                                    <div className={cx('item-content')}>
                                    <select
												className={cx('custom-select')}
												name="custom-select"
                                                value={sex}
                                                onChange={handleSetSex}
											>
													<option>--Chọn giới tính--</option>
                                                    <option value={0}>Nam</option>
													<option value={1}>Nữ</option>
											</select>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('content-item-card')}>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Địa chỉ</div>
                                <div className={cx('item-content')}>
                                <input value={address} onChange={handleSetAddress} className={cx('input')} type="text"  required/>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className={cx('btn-container')}>
                            <button onClick={handleAddTeacher} className={cx('btn-save')}>
                                Thêm
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    );
}

export default AddTeacher;