/* eslint-disable react-hooks/rules-of-hooks */
import classNames from "classnames/bind";
import Styles from "./detailReviewTopic.module.scss"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { showToast } from "~/Components/ToastMessage/Toast";
import * as Result from "~/apiService/authService"
import { useAuth } from "~/Components/Auth";

const cx = classNames.bind(Styles)

function detailReviewTopic(){
    const {id} = useParams()
    const [data,setData] = useState([])
    const auth = useAuth()
    const tokenBearer = auth.getTokens()
    const handlesShowNotification =async()=>{
        const show =  window.confirm("Bạn có chắc với lựa chọn này");
        if(show){
            let result = await Result.browseTopicAdmin(id, tokenBearer.access_token)
            if(result){
                showToast('success', 'Duyệt đề tài thành công!');
                setTimeout(()=>{
                    window.location.href = '/reviewTopic'
                },2000)
            }
            else{
                showToast('error', 'Duyệt đề tài thất bại!');
            }
        }
     }
     useEffect(()=>{
        fetchApi()
    },[])
    const fetchApi = async ()=>{
		let result
		result = await Result.detailTopic(tokenBearer.access_token,id)
		setData(result.data)
	}
    return(
        <div className={cx('container')}>
            <ToastContainer/>
            <div className={cx('table')} key ={data.id}>
        <div className={cx('header')}>Quản lý đề tài - Xét duyệt đề tài</div>
                <div className={cx('line')}></div>
                <div className={cx('wrapper')}>
                <div className={cx('name')}>Chi tiết đề tài xét duyệt</div>
                    <div className={cx('line-1')}>
                        <div className={cx('research-name')}>
                            <div className={cx('text')}>Tên đề tài: </div>
                            <div className={cx('content')}>{data.name}</div>
                        </div>
                        <div className={cx('research-name')}>
                            <div className={cx('text')}>Ngày tạo: </div>
                            <div className={cx('content')}>{data.dateCreate}</div>
                        </div>
                    </div>
                <div className={cx('text')}>Tóm tắt</div>
                <div className={cx('short')}>{data.summary}</div>
                <div className={cx('text')}>Mục tiêu</div>
                <div className={cx('short')}>{data.target}</div>
                <div className={cx('text')}>Phạm Vi</div>
                <div className={cx('short')}>{data.limit}</div>
                <div className={cx('text')}>Ghi chú</div>
                <div className={cx('short')}>{data.note ? data.note : 'Chưa có ghi chú'}</div>
                <div className={cx('footer')}>
                    <button className={cx('register') } onClick = {handlesShowNotification}>Duyệt</button>
                </div>
                </div>
    </div>
        </div>
    )
}
export default detailReviewTopic