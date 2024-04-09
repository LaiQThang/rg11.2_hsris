/* eslint-disable react-hooks/rules-of-hooks */
import classNames from "classnames/bind";
import Styles from './ProgressTopic.module.scss'
import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCircleCheck, faClose, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "~/Components/ToastMessage/Toast";
import { ToastContainer } from "react-toastify";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { useMediaQuery } from "react-responsive";
import * as Result from '~/apiService/authService'
import { useAuth } from "~/Components/Auth";

const cx = classNames.bind(Styles)
function ProgressTopic() {
	const [data,setData] = useState([])
	const [valueData, setValueData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [uploadFiles, setUploadFiles] = useState({}); // State để lưu trữ file tải lên cho mỗi hàng
	const [submitReport,setSubmitReport] = useState([])
	const [showReportForm, setShowReportForm] = useState(false);
	const [selectedRow, setSelectedRow] = useState('');
	const [fileName,setFileName] = useState()
	const [sizeFile,setSizeFile] = useState('')
	const [uploadProgress, setUploadProgress] = useState(0);
	const [hideLoadFile,setHideLoadFile] = useState(true)
	const [message,setMessage] = useState('')
	const [successSubmitForm,setSuccessSubmitForm] = useState(false)
	const [year,setYear]=useState('2024')
	const [check,setCheck]=useState(false);
	const auth = useAuth()
	const tokenBear = auth.getTokens()
	const itemsPerPage = 8;
	const totalItems = data.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedData = data.slice(startIndex, endIndex);

	const [file,selectedFile] = useState(null)

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	  };
	  const goToPreviousPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};
	const handleHideLoadFile = ()=>{
		setHideLoadFile(false)
	}
	const handleFileChange = (e)=>{

		let image_as_base64 = URL.createObjectURL(e.target.files[0])
        let image_as_files = e.target.files[0];
		selectedFile(image_as_files)
		setFileName(image_as_base64)
		
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
	
	// Hàm xử lý chuyển đến trang sau
	const goToNextPage = () => {
		setCurrentPage((prevPage) => {
				setCurrentPage(prevPage + 1)
		});
	};
	const handleSubmitReport = (id)=>{
			setShowReportForm(true);
      		setSelectedRow(id);
	}
	  const handleFormSubmit = async() => {
		// Xử lý việc nộp báo cáo
		if(!selectedRow){
			return;
		}
		const formData = new FormData();
		formData.append('file', file);
		formData.append('idBC', selectedRow)
		let result = Result.reportStudent(formData,tokenBear.access_token)
		// Sau khi xử lý, ẩn form và cập nhật trạng thái
		if(uploadProgress <100){
			setMessage('Vui lòng tải lên file báo cáo của bạn!');
			setShowReportForm(true)
			setSuccessSubmitForm(false)
		}
		else{
			console.log(result);
			// call Api
			setSuccessSubmitForm(true)
			showToast('success','Nộp báo cáo thành công! ')
			setSuccessSubmitForm(true)
			setTimeout(()=>{
				window.location.href = '/progressTopic'
			},2000)
		}
		if (!submitReport.includes(selectedRow)) {
			setSubmitReport([...submitReport, selectedRow]);
		  }
		  setShowReportForm(false);
		  setSelectedRow(null);
	  };
	const columns = useMemo(()=>[
		{
			Header: "Tiến độ",
			col: "col-3",
			accessor: "tenBC"
		},
		{
			Header: "Hạn đến",
			col: "col-2",
			accessor: "ngayKetThuc"
		},
		{
			Header: "Tình trạng",
			col: "col-2",
			Cell:({row})=>{
				if(row.original.tinhTrang === 0){
					return <div className={cx('wait')}>Chờ</div>;
				}
				else{
					return <div className={cx('done')}>Hoàn thành</div>;}
    		}
		},
		{
			Header: "Ghi chú",
			col: "col-3",
			accessor: "ghiChu",
			Cell:({row})=>{
				if (row.original.ghiChu === null) {
					return <div >no note</div>;
				}
    		}
		},
	],[])
	const columnsWithButton = React.useMemo(
		() => [
		  ...columns,
		  {
			Header: 'Nộp báo cáo',
			accessor: 'idBC',
			col: 'col-2',
			Cell: ({value,row}) => {
				if(row.original.tinhTrang === 1){
				};
				return (
						<button className = {cx('button')} onClick = {()=>handleSubmitReport(value) }>
							{check === 0 ? 'Đã nộp' : 'Nộp'}
						</button>
				)
			}
		  },
		],
		[columns,submitReport]
	  );
	const isSmallScreen = useMediaQuery({ maxWidth: 743 });
	const isLargeSmallScreen = useMediaQuery({ minWidth: 744, maxWidth: 846 });
  	const isMediumScreen = useMediaQuery({ minWidth: 847, maxWidth: 1023 });
    if (isSmallScreen) {
      columnsWithButton.splice(1,1)
	  columnsWithButton.splice(2,1)
    }
	else if(isMediumScreen){
		columnsWithButton.splice(3,1)
	}
	else if(isLargeSmallScreen){
		columnsWithButton.splice(1,1)
	}
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	  } = useTable({ columns: columnsWithButton, data: displayedData });
	  useEffect(()=>{
        fetchApi().then((res)=>{
			setData(res.data);
		})

    },[])
	const fetchApi = async ()=>{
            const res = Result.getProgressTopic('2024',tokenBear.access_token)
			return res
    }
	const fetchApi2 = async ()=>{
		const res = Result.checkReport( selectedRow,tokenBear.access_token)
		return res
}
	return (
		<div className={cx('container')}>
			<ToastContainer/>
			<div className={cx('wrapper')}>
				<div className={cx('header')}>Quản lý đề tài - Tiến độ đề tài</div>
				<div className={cx('line')}></div>
				<div className={cx('table-progress')}>
					<div className={cx('title')}>Tiến độ đề tài </div>
					{data.length > 0 ? (<><div className={cx('content')}>
						<table className={cx('table')}>
							<thead className={cx('table-header')}>
								<tr className={cx('table-header-row')}>
									<th className={cx('table-header-cell')}>STT</th>
									<th className={cx('table-header-cell')}>Tiến độ</th>
									<th className={cx('table-header-cell')}>Hạn đến</th>
									<th className={cx('table-header-cell')}>Tình trạng</th>
									<th className={cx('table-header-cell')}>Ghi chú</th>
									<th className={cx('table-header-cell')}>Nộp báo cáo</th>
								</tr>
							</thead>
							<tbody>
								{data.map((data,index)=>(
									<tr className={cx('table-inner-row')} key ={index}>
<td className={cx('table-inner-row-content')}>
											<div className={cx('name-topic')}>{index + 1}</div>
										</td>
										<td className={cx('table-inner-row-content')}><div className={cx('name-topic')}>{data.tenBC}</div></td>
										<td className={cx('table-inner-row-content')}>
										<div className={cx('name-topic')}>{data.ngayKetThuc}</div>
											
										</td>
										<td className={cx('table-inner-row-content')}>
										
										{data.tinhTrang === 0 ? <div className={cx('wait')}>Chờ</div> : <div className={cx('done')}>Hoàn thành</div>}
										</td>
										<td className={cx('table-inner-row-content')}>
										<div >{data.ghiChu === null ? 'Không có' : data.note}</div>
										</td>
										
										<td className={cx('table-inner-row-content')}>
										<button className = {cx('button')} onClick = {()=>handleSubmitReport(data.idBC) }>
							{check === 0 ? 'Đã nộp' : 'Nộp'}
						</button>
										</td>
								</tr>
									
								))}
							</tbody>
						</table>
					</div>
							<div className={cx('page-number')}>
								<button className ={cx('button')} onClick={goToPreviousPage} disabled={currentPage === 1}>
									<FontAwesomeIcon icon={faAngleLeft}/>
								</button>
								{Array.from({ length: totalPages }, (_, index) => (
								<button
									className ={cx(currentPage === index + 1 ? 'button-active' : 'button')}
									key={index + 1}
									onClick={() => handlePageChange(index + 1)}
								>
									{index + 1}
								</button>
								))}
								<button className ={cx('button')} onClick={goToNextPage} disabled={currentPage === totalPages}>
									<FontAwesomeIcon icon={faAngleRight}/>
								</button>
     						</div></>) : <div style={{textAlign:'center',padding:'20px'}}>Chưa có tiến độ cần thực hiện</div>}
					</div>
				{
					showReportForm && (
						<div className={cx('modal')}>
                            <div className={cx('overlay')}></div>
                            <div className ={cx('modal-pw')}>
								<FontAwesomeIcon className={cx('icon-close')} icon={faClose} onClick = {()=>setShowReportForm(false)}/>
                               <div className={cx('modal-header')}>Nộp tiến độ báo cáo</div>
							   <div className={cx('modal-title')}>Nộp file báo cáo vào ô dưới đây:</div>
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
									<button onClick={handleFormSubmit} className={cx('btn-submit')}>NỘP</button>
								</div>
                            </div>
                        </div>
					)
				}
			</div>
		</div>
	);
}

export default ProgressTopic;
