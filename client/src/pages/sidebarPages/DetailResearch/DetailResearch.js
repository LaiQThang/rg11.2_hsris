import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import Styles from './DetailResearch.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { showToast } from '~/Components/ToastMessage/Toast';
import * as Result from '~/apiService/authService'
import { useAuth } from '~/Components/Auth';
const cx = classNames.bind(Styles)
function DetailResearch(){
    const {id} = useParams();
    const [data,setData] = useState([])
    const auth = useAuth()
	const username = auth.getEmails()
	const tokenBearer = auth.getTokens()

    const fetchApi = async ()=>{
        let result
        result = Result.getResearch(tokenBearer.access_token)
        return result
     }

     useEffect(()=>{
         fetchApi().then((data)=>{
             setData(data.data)
         })
     },[])
    const dataId = data.filter(data=>data.id===id)
    const handlesShowNotification =()=>{
       const show =  window.confirm("Bạn có chắc với lựa chọn này");
       if(show){
            callApi()
                .then(function(res){
                    console.log(res)
                    return  Result.postDetailReseach(tokenBearer.access_token, id,res.id)
                })
                .then(function(res) {
                    if(res){
                    showToast('success', 'Đăng kí thành công!');
                    return window.location.href = 'http://localhost:3000/historyRegisterResearch';

                    } else{
                        showToast('error', 'Đăng kí thất bại!');
                    }
                })
                .catch(function(error){
                    console.log(error);
                });
    }
    }

    const posthApi = async ()=>{
		let result
		result = await Result.profileStudent(username, tokenBearer.access_token)
        return result;
	}

    function callApi(){
		return new Promise(function(resolve,reject){
			const res = posthApi();
			if(res){
				resolve(res);
			} 
			reject('Error');
		});
	}

    
    return (
        <div className={cx('container')}>
            <ToastContainer/>
{
    dataId.map(data=><div className={cx('table')} key ={data.id}>
        <div className={cx('header')}>Hướng nghiên cứu - Lịch sử đăng ký - Chi tiết HNC</div>
                <div className={cx('line')}></div>
                <div className={cx('wrapper')}>
                <div className={cx('name')}>Chi tiết hướng nghiên cứu</div>
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
                    <button className={cx('register') } onClick = {handlesShowNotification}>Đăng ký</button>
                </div>
                </div>
    </div>)
}
    </div>
    )
}
export default DetailResearch