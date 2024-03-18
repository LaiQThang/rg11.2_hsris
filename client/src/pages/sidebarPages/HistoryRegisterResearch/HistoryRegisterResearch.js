
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate} from 'react-router-dom'
import Styles from './HistoryRegisterResearch.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
const cx = classNames.bind(Styles)

function HistoryRegisterResearch(){
	const [data,setData] = useState([])
	console.log(data)
    const handleShowNotification =()=>{
       const show =  window.confirm("Bạn có chắc với lựa chọn này");
       if(show){
		showToast('success', 'Hủy đăng kí thành công!');
       }
    }
    useEffect(()=>{
        fetchApi()
    },[])
    const fetchApi = async ()=>{
        try{
            const res = await axios.get('http://127.0.0.1:8000/api/v1/huongnghiencuu/')
            const data = res.data.data
            setData(data)
        }
        catch(e){
            console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', e);
        }
    }
    return (
        <div className={cx('container')}>
			<ToastContainer/>
			{
			data.map(data=><div className={cx('table')} key ={data.id}>
					<div className={cx('header')}>Hướng nghiên cứu - Lịch sử đăng ký - Chi tiết HNC</div>
					<div className={cx('line')}></div>
					<div className={cx('wrapper')}>
					<div className={cx('name')}>Lịch sử đăng ký hướng nghiên cứu</div>
						<div className={cx('line-1')}>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Tên hướng nghiên cứu: </div>
								<div className={cx('content')}>{data.name}</div>
							</div>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Ngày tạo: </div>
								<div className={cx('content')}>{data.dateCreated}</div>
							</div>
						</div>
						<div className={cx('line-2')}>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Mã hướng nghiên cứu: </div>
								<div className={cx('content')}>{data.id}</div>
							</div>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Số lượng người tham gia: </div>
								<div className={cx('content')}>{data.quantity}</div>
							</div>
						</div>
					<div className={cx('text')}>Tóm tắt</div>
					<div className={cx('short')}>{data.summary}</div>
					<div className={cx('text')}>Mục tiêu</div>
					<div className={cx('short')}>{data.target}</div>
					<div className={cx('text')}>Phạm Vi</div>
					<div className={cx('short')}>{data.limit}</div>
					<div className={cx('text')}>Ghi chú</div>
					<div className={cx('short')}>{data.note}</div>
					<div className={cx('footer')}>
						<button className={cx('register') } onClick = {handleShowNotification}>Hủy</button>
					</div>
					</div>
		</div>)
		}
    </div>
    )
}
export default HistoryRegisterResearch
