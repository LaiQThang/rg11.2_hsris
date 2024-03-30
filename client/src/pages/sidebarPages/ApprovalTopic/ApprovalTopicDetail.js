import config from '~/config';
import styles from './ApprovalTopic.module.scss';
import classNames from 'classnames/bind';
import { Link, redirect, useParams } from 'react-router-dom';
import { useAuth } from '~/Components/Auth';
import { useEffect, useState } from 'react';
import * as Result from '~/apiService/authService'
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);
function ApprovalTopicDetail() {
	const {id} = useParams()
	const [data,setData] = useState([])
	const year ='2024'
	const Auth = useAuth()
	const tokenBearer = Auth.getTokens()
	useEffect(()=>{
		fetchApi().then((res)=>{
			setData(res.data)
		})
	},[])
	const fetchApi = async()=>{
		let result = Result.getTopicTeacher(year,tokenBearer.access_token)
		return result
	}
const dataId = data.filter(data=>data.id === id)
const handleSubmit = async()=>{
	let result = Result.browseTopic(tokenBearer.access_token,id)
	if(result){
		showToast('success','Thành công')
		setTimeout(()=>{
			window.location.href = '/approvalTopic'
		},2000)
	}
	else{
		showToast('error','Thất bại sao đc')
	}
}
	return (
		<div className={cx('wrapper')}>
			<ToastContainer/>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Đề tài chờ duyệt</div>
				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Chi tiết đề tài chờ duyệt</div>
					</div>

					{dataId.map(data=>(
						<div className={cx('border')} key ={data.id}>
						<div className={cx('content')}>
							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Hướng nghiên cứu</div>
										<div className={cx('item-content')}>
											<div className={cx('item-text')}>{data.hnc.name}</div>
										</div>
									</div>
								</div>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên đề tài</div>
										<div className={cx('item-content')}>
											<div className={cx('item-text')}>{data.name}</div>
										</div>
									</div>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Tóm tắt</div>
								<div className={cx('item-content')}>
									<div className={cx('item-text')}>
										{data.summary}
									</div>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Mục tiêu</div>
								<div className={cx('item-content')}>
									<div className={cx('item-text')}>
										{data.target}
									</div>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Phạm vi</div>
								<div className={cx('item-content')}>
									<div className={cx('item-text')}>
										{data.limit}
									</div>
								</div>
							</div>

							<div className={cx('btn-container-detail')}>
								<Link className={cx('btn-pre')} to={config.routes.approvalTopic}>
									Quay Lại
								</Link>
								<span className={cx('space')} />
								<div className={cx('btn-submit')} onClick={handleSubmit}>
									Duyệt
								</div>
							</div>
						</div>
					</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default ApprovalTopicDetail;
