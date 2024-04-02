
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import Styles from './addResearch.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
import * as Result from '~/apiService/authService'
import { useAuth } from "~/Components/Auth";
const cx = classNames.bind(Styles)

function addResearch() {
	const [data, setData] = useState([])
	const [teacher,setTeacher] = useState([])
	const [num, setNum] = useState('');
	const [submit, setSubmit] = useState(false)
	const [id ,setId] = useState('')
	const { register, handleSubmit, reset, watch,setValue } = useForm()
	const auth = useAuth()
	const tokenBearer = auth.getTokens()
	const currentDate = new Date().toISOString()
	const handleGetId = (e) =>{
		setId(e.target.value)
	}
	const handleChangeDate = (event) => {
		const inputNum = event.target.value;
		if (inputNum >= currentDate) {
			setValue("dateCreated",inputNum)
			setSubmit(true)
		}
		else{
			setSubmit(false)
			showToast('error','Ngày tạo phải lớn hơn hoặc bằng ngày hiện tại')
		}
	};
	const handleChangeNumber = (event) => {
		const inputNum = event.target.value;
		if(inputNum !== ''){
			if (!isNaN(inputNum) && inputNum >= 5 && inputNum <= 9) {
						setValue("quantity",inputNum)
						setSubmit(true)
					}
					else{
						setSubmit(false)
						showToast('error','Số nhập vào phải từ 5 đến 9')
					}
		}
	};
	// const handleSubmitForm = () => {
	// 	const fetchApi = async () => {
	// 		let result;
	// 		result = await Result.updateResearch(watch('name'), watch('date'), watch('quantity'), watch('summary'), watch('target'), watch('limit'), watch('note'));
	// 	}
	// 	fetchApi()
	// }
	console.log(id);
	const onSubmit = async (data) => {
		// async request which may result error
		console.log(data);
		try {
			// await fetch()

			const result = await Result.updateResearch(data, tokenBearer.access_token);
			if (result) {
				showToast('success', "Thêm hướng nghiên cứu thành công!")
				reset();
			}
			else {
				showToast('error', "Xảy ra lỗi khi thêm dữ liệu !")

			}
		} catch (e) {
			// handle your error
			console.log(e);
		}
	}
	useEffect(()=>
	{
		fetchApiTeacher().then((res)=>{
			setTeacher(res.data)
		})
	},[])
	const fetchApiTeacher = async ()=>{
		let result
		result = await Result.getNameTeacher(tokenBearer.access_token)
		return result
	}
	return (
		<div className={cx('wrapper')}>
			<ToastContainer/>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Hướng nghiên cứu - Thêm HNC</div>
				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Thêm hướng nghiên cứu</div>

					</div>
						<form className={cx('table')} onSubmit={handleSubmit(onSubmit)}>
						<div className={cx('border')}>
						<div className={cx('content')}>
							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Chọn giảng viên hướng dẫn</div>
										<div className={cx('item-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
												onChange={handleGetId} {...register('idGV')}
											>
													<option>--Chọn giảng viên hướng dẫn--</option>
													{
														teacher.map(data=>(<option key ={data.id}  value={data.idGV} className={cx('data-option')} >{data.tenGV}</option>))
													}
											</select>
										</div>
									</div>
								</div>
								<div className={cx('content-item-card')}>
								<div className={cx('item')}>
									<div className={cx('item-title')}>Tên hướng nghiên cứu</div>
									<div className={cx('item-content')}>
									<input className={cx('input')} type='text' id='name' {...register('name', { require: true })} required/>
									</div>
								</div>
								</div>
							</div>

							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Ngày tạo</div>
										<div className={cx('item-content')}>
										<input className={cx('input')} type='date' onChange={handleChangeDate} required/>
										</div>
									</div>
								</div>
								<div className={cx('content-item-card')}>
								<div className={cx('item')}>
									<div className={cx('item-title')}>Số lượng người tham gia</div>
									<div className={cx('item-content')}>
									<input className={cx('input')} type="number" onChange={handleChangeNumber} required/>									</div>
								</div>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Tóm tắt</div>
								<div className={cx('item-content')}>
								<textarea className={cx('input')} type='text' {...register("summary")} required/>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Mục tiêu</div>
								<div className={cx('item-content')}>
								<textarea className={cx('input')} type='text' {...register("target")} required/>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Phạm vi</div>
								<div className={cx('item-content')}>
								<textarea className={cx('input')} type='text' {...register("limit")} required/>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Ghi chú</div>
								<div className={cx('item-content')}>
								<textarea className={cx('input')} type='text' {...register("note")} required/>
								</div>
							</div>

							<div className={cx('btn-container')}>
								<button className={cx('btn-save')}>
									Lưu
								</button>
							</div>
						</div>

					</div>
						</form>
				</div>
			</div>
		</div>
		)
}
export default addResearch