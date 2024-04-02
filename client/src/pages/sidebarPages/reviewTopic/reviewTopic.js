/* eslint-disable react-hooks/rules-of-hooks */
import classNames from "classnames/bind";
import Styles from './reviewTopic.module.scss'
import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link, json } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp, faCircleCheck, faClose, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "~/Components/ToastMessage/Toast";
import { ToastContainer } from "react-toastify";
import * as Result from '~/apiService/authService'
import { useMediaQuery } from "react-responsive";
import { useAuth } from "~/Components/Auth";
import config from "~/config";

const cx = classNames.bind(Styles)
function reviewTopic() {
	const [showYear,setShowYear] =  useState(false)
	const [activeYear,setActiveYear] = useState('2024');
    const [data,setData] = useState([])
	const [newData,setNewData] = useState([])
	const [currentPage, setCurrentPage] = useState(1);
	const [idHNC, setIdHNC] = useState(data.idHNC)
	const auth = useAuth()
    const tokenBearer = auth.getTokens()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(()=>{
		const dataOne = data.filter(data=>data.id === idHNC)
		console.log(dataOne);
		if(dataOne.length > 0){
			const topics = dataOne[0].topic;
			const newIdNameArray = topics.map(topic => ({
				idHNC: topic.idHNC,
				name: topic.name,
				dateCreate:topic.dateCreate,
				id:topic.id
			}))
			setNewData(newIdNameArray)
		}
	},[data,idHNC])
	const itemsPerPage = 5;
	const totalItems = data.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedData = newData.slice(startIndex, endIndex);
	const handleShowYear = ()=>{
		setShowYear(!showYear)
	}
	const handleActiveYear = (e)=>{
			setActiveYear(e)
			if(activeYear !== e){
				setNewData([])
			}
	}
	// const handleStatus = (item)=>{
	// 	setStatus(item)
	// }
	const handleGetId =(e)=>{
		setIdHNC(e.target.value)
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
			accessor: "name"
		},
		{
			Header: "Hướng nghiên cứu",
			col: "col-3",
			accessor: "idHNC"
		},
        {
            Header: "Ngày tạo",
            col: "col-2",
            accessor: "dateCreate"
        },
		{
			Header: "Trạng thái",
			col: "col-2",
			Cell:()=>{
					return(
						<div className={cx('wait')}>Chờ duyệt</div>
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
			Cell: ({ row }) => {
				const { id } = row.original;
				return (
						<Link to ={`/detailReviewTopic/${id}`} className = {cx('button')}>
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
	  } = useTable({ columns: columnsWithButton, data: displayedData});
	  useEffect(()=>{
        fetchApi().then((res)=>{
			setData(res.data)
		})
    },[activeYear])
	const fetchApi = async ()=>{
       let result = Result.getTopicAdmin(tokenBearer.access_token, activeYear)
	   return result
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
                            <select className={cx('research-name')} onChange={handleGetId}>
								<option>---Lựa chọn---</option>
                                {data.map(data=>(<option key={data.id} value={data.id}>{data.name}</option>))}
                            </select>
                        </div>
						<div className={cx('chose')}> 
					<div className={cx('chose-year')}>
						<div className={cx('text')}>Năm học</div>
						<FontAwesomeIcon icon={showYear ? faAngleUp : faAngleDown} onClick={handleShowYear}/>
					</div>
					{
						showYear && (<ul className={cx('option')}>
						<li className={cx(activeYear === '2022' && 'year-active')} onClick ={()=> handleActiveYear('2022')}>2021-2022</li>
						<li className={cx(activeYear === '2023' && 'year-active')} onClick ={()=> handleActiveYear('2023')}>2022-2023</li>
						<li className={cx(activeYear === '2024' && 'year-active')} onClick ={()=> handleActiveYear('2024')}>&2023-2024</li>
					</ul>)
					}
					</div>
						{newData.length >0 ? (<div className={cx('data-table')}>
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
										<tr {...row.getRowProps()} className={cx('grid-content')}>
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
						</div>) : (<div>Không có dữ liệu của HNC</div>)}
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
