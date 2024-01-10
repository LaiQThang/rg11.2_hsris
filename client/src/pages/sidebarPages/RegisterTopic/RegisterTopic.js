import classNames from "classnames/bind";
import Styles from "./RegisterTopic.module.scss"
import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import { showToast } from "~/Components/ToastMessage/Toast";
import { ToastContainer } from "react-toastify";

const cx = classNames.bind(Styles)

function RegisterTopic() {
	const [showYear,setShowYear] =  useState(false)
	const [data,setData] = useState([])
  	const [currentPage, setCurrentPage] = useState(1);
	const [activeYear,setActiveYear] = useState('all')
	const [activeChose,setActiveChosse] = useState('recommend')
	const [getId,setGetId] = useState(null)
	const topicId = data.filter(data=>data.id === getId)
	const columns = useMemo(()=>[
		{
			Header: "STT",
			col: "col-1",
			accessor: "id"
		},
		{
			Header: "Tên đề tài",
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
	  const handleActiveChose = (item)=>{
		setActiveChosse(item)
		if(item === 'register' && getId === null){
			alert('Vui lòng chọn đề tài để đăng kí')
			setActiveChosse('recommend')
		}
	  }
	  const handleGetInfomation =(id) =>{
		const confirm = window.confirm('Bạn có chắc với lựa chọn này?')
		if(confirm){
			setGetId(id)
			setActiveChosse('register')
		}
	  }
	  const handleShowNotification =()=>{
		const show =  window.confirm("Bạn có chắc với lựa chọn này");
		if(show){
		 showToast('success', 'Đăng kí thành công!');
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
						<li className={cx(activeYear === '2066' && 'year-active')} onClick ={()=> handleActiveYear('2066')}>2021-2022</li>
						<li className={cx(activeYear === '2078' && 'year-active')} onClick ={()=> handleActiveYear('2078')}>2022-2023</li>
						<li className={cx(activeYear === '2094' && 'year-active')} onClick ={()=> handleActiveYear('2094')}>2023-2024</li>
						<li className={cx(activeYear === 'all' && 'year-active')} onClick = {()=> handleActiveYear('all')}>Tất cả</li>
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
									<tr {...row.getRowProps()} className={cx(row.values.id % 2 === 0 ? 'grid-content' : 'grid-content-light')} onClick ={()=>handleGetInfomation(row.original.id)}>
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
						</table>) : (
							<div>
								{topicId.map(data=>(
								<div className={cx('register-topic')} key ={data.id}>
									<div className={cx('text-register-topic')}>Điền đầy đủ thông tin dưới đây</div>
									<div className={cx('box')}>
										<div className={cx('text')}>Tên đề tài:</div>
										<div className={cx('short')}>{data.summary}</div>
									</div>
									<div className={cx('box')}>
										<div className={cx('text')}>Tóm tắt:</div>
										<div className={cx('short')}>{data.target}</div>
									</div>
									<div className={cx('box')}>
										<div className={cx('text')}>Mục tiêu:</div>
										<div className={cx('short')}>{data.limit}</div>
									</div>
									<div className={cx('box')}>
										<div className={cx('text')}>Phạm vi:</div>
										<div className={cx('short')}>{data.note}</div>
									</div>
									<div className={cx('footer')}>
										<button className={cx('register') } onClick = {handleShowNotification}>Đăng ký</button>
									</div>
								</div>
							))}
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
