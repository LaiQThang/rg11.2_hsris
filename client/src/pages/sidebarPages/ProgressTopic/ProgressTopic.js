import classNames from "classnames/bind";
import Styles from './ProgressTopic.module.scss'
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(Styles)
function ProgressTopic() {
	const [data,setData] = useState([])
	const [currentPage, setCurrentPage] = useState(1);
	const [submitReport,setSubmitReport] = useState([])
	const [showReportForm, setShowReportForm] = useState(false);
	const [selectedRow, setSelectedRow] = useState(null);
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
	// Hàm xử lý chuyển đến trang sau
	const goToNextPage = () => {
		setCurrentPage((prevPage) => {
				setCurrentPage(prevPage + 1)
		});
	};
	const handleSubmitReport = (id)=>{
		const isSubmited = submitReport.includes(id)
		if(isSubmited){
			setSubmitReport(submitReport.filter(iSubmit=>iSubmit !== id))
			// show hủy thành công
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
				const isSubmitted = submitReport.includes(value);
				const buttonLabel = isSubmitted ? 'Hủy nộp' : 'Nộp báo cáo';
				return (
						<button className = {cx('button')} onClick = {()=>handleSubmitReport(value)}>
							{buttonLabel}
						</button>
				)
			}
		  },
		],
		[columns,submitReport]
	  );
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
										<th {...column.getHeaderProps()} scope="row" className={`${column.col} p-2`} >{column.render("Header")}</th>
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
                               <div className={cx('modal-header')}>Nộp tiến độ báo cáo</div>
							   <div className={cx('modal-title')}>Nộp file báo cáo vào ô dưới đây:</div>
                                <div className={cx('btn')}>
									<button onClick = {()=>setShowReportForm(false)} className={cx('btn-cancel')}>HỦY</button>
									<button onClick={handleFormSubmit} className={cx('btn-submit')}>Nộp</button>
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
