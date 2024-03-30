import { useEffect, useRef, useState } from 'react';
import styles from './TopicGroup.module.scss';
import classNames from 'classnames/bind';
import * as Result from '~/apiService/authService'
import { useParams } from 'react-router-dom';
import { useAuth } from '~/Components/Auth';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Value } from 'sass';

const cx = classNames.bind(styles);

function TopicGroup() {
    const auth = useAuth()
	const tokenBearer = auth.getTokens()
	const groupSelectRef = useRef(null);
	const {register, handleSubmit} = useForm();
	const [selectedYear, setSelectedYear] = useState('2024');
    const [data, setData] = useState([]);
	const [groupName, setGroupName] = useState('');
	const [showNotify, setShowNotify] = useState(true);

	const [idStudent, setIdStudent] = useState('')
	const [arrStudents, setArrStudents] = useState([])
	const [idHNC, setIdHNC] = useState('');
	const filterHNC = data.filter(newData => newData.id===idHNC)
	
	const handleGroupNameChange = (event) => {
        const value = event.target.value;
        setGroupName(value);
        setShowNotify(value.trim() === '');
    };

	const handleYearChange = (event) => {
        const selectedYearValue = event.target.value;
        setSelectedYear(selectedYearValue);
    };
	
	//thay doi lua chon HNC
	const handleChangeSelected = e => {
        const initialGroupId = e.target.value;
        setIdHNC(initialGroupId);
		setArrStudents([])
		
		console.log(idHNC);
	}
	
	//them sinh vien
	const handleAddStudent = (id) => {
		setIdStudent(id);
		if (arrStudents.length === 0) {
			setArrStudents([id]);
		} else {
			setArrStudents(prevArrStudents => [...prevArrStudents, id]);
		}
	};
	const handleDeleteStudent = (id) => {
		const updatedStudents = arrStudents.filter(idStudent => id !== idStudent);
		setArrStudents(updatedStudents);
	}
	useEffect(()=>{
		fetchApi().then((data)=>{
			setData(data.data)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])
	const fetchApi = async ()=>{
		let result
		result = await Result.getAllHNC(selectedYear, tokenBearer.access_token)
		return result
	}

	const posthApi = async (alldata)=>{
		let result
		result = await Result.postTopicGroup(alldata, tokenBearer.access_token)
        return result;
	}
	
	const handlesShowNotification =(data)=>{
		console.log(data);
		const show =  window.confirm("Bạn có chắc với lựa chọn này");
		if(show){
			posthApi(data)
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

	return (
		<div className={cx('wrapper')}>
			            <ToastContainer/>

			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Phân nhóm đề tài</div>

				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Danh sách sinh viên đăng ký hướng nghiên cứu</div>
						<div className={cx('frame-year')}>

						<select className={cx('year')} id="year" name="year" onChange={handleYearChange}>
							<option className={cx(selectedYear === '2020' && 'year-active')} value="2020">2020-2021</option>
                        	<option className={cx(selectedYear === '2021' && 'year-active')} value="2021">2021-2022</option>
                        	<option className={cx(selectedYear === '2022' && 'year-active')} value="2022">2022-2023</option>
                        	<option className={cx(selectedYear === '2023' && 'year-active')} value="2023">2023-2024</option>
						</select>
					</div>
				</div>

					<table className={cx('table')}>
						<thead className={cx('table-header')}>
							<tr className={cx('table-header-row')}>
								<th className={cx('table-header-cell')}>Tên Hướng Nghiên Cứu</th>
								<th className={cx('table-header-cell')}>Họ Và Tên Sinh Viên</th>
								<th className={cx('table-header-cell')}>Số Lượng Phân Công Tối Đa</th>
							</tr>
						</thead>
						{
							data.map(newData => 
								<tbody key={newData.id}>
							<tr className={cx('table-inner-row')}>
								<td className={cx('table-inner-row-content')}>{newData.name}</td>
								<td className={cx('table-inner-row-content')}>
									{
										newData.students.map(dataStudents=>
											<div key={dataStudents.id}>{dataStudents.name}</div>
										)
									}
								</td>
								<td className={cx('table-inner-row-content')}>{newData.quantity}</td>
							</tr>
							
						</tbody>
						)
						}
						
					</table>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Phân nhóm đề tài</div>
					</div>
					<div className={cx('border')}>
						<div className={cx('content')}>
							<div className={cx('content-spacing')}>
								<div className={cx('content-block')}>
									<div className={cx('item-wrap')}>
										<div className={cx('item')}>
											<div className={cx('item-title')}>Hướng nghiên cứu</div>
											<div className={cx('item-content')}>
												<select
													className={cx('custom-select')}
													id="groupselect"
													name="custom-select"
													ref={groupSelectRef}
													{...register('HNC')}
													onChange={handleChangeSelected}
												>
													<option >-- Select --</option>
													{data.map(newData =>
														<option key={newData.id} value={newData.id}>{newData.name}</option>)}
												</select>
											</div>
										</div>
									</div>
									<div className={cx('item-wrap')}>
										<div className={cx('item-title')}>Danh sách sinh viên</div>
										{filterHNC.map(dataHNC =>
											dataHNC.students.map(dataStudents=>
												{const handleAddStudentWithLogging = () => {
													setIdStudent(dataStudents.id)
													handleAddStudent(dataStudents.id);
												};
										
												return (
													<div key={dataStudents.id} className={cx('item-child')}>
														<div className={cx('item-content')}>
															<div className={cx('item-text')}>{dataStudents.name}</div>
														</div>
														<button className={cx('btn-add')} onClick={handleAddStudentWithLogging}>Thêm</button>
													</div>
												);}
										))
										}
									</div>
								</div>
								<div className={cx('content-block')}>
									<div className={cx('item-wrap')}>
										<div className={cx('item')}>
											<div className={cx('item-title')}>Tên nhóm(*)</div>
											<div className={cx('item-content')}>
												<input
													type="text"
													className={cx('input')}
													placeholder="Nhập Tên Nhóm"
													value={groupName}
													{...register('name')}
													onChange={handleGroupNameChange}

												/>
											</div>
											{showNotify && <div className={cx('notify')}>Tên nhóm không được để trống</div>}
										</div>
									</div>

									<div className={cx('item-wrap')}>
										<div className={cx('item-title')}>Thành viên được chọn(*)</div>
										<div className={cx('notify')}>Thành viên không được để trống</div>

										{filterHNC.map(newData =>
                                            newData.students.filter(dataStudents =>arrStudents.includes(dataStudents.id)).map((selectedStudent) => (
                                                <div key={selectedStudent.id} className={cx('item-child')}>
                                                    <div className={cx('item-content')}>
                                                        <div className={cx('item-text')}>{selectedStudent.name}</div>
                                                    </div>
													<input 
														type="hidden" 
														{...register('students')} // Truyền ID vào register ở đây
														value={selectedStudent.id} // Giá trị của input
													/>
                                                    <button className={cx('btn-del')}  onClick={() => handleDeleteStudent(selectedStudent.id)}>Xóa</button>
                                                </div>
                                            ))
                                        )}
									</div>
								</div>
							</div>
							<div className={cx('btn-container')}>
								<button className={cx('btn-submit')} onClick={handleSubmit(handlesShowNotification)}>Lưu</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TopicGroup;