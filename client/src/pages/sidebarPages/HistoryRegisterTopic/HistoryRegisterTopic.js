import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./HistoryRegisterTopic.module.scss"
import classNames from "classnames/bind";
import { faAngleDown, faAngleUp, faCheckDouble, faCircleCheck, faSpinner} from "@fortawesome/free-solid-svg-icons";
import { faClock, faFileLines, faFlag } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import * as Result from '~/apiService/authService'
import axios from "axios";
import { useAuth } from "~/Components/Auth";

const cx = classNames.bind(Styles)
function HistoryRegisterTopic() {
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
			setData(res.data);
		})
    },[activeYear])
    const fetchApi = async ()=>{
        let result = Result.getHistoryRegisterTopic(activeYear,tokenBearer.access_token)
		return result
    }
	const steps = [
		{
		  name: "Chờ duyệt",
		  completed: true,
		  icon: faClock
		},
		{
		  name: "Đang thực hiện",
		  completed: true,
		  icon: faFlag
		},
		{
		  name: "Báo cáo",
		  completed: false,
		  icon: faFileLines
		},
		{
		  name: "Hoàn thành",
		  completed: false,
		  icon: faCheckDouble
		},
	  ];
	return (
	<div className={cx('container')}>
			<div className= {cx('table')}>
				<div className={cx('header')}>Quản lý đề tài - Lịch sử đăng kí</div>
				<div className={cx('line')}></div>
				<div className={cx('grid')}>
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
					<div className={cx('name-1')}>Theo dõi đề tài</div>
					<div className={cx('progress')}>
						{steps.map((step, index) => (
						<div className={cx(step.completed ? 'each-progress-done' : 'each-progress' )}key={index}>
							<FontAwesomeIcon className ={cx('icon')} icon ={step.icon}/>
							<div className={cx('name-progress')}>{step.name}</div>
							<FontAwesomeIcon className={cx('icon-progress')} icon ={step.completed ? faCircleCheck : faSpinner}/>
						</div>
						))}
					</div>
					{data.length > 0  ? (
					data.map(data=>
				<div className={cx('wrapper')} key ={data.id}>
					<div className={cx('name')}>Chi tiết đề tài vừa đăng kí</div>
						<div className={cx('line-1')}>
							<div className={cx('research-name')}>
								<label className={cx('text')}>Tên đề tài: </label>
								<div className={cx('content')}>{data.tenDT}</div>
							</div>
							<div className={cx('research-name-1')}>
								<div className={cx('text')}>Ngày lập: </div>
								<div className={cx('content')}>{data.ngayLap}</div>
							</div>
						</div>
						<div className={cx('line-2')}>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Ngày hoàn thành: </div>
								<div className={cx('content')}>{data.ngayHoanThanh ? data.ngayHoanThanh : 'Chưa hoàn thành'}</div>
							</div>
						</div>
						<div className={cx('line-2')}>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Đạt giải: </div>
								<div className={cx('content', 'cup')}>{data.giai_thuong ? data.giai_thuong.tenGiai : 'Bạn chưa đạt giải'}</div>
							</div>
						</div>
						<div className={cx('box')}>
							<div className={cx('text')}>Tóm tắt</div>
							<div className={cx('short')}>{data.tomTat}</div>
						</div>
						<div className={cx('box')}>
							<div className={cx('text')}>Mục tiêu</div>
							<div className={cx('short')}>{data.mucTieu}</div>
						</div>
						<div className={cx('box')}>
							<div className={cx('text')}>Phạm vi</div>
							<div className={cx('short')}>{data.phamVi}</div>
						</div>
						<div className={cx('box')}>
							<div className={cx('text')}>Ghi chú</div>
							<div className={cx('short')}>{data.nhanXet}</div>
						</div>
					{/* <div className={cx('footer')}>
						<div className={cx('time-out')}>Thời gian hủy trước ngày: 11/12/2023</div>
						<button className={cx('destroy') }>Hủy</button>
					</div> */}
				</div>)
		):  <div style={{textAlign :"center"}}>{`Không có dữ liệu của năm ${activeYear}`} </div>}
    			</div>
			
			</div>
	</div>
	);
}

export default HistoryRegisterTopic;
