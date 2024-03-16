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

const cx = classNames.bind(Styles)
function ProgressTopic() {
	const [data,setData] = useState([])
	const [currentPage, setCurrentPage] = useState(1);
	const [submitReport,setSubmitReport] = useState([])
	const [showReportForm, setShowReportForm] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);
	const [fileName,setFileName] = useState(null)
	const [sizeFile,setSizeFile] = useState('')
	const [uploadProgress, setUploadProgress] = useState(0);
	const [hideLoadFile,setHideLoadFile] = useState(true)
	const [message,setMessage] = useState('')
	const [successSubmitForm,setSuccessSubmitForm] = useState(false)
	const itemsPerPage = 8;
	const totalItems = data.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedData = data.slice(startIndex, endIndex);
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
		const file = e.target.files[0];
		setFileName(file)
		const fileSize = ((file.size)/1024).toFixed(2);
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
			const chunk = file.slice(start, end);
			reader.readAsArrayBuffer(chunk);
			const percentComplete = (currentChunk / totalChunks) * 100;
			setUploadProgress(percentComplete);
		} else {
			setUploadProgress(100); // Tải lên hoàn thành
		}
		};

		const start = currentChunk * chunkSize;
		const end = Math.min(start + chunkSize, fileSize);
		const chunk = file.slice(start, end);
		reader.readAsArrayBuffer(chunk);
	}
	// Hàm xử lý chuyển đến trang sau
	const goToNextPage = () => {
		setCurrentPage((prevPage) => {
				setCurrentPage(prevPage + 1)
		});
	};
	const handleSubmitReport = (id)=>{
		const isSubmited = submitReport.includes(id)
		
		if(isSubmited && uploadProgress === 100){
			const confirm = window.confirm('Bạn có chắc muốn hủy không?')
			if(confirm){
				setSubmitReport(submitReport.filter(iSubmit=>iSubmit !== id))
				setFileName(null)
				setSizeFile('0')
				setUploadProgress(0)
				showToast('success','Hủy báo cáo thành công! ')
			}
		}
		else{
			setShowReportForm(true);
      		setSelectedRow(id);
		}
	}
	  const handleFormSubmit = () => {
		// Xử lý việc nộp báo cáo
		
		// Sau khi xử lý, ẩn form và cập nhật trạng thái
		setShowReportForm(false);
		setSelectedRow(null);
		if(uploadProgress <100){
			setMessage('Vui lòng tải lên file báo cáo của bạn!');
			setShowReportForm(true)
			setSuccessSubmitForm(false)
		}
		else{
			setSuccessSubmitForm(true)
			showToast('success','Nộp báo cáo thành công! ')
			setSuccessSubmitForm(true)
		}
		if (!submitReport.includes(selectedRow)) {
			setSubmitReport([...submitReport, selectedRow]);
		  }
	  };
	const columns = useMemo(()=>[
		{
			Header: "Tiến độ",
			col: "col-3",
			accessor: "ResearchName"
		},
		{
			Header: "Hạn đến",
			col: "col-2",
			accessor: "date"
		},
		{
			Header: "Tình trạng",
			col: "col-2",
			accessor: "peopleJoin",
			Cell:({value})=>{
				if(value % 2 === 0){
					return(
						<div className={cx('done')}>Hoàn thành</div>
					)
				}
				else if(value % 5 === 0){
					return(
						<div className={cx('wait')}>Chờ</div>
					)
				}
				else{
					return(
						<div className={cx('out-date')}>Quá hạn</div>
					)
				}
			}
		},
		{
			Header: "Ghi chú",
			col: "col-3",
			accessor: "limit"
		},
	],[])
	const columnsWithButton = React.useMemo(
		() => [
		  ...columns,
		  {
			Header: 'Nộp báo cáo',
			accessor: 'id',
			col: 'col-2',
			Cell: ({value}) => {
				const isSubmited = submitReport.includes(value)
				const changeButton = isSubmited && successSubmitForm === true ? 'Hủy' : 'Nộp'
				return (
						<button className = {cx('button')} onClick = {()=>handleSubmitReport(value)}>
							{changeButton}
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
        fetchApi()
    },[])
	const fetchApi = async ()=>{
        try{
            const res = await axios.get('https://64dc69d1e64a8525a0f672e2.mockapi.io/LoginApi')
            const data = res.data
            setData(data)
        }
        catch(e){
            console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', e);
        }
    }
	return (
		<div className={cx('container')}>
			<ToastContainer/>
			<div className={cx('wrapper')}>
				<div className={cx('header')}>Quản lý đề tài - Tiến độ đề tài</div>
				<div className={cx('line')}></div>
				<div className={cx('table-progress')}>
					<div className={cx('title')}>Tiến độ đề tài </div>
					<div className={cx('table')}>
						<table {...getTableProps()} className={cx('table-inside')}>
								<thead>
									{headerGroups.map(headerGroup => (
									<tr {...headerGroup.getHeaderGroupProps() } className={cx('grid-title')}>
										{headerGroup.headers.map(column => (
										<th {...column.getHeaderProps()} scope="row" className={`${column.col} p-3`} >{column.render("Header")}</th>
										))}
									</tr>
									))}
								</thead>
								<tbody {...getTableBodyProps()}>
									{rows.map(row => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()} className={cx(row.values.id % 2 === 0 ? 'grid-content' : 'grid-content-light')}>
											{row.cells.map(cell => (
												<td {...cell.getCellProps()} >
													<Link className={cx('link')}>
														{cell.render('Cell')}
													</Link></td>
											))}
										</tr>
									);
									})}
								</tbody>
							</table>
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
     						</div>
					</div>
				</div>
				{
					showReportForm && (
						<div className={cx('modal')} row ={selectedRow}>
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
											<div className={cx('file-name')}>{fileName ? fileName.name : 'Chưa có file được tải lên !!'}</div>
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
