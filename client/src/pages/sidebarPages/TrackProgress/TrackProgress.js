import { useEffect, useState } from 'react';
import styles from './TrackProgress.module.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';
import { useAuth } from '~/Components/Auth';
import config from '~/config';
import * as Result from '~/apiService/authService'
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faClose, faCloudArrowUp, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
const cx = classNames.bind(styles);

function TrackProgress() {
	const auth = useAuth()
	const tokenBearer = auth.getTokens()
	const [selectedYear, setSelectedYear] = useState('2024');
	const [data,setData] = useState([])
	const [group,setGroup] = useState('')
	const [fileChange, setFileChange] = useState(null);
	const [submitReport,setSubmitReport] = useState([])
	const [showReportForm, setShowReportForm] = useState(false);
	const [selectedRow, setSelectedRow] = useState('');
	const [fileName,setFileName] = useState()
	const [sizeFile,setSizeFile] = useState('')
	const [uploadProgress, setUploadProgress] = useState(0);
	const [hideLoadFile,setHideLoadFile] = useState(true)
	const [message,setMessage] = useState('')
	const [successSubmitForm,setSuccessSubmitForm] = useState(false)
	const {register,handleSubmit,setValue} = useForm()
	const tokenBear = auth.getTokens()


	const [file,selectedFile] = useState(null)
	const handleYearChange = (e)=>{
		setSelectedYear(e)
	}
	const handleHideLoadFile = ()=>{
		setHideLoadFile(false)
	}
	const handleFileChange = (e)=>{

		let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
		selectedFile(image_as_files)
		setFileName(image_as_base64)
		// const formData = new FormData();
		// formData.append('file', image_as_files);
		setValue('file',image_as_files)
		const fileSize = ((image_as_files.size)/1024).toFixed(2);
		setSizeFile(fileSize)
		const chunkSize = 1; // Kích thước chunk tải lên (tùy chỉnh cho ứng dụng của bạn)

		const totalChunks = Math.ceil(fileSize / chunkSize);
		let currentChunk = 0;

		const reader = new FileReader();

		reader.onloadend = () => {

		currentChunk++;

		if (currentChunk < totalChunks) {
			const start = currentChunk * chunkSize;
			const end = Math.min(start + chunkSize, fileSize);
			const chunk = image_as_files.slice(start, end);
			reader.readAsArrayBuffer(chunk);
			const percentComplete = (currentChunk / totalChunks) * 100;
			setUploadProgress(percentComplete);
		} else {
			setUploadProgress(100); // Tải lên hoàn thành
		}
		};

		const start = currentChunk * chunkSize;
		const end = Math.min(start + chunkSize, fileSize);
		const chunk = image_as_files.slice(start, end);
		reader.readAsArrayBuffer(chunk);
	}
	const handleSubmitReport = (id)=>{
			setShowReportForm(true);
      		setSelectedRow(id);
	}
	  const handleFormSubmit = async(data) => {
		console.log(data);
		// Xử lý việc nộp báo cáo
		if(!selectedRow){
			return;
		}
		console.log(data);
		let result = Result.reportTeacher(data,tokenBear.access_token)
		// Sau khi xử lý, ẩn form và cập nhật trạng thái
		if(uploadProgress <100){
			setMessage('Vui lòng tải lên file báo cáo của bạn!');
			setShowReportForm(true)
			setSuccessSubmitForm(false)
		}
		else{
			// call Api
			console.log(result);
			setSuccessSubmitForm(true)
			showToast('success','Nộp báo cáo thành công! ')
			setSuccessSubmitForm(true)
			// setTimeout(()=>{
			// 	window.location.href = '/TrackProgress'
			// },2000)
		}
		if (!submitReport.includes(selectedRow)) {
			setSubmitReport([...submitReport, selectedRow]);
		  }
		  setShowReportForm(false);
		  setSelectedRow(null);
	  };
	  const handleChoseGroup = (e)=>{
		setGroup(e.target.value);
	}
	const tenBB = Array.from(new Set(data.map(item => item.tenBB)));
	useEffect(()=>{
		feitchApi().then((res)=>{
			setData(res.data);
		})
	},[selectedYear])
	const dataGroup = data.filter(data=>data.tenBB === group)
	const feitchApi = async()=>{
		let result = Result.getTrackProgress(selectedYear,tokenBearer.access_token)
		return result
	}
	return (
		<div className={cx('wrapper')}>
			<ToastContainer/>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Theo dõi tiến độ</div>
				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Danh sách các tiến độ thực hiện đề tài</div>
						<div className={cx('frame-year')}>
							<select className={cx('year')} id="year" name="year" onChange={handleYearChange}>
								<option className={cx(selectedYear === '2021' && 'year-active')} value="2021">2020-2021</option>
								<option className={cx(selectedYear === '2022' && 'year-active')} value="2022">2021-2022</option>
								<option className={cx(selectedYear === '2023' && 'year-active')} value="2023">2022-2023</option>
								<option className={cx(selectedYear === '2024' && 'year-active')} value="2024">2023-2024</option>
							</select>
						</div>
						</div>

					<div className={cx('border')}>
						<div className={cx('content')}>
							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên nhóm</div>
										<div className={cx('item-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
												onChange={e=>handleChoseGroup(e)}
											>
												{tenBB.map((item, index)=>(<option key={index} value={item}>{item}</option>))}
											</select>
										</div>
									</div>
								</div>
							</div>

							<table className={cx('table')}>
								<thead className={cx('table-header')}>
									<tr className={cx('table-header-row')}>
										<th className={cx('table-header-cell')}>Họ tên sinh viên</th>
										<th className={cx('table-header-cell')}>File báo cáo</th>
										<th className={cx('table-header-cell')}>Hạn nộp</th>
										<th className={cx('table-header-cell')}>Tên đề tài</th>
										<th className={cx('table-header-cell')}>Lựa chọn</th>
									</tr>
								</thead>
								<tbody>
									{dataGroup.length === 0 ? data.map(data=>(
										<tr className={cx('table-inner-row')} key ={data.id}>
										<td className={cx('table-inner-row-content')}>{data.tenSV}</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('data')}>{data.fileTaiNguyen}</div>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('item-content')}>
												{data.ngayKetThuc}
											</div>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('name-topic')}>{data.tenDT}</div>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('btn-comment')} onClick={()=>handleSubmitReport(data.id)}>
												Nhận xét
											</div>
										</td>
									</tr>
									)) : dataGroup.map(data=>(
										<tr className={cx('table-inner-row')} key ={data.id}>
										<td className={cx('table-inner-row-content')}>{data.tenSV}</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('data')}>{data.fileTaiNguyen}</div>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('item-content')}>
												{data.ngayKetThuc}
											</div>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('name-topic')}>{data.tenDT}</div>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('btn-comment')} onClick={()=>handleSubmitReport(data.id)} >
												Nhận xét
											</div>
										</td>
									</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				{
					showReportForm && (
						<div className={cx('modal')} row ={selectedRow}>
                            <div className={cx('overlay')}></div>
                            <div className ={cx('modal-pw')}>
								<FontAwesomeIcon className={cx('icon-close')} icon={faClose} onClick = {()=>setShowReportForm(false)}/>
                               <div className={cx('modal-header')}>Nhận xét tiến độ</div>
							   <div className={cx('box-comment')}>
									<label className={cx('modal-title')}>Tên nhận xét</label>
									<input type='text' placeholder='Tên nhận xét' {...register('tenNX')} required/>
									<input type='text' value={fileChange} {...register('file')} style={{display: 'none'}}/>
									<input type='text' value={selectedRow} {...register('idBC')} style={{display: 'none'}}/>
									<label className={cx('modal-title')}>Nhận xét</label>
									<input type='text' placeholder='Nhận xét' {...register('nhanXet')} required/>
									<label className={cx('modal-title')}>Ghi chú</label>
									<input type='text' placeholder='Ghi chú' {...register('ghiChu')} required/>
							   </div>
							   <div className={cx('modal-title')}>Nộp file nhận xét vào ô dưới đây:</div>
							   <form className={cx('box-upload')} method="post" enctype="multipart/form-data">
							   		<FontAwesomeIcon icon={faCloudArrowUp} className={cx('icon-upload')}/>
									<div className={cx('chose-file')}>
										<label className={cx('text-link')} for="file_uploads" onClick = {()=>setHideLoadFile(true)}>Click vào đây</label>
										<div className={cx('text-upload')}>để nộp báo cáo</div>
									</div>
									<div className={cx('text-upload')}>Chỉ chấp nhận các file .doc, .pdf, .rar, .zip</div>
							   </form>
							  {
								hideLoadFile && (
									<div className={cx('load-file')}>
										<FontAwesomeIcon className={cx('icon-close-filename')} icon={faClose} onClick = {handleHideLoadFile}/>	
										<FontAwesomeIcon icon={faFileLines} className={cx('icon-file')} />
										<input
													className={cx('input')}
													onChange={handleFileChange}
													type="file"
													id="file_uploads"
													name="file_uploads"
													accept=".doc, .docx, .pdf, .zip, rar"
													multiple />
										<div className={cx('file')}>	
											<div className={cx('file-name')}>{file ? file.name : 'Chưa có file được tải lên !!'}</div>
											{sizeFile && (<div className={cx('size')}>{sizeFile} KB</div>)}
											{
												uploadProgress > 0  && uploadProgress < 100 && (
													<progress className={cx('percent')} value={uploadProgress} max ="100">
													</progress>
												)
											}
												{uploadProgress === 100 &&(
													<div>Tải lên file thành công !</div>
												)}
										</div>
									</div>
										)
							  }
							  {message && uploadProgress < 100 && (<div className={cx('message')}>{message}</div>)}
                                <div className={cx('btn')}>
									<button onClick = {()=>setShowReportForm(false)} className={cx('btn-cancel')}>HỦY</button>
									<button onClick={handleSubmit(handleFormSubmit)} className={cx('btn-submit')}>NỘP</button>
								</div>
                            </div>
                        </div>
					)
				}
			</div>
		</div>
	);
}

export default TrackProgress;
