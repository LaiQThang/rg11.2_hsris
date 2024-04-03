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
	const [selectedYear, setSelectedYear] = useState('2024');
    const auth = useAuth()
    const tokenBearer = auth.getTokens()
	const handleYearChange = (event) => {
        const selectedYearValue = event.target.value;
        setSelectedYear(selectedYearValue);
    };
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
	console.log(selectedAward);
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
            showToast('success','Cập nhật giải thành công')
        }
        else{
            showToast('error','Cập nhật giải thất bại')
        }
    }
	const columns = useMemo(()=>[
		{
			Header: "Tên đề tài",
			accessor: "tenDT"
		},
		{
			Header: "Hướng nghiên cứu",
			accessor: "tenHNC"
		},
		{
			Header: "Hội đồng",
			accessor: "tenHD"
		},
		{
			Header: "Điểm",
			accessor: "TongDiem"
		},
        {
            Header: "Xét giải",
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
	const isSmallScreen = useMediaQuery({ maxWidth: 540 });
	const isLargeSmallScreen = useMediaQuery({ minWidth: 541, maxWidth: 846 });
  	const isMediumScreen = useMediaQuery({ minWidth: 847, maxWidth: 1023 });
    if (isSmallScreen) {
      columns.splice(1,3)
    }
	else if(isMediumScreen){
		columns.splice(1,2)
	}
	else if(isLargeSmallScreen){
		columns.splice(1,2)
	}
	const itemsPerPage = 5;
	const totalItems = data.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedData =data.slice(startIndex, endIndex)
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
	},[selectedYear]) 
    const fetchApi = async ()=>{
       let result
	   result = Result.getPointAdmin(selectedYear,tokenBearer.access_token)
	   return result
    }
	console.log(displayedData);
	return (
		<div className={cx('container')}>
            <ToastContainer/>
			<div className= {cx('table')}>
				<div className={cx('header')}>Quản lý điểm - Xét giải</div>
				<div className={cx('line')}></div>
				<div className={cx('frame-desc')}>
						<div className={cx('text-name')}>Danh mục điểm thống kê theo HNC năm học</div>
						<div className={cx('frame-year')}>
							<select className={cx('year')} id="year" name="year" onChange={handleYearChange}>
								<option className={cx(selectedYear === '2024' && 'year-active')} value="2024">2023-2024</option>
								<option className={cx(selectedYear === '2021' && 'year-active')} value="2021">2020-2021</option>
								<option className={cx(selectedYear === '2022' && 'year-active')} value="2022">2021-2022</option>
								<option className={cx(selectedYear === '2023' && 'year-active')} value="2023">2022-2023</option>
							</select>
						</div>
				</div>
				{data.length > 0 ? (<><div className={cx('content')}>
						<table className={cx('table')}>
							<thead className={cx('table-header')}>
								<tr className={cx('table-header-row')}>
									<th className={cx('table-header-cell')}>STT</th>
									<th className={cx('table-header-cell')}>Tên đề tài</th>
									<th className={cx('table-header-cell')}>Hướng nghiên cứu</th>
									<th className={cx('table-header-cell')}>Hội đồng</th>
									<th className={cx('table-header-cell')}>Điểm</th>
									<th className={cx('table-header-cell')}>Xét giải</th>
								</tr>
							</thead>
							<tbody>
								{displayedData.map((data,index)=>(
									<tr className={cx('table-inner-row')} key ={index}>
<td className={cx('table-inner-row-content')}>
											<div className={cx('name-topic')}>{index + 1}</div>
										</td>
										<td className={cx('table-inner-row-content')}><div className={cx('name-topic')}>{data.tenDT}</div></td>
										<td className={cx('table-inner-row-content')}>
										<div className={cx('name-topic')}>{data.tenHNC}</div>
										
											
										</td>
										<td className={cx('table-inner-row-content')}>
										<div className={cx('name-topic')}>{data.tenHD}</div>
											
										</td>
										<td className={cx('table-inner-row-content')}>
										<div className={cx('name-topic')}>{data.TongDiem}</div>
										</td>
										<td className={cx('table-inner-row-content')}>
										<select className={cx('reward')} onChange={e=>handleGetIdAward(e,data.idDT)}>
                        <option>-Chọn giải-</option>
                        {award.map(item => (
                            <option key={item.id} value ={item.id}>{item.name}</option>
                        ))}
                    </select>
										</td>
										
								</tr>
									
								))}
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
     			</div></>) : (<div style={{textAlign : 'center',padding: '10px'}}>Không có dữ liệu của năm {selectedYear}</div>)}
			</div>
		</div>
	);
}

export default awardReview;
