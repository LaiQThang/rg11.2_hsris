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
	const [selectedYear,setSelectedYear] = useState('2024');
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
				tenHNC: topic.tenHNC,
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
	const handleYearChange = (event) => {
        const selectedYearValue = event.target.value;
        setSelectedYear(selectedYearValue);
    };

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
    },[selectedYear])
	const fetchApi = async ()=>{
       let result = Result.getTopicAdmin(tokenBearer.access_token, selectedYear)
	   return result
    }
	return (
		<div className={cx('container')}>
			<ToastContainer/>
			<div className={cx('wrapper')}>
				<div className={cx('header')}>Quản lý đề tài - Xét duyệt đề tài</div>
				<div className={cx('line')}></div>
				<div className={cx('frame-desc')}>
						<div className={cx('text')}>Danh sách đề tài theo hướng nghiên cứu</div>
						<div className={cx('frame-year')}>
							<select className={cx('year')} id="year" name="year" onClick={handleYearChange}>
								<option className={cx(selectedYear === '2024' && 'year-active')} value="2024">2023-2024</option>
								<option className={cx(selectedYear === '2023' && 'year-active')} value="2023">2022-2023</option>
								<option className={cx(selectedYear === '2022' && 'year-active')} value="2022">2021-2022</option>
								<option className={cx(selectedYear === '2021' && 'year-active')} value="2021">2020-2021</option>
							</select>
						</div>
					</div>
				<div className={cx('table-progress')}>
					<div className={cx('table')}>
                        <div className={cx('research')}>
                            <div className={cx('name')}>Hướng nghiên cứu</div>
                            <select className={cx('research-name')} onChange={handleGetId}>
								<option>---Lựa chọn---</option>
                                {data.map(data=>(<option key={data.id} value={data.id}>{data.name}</option>))}
                            </select>
                        </div>
						
						{newData.length >0 ? (<div className={cx('content')}>
						<table className={cx('table')}>
							<thead className={cx('table-header')}>
								<tr className={cx('table-header-row')}>
									<th className={cx('table-header-cell')}>STT</th>
									<th className={cx('table-header-cell')}>Tên đề tài</th>
									<th className={cx('table-header-cell')}>Ngày tạo</th>
									<th className={cx('table-header-cell')}>Trạng thái</th>
									<th className={cx('table-header-cell')}>Lựa chọn</th>
								</tr>
							</thead>
							<tbody>
								{newData.map((data,index)=>(
									<tr className={cx('table-inner-row')} key ={index}>
<td className={cx('table-inner-row-content')}>
											<div className={cx('name-topic')}>{index + 1}</div>
										</td>
										<td className={cx('table-inner-row-content')}><div className={cx('name-topic')}>{data.name}</div></td>
										<td className={cx('table-inner-row-content')}>
										<div className={cx('name-topic')}>{data.dateCreate}</div>
											
										</td>
										<td className={cx('table-inner-row-content')}>
										
										<div className={cx('wait')}>Chờ duyệt</div>
										</td>
										<td className={cx('table-inner-row-content')}>
										<Link to ={`/detailReviewTopic/${data.id}`} className={cx('link')}><div className = {cx('button')}>Xem</div></Link>
										</td>
										
								</tr>
									
								))}
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
