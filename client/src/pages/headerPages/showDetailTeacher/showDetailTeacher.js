/* eslint-disable react-hooks/rules-of-hooks */
import Styles from "./showDetailTeacher.module.scss"
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { showToast } from "~/Components/ToastMessage/Toast";
import * as Result from '~/apiService/authService'
import { useAuth } from '~/Components/Auth'
import { useParams } from "react-router-dom";
const cx = classNames.bind(Styles)
function showDetailTeacher() {
    const {id} = useParams()
    const [data,setData] = useState({})
	const [dataTopic,setDataTopic] = useState([])
	const [dataResearch,setDataResearch] = useState([])
    useEffect(()=>{
        fetchApi().then((res)=>{
			setData(res.teacher)
			setDataTopic(res.topic.data)
			setDataResearch(res.research)
		})
    },[])
	const fetchApi = async ()=>{
       let result = Result.getDetailTeacher(id)
	   return result
    }
	return (
		<div className={cx('container')}>
			<ToastContainer/>
			<div className={cx('table')}>
				<div className ={cx('header')}>Hoạt động - Chi tiết giảng viên</div>
				<div className={cx('line')}></div>
				<div className={cx('id')}> Thông tin giảng viên </div>
				{data && (<div className={cx('content-table')} key ={data.id}>
							<div className={cx('information')}>
								<div className={cx('info-left')}>
									<div htmlFor="name" className={cx('text')}>Họ tên</div>
									<input type="text" name="name" className={cx('')} value={data.name}/>
								</div>
								<div className={cx('info-right')}>
									<div className={cx('text')} >Email</div>
									<input type="text" name="email" className={cx('')} value={data.email} />
								</div>
								
							</div>
							<div className={cx('text-name')}>Đề tài đã hướng dẫn</div>
							{dataTopic.length > 0 ? (<div className={cx('content')}>
							<table className={cx('table')}>
							<thead className={cx('table-header')}>
								<tr className={cx('table-header-row')}>
								<th className={cx('table-header-cell')}>STT</th>
									<th className={cx('table-header-cell')}>Tên đề tài</th>
									<th className={cx('table-header-cell')}>Thời gian</th>
									<th className={cx('table-header-cell')}>Hướng nghiên cứu</th>
                                    <th className={cx('table-header-cell')}>Đạt giải</th>
								</tr>
							</thead>
							<tbody>
								{dataTopic.map((data,index)=>(
									<tr className={cx('table-inner-row')} key ={index}>
										<td className={cx('table-inner-row-content')}>
										{index + 1}
										</td>
										<td className={cx('table-inner-row-content')}><div className={cx('name-topic')}>{data.name}</div></td>
										<td className={cx('table-inner-row-content')}>
										<div className={cx('name-topic')}>{data.dateCreate}</div>
										</td>
										<td className={cx('table-inner-row-content')}>
										
										{data.hnc.name}
										</td>
                                        <td className={cx('table-inner-row-content')}>
										
										<div>{data.cup ? data.cup.name : 'Chưa đạt giải'}</div>
										</td>
										
								</tr>
									
								))}
							</tbody>
						</table>
							</div>) : (<div style={{textAlign:'center',padding:'50px',color:'red'}}>Chưa tham gia đề tài nào</div>)}
							<div className={cx('text-name')} style={{marginTop:'-15px'}}>Hướng nghiên cứu đã tham gia</div>
							{dataResearch.length > 0 ? (<div className={cx('content')}>
							<table className={cx('table')}>
							<thead className={cx('table-header')}>
								<tr className={cx('table-header-row')}>
								<th className={cx('table-header-cell')}>STT</th>
									<th className={cx('table-header-cell')}>Tên hướng nghiên cứu</th>
									<th className={cx('table-header-cell')}>Số nhóm</th>
									<th className={cx('table-header-cell')}>Ngày tham gia</th>
                                    <th className={cx('table-header-cell')}>Số người</th>
								</tr>
							</thead>
							<tbody>
								{dataResearch.map((data,index)=>(
									<tr className={cx('table-inner-row')} key ={index}>
										<td className={cx('table-inner-row-content')}>
										{index + 1}
										</td>
										<td className={cx('table-inner-row-content')}><div className={cx('name-topic')}>{data.name}</div></td>
										<td className={cx('table-inner-row-content')}>
										<div className={cx('name-topic')}>{data.topic.length}</div>
										</td>
										<td className={cx('table-inner-row-content')}>
										
										{data.dateCreated}
										</td>
                                        <td className={cx('table-inner-row-content')}>
										
										<div>{data.quantity}</div>
										</td>
										
								</tr>
									
								))}
							</tbody>
						</table>
							</div>): (<div style={{textAlign:'center',padding:'50px',color:'red'}}>Chưa tham gia hướng nghiên cứu nào</div>)}
						</div>)}
			</div>
		</div>
	);
}

export default showDetailTeacher;
