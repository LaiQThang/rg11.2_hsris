import images from "~/assets/images";
import Styles from "./Achievement.module.scss"
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faChalkboardTeacher, faUsers } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(Styles)
function Achievement() {
	const [type,setType] = useState('topic')
	const id = "1"
    const [data,setData] = useState([])
    const dataId = data.filter(data=>data.id === id)
	const handleChoseButton =(item)=>{
		setType(item)
	}
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
	return (
		<div className={cx('container')}>
			{
				dataId.map(data => (
					<div className= {cx('table')} key={data.id}>
						<div className={cx('header')}>Quản lý tài khoản - Thành tích</div>
						<div className={cx('line')}></div>
						<div className = {cx('wrapper')}>
							<div className ={cx('box-1')}>
								<div className={cx('box-info')}>
									<div className={cx('info')}>Thông tin cá nhân</div>
									<img className= {cx('avatar')} src ={images.avatar} alt =""/>
								</div>
								<div className={cx('box-score')}>
									<div className={cx('name')}>Lại Quang Thắng - 2010A03</div>
									<div className={cx('total')}>
										<div className={cx('score')} style ={{width: `${data.class}%`}}>
											<div className={cx('arrow')}></div>
											<div className={cx('name-score')}>{data.class}</div>
										</div>
									</div>
									<div className={cx('number-score')}>
										<div className={cx('name-score')}>Điểm đánh giá</div>
									</div>
								</div>
							</div>
							<div className ={cx('box-1')}>
								<div className={cx('box-child',{ active: type && type === 'topic'})} onClick={()=>handleChoseButton('topic')}>
							        <FontAwesomeIcon className ={cx('icon')} icon={faUsers} />
									<div className={cx('number')}>{data.class}</div>
									<div className={cx('title')}>Đề tài đã tham gia</div>
								</div>
								<div className={cx('box-child')}>
							        <FontAwesomeIcon className ={cx('icon')} icon={faChalkboardTeacher} />
									<div className={cx('number')}>{data.reward}</div>
									<div className={cx('title')}>Giảng viên hướng dẫn</div>
								</div>
								<div className={cx('box-child',{ active: type && type === 'award'})} onClick={()=>handleChoseButton('award')}>
							        <FontAwesomeIcon className ={cx('icon')} icon={faAward} />
									<div className={cx('number')}>{data.join}</div>
									<div className={cx('title')}>Giải thưởng</div>
								</div>
							</div>
							{
								type === 'topic' && (
									<div className ={cx('box-2')}>
								<div className={cx('topic-name')}>Đề tài tham gia</div>
								<div className={cx('tree-1')}>
									<div className={cx('circle')}></div>
								</div>
								<div className={cx('tree')}>
								<div className={cx('circle-right')}>
									<div className={cx('time')}>{data.date}</div>
									<div className={cx('info')}>
										<div className={cx('name-topic')}>{data.status}</div>
										<i className={cx('teacher')}>GVHD: {data.name}</i>
									</div>
								</div>
								</div>
								<div className={cx('tree')}>
								<div className={cx('circle-left')} style ={{borderColor: `${data.color}`}}>
									<div className={cx('time')} style ={{backgroundColor: `${data.color}`}}>{data.date}</div>
									<div className={cx('info')}>
										<div className={cx('name-topic')}>{data.status}</div>
										<i className={cx('teacher')}>GVHD: {data.name}</i>
									</div>
								</div>
								</div>
								<div className={cx('tree')}>
								<div className={cx('circle-right')} style ={{borderColor: `${data.color}`}}>
									<div className={cx('time')} style ={{backgroundColor: `${data.color}`}}>{data.date}</div>
									<div className={cx('info')}>
										<div className={cx('name-topic')}>{data.status}</div>
										<i className={cx('teacher')}>GVHD: {data.name}</i>
									</div>
								</div>
								</div>
								<div className={cx('tree')}></div>
							</div>
								)
							}
							{
								type === 'award' && (
									<div className ={cx('box-2')}>
										<div className={cx('cup')}>
										   <img src ={images.award} alt =''></img>
										   <div className={cx('award-name')}>Giải thưởng</div>
										</div>
										<div className={cx('box-award')}>
										<div className={cx('awards')}>
											<div className={cx('rank')}>Giải nhất</div>
											<div className={cx('time-gain')}>Thời gian: 24/04/2022</div>
											<div className={cx('gain')}>Đạt giải nhất cấp khoa</div>
											<div className={cx('gain')}>Điểm số TBC: 96</div>
											<div className={cx('gain')}>Tiền thưởng: 10.000.000 vnđ</div>
										</div>
										<div className={cx('awards')}>
											<div className={cx('rank')}>Giải nhất</div>
											<div className={cx('time-gain')}>Thời gian: 24/04/2022</div>
											<div className={cx('gain')}>Đạt giải nhất cấp khoa</div>
											<div className={cx('gain')}>Điểm số TBC: 96</div>
											<div className={cx('gain')}>Tiền thưởng: 5.000.000 vnđ</div>
										</div>
										<div className={cx('awards')}>
											<div className={cx('rank')}>Giải nhất</div>
											<div className={cx('time-gain')}>Thời gian: 24/04/2022</div>
											<div className={cx('gain')}>Đạt giải nhất cấp khoa</div>
											<div className={cx('gain')}>Điểm số TBC: 96</div>
											<div className={cx('gain')}>Tiền thưởng: 2.000.000 vnđ</div>
										</div>
										<div className={cx('awards')}>
											<div className={cx('rank')}>Giải nhất</div>
											<div className={cx('time-gain')}>Thời gian: 24/04/2022</div>
											<div className={cx('gain')}>Đạt giải nhất cấp khoa</div>
											<div className={cx('gain')}>Điểm số TBC: 96</div>
											<div className={cx('gain')}>Tiền thưởng: 2.000.000 vnđ</div>
										</div>
										</div>
									</div>
								)
							}
							</div>
					</div>
				))
			}
		</div>
	);
}

export default Achievement;
