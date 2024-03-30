import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./HistoryRegisterTopic.module.scss"
import classNames from "classnames/bind";
import { faCheckDouble, faCircleCheck, faSpinner} from "@fortawesome/free-solid-svg-icons";
import { faClock, faFileLines, faFlag } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(Styles)
function HistoryRegisterTopic() {
	const id = "3"
    const [data,setData] = useState([])
    const dataId = data.filter(data=>data.id === id)
	useEffect(()=>{
        fetchApi()
    },[])
    const fetchApi = async ()=>{
        try{
            const res = await axios.get('https://64dc69d1e64a8525a0f672e2.mockapi.io/data')
            const data = res.data
            setData(data)
        }
        catch(e){
            console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', e);
        }
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
					{
					dataId.map(data=>
				<div className={cx('wrapper')} key ={data.id}>
					<div className={cx('name')}>Chi tiết đề tài vừa đăng kí</div>
						<div className={cx('line-1')}>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Tên đề tài: </div>
								<div className={cx('content')}>{data.name}</div>
							</div>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Ngày lập: </div>
								<div className={cx('content')}>{data.date}</div>
							</div>
						</div>
						<div className={cx('line-2')}>
							<div className={cx('research-name-1')}>
								<div className={cx('text')}>Mã đề tài: </div>
								<div className={cx('content')}>{data.id}</div>
							</div>
							<div className={cx('research-name-1')}>
								<div className={cx('text')}>Hội đồng: </div>
								<div className={cx('content')}>{data.name}</div>
							</div>
							<div className={cx('research-name')}>
								<div className={cx('text')}>Ngày hoàn thành: </div>
								<div className={cx('content')}>{data.date}</div>
							</div>
						</div>
						<div className={cx('box')}>
							<div className={cx('text')}>Tóm tắt</div>
							<div className={cx('short')}>{data.text}</div>
						</div>
						<div className={cx('box')}>
							<div className={cx('text')}>Mục tiêu</div>
							<div className={cx('short')}>{data.text}</div>
						</div>
						<div className={cx('box')}>
							<div className={cx('text')}>Phạm vi</div>
							<div className={cx('short')}>{data.text}</div>
						</div>
						<div className={cx('box')}>
							<div className={cx('text')}>Ghi chú</div>
							<div className={cx('short')}>{data.text}</div>
						</div>
					<div className={cx('footer')}>
						<div className={cx('time-out')}>Thời gian hủy trước ngày: 11/12/2023</div>
						<button className={cx('destroy') }>Hủy</button>
					</div>
				</div>)
		}
    			</div>
			
			</div>
	</div>
	);
}

export default HistoryRegisterTopic;
