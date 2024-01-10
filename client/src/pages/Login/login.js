import styles from  './Login.module.scss'
import images from '~/assets/images'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faEye,faCircleCheck, faEyeSlash} from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import Client from '../client'
import axios from 'axios'

const cx = classNames.bind(styles)
function Login(){
    // Khai báo các thuộc tính
    const [showModal,setShowModal] = useState(false)
    const [hidePassword, sethidePassword] = useState(true)
    const [password,setPassword] = useState('')
    const [username,setUsername] = useState('')
    const [message,setMessage] = useState('')
    const [users,setUsers] = useState([])

    // Các hàm thực hiện
    const handleEnterKey = (e)=>{
        if(e.keyCode === 13){
            e.preventDefault()
            handleLogin()
        }
    }
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
    useEffect(()=>{
        fetchApi()
    },[])
    const fetchApi = async ()=>{
        try{
            const res = await axios.get('https://64dc69d1e64a8525a0f672e2.mockapi.io/LoginApi')
            const data = res.data
            setUsers(data)
        }
        catch(e){
            console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', e);
        }
    }
    const handleLogin = (e)=>{
        e.preventDefault();
        const user = users.find(u=>u.username === username)
        if(user && user.password === password){
            setMessage('Đăng nhập thành công!')
        }
        else{
            setMessage('Tài khoản hoặc Mật khẩu không chính xác!')
        }
    }
    // render giao diện
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
            <form className={cx('login')} method="post">
                <div className ={cx('text-login')}>Đăng nhập</div>
                <div className ={cx('account')}>Tài khoản</div>
                <div className ={cx('box-account')}>
                    <FontAwesomeIcon icon={faUser} className ={cx('icon-acc')}/>
                    <input type="text" value ={users ? users.username :username} onChange={handleUserChange} className ={cx('plh-account')}placeholder="Nhập mã sinh viên" required></input>
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
                <button className={cx('btn-login')} onClick={handleLogin}>Đăng nhập</button>
            </form>
        </div>

        
    )
export default Login;
