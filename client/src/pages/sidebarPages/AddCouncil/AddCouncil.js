import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AddCouncil.module.scss';
import classNames from 'classnames/bind';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as Result from '~/apiService/authService'
import { useAuth } from '~/Components/Auth';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
const cx = classNames.bind(styles);

function AddCouncil() {
	const auth = useAuth()
	const tokenBearer = auth.getTokens()

	const [dataTopic,setDataTopic] = useState([])
	const [dataTeacher,setDataTeacher] = useState([])
    const [selectedYear, setSelectedYear] = useState('2024');

	const [nameCouncil, setNameCouncil] = useState([])
	const [gradingDate, setGradingDate] = useState('')
	const [address, setAddress] = useState('')
	const [note, setNote] = useState('')
	const [idTeacher, setIDTeacher] = useState([])

	const [arrTopic, setArrTopic] = useState([])
	const [arrTeacher, setArrTeacher] = useState([])
	const [showTeacherNotify, setShowTeacherNotify] = useState(false);
    const [showTopicNotify, setShowTopicNotify] = useState(false);
	const handleYearChange = (event) => {
        const selectedYearValue = event.target.value;
        setSelectedYear(selectedYearValue);
    };

	const handleChangeCouncil = (e) => {
		setNameCouncil(e.target.value)
	}
	const checkNotify = () => {
        setShowTeacherNotify(arrTeacher.length === 0);
        setShowTopicNotify(arrTopic.length === 0);
    };
	useEffect(()=>{
		checkNotify()
	},[arrTeacher, arrTopic])
	const handleChangeAddress = (e) => {
		setAddress(e.target.value)
	}
	const handleChangeNote = (e) => {
		setNote(e.target.value)
	}
	const handleChangeGradingDate = (e) => {
		setGradingDate(e.target.value)
	}
	//them sinh vien
	const handleAddTeacher = (id) => {
		setIDTeacher(id);
		if (arrTeacher.length === 0) {
			setArrTeacher([id]);
		} else {
			setArrTeacher(prevArrTeachers => [...prevArrTeachers, id]);
		}
	};
	const handleDeleteTeacher = (id) => {
		const updatedTeacher = arrTeacher.filter(idTeacher => id !== idTeacher);
		setArrTeacher(updatedTeacher);
	}

	//them topic
	const handleAddTopic = (id)=> {
		if (arrTopic.length === 0) {
			setArrTopic([id]);
		} else {
			setArrTopic(prevArrTopic => [...prevArrTopic, id]);
		}
	}
	const handleDeleteTopic = (id) => {
		const updatedTopic = arrTopic.filter(idTopic => id !== idTopic);
		setArrTopic(updatedTopic);
	}
	//fetchAPI Topic
	const fetchApiTopic = async ()=>{
		let result
		result = await Result.getTopicNoCouncil(tokenBearer.access_token, selectedYear)
		return result
	}

	//fetchAPI Teacher
	const fetchApiTeacher = async ()=>{
		let result
		result = await Result.getAllTeacher(tokenBearer.access_token)
		return result
	}

	//api thay doi theo nam
	useEffect(()=>{
		fetchApiTopic().then((data)=>{
			setDataTopic(data.data)
		})
	},[selectedYear])

	useEffect(()=>{
		fetchApiTeacher().then((data)=>{
			setDataTeacher(data.data)
		})
	},[])

	//POST API
	const posthApi = async () => {
		try {
			const result = await Result.postAddCouoncil(nameCouncil,gradingDate ,address,note,arrTopic, arrTeacher, tokenBearer.access_token);
			return result;
		} catch (error) {
			console.error('Đã xảy ra lỗi khi gửi dữ liệu:', error);
			throw error;
		}
	}
	const handlesShowNotification = () => {
		const show = window.confirm("Bạn có chắc chắn với lựa chọn này?");
		if (show) {
			posthApi()
				.then((res) => {
					if (res) {
						showToast('success', 'Đăng kí thành công!');
					} else {
						showToast('error', 'Đăng kí thất bại!');
					}
				})
				.catch((error) => {
					console.error('Lỗi khi xử lý yêu cầu:', error);
					showToast('error', 'Đã xảy ra lỗi khi gửi yêu cầu!');
				});
		}
	}
    return ( 
        <div className={cx('wrapper')}>
			            <ToastContainer/>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Thêm hội đồng</div>
				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Thêm hội đồng</div>
						<div className={cx('frame-year')}>
							<select className={cx('year')} id="year" name="year" onClick={handleYearChange}>
								<option className={cx(selectedYear === '2024' && 'year-active')} value="2024">2023-2024</option>
								<option className={cx(selectedYear === '2023' && 'year-active')} value="2023">2022-2023</option>
								<option className={cx(selectedYear === '2022' && 'year-active')} value="2022">2021-2022</option>
								<option className={cx(selectedYear === '2021' && 'year-active')} value="2021">2020-2021</option>
							</select>
						</div>
					</div>

                    <div className={cx('border')}>
						<div className={cx('content')}>
							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên hội đồng</div>
										<div className={cx('item-content')}>
                                        <input 
											type="text"
											className={cx('input')}
											placeholder="Tên hội đồng" 
											onChange={handleChangeCouncil}/>
										</div>
									</div>
								</div>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Ngày chấm</div>
										<div className={cx('item-content')}>
                                        <input type="date" className={cx('input')} onChange={handleChangeGradingDate}/>
                                        </div>
									</div>
								</div>
							</div>

							<div className={cx('content-list-card')}>
							<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Địa điểm</div>
										<div className={cx('item-content')}>
                                        <input type="text" className={cx('input')} placeholder="Địa điểm" onChange={handleChangeAddress} />
										</div>
									</div>
								</div>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Ghi chú</div>
										<div className={cx('item-content')}>
										<textarea type="text" className={cx('input')} placeholder="Ghi chú" onChange={handleChangeNote} />
                                        </div>
									</div>
								</div>
							</div>

							{/* <div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
								<div className={cx('item')}>
                                    <div className={cx('item-title')}>Tìm Kiếm Giảng Viên</div>
                                    <div className={cx('item-content')}>
                                        <div className={cx('input-wrap')}>
                                            <input
                                                type="text"
                                                className={cx('input')}
                                                placeholder="Lại Quang Thắng - 20A10010223"
                                            />
                                            <FontAwesomeIcon className={cx('search-btn')} icon={faMagnifyingGlass}/>
                                        </div>
                                    </div>
                                </div>
							</div>
							</div> */}

							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item-wrap')}>
		                                <div className={cx('item-title')}>Danh sách giảng viên</div>
										{
											dataTeacher.length == 0 ? (<div></div>) : (dataTeacher.map(valueData => 
												<div key={valueData.idGV} className={cx('item-child')}>
		                                    		<div className={cx('item-content')}>
													<div className={cx('item-text')}>{valueData.tenGV}</div>
		                                    		</div>
		                                    		<button onClick={()=> handleAddTeacher(valueData.idGV)} className={cx('btn-add')}>Thêm</button>
		                                		</div>
											))
										}
		                            </div>
								</div>

								<div className={cx('content-item-card')}>
								<div className={cx('item-wrap')}>
                                <div className={cx('item-title')}>Giảng viên được chọn(*)</div>
                                {showTeacherNotify && <div className={cx('notify')}>Giảng viên không được để trống</div>}
										{dataTeacher.length === 0 ? (<div></div>) : (dataTeacher.filter(valueTeacher => arrTeacher.includes(valueTeacher.idGV)).map(selectedTeacher => (
											<div key={selectedTeacher.idGV} className={cx('item-child')}>
												<div className={cx('item-content')}>
												<div className={cx('item-text')}>{selectedTeacher.tenGV}</div>
												</div>
												<input
														type="hidden"
														className={cx('input')}
														value={selectedTeacher.idGV}
													/>
												<button onClick={()=>handleDeleteTeacher(selectedTeacher.idGV)} className={cx('btn-del')}>Xóa</button>
											</div>
										)))}
                               
                            </div>
								</div>
							</div>

							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item-wrap')}>
		                                <div className={cx('item-title')}>Danh sách Đề Tài</div>
											{dataTopic.length === 0 ? (<div></div>) : (dataTopic.map(valueData => 
												<div key={valueData.id} className={cx('item-child')}>
		                                    		<div className={cx('item-content')}>
													<div className={cx('item-text')}>{valueData.name}</div>
		                                    		</div>
		                                    		<button onClick={()=> handleAddTopic(valueData.id)} className={cx('btn-add')}>Thêm</button>
		                                		</div>
											))}
		                            </div>
								</div>

								<div className={cx('content-item-card')}>
								<div className={cx('item-wrap')}>
                                <div className={cx('item-title')}>Đề Tài được chọn(*)</div>
                                {showTopicNotify && <div className={cx('notify')}>Đề Tài không được để trống</div>}
										{dataTopic.length === 0 ? (<div></div>) : (dataTopic.filter(valueTopic => arrTopic.includes(valueTopic.id)).map(selectedTopic => (
											<div key={selectedTopic.id} className={cx('item-child')}>
												<div className={cx('item-content')}>
												<div className={cx('item-text')}>{selectedTopic.name}</div>
												</div>
												<input
														type="hidden"
														className={cx('input')}
														value={selectedTopic.id}
													/>
												<button onClick={()=>handleDeleteTopic(selectedTopic.id)} className={cx('btn-del')}>Xóa</button>
											</div>
										)))}

                                
                            </div>
								</div>
							</div>
							<div className={cx('btn-container')}>
                        <button onClick={handlesShowNotification} className={cx('btn-submit')}>Lưu</button>
                    </div>
						</div>
					</div>
				</div>
			</div>
		</div>


     );
}

export default AddCouncil;