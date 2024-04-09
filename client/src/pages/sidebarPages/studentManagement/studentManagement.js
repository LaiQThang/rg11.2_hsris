/* eslint-disable react-hooks/rules-of-hooks */
import classNames from "classnames/bind";
import Styles from './studentMangagement.module.scss'
import React, { Fragment, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useTable } from "react-table";
import { Link, json } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp, faCircleCheck, faClose, faCloudArrowUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { showToast } from "~/Components/ToastMessage/Toast";
import { ToastContainer } from "react-toastify";
import * as Result from '~/apiService/authService'
import { useMediaQuery } from "react-responsive";
import { useAuth } from "~/Components/Auth";
import config from "~/config";

const cx = classNames.bind(Styles)
function studentManagement() {
    const [data,setData] = useState([])
	const [searchValue, setSearchValue] = useState('');
	const [searchResult, setSearchResult] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const auth = useAuth()
    const tokenBearer = auth.getTokens()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const itemsPerPage = 5;
	const totalItems = searchResult.length > 0 ? searchResult.length :data.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedData = searchResult.length > 0 ? searchResult.slice(startIndex, endIndex) : data.slice(startIndex, endIndex);
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
	
	const handleSearchTeacher = async()=>{
		const fetchApi = async () => {
			let result;
			result = await Result.searchStudent(searchValue);
			return result
		};
		fetchApi().then((res)=>{
			console.log(res.data);
			if(res.data.length === 0){
				showToast('error',`Không có dữ liệu cho ${searchValue}`)
			}
			setSearchResult(res.data);
		})
}
	  useEffect(()=>{
        fetchApi().then((res)=>{
            console.log(res.data);
			setData(res.data)
		})
    },[])
	const fetchApi = async ()=>{
       let result = Result.getAllStudent(tokenBearer.access_token)
	   return result
    }
	return (
		<div className={cx('container')}>
			<ToastContainer/>
			<div className={cx('wrapper')}>
				<div className={cx('header')}>Quản lý sinh viên - Danh sách sinh viên</div>
				<div className={cx('line')}></div>
                <div className={cx('text')}>Danh sách sinh viên</div>
                <div className={cx('box-header')}>
                    <div className={cx('box-search')}>
                        <div className={cx('search')}>
                            <FontAwesomeIcon icon={faSearch} className={cx('icon-search')}/>
                            <input type ='text' className={cx('input-search')}placeholder="Nhập mã sinh viên" onChange={(e) => {
                        if (!e.target.value.startsWith(' ')) {
                            setSearchValue(e.target.value);
                        }
                    }}/>
                        </div>
                        <button className={cx('btn-search')} onClick={handleSearchTeacher}>
                            Tìm kiếm
                        </button>
                    </div>

					<button className={cx('btn-search')}>
                            Thêm
                    </button>
                </div>
				<div className={cx('table-progress')}>
						{data.length >0 ? (<div className={cx('content')}>
						<table className={cx('table')}>
							<thead className={cx('table-header')}>
								<tr className={cx('table-header-row')}>
									<th className={cx('table-header-cell')}>STT</th>
									<th className={cx('table-header-cell')}>Mã sinh viên</th>
									<th className={cx('table-header-cell')}>Tên sinh viên</th>
									<th className={cx('table-header-cell')}>Ngày sinh</th>
                                    <th className={cx('table-header-cell')}>Email</th>
									<th className={cx('table-header-cell')}>Lựa chọn</th>
								</tr>
							</thead>
							<tbody>
								{displayedData.map((data,index)=>(
									<tr className={cx('table-inner-row')} key ={index}>
<td className={cx('table-inner-row-content')}>
{index + 1}
										</td>
										<td className={cx('table-inner-row-content')}><div className={cx('name-topic')}>{data.code}</div></td>
										<td className={cx('table-inner-row-content')}>
{data.name}
											
										</td>
										<td className={cx('table-inner-row-content')}>
										
										<div className={'no-wrap'}>{data.birthday}</div>
										</td>
                                        <td className={cx('table-inner-row-content')}>
										
										<div>{data.email}</div>
										</td>
										<td className={cx('table-inner-row-content')}>
										<select className={cx('option')}>
											<option>Enable</option>
											<option>Disable</option>
										</select>
										<Link to ={`/detailStudent/${data.id}`} className={cx('link')}><div className = {cx('button')}>Xem</div></Link>
										</td>
										
								</tr>
									
								))}
							</tbody>
						</table>
					</div>) : (<div>Không có dữ liệu sinh viên</div>)}
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
	);
}
export default studentManagement
