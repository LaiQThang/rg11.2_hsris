
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
	const [selectedYear, setSelectedYear] = useState('2024');
	const [data,setData] = useState([])
	const auth = useAuth()
	const tokenBearer = auth.getTokens()
	const handleYearChange = (event) => {
        const selectedYearValue = event.target.value;
        setSelectedYear(selectedYearValue);
    };
    useEffect(()=>{
        fetchApi().then((res)=>{
			console.log(tokenBearer,selectedYear);
			console.log(res.data);
			setData(res.data)
		})
    },[selectedYear])
    const fetchApi = async ()=>{
        let result = Result.getHistoryRegisterResearch(selectedYear,tokenBearer.access_token)
		return result
    }
    return (
        <div className={cx('container')}>
			<ToastContainer/>
			<div className={cx('table')} key ={data.id}>
					<div className={cx('header')}>Hướng nghiên cứu - Lịch sử đăng ký - Chi tiết HNC</div>
					<div className={cx('line')}></div>
					<div className={cx('wrapper')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text-name')}>Lịch sử đăng ký HNC</div>
						<div className={cx('frame-year')}>
							<select className={cx('year')} id="year" name="year" onChange={handleYearChange}>
								<option className={cx(selectedYear === '2021' && 'year-active')} value="2021">2020-2021</option>
								<option className={cx(selectedYear === '2022' && 'year-active')} value="2022">2021-2022</option>
								<option className={cx(selectedYear === '2023' && 'year-active')} value="2023">2022-2023</option>
								<option className={cx(selectedYear === '2024' && 'year-active')} value="2024">2023-2024</option>
							</select>
						</div>
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
						</>))): <div style={{textAlign :"center"}}>{`Không có dữ liệu của năm ${selectedYear}`} </div>}
					</div>
		</div>
    </div>
    )
}
export default HistoryRegisterResearch
