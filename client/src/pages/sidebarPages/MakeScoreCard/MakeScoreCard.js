import styles from './MakeScoreCard.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as Result from '~/apiService/authService'
import { useAuth } from '~/Components/Auth';
import { useForm } from 'react-hook-form';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
const cx = classNames.bind(styles);
function MakeScoreCard() {
	const [showYear,setShowYear] =  useState(false)
	const [data,setData] = useState([])
	const [id,setId] = useState([])
	const [newData,setNewData] = useState([])
	const [activeYear,setActiveYear] = useState('2024');
	const {register,handleSubmit} = useForm()
	const auth = useAuth()
	const tokenBaerer = auth.getTokens()
	const handleSubmitScore = (data)=>{
		let result = Result.createScoreCard(data,tokenBaerer.access_token)
		console.log(result);
		if(result){
			showToast('success','Thêm phiếu điểm thành công !')
		}
		else{
			showToast('error','Thêm phiếu điểm thất bại !')
		}
	}
	const handleGetId = (e)=>{
		setId(e.target.value);
	}
	const handleShowYear = ()=>{
		setShowYear(!showYear)
	}
	const handleActiveYear = (e)=>{
			setActiveYear(e)
	}
	useEffect(()=>{
		const dataOne = data.filter(data=>data.id === id)
		if(dataOne.length > 0){
			const topics = dataOne[0].topicArr.data;
			const newIdNameArray = topics.map(topic => ({
				idHNC: topic.idHNC,
				name: topic.name,
				dateCreate:topic.dateCreate,
				id:topic.id
			}))
			setNewData(newIdNameArray)
		}
	},[data,id])
	useEffect(()=>{
		fetchApi().then((res)=>{
			setData(res.data);
		})
	},[activeYear])
	const fetchApi = async()=>{
		let result = Result.getViewPoint(activeYear,tokenBaerer.access_token)
		return result
	}
	return (
		<div className={cx('wrapper')}>
			<ToastContainer/>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Phân nhóm đề tài</div>
				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Phiếu điểm</div>
						<div className={cx('chose')}> 
					<div className={cx('chose-year')}>
						<div className={cx('text')}>Năm học</div>
						<FontAwesomeIcon icon={showYear ? faAngleUp : faAngleDown} onClick={handleShowYear}/>
					</div>
					{
						showYear && (<ul className={cx('option')}>
						<li className={cx(activeYear === '2022' && 'year-active')} onClick ={()=> handleActiveYear('2022')}>2021-2022</li>
						<li className={cx(activeYear === '2023' && 'year-active')} onClick ={()=> handleActiveYear('2023')}>2022-2023</li>
						<li className={cx(activeYear === '2024' && 'year-active')} onClick ={()=> handleActiveYear('2024')}>2023-2024</li>
					</ul>)
					}
					</div>
					</div>

					<div className={cx('border')}>
						<div className={cx('content')}>
							<div className={cx('item')}>
								<div className={cx('item-title')}>Tên nhóm</div>
								<div className={cx('item-content')}>
									<select className={cx('custom-select')} id="custom-select" name="custom-select" {...register('idHD')}onChange={e=>handleGetId(e)}>
										<option>-Lựa chọn-</option>
										{data.map(data=>(<option key={data.id} value={data.id}>{data.name}</option>))}
									</select>
								</div>
							</div>

							{
								(data.length && newData.length ) > 0 ? (<>
								<div className={cx('item-title')}>Phiếu điểm</div>
								<table className={cx('table')}>
									<thead className={cx('table-header')}>
										<tr className={cx('table-header-row')}>
											<th className={cx('table-header-cell')}>Tên Đề Tài</th>
											<th className={cx('table-header-cell')}>Tên Phiếu</th>
											<th className={cx('table-header-cell')}>Điểm</th>
											<th className={cx('table-header-cell')}>Ghi Chú</th>
										</tr>
									</thead>
									<tbody>
										{ newData.map((data,index)=>(
											<tr className={cx('table-inner-row')} key ={data.id}>
											<td className={cx('table-inner-row-content')}>
												{data.name}
											</td>
											<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" value={data.id}  {...register(`topicArr[${index}].idDT`)}style={{display :'none'}}/>
												<input className={cx('input')} type="text" placeholder="Nhâp Phiếu..." {...register(`topicArr[${index}].tenPD`)}/>
											</td>
											<td className={cx('table-inner-row-content')}>
												<input className={cx('input')} type="text" placeholder="Nhập Điểm..." {...register(`topicArr[${index}].diem`)}/>
											</td>
											<td className={cx('table-inner-row-content')}>
												<input className={cx('input')} type="text" placeholder="Ghi Chú..." {...register(`topicArr[${index}].ghiChu`)}/>
											</td>
										</tr>
										))  }
									</tbody>
								</table>
	
								  <div className={cx('btn-container')}>
									<div className={cx('btn-submit')} onClick={handleSubmit(handleSubmitScore)}>Lưu</div>
								</div></>) : (<div className={cx('note-no-data')}>Không có dữ liệu</div>)
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MakeScoreCard;
