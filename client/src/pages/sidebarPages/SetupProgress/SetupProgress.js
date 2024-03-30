import { useEffect, useState } from 'react';
import styles from './SetupProgress.module.scss';
import classNames from 'classnames/bind';
import * as Result from '~/apiService/authService'
import { useAuth } from '~/Components/Auth';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);
function SetupProgress() {
	const auth = useAuth()
	const tokenBearer = auth.getTokens()

	const [data,setData] = useState([])
    const [selectedYear, setSelectedYear] = useState('2024');
	const [idGroupName, setIDGroupName] = useState('')
	const [idTopic, SetIDTopic] = useState('')
	const [progressList, setProgressList] = useState([]); // State để lưu trữ danh sách các đợt tiến độ

	
	const handleYearChange = (event) => {
        const selectedYearValue = event.target.value;
        setSelectedYear(selectedYearValue);
    };

	 const fetchApi = async ()=>{
		let result
		result = await Result.getSetupProgress(selectedYear, tokenBearer.access_token)
		return result
	}
	
	const handleChangeSelected = (e)=>{
		setIDGroupName(e.target.value)
		data.map(valueData => {
			if(valueData.idBB === e.target.value){
				return (
					SetIDTopic(valueData.id)
				)
			}
		})
		
	}
	
	const formatDate = (dateString) => {
		const [year, month, day] = dateString.split('-');
		return `${day}-${month}-${year}`;
	};

	const timeArray = progressList.map((item) => ({
		tenBC : item.nameReport,
		ngayLap: formatDate(item.startDate),
    	ngayKetThuc: formatDate(item.endDate)
	}))


	//Add Progress
	const handleAddProgress = () => {
		// Thêm một đợt tiến độ mới vào danh sách
		setProgressList(prevList => [...prevList, { nameReport: '', startDate: '', endDate: '' }]);
	  };

	//Delete Progress
	const handleDeleteProgress = (index) => {
		// Xóa một đợt tiến độ khỏi danh sách
		const newList = [...progressList];
		newList.splice(index, 1);
		setProgressList(newList);
	};

	const handleStartDateChange = (index, event) => {
		// Cập nhật ngày bắt đầu của đợt tiến độ
		const newList = [...progressList];
		newList[index].startDate = event.target.value;
		setProgressList(newList);
	};
	
	const handleEndDateChange = (index, event) => {
		// Cập nhật ngày kết thúc của đợt tiến độ
		const newList = [...progressList];
		newList[index].endDate = event.target.value;
		setProgressList(newList);
	};
	
	const handleChangeInput = (index, event) => {
		const newList = [...progressList]
		newList[index].nameReport = event.target.value
    	setProgressList(newList)
	}
	const handleSubmit = () =>{
		const show = window.confirm("Bạn có chắc chắn với lựa chọn này?");
		if (show) {
			let checked = false
			progressList.map(progressItem => {
				if(progressItem.startDate >= progressItem.endDate) {
					alert("Vui lòng nhập lại thời gian Tiến độ!")
					checked = false
					return checked;
				}
				else{
					checked = true
					return checked;
				}
			})

			if(checked){
				posthApi()
					.then((res) => {
						if (res) {
							showToast('success', 'Đăng kí thành công!');
						} else {
							showToast('error', 'Đăng kí thất bại!');
						}
						console.log(res);
					})
					.catch((error) => {
						console.error('Lỗi khi xử lý yêu cầu:', error);
						showToast('error', 'Đã xảy ra lỗi khi gửi yêu cầu!');
					});
			}
		}
	}


	const posthApi = async () => {
		try {
			const result = await Result.postSetupProgress(idTopic,idGroupName ,timeArray, tokenBearer.access_token);
			return result;
		} catch (error) {
			console.error('Đã xảy ra lỗi khi gửi dữ liệu:', error);
			throw error;
		}
	}

	useEffect(() => {
		// Lấy ID của phần tử đầu tiên trong mảng data và lưu vào selectedId
		if (data.length > 0) {
			setIDGroupName(data[0].idBB);
			SetIDTopic(data[0].id)
		}
	  }, [data]); // useEffect sẽ chạy lại khi data thay đổi

	//api thay doi theo nam
	 useEffect(()=>{
		fetchApi().then((data)=>{
			setData(data.data)
		})
	},[selectedYear])

	return (
		<div className={cx('wrapper')}>
			<ToastContainer/>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Lập đợt tiến độ</div>

				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Danh sách sinh viên đăng ký hướng nghiên cứu</div>
						<div className={cx('frame-year')}>
							<select className={cx('year')} id="year" name="year" onClick={handleYearChange}>
								<option className={cx(selectedYear === '2020' && 'year-active')} value="2020">2020-2021</option>
								<option className={cx(selectedYear === '2021' && 'year-active')} value="2021">2021-2022</option>
								<option className={cx(selectedYear === '2022' && 'year-active')} value="2022">2022-2023</option>
								<option className={cx(selectedYear === '2023' && 'year-active')} value="2023">2023-2024</option>
								<option className={cx(selectedYear === '2024' && 'year-active')} value="2024">2024-2025</option>
							</select>
						</div>
					</div>

					<div className={cx('border')}>
						<div className={cx('content')}>
							<div className={cx('content-list-name')}>
								<div className={cx('content-item-name')}>
										<div  className={cx('item')}>
										<div className={cx('item-title')}>Tên nhóm</div>
										<div className={cx('item-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
												onChange={handleChangeSelected}
												value={idGroupName}
											>
												{data.map(newData =>
													<option key={newData.idBB} value={newData.idBB}>{newData.idBB}</option>)}
											</select>
										</div>
									</div>
								</div>
								<div className={cx('content-item-name')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên đề tài</div>
										<div
											className={cx('item-content')}>
												{data.map(newData => {
													if (newData.idBB === idGroupName) {
														return (
														<div
															key={newData.id} 
															className={cx('item-text')}>{newData.id}</div>
														);
													} else {
														return null; 
													}
													})}

												

										</div>
									</div>
								</div>
							</div>
							

							<div className={cx('content-progress')}>
								<div className={cx('progress-spacing')}>
									<div className={cx('progress-title')}>Tiến độ</div>
									<button onClick={handleAddProgress} className={cx('btn-add')}>+</button>
								</div>
								<div  className={cx('border')}>
								{progressList.map((progress, index) => (
									<div key={index}className={cx('progress-timeline')}>
										<div className={cx('progress-item-card')}>
												<div className={cx('item-title')}>Tên Báo Cáo</div>
												<div className={cx('item-content')}>
													<input value={progress.nameReport} onChange={(event) => handleChangeInput(index, event)} type='text' className={cx('input')} placeholder='Nhập tên báo cáo'/>
												</div>
											</div>
										<div className={cx('progress-item')}>
											
											<div className={cx('progress-item-card')}>
												<div className={cx('item-title')}>Ngày bắt đầu</div>
												<div className={cx('item-content')}>
												<input type="date" className={cx('input-item')} value={progress.startDate} onChange={(event) => handleStartDateChange(index, event)} />
												</div>
											</div>
											<div className={cx('progress-item-card')}>
												<div className={cx('item-title')}>Ngày kết thúc</div>
												<div className={cx('item-content')}>
												<input type="date" className={cx('input-item')} value={progress.endDate} onChange={(event) => handleEndDateChange(index, event)} />
												</div>
											</div>
											<button onClick={() => handleDeleteProgress(index)} className={cx('btn-del')}>-</button>
										</div>
									</div>
								))}
									</div>

								<div className={cx('btn-container')}>
									<button onClick={handleSubmit} className={cx('btn-submit')}>Lưu</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SetupProgress;
