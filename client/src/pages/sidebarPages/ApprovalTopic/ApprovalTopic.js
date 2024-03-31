import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ApprovalTopic.module.scss';
import classNames from 'classnames/bind';
import { faAngleDown, faAngleLeft, faAngleRight, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useEffect, useState } from 'react';
import * as Result from '~/apiService/authService'
import { useAuth } from '~/Components/Auth';

const cx = classNames.bind(styles);
function ApprovalTopic() {
	const [selectedYear, setSelectedYear] = useState('2024');
	const [data,setData] = useState([])
	const [dataHNC,setDataHNC] = useState([])
	const Auth = useAuth()
	const token = Auth.getTokens()
	
	const handleYearChange = (event) => {
        const selectedYearValue = event.target.value;
        setSelectedYear(selectedYearValue);
    };
	useEffect(()=>{
		console.log(selectedYear);
	},[selectedYear])
	useEffect(()=>{
		fetchApi().then((res)=>{
			setData(res.data)
		})
	},[selectedYear])
	const fetchApi = async()=>{
		let result = Result.getTopicTeacher(selectedYear,token.access_token)
		return result
	}
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Đề tài chờ duyệt</div>
				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Thêm đề tài</div>
						<div className={cx('frame-year')}>
							<select className={cx('year')} id="year" name="year" onChange={handleYearChange}>
								<option className={cx(selectedYear === '2021' && 'year-active')} value="2021">2020-2021</option>
								<option className={cx(selectedYear === '2022' && 'year-active')} value="2022">2021-2022</option>
								<option className={cx(selectedYear === '2023' && 'year-active')} value="2023">2022-2023</option>
								<option className={cx(selectedYear === '2024' && 'year-active')} value="2024">2023-2024</option>
							</select>
						</div>
					</div>
				</div>
					<div className={cx('border')}>
						<div className={cx('content')}>
							<table className={cx('table')}>
								<thead className={cx('table-header')}>
									<tr className={cx('table-header-row')}>
										<th className={cx('table-header-cell')}>Tên Đề Tài</th>
										<th className={cx('table-header-cell')}>Hướng Nghiên Cứu</th>
										<th className={cx('table-header-cell')}>Ngày Tạo</th>
										<th className={cx('table-header-cell')}>Trạng Thái</th>
										<th className={cx('table-header-cell')}>Lựa Chọn</th>
									</tr>
								</thead>
								<tbody>
									{data.map(data=>(
										<tr className={cx('table-inner-row')} key ={data.id}>
											<td className={cx('table-inner-row-content')}>
												{data.name}
											</td>
											<td className={cx('table-inner-row-content')}>{data.hnc.name}</td>
											<td className={cx('table-inner-row-content')}>
												{data.dateCreate}
											</td>
											<td className={cx('table-inner-row-content')}>
												<select
													className={cx('custom-select')}
													id="custom-select"
													name="custom-select"
												>
													<option value="Chờ">{data.status === 0 ? 'Chờ' : 'Bỏ'}</option>
												</select>
											</td>
											<td className={cx('table-inner-row-content')}>
												<div className={cx('btn-container')}>
													<Link className={cx('btn-fix')} to={`/approvalTopicDetail/${data.id}`}>
														Xem
													</Link>
												</div>
										</td>
									</tr>
									))}
								</tbody>
							</table>

							<div className={cx('list-number-page')}>
								<button className={cx('btn')}>
									<FontAwesomeIcon icon={faAngleLeft} />
								</button>
								<button className={cx('btn')}>1</button>
								<button className={cx('btn')}>2</button>
								<button className={cx('btn')}>3</button>
								<button className={cx('btn')}>4</button>
								<button className={cx('btn')}>5</button>
								<button className={cx('btn')}>6</button>
								<button className={cx('btn')}>7</button>
								<button className={cx('btn')}>8</button>
								<button className={cx('btn')}>9</button>
								<button className={cx('btn')}>
									<FontAwesomeIcon icon={faAngleRight} />
								</button>
							</div>
						</div>
					</div>
				</div>
				</div>

	);
}

export default ApprovalTopic;
