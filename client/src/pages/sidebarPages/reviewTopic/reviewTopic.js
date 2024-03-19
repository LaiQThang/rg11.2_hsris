/* eslint-disable react-hooks/rules-of-hooks */
import classNames from "classnames/bind";
import Styles from './reviewTopic.module.scss'
import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faCircleCheck, faClose, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "~/Components/ToastMessage/Toast";
import { ToastContainer } from "react-toastify";
import { useMediaQuery } from "react-responsive";

const cx = classNames.bind(Styles)
function reviewTopic() {
    const [data,setData] = useState([])
	const [currentPage, setCurrentPage] = useState(1);
	const [status, setStatus] = useState('')
	const itemsPerPage = 8;
	const totalItems = data.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedData = data.slice(startIndex, endIndex);
	const handleStatus = (item)=>{
		setStatus(item)
	}
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
	const columns = useMemo(()=>[
		{
			Header: "Tên đề tài",
			col: "col-3",
			accessor: "ResearchName"
		},
		{
			Header: "Hướng nghiên cứu",
			col: "col-3",
			accessor: "limit"
		},
        {
            Header: "Ngày tạo",
            col: "col-2",
            accessor: "date"
        },
		{
			Header: "Trạng thái",
			col: "col-2",
			accessor: "peopleJoin",
			Cell:()=>{
					return(
						<select className={cx(status === 'wait' ? 'wait' : 'done')}>
							<option>Đã duyệt</option>
							<option>Chờ duyệt</option>
						</select>
					)
				}
		},
	],[])
	const columnsWithButton = React.useMemo(
		() => [
		  ...columns,
		  {
            Header: "Lựa chọn",
			accessor: 'id',
			col: 'col-2',
			Cell: () => {
				return (
						<Link className = {cx('button')}>
                            Xem
						</Link>
				)
			}
		  },
		],
		[columns]
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
				<div className={cx('header')}>Quản lý đề tài - Xét duyệt đề tài</div>
				<div className={cx('line')}></div>
				<div className={cx('table-progress')}>
					<div className={cx('title')}>Danh sách đề tài theo hướng nghiên cứu</div>
					<div className={cx('table')}>
                        <div className={cx('research')}>
                            <div className={cx('name')}>Hướng nghiên cứu</div>
                            <select className={cx('research-name')}>
                                {data.map(data=>(<option key={data.id}>{data.research}</option>))}
                            </select>
                        </div>
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
													<div className={cx('link')}>
														{cell.render('Cell')}
													</div></td>
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
			</div>
		</div>
	);
}
export default reviewTopic
