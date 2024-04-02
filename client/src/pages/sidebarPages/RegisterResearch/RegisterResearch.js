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
import { useAuth } from "~/Components/Auth";

const cx = classNames.bind(Styles)

function RegisterResearch() {
	const [showYear,setShowYear] =  useState(false)
	const [data,setData] = useState([])
	const [dateCreate,setDateCreate] = useState('')
  	const [currentPage, setCurrentPage] = useState(1);
	const [activeYear,setActiveYear] = useState('');
	const auth = useAuth()
	const tokenBearer = auth.getTokens()
	const columns = useMemo(()=>[
		{
			Header: "Tên HNC",
			accessor: "name"
		},
		{
			Header: "Tóm tắt",
			accessor: "summary"
		},
		{
			Header: "Mục tiêu",
			accessor: "target"
		},
		{
			Header: "Phạm vi",
			accessor: "limit"
		},
		{
			Header: "Ghi chú",
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
		fetchApi().then((data)=>{
			setData(data.data)
		})
		fetchApiDateCreate().then((res)=>{
			console.log(res);
			setDateCreate(res)
		})
	},[])
	
    const fetchApi = async ()=>{
       let result
	   result = Result.getResearch(tokenBearer.access_token, activeYear)
	   return result
    }
	const fetchApiDateCreate = async ()=>{
		let result
		result = Result.getDateRegisterResearch(tokenBearer.access_token)
		return result
	 }
	 console.log(data);
	return (
		<div className={cx('container')}>
			<div className= {cx('table')}>
				<div className={cx('header')}>Hướng nghiên cứu - Đăng ký</div>
				<div className={cx('line')}></div>
				<div className={cx('name')}>Danh sách đăng ký hướng nghiên cứu</div>
				{
					dateCreate ? (<div className={cx('done-register')} >Bạn đã đăng kí hướng nghiên cứu</div>) : (
						<><div className={cx('content')}>
						<table className={cx('table')}>
							<thead className={cx('table-header')}>
								<tr className={cx('table-header-row')}>
									<th className={cx('table-header-cell')}>STT</th>
									<th className={cx('table-header-cell')}>Tên HNC</th>
									<th className={cx('table-header-cell')}>Tóm tắt</th>
									<th className={cx('table-header-cell')}>Mục tiêu</th>
									<th className={cx('table-header-cell')}>Phạm vi</th>
									<th className={cx('table-header-cell')}>Ghi chú</th>
								</tr>
							</thead>
							<tbody>
								{displayedData.map((data,index)=>(
									<tr className={cx('table-inner-row')} key ={index}>
<td className={cx('table-inner-row-content')}>
											<div className={cx('name-topic')}>{index + 1}</div>
										</td>
										<td className={cx('table-inner-row-content')}><Link to={`/detailResearch/${data.id}`} className={cx('link')}><div className={cx('name-topic')}>{data.name}</div></Link></td>
										<td className={cx('table-inner-row-content')}>
										<Link to={`/detailResearch/${data.id}`} className={cx('link')}><div className={cx('name-topic')}>{data.summary}</div></Link>
										
											
										</td>
										<td className={cx('table-inner-row-content')}>
										<Link to={`/detailResearch/${data.id}`} className={cx('link')}><div className={cx('name-topic')}>{data.target}</div></Link>
											
										</td>
										<td className={cx('table-inner-row-content')}>
										<Link to={`/detailResearch/${data.id}`} className={cx('link')}>
										<div className={cx('name-topic')}>{data.limit}</div>
											</Link>
										</td>
										<td className={cx('table-inner-row-content')}>
										<Link to={`/detailResearch/${data.id}`} className={cx('link')}>
										<div className={cx('name-topic')}>{data.note}</div>
										</Link>
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
					 </div></>
					)
				}
			</div>
		</div>
	);
}

export default RegisterResearch;
