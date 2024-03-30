/* eslint-disable react-hooks/rules-of-hooks */
import classNames from "classnames/bind";
import Styles from "./awardReview.module.scss"
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
import { showToast } from "~/Components/ToastMessage/Toast";
import { ToastContainer } from "react-toastify";

const cx = classNames.bind(Styles)

function awardReview() {
	const [showYear,setShowYear] =  useState(false)
	const [data,setData] = useState([])
  	const [currentPage, setCurrentPage] = useState(1);
    const [selectedAward, setSelectedAward] = useState([{ idDT: '', idGT: '' }]);
	const [activeYear,setActiveYear] = useState('2024');
	const [award,setAward] = useState([])
    const auth = useAuth()
    const tokenBearer = auth.getTokens()
    const handleGetIdAward =(e,value)=>{
        setSelectedAward(prevState => {
            const newState = [...prevState];
            const existingIndex = newState.findIndex(item => item.idDT === value);
            if (existingIndex !== -1) {
                newState[existingIndex] = { ...newState[existingIndex], idGT: e.target.value };
            } else {
                newState.push({ idDT: value, idGT: e.target.value });
            }
            return newState.filter(item => item.idDT !== '' && item.idGT !== '');
        });
    }
    
    const dataToSend = [];
    data.forEach(item => {
        const newDataItem = {
            idDT: item.idDT,
            TongDiem: item.TongDiem
        };
        dataToSend.push(newDataItem);
    });
    const handleUpdateScore = async()=>{
        let result = Result.updateScore(dataToSend,tokenBearer.access_token)
        if(result){
            showToast('success','Cập nhật điểm thành công')
        }
        else{
            showToast('error','Cập nhật điểm thất bại')
        }
    }
    const handleUpdateAward = async()=>{
        let result = Result.updateAward(selectedAward,tokenBearer.access_token)
        if(result){
            showToast('success','Cập nhật điểm thành công')
        }
        else{
            showToast('error','Cập nhật điểm thất bại')
        }
    }
	const columns = useMemo(()=>[
		{
			Header: "Tên đề tài",
			col: "col-2",
			accessor: "tenDT"
		},
		{
			Header: "Hướng nghiên cứu",
			col: "col-3",
			accessor: "tenHNC"
		},
		{
			Header: "Hội đồng",
			col: "col-2",
			accessor: "tenHD"
		},
		{
			Header: "Điểm",
			col: "col-2",
			accessor: "TongDiem"
		},
        {
            Header: "Xét giải",
            col: "col-2",
            accessor: 'idDT',
            Cell: ({ value }) => {
                return (
                    <select className={cx('reward')} onChange={e=>handleGetIdAward(e,value)}>
                        <option>-Chọn giải-</option>
                        {award.map(item => (
                            <option key={item.id} value ={item.id}>{item.name}</option>
                        ))}
                    </select>
                );}
        }
	],[award])
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
    useEffect(()=>{
        fetchApiAward().then((res)=>{
            setAward(res.data);
        })
    },[])
    const fetchApiAward = async ()=>{
        let result = Result.getAward(tokenBearer.access_token)
        return result
     }
     useEffect(()=>{
		fetchApi().then((data)=>{
			setData(data.data)
		})
	},[activeYear]) 
    const fetchApi = async ()=>{
       let result
	   result = Result.getPointAdmin(activeYear,tokenBearer.access_token)
	   return result
    }
	return (
		<div className={cx('container')}>
            <ToastContainer/>
			<div className= {cx('table')}>
				<div className={cx('header')}>Quản lý điểm - Xét giải</div>
				<div className={cx('line')}></div>
				<div className={cx('box-year')}>
                    <div className={cx('name')}>Danh mục điểm thống kê theo HNC năm học </div>
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
                </div>
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
											<div key ={row.values.id} className={cx('link')}>
												{cell.render('Cell')}
											</div>
										</td>
									))}
								</tr>
							);
							})}
						</tbody>
					</table>
				</div>
                <div className={cx('footer')}>
						<button className={cx('register')} onClick ={handleUpdateScore}>Cập nhật điểm</button>
                        <button className={cx('register')} onClick ={handleUpdateAward}>Cập nhật giải</button>
                        <button className={cx('register') }>In danh sách</button>
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

export default awardReview;
