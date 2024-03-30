
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
	const [id ,setId] = useState('')
	const { register, handleSubmit, reset, watch } = useForm()
	const auth = useAuth()
	const tokenBearer = auth.getTokens()
	const handleGetId = (e) =>{
		setId(e.target.value)
	}
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
		try {
			// await fetch()
			console.log(data);

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
	console.log(watch('id'))
	return (
		<div className={cx('container')}>
			<ToastContainer />
			<form className={cx('table')} key={data.id} onSubmit={handleSubmit(onSubmit)}>
				<div className={cx('header')}>Hướng nghiên cứu - Thêm HNC</div>
				<div className={cx('line')}></div>
				<div className={cx('wrapper')}>
					<div className={cx('name')}>Thêm hướng nghiên cứu</div>
					<div className={cx('teacher-chose')}>Chọn giảng viên hướng dẫn</div>
					<select className={cx('option')} onChange={handleGetId} {...register('idGV')}>
						{
							teacher.map(data=>(<option key ={data.id}  value={data.idGV} className={cx('data-option')} >{data.tenGV}</option>))
						}
					</select>
					<div className={cx('line-1')}>
						<div className={cx('research-name')}>
							<div className={cx('text')}>Tên hướng nghiên cứu: </div>
							<input type='text' id='name' {...register('name', { require: true })} required/>
						</div>
						<div className={cx('research-name')}>
							<div className={cx('text')}>Ngày tạo: </div>
							<input type='date' {...register("dateCreated")} required/>
						</div>
					</div>
					<div className={cx('line-2')}>
						<div className={cx('research-name')}>
							<div className={cx('text')}>Số lượng người tham gia: </div>
							<input type='text' {...register("quantity")} required/>
						</div>
					</div>
					<div className={cx('input-bottom')}>
						<div className={cx('text')}>Tóm tắt</div>
						<input type='text' {...register("summary")} required/>
						<div className={cx('text')}>Mục tiêu</div>
						<input type='text' {...register("target")} required/>
						<div className={cx('text')}>Phạm Vi</div>
						<input type='text' {...register("limit")} required/>
						<div className={cx('text')}>Ghi chú</div>
						<input type='text' {...register("note")} required/>
					</div>
					<div className={cx('footer')}>
						<button className={cx('register')}>Thêm</button>
					</div>
				</div>
			</form>
		</div>
	)
}
export default addResearch
