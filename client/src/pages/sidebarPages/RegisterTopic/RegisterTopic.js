import classNames from "classnames/bind";
import Styles from "./RegisterTopic.module.scss"
import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useTable } from "react-table";
import { showToast } from "~/Components/ToastMessage/Toast";
import { ToastContainer } from "react-toastify";
import * as Result from "~/apiService/authService"
import { useAuth } from "~/Components/Auth";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";

const cx = classNames.bind(Styles)

function RegisterTopic() {
	const [showYear,setShowYear] =  useState(false)
	const [data,setData] = useState([])
  	const [currentPage, setCurrentPage] = useState(1);
	const [activeYear,setActiveYear] = useState('2024')
	const [activeChose,setActiveChosse] = useState('recommend')
	const [getId,setGetId] = useState(null)
	const topicId = data.filter(data=>data.id === getId)
	const auth = useAuth()
	const tokenBearer = auth.getTokens()
	const year = activeYear
	const {register,handleSubmit,reset,watch} = useForm()
	const columns = useMemo(()=>[
		{
			Header: "Tên đề tài",
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
			accessor: "comment"
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
	const displayedData = data.slice(startIndex, endIndex);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	  } = useTable({ columns, data: displayedData});
	const handleActiveYear = (e)=>{
		setActiveYear(e)
	}
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	  };
	  const handleActiveChose = (item)=>{
		setActiveChosse(item)
	  }
	const handleShowNotification = async(data)=>{
		console.log(data)
		try{
		let result = await Result.updateNewTopic(data,tokenBearer.access_token)
		console.log(result);
		if(result){
			showToast('success','Thêm đề tài thành công')
			reset()
		}
		else{
			showToast('error','Thêm đề tài thất bại')
		}
	}
	catch(e){
		console.error('Xảy ra lỗi khi lấy dữ liệu! ',e)
	}
}
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
        fetchApi();
    },[])
    const fetchApi = async ()=>{
		let result
		result = await Result.registerTopic(tokenBearer.access_token,year)
		setData(result.data)
	}
	console.log(data)
	return (
		<div className={cx('container')}>
			<ToastContainer/>
			<div className= {cx('table')}>
				<div className={cx('header')}>Quản lý đề tài - Đăng ký đề tài</div>
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
				<div className={cx('grid')}>
				<div className={cx('name')}>
					<div className={cx(activeChose === 'recommend' ? 'active' : 'topic')} onClick ={()=>handleActiveChose('recommend')}>Gợi ý đề tài</div>
					<div className={cx(activeChose === 'register' ? 'active' : 'topic')} onClick ={()=>handleActiveChose('register')}>Đăng ký đề tài</div>
				</div>
				{
					activeChose === 'recommend' ? (
						<div className={cx('table-content')}>
							<table {...getTableProps()}>
							<thead>
								{headerGroups.map(headerGroup => (
								<tr {...headerGroup.getHeaderGroupProps() } className={cx('grid-title')}>
									<th>STT</th>
									{headerGroup.headers.map(column => (
									<th {...column.getHeaderProps()} scope="row" className={`${column.col} p-2`} >{column.render("Header")}</th>
									))}
								</tr>
								))}
							</thead>
							<tbody {...getTableBodyProps()}>
								{rows.map((row,rowIndex)=> {
								prepareRow(row);
								return (
									<tr {...row.getRowProps()} className={cx(row.values.id % 2 === 0 ? 'grid-content' : 'grid-content-light')}>
										<td>{rowIndex + 1}</td>
										{row.cells.map(cell => (
											<td {...cell.getCellProps()} >
												<Link className={cx('link')} to ={`/detailTopic/${row.original.id}`}>
													{cell.render('Cell')}
												</Link></td>
										))}
									</tr>
								);
								})}
							</tbody>
						</table>
						</div>) : (
							<div>
								<form className={cx('register-topic')} key ={data.id}>
									<div className={cx('text-register-topic')}>Điền đầy đủ thông tin dưới đây</div>
									<div className={cx('box')}>
										<div className={cx('text')}>Tên đề tài:</div>
										<input  className={cx('short')} type='text' id='name' {...register('name')} required/>
									</div>
									<div className={cx('box')}>
										<div className={cx('text')}>Tóm tắt:</div>
										<input className={cx('short')} type='text' id='name' {...register('summary')} required/>
									</div>
									<div className={cx('box')}>
										<div className={cx('text')}>Mục tiêu:</div>
										<input className={cx('short')} type='text' id='name' {...register('target')} required/>
									</div>
									<div className={cx('box')}>
										<div className={cx('text')}>Phạm vi:</div>
										<input className={cx('short')} type='text' id='name' {...register('limit')} required/>
									</div>
									<div className={cx('box')}>
										<div className={cx('text')}>Ghi chú:</div>
										<input className={cx('short')} type='text' id='name' {...register('comment')} required/>
									</div>
									<div className={cx('footer')}>
										<div className={cx('register')}  onClick={handleSubmit(handleShowNotification)}>Thêm đề tài</div>
									</div>
								</form>
							</div>
							
						)
				}
				</div>
				{
					activeChose === 'recommend' ? (<div className={cx('page-number')}>
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
     			</div>) : (<div>
				</div>)
				}
			</div>
		</div>
	);
}

export default RegisterTopic;
