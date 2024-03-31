
/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate} from 'react-router-dom'
import Styles from './HistoryRegisterResearch.module.scss'
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
import * as Result from '~/apiService/authService'
import { useAuth } from '~/Components/Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(Styles)

function HistoryRegisterResearch(){
	const [data,setData] = useState([])
	const [showYear,setShowYear] =  useState(false)
	const [activeYear,setActiveYear] = useState('2024');
	const auth = useAuth()
	const tokenBearer = auth.getTokens()
	const handleShowYear = ()=>{
		setShowYear(!showYear)
	}
	const handleActiveYear = (e)=>{
			setActiveYear(e)
	}
    useEffect(()=>{
        fetchApi().then((res)=>{
			console.log(tokenBearer,activeYear);
			console.log(res.data);
			setData(res.data)
		})
    },[activeYear])
    const fetchApi = async ()=>{
        let result = Result.getHistoryRegisterResearch(activeYear,tokenBearer.access_token)
		return result
    }
    return (
        <div className={cx('container')}>
			<ToastContainer/>
			<div className={cx('table')} key ={data.id}>
					<div className={cx('header')}>Hướng nghiên cứu - Lịch sử đăng ký - Chi tiết HNC</div>
					<div className={cx('line')}></div>
					<div className={cx('wrapper')}>
					<div className={cx('name')}>Lịch sử đăng ký hướng nghiên cứu</div>
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
						{data.length > 0 ? (data.map(data=>(<><div className={cx('line-1')}>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Tên hướng nghiên cứu: </div>
								<div className={cx('content')}>{data.tenHNC}</div>
							</div>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Ngày tạo: </div>
								<div className={cx('content')}>{data.ngayTao}</div>
							</div>
						</div>
						<div className={cx('line-2')}>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Số lượng người tham gia: </div>
								<div className={cx('content')}>{data.soLuong}</div>
							</div>
						</div>
					<div className={cx('text')}>Tóm tắt</div>
					<div className={cx('short')}>{data.tomTat}</div>
					<div className={cx('text')}>Mục tiêu</div>
					<div className={cx('short')}>{data.mucTieu}</div>
					<div className={cx('text')}>Phạm Vi</div>
					<div className={cx('short')}>{data.phamVi}</div>
					<div className={cx('text')}>Ghi chú</div>
					<div className={cx('short')}>{data.ghiChu}</div>
						</>))): <div style={{textAlign :"center"}}>{`Không có dữ liệu của năm ${activeYear}`} </div>}
					</div>
		</div>
    </div>
    )
}
export default HistoryRegisterResearch
