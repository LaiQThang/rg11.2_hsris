import styles from './AddTopic.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import config from '~/config';
import * as Result from '~/apiService/authService'
import { useForm } from 'react-hook-form';
import { useAuth } from '~/Components/Auth';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
const cx = classNames.bind(styles);
function AddTopic() {
	const [dataHNC,setDataHNC] = useState([])
	const {register,reset,handleSubmit} = useForm()
	const [showNameNotify, setShowNameNotify] = useState(true);
	const [showSummaryNotify, setShowSummaryNotify] = useState(true);
	const [showTargetNotify, setShowTargetNotify] = useState(true);
	const [showLimitNotify, setShowLimitNotify] = useState(true);
	
	const[id,setId] = useState('')
	const auth = useAuth()
	const tokenBearer = auth.getTokens()
	const d = new Date();
	const year = d.getFullYear();

	const handleChangInput = (e) => {
		const inputValue = e.target.value;
		// Kiểm tra từng trường và cập nhật hiển thị thông báo tương ứng
		switch (e.target.name) {
			case 'name':
				setShowNameNotify(inputValue.trim() === '');
				break;
			case 'summary':
				setShowSummaryNotify(inputValue.trim() === '');
				break;
			case 'target':
				setShowTargetNotify(inputValue.trim() === '');
				break;
			case 'limit':
				setShowLimitNotify(inputValue.trim() === '');
				break;
			default:
				break;
		}
	};

	
	useEffect(()=>{
		fetchApi().then((res)=>{
			setDataHNC(res.data)
		})
	},[])
	const fetchApi = async()=>{
		let result = Result.getResearch2(tokenBearer.access_token, year)
		return result
	}
	const handleGetId = (e)=>{
		setId(e.target.value)
	}
	const handleAddTopic = async(data)=>{
		console.log(data)
		if(showNameNotify || showSummaryNotify || showTargetNotify || showLimitNotify){
			showToast('error','Vui lòng nhập đầy đủ trường dữ liệu')
		}
		else{
			let result = Result.AddTopic(data,tokenBearer.access_token)
			if(result){
				showToast('success','Thêm đề tài thành công')
				reset()
				}
				else {
					showToast('error','Thêm đề tài thất bại')
				}
			}	
		}

	console.log(id)
	return (
		<div className={cx('wrapper')}>
			<ToastContainer/>
			<form className={cx('table')} onSubmit={handleSubmit(handleAddTopic)}>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Thêm đề tài</div>
				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Thêm đề tài</div>

					</div>

					<div className={cx('border')}>
						<div className={cx('content')}>
							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên HNC</div>
										<div className={cx('item-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
												onChange={handleGetId}
												{...register('idHNC')}
											>
												<option>--Chọn HNC--</option>
												{
													dataHNC.map(data=>(
														<option key ={data.id} value={data.id}>{data.name}</option>
													))
												}
											</select>
										</div>
									</div>
								</div>
								<div className={cx('content-item-card')}>
								<div className={cx('item')}>
									<div className={cx('item-title')}>Tên đề tài</div>
									{showNameNotify && <div className={cx('notify')}>Tên nhóm không được để trống</div>}
									<div className={cx('item-content')}>
										<textarea  type="text" className={cx('input')} placeholder="Tên đề tài" {...register('name')} onChange={handleChangInput}/>
									</div>
								</div>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Tóm tắt</div>
								{showSummaryNotify && <div className={cx('notify')}>Tên nhóm không được để trống</div>}
								<div className={cx('item-content')}>
									<textarea type="text" className={cx('input')} placeholder="Tóm tắt" {...register('summary')} onChange={handleChangInput}/>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Mục tiêu</div>
								{showTargetNotify && <div className={cx('notify')}>Tên nhóm không được để trống</div>}
								<div className={cx('item-content')}>
									<textarea  type="text" className={cx('input')} placeholder="Mục tiêu" {...register('target')} onChange={handleChangInput}/>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Phạm vi</div>
								{showLimitNotify && <div className={cx('notify')}>Tên nhóm không được để trống</div>}
								<div className={cx('item-content')}>
									<textarea  type="text" className={cx('input')} placeholder="Phạm vi" {...register('limit')} onChange={handleChangInput}/>
								</div>
							</div>

							<div className={cx('btn-container')}>
								<button className={cx('btn-save')}>
									Lưu
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			</form>
		</div>
	);
}

export default AddTopic;
