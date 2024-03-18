
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate} from 'react-router-dom'
import Styles from './addResearch.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
const cx = classNames.bind(Styles)

function addResearch(){
	const [data,setData] = useState([])
	console.log(data)
    const handleShowNotification =()=>{
       const show =  window.confirm("Bạn có chắc với lựa chọn này");
       if(show){
		showToast('success', 'Hủy đăng kí thành công!');
       }
    }
    // useEffect(()=>{
    //     fetchApi()
    // },[])
    // const fetchApi = async ()=>{
    //     try{
    //         const res = await axios.get('https://64dc69d1e64a8525a0f672e2.mockapi.io/data')
    //         const data = res.data
    //         setData(data)
    //     }
    //     catch(e){
    //         console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', e);
    //     }
    // }
    return (
        <div className={cx('container')}>
			<ToastContainer/>
            <div className={cx('table')} key ={data.id}>
					<div className={cx('header')}>Hướng nghiên cứu - Thêm HNC</div>
					<div className={cx('line')}></div>
					<div className={cx('wrapper')}>
					<div className={cx('name')}>Thêm hướng nghiên cứu</div>
						<div className={cx('line-1')}>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Tên hướng nghiên cứu: </div>
								<input type ='text'/>
							</div>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Ngày tạo: </div>
								<input type ='text'/>
							</div>
						</div>
						<div className={cx('line-2')}>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Mã hướng nghiên cứu: </div>
								<input type ='text'/>
							</div>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Số lượng người tham gia: </div>
								<input type ='text'/>
							</div>
						</div>
					<div className={cx('input-bottom')}>
                        <div className={cx('text')}>Tóm tắt</div>
                        <input type ='text'/>
                        <div className={cx('text')}>Mục tiêu</div>
                        <input type ='text'/>
                        <div className={cx('text')}>Phạm Vi</div>
                        <input type ='text'/>
                        <div className={cx('text')}>Ghi chú</div>
                        <input type ='text'/>
                    </div>
					<div className={cx('footer')}>
						<button className={cx('register') } onClick = {handleShowNotification}>Thêm</button>
					</div>
					</div>
		</div>
    </div>
    )
}
export default addResearch
