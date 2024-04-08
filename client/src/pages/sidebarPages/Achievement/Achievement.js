import images from "~/assets/images";
import Styles from "./Achievement.module.scss"
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward, faChalkboardTeacher, faUsers } from "@fortawesome/free-solid-svg-icons";
import * as Result from '~/apiService/authService'
import { useAuth } from "~/Components/Auth";

const cx = classNames.bind(Styles)
function Achievement() {
	const [type,setType] = useState('topic')
    const [data,setData] = useState([])
	const auth = useAuth()
	const tokenBearer = auth.getTokens()
	console.log(tokenBearer);
	const handleChoseButton =(item)=>{
		setType(item)
	}
	useEffect(()=>{
        fetchApi().then((res)=>{
			setData(res.data);
		})
    },[])
	console.log(data);
	const topicLength = data.length
	console.log(topicLength);
	const teacherSet = new Set();
	const cupSet = new Set();
		data.forEach(topic => {
			if (topic.teacher && Object.keys(topic.teacher).length > 0){
				const teacherId = topic.teacher.id_GV;
				teacherSet.add(teacherId);
			}
			
		});
		data.forEach(topic => {
			if (topic.cup && Object.keys(topic.cup).length > 0){
				const cupId = topic.cup.id;
				cupSet.add(cupId);
			}
		})
    const fetchApi = async ()=>{
       let result = Result.getDetailAward(tokenBearer.access_token)
	   return result
    }
	return (
		<div className={cx('container')}>
			{topicLength > 0 ?
				data.map(data => (
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
									<div className={cx('number')}>{topicLength}</div>
									<div className={cx('title')}>Đề tài đã tham gia</div>
								</div>
								<div className={cx('box-child')}>
							        <FontAwesomeIcon className ={cx('icon')} icon={faChalkboardTeacher} />
									<div className={cx('number')}>{teacherSet.size}</div>
									<div className={cx('title')}>Giảng viên hướng dẫn</div>
								</div>
								<div className={cx('box-child',{ active: type && type === 'award'})} onClick={()=>handleChoseButton('award')}>
							        <FontAwesomeIcon className ={cx('icon')} icon={faAward} />
									<div className={cx('number')}>{cupSet.size}</div>
									<div className={cx('title')}>Giải thưởng</div>
								</div>
							</div>
							{
								( topicLength > 0) ? ( type === 'topic' &&
									<div className ={cx('box-2')}>
								<div className={cx('topic-name')}>Đề tài tham gia</div>
								<div className={cx('tree-1')}>
									<div className={cx('circle')}></div>
								</div>
								<div className={cx('tree')}>
								<div className={cx('circle-right')}>
									<div className={cx('time')}>{data.dateCreate}</div>
									<div className={cx('info')}>
										<div className={cx('name-topic')}>{data.name}</div>
										<i className={cx('teacher')}>GVHD: {data.teacher.name}</i>
									</div>
								</div>
								</div>
							
								<div className={cx('tree')}></div>
								<div className={cx('tree')}></div>
							</div>
								) : (type === 'topic' && <div className={cx('no-data')}>Bạn chưa tham gia đề tài nào</div>)
							}
							{
								cupSet.size > 0 ? (type === 'award' && 
									<div className ={cx('box-2')}>
										<div className={cx('cup')}>
										   <img src ={images.award} alt =''></img>
										   <div className={cx('award-name')}>Giải thưởng</div>
										</div>
										<div className={cx('box-award')}>
										<div className={cx('awards')}>
											<div className={cx('rank')}>{data.cup.name}</div>
											<div className={cx('time-gain')}>Thời gian: {data.cup.dateCreated}</div>
											<div className={cx('gain')}>Đạt {data.cup.name} cấp khoa</div>
											<div className={cx('gain')}>Điểm số TBC: 96</div>
											<div className={cx('gain')}>Tiền thưởng: {data.cup.prizePrice} vnđ</div>
										</div>
										</div>
									</div>
								)
								: (type === 'award' && <div className={cx('no-data')}>Bạn chưa có giải thưởng nào</div>)
							}
							</div>
					</div>
				))
			: (<div className= {cx('table')} >
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
						<div className={cx('number')}>{topicLength}</div>
						<div className={cx('title')}>Đề tài đã tham gia</div>
					</div>
					<div className={cx('box-child')}>
						<FontAwesomeIcon className ={cx('icon')} icon={faChalkboardTeacher} />
						<div className={cx('number')}>{teacherSet.size}</div>
						<div className={cx('title')}>Giảng viên hướng dẫn</div>
					</div>
					<div className={cx('box-child',{ active: type && type === 'award'})} onClick={()=>handleChoseButton('award')}>
						<FontAwesomeIcon className ={cx('icon')} icon={faAward} />
						<div className={cx('number')}>{cupSet.size}</div>
						<div className={cx('title')}>Giải thưởng</div>
					</div>
				</div>
				{
					( topicLength > 0) ? ( type === 'topic' &&
						<div className ={cx('box-2')}>
					<div className={cx('topic-name')}>Đề tài tham gia</div>
					<div className={cx('tree-1')}>
						<div className={cx('circle')}></div>
					</div>
					<div className={cx('tree')}>
					<div className={cx('circle-right')}>
						<div className={cx('time')}>{data.dateCreate}</div>
						<div className={cx('info')}>
							<div className={cx('name-topic')}>{data.name}</div>
							<i className={cx('teacher')}>GVHD: {data.teacher.name}</i>
						</div>
					</div>
					</div>
				
					<div className={cx('tree')}></div>
					<div className={cx('tree')}></div>
				</div>
					) : (type === 'topic' && <div className={cx('no-data')}>Bạn chưa tham gia đề tài nào</div>)
				}
				{
					cupSet.size > 0 ? (type === 'award' && 
						<div className ={cx('box-2')}>
							<div className={cx('cup')}>
							   <img src ={images.award} alt =''></img>
							   <div className={cx('award-name')}>Giải thưởng</div>
							</div>
							<div className={cx('box-award')}>
							<div className={cx('awards')}>
								<div className={cx('rank')}>{data.cup.name}</div>
								<div className={cx('time-gain')}>Thời gian: {data.cup.dateCreated}</div>
								<div className={cx('gain')}>Đạt {data.cup.name} cấp khoa</div>
								<div className={cx('gain')}>Điểm số TBC: 96</div>
								<div className={cx('gain')}>Tiền thưởng: {data.cup.prizePrice} vnđ</div>
							</div>
							</div>
						</div>
					)
					: (type === 'award' && <div className={cx('no-data')}>Bạn chưa có giải thưởng nào</div>)
				}
				</div>
		</div>)}
		</div>
	);
}

export default Achievement;
