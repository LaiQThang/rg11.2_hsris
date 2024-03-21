import classNames from "classnames/bind";
import Styles from "./RegisterResearch.module.scss"
import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import config from "~/config";
import { MenuItem } from "~/Components/Menu";
import { Link } from "react-router-dom";
import { useBlockLayout, useTable } from "react-table";
import { useMediaQuery } from "react-responsive";
import * as Result from '~/apiService/authService'

const cx = classNames.bind(Styles)

function RegisterResearch() {
	const [showYear,setShowYear] =  useState(false)
	const [data,setData] = useState([])
  	const [currentPage, setCurrentPage] = useState(1);
	const [activeYear,setActiveYear] = useState('2024');
	const [number,setNumber] = useState(0)
	const columns = useMemo(()=>[
		{
			Header: "Tên HNC",
			col: "col-2",
			accessor: "name"
		},
		{
			Header: "Tóm tắt",
			col: "col-3",
			accessor: "summary"
		},
		{
			Header: "Mục tiêu",
			col: "col-2",
			accessor: "target"
		},
		{
			Header: "Phạm vi",
			col: "col-2",
			accessor: "limit"
		},
		{
			Header: "Ghi chú",
			col: "col-2",
			accessor: "note"
		}
	],[])
	const isSmallScreen = useMediaQuery({ maxWidth: 713 });
	const isLargeSmallScreen = useMediaQuery({ minWidth: 714, maxWidth: 846 });
  	const isMediumScreen = useMediaQuery({ minWidth: 847, maxWidth: 1023 });
    if (isSmallScreen) {
      columns.splice(2,3)
    }
	else if(isMediumScreen){
		columns.splice(2,1)
	}
	else if(isLargeSmallScreen){
		columns.splice(2,2)
	}
	const itemsPerPage = 5;
	const totalItems = data.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedData = data.slice(startIndex, endIndex)
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	  } = useTable({ columns, data: displayedData },useBlockLayout);
	const handleActiveYear = (e)=>{
		setActiveYear(e)
	}
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	  };
	// Hàm xử lý chuyển đến trang trước
	const goToPreviousPage = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};
	// Hàm xử lý chuyển đến trang sau
	const goToNextPage = () => {
		setCurrentPage((prevPage) => {
				setCurrentPage(prevPage + 1)
		});
	};
	  const handleShowYear = ()=>{
		setShowYear(!showYear)
	}
    const fetchApi = async ()=>{
       let result
	   result = Result.getResearch(activeYear)
	   return result
    }
	useEffect(()=>{
		fetchApi().then((data)=>{
			setData(data.data)
		})
	},[])
	return (
		<div className={cx('container')}>
			<div className= {cx('table')}>
				<div className={cx('header')}>Hướng nghiên cứu - Đăng ký</div>
				<div className={cx('line')}></div>
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
				<div className={cx('name')}>Danh sách đăng ký hướng nghiên cứu</div>
				<div className={cx('grid')}>
					<table {...getTableProps()}>
						<thead>
							{headerGroups.map(headerGroup => (
					
							<tr {...headerGroup.getHeaderGroupProps() } className={cx('grid-title')}>
								<th>STT</th>
								{headerGroup.headers.map(column => (
								<th {...column.getHeaderProps()} scope="row" className={`${column.col} p-2`}>{column.render("Header")}</th>
								))}
							</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{rows.map((row,rowIndex) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} className={cx(row.values.id % 2 === 0 ? 'grid-content' : 'grid-content-light')}>
									<td>{rowIndex + 1}</td>
									{row.cells.map(cell => (
										<td {...cell.getCellProps()} >
											<Link to ={`/detailResearch/${row.original.id}`} key ={row.values.id} className={cx('link')}>
												{cell.render('Cell')}
											</Link>
										</td>
									))}
								</tr>
							);
							})}
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
     			</div>
			</div>
		</div>
	);
}

export default RegisterResearch;
