import styles from  './Login.module.scss'
import images from '~/assets/images'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faEye,faCircleCheck, faEyeSlash} from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Result from '~/apiService/authService'
import { useAuth } from '~/Components/Auth'

const cx = classNames.bind(styles)
function Login(){
    // Khai báo các thuộc tính
    const [showModal,setShowModal] = useState(false)
    const [hidePassword, sethidePassword] = useState(false)
    const [password,setPassword] = useState('')
    const [username,setUsername] = useState('')
    const [message,setMessage] = useState('')
    const [users,setUsers] = useState([])
    // Các hàm thực hiện
    const handleHidePassWord =()=>{
        sethidePassword(!hidePassword)
    }
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value)
    }
    const handleUserChange = (e)=>{
        setUsername(e.target.value)
    }
    const handleForgotPassword = ()=>{
        setShowModal(true)
    }
    const handleBackLogin = ()=>{
        setShowModal(false)
    }
    const navigate = useNavigate();
    const auth = useAuth();
    const location = useLocation();

    const redirectPath = location.state?.path || '/';

    localStorage.clear();
 
    const handleLogin = ()=>{

        const fetchApi = async()=>{
            let result;
            result = await Result.login(username, password);
            
            if(result != null){
                auth.login(username, password, result);
                auth.setTokens(result);
                navigate(redirectPath, { replace: true });
            }
            else
            {
                setMessage('Thông tin tài khoản, mật khẩu không chính xác!')
            }
        }
        fetchApi();
    }

    return (
        <div className = {cx('wrapper')}>
            <div className={cx('identify')}>
                <div className={cx('logo')}>
                    <img className={cx('img-logo')} src={images.logo} alt="" />
                    <div className = {cx('content')}>
                        <p>Hệ thống thông tin</p> 
                        <p>Nghiên cứu khoa học</p>
                    </div>
                </div>
                
                <div className = {cx('banner')}>
                    <img className={cx('img-banner')} src={images.banner} alt="" />
                </div>
            </div>
            <form className={cx('login')} >
                <div className ={cx('text-login')}>Đăng nhập</div>
                <div className ={cx('account')}>Tài khoản</div>
                <div className ={cx('box-account')}>
                    <FontAwesomeIcon icon={faUser} className ={cx('icon-acc')}/>
                    <input type="text" onChange={handleUserChange} className ={cx('plh-account')}placeholder="Nhập mã sinh viên" required></input>
                </div>
                <div className ={cx('password')}>Mật khẩu</div>
                <div className ={cx('box-password')}>
                    <FontAwesomeIcon icon={faLock} className ={cx('icon-pw')}/>
                    <input type={hidePassword ? "text" : "password"} value={users ? users.password : password} onChange={handlePasswordChange} className ={cx('plh-pw')} placeholder="Nhập mật khẩu đăng nhập" required></input>
                    <FontAwesomeIcon icon={hidePassword ? faEye : faEyeSlash} className ={cx('icon-eye')}  onClick ={handleHidePassWord}/>
                </div>
                <div className={cx('container-fpw')}><div className={cx('forgot-password')} onClick={handleForgotPassword}>Quên mật khẩu?</div></div>
                {
                    showModal && (
                        <div className={cx('modal')}>
                            <div className={cx('overlay')}></div>
                            <div className ={cx('modal-pw')}>
                                <div className= {cx('icon-check')}>
                                    <div className={cx('round-check')}> <FontAwesomeIcon className={cx('icon-inside')}icon={faCircleCheck}/></div>
                                
                                </div>
                                <div className={cx('notification')}>
                                    <div>Liên hệ quản trị viên để được cấp mật khẩu mới</div>
                                    <div>rg11.dev@gmail.com</div>
                                </div>
                                <button className={cx('btn-reLogin')} onClick={handleBackLogin}>Quay lại đăng nhập</button>
                            </div>
                        </div>
                    )
                }
                <div className={cx('message')}>{message}</div>
                <button className={cx('btn-login')} type='button' onClick={handleLogin}>Đăng nhập</button>
            </form>
        </div>

        
    )
}
export default Login
