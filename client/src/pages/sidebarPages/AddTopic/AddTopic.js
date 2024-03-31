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
	const[id,setId] = useState('')
	const auth = useAuth()
	const tokenBearer = auth.getTokens()
	const d = new Date();
	const year = d.getFullYear();

	useEffect(()=>{
		fetchApi().then((res)=>{
			setDataHNC(res.data)
		})
	},[])
	const fetchApi = async()=>{
		let result = Result.getResearch(tokenBearer.access_token, year)
		return result
	}
	const handleGetId = (e)=>{
		setId(e.target.value)
	}
	const handleAddTopic = async(data)=>{
		console.log(data)
		let result = Result.AddTopic(data,tokenBearer.access_token)
		console.log(result);
		if(result){
			showToast('success','Thêm đề tài thành công rực rỡ ')
		}
		else{
			showToast('error','Thêm đề tài thất bại thảm hại ')
		}
	}
	console.log(id)
	return (
		<div className={cx('wrapper')}>
			<ToastContainer/>
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
										<div className={cx('item-content')}>
											<textarea type="text" className={cx('input')} placeholder="Tên đề tài" {...register('name')}/>
										</div>
									</div>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Tóm tắt</div>
								<div className={cx('item-content')}>
									<textarea type="text" className={cx('input')} placeholder="Tóm tắt" {...register('summary')}/>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Mục tiêu</div>
								<div className={cx('item-content')}>
									<textarea type="text" className={cx('input')} placeholder="Mục tiêu" {...register('target')}/>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Phạm vi</div>
								<div className={cx('item-content')}>
									<textarea type="text" className={cx('input')} placeholder="Phạm vi" {...register('limit')}/>
								</div>
							</div>

							<div className={cx('btn-container')}>
								<div className={cx('btn-save')} onClick={handleSubmit(handleAddTopic)}>
									Lưu
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddTopic;
