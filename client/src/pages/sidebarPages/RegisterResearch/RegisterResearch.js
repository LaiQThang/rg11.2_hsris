import classNames from "classnames/bind";
import Styles from "./RegisterResearch.module.scss"
import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import config from "~/config";
import { MenuItem } from "~/Components/Menu";
import { Link } from "react-router-dom";
import { useTable } from "react-table";

const cx = classNames.bind(Styles)

function RegisterResearch() {
	const [showYear,setShowYear] =  useState(false)
	const [data,setData] = useState([])
  	const [currentPage, setCurrentPage] = useState(1);
	const [activeYear,setActiveYear] = useState('all')
	const columns = useMemo(()=>[
		{
			Header: "STT",
			col: "col-1",
			accessor: "id"
		},
		{
			Header: "Tên HNC",
			col: "col-2",
			accessor: "ResearchName"
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
	
	const dataYear = data.filter(data=>data.year.includes(activeYear))
	const itemsPerPage = 5;
	const totalItems = dataYear.length !== 0 ? dataYear.length : data.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedData = dataYear.length !== 0 ? dataYear.slice(startIndex, endIndex) : data.slice(startIndex, endIndex);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	  } = useTable({ columns, data: displayedData });
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
						<li className={cx(activeYear === '2066' && 'year-active')} onClick ={()=> handleActiveYear('2066')}>2021-2022</li>
						<li className={cx(activeYear === '2078' && 'year-active')} onClick ={()=> handleActiveYear('2078')}>2022-2023</li>
						<li className={cx(activeYear === '2094' && 'year-active')} onClick ={()=> handleActiveYear('2094')}>2023-2024</li>
						<li className={cx(activeYear === 'all' && 'year-active')} onClick = {()=> handleActiveYear('all')}>Tất cả</li>
					</ul>)
					}
				</div>
				<div className={cx('grid')}>
				<div className={cx('name')}>Danh sách đăng ký hướng nghiên cứu</div>
				{/* <div className={cx('grid-title')}>
					<div className={cx('title')}>
						STT
					</div>
					<div className={cx('title')}>
						Tên HNC
					</div>
					<div className={cx('title')}>
						Tóm tắt
					</div>
					<div className={cx('title')}>
						Mục tiêu
					</div>
					<div className={cx('title')}>
						Phạm vi
					</div>
					<div className={cx('title')}>
						Ghi chú
					</div>
				</div>
				{
					displayedData.map((data)=>
						<Link to ={`/detailResearch/${data.id}`} className={cx(data.id % 2 !== 0 ? 'grid-content' : 'grid-content-light')} key = {data.id}>
							<div className={cx('content')}>{data.id}</div>
							<div className={cx('content')}>{data.ResearchName}</div>
							<div className={cx('content')}>{data.summary}</div>
							<div className={cx('content')}>{data.target}</div>
							<div className={cx('content')}>{data.limit}</div>
							<div className={cx('content')}>{data.note}</div>
						</Link>
					)
				} */}
				<table {...getTableProps()}>
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
										<Link to ={`/detailResearch/${row.values.id }`} key ={row.values.id} className={cx('link')}>
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
