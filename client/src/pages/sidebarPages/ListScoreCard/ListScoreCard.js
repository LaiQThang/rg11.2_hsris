import styles from './ListScoreCard.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function ListScoreCard() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Phân nhóm đề tài</div>
				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Danh sách hội đồng</div>
						<div className={cx('frame-year')}>
							<select className={cx('year')} id="year" name="year">
								<option value="2020-2021">2020-2021</option>
								<option value="2021-2022">2021-2022</option>
								<option value="2022-2023">2022-2023</option>
								<option value="2023-2024">2023-2024</option>
							</select>
						</div>
					</div>

					<div className={cx('border')}>
						<div className={cx('content')}>
							<table className={cx('table')}>
								<thead className={cx('table-header')}>
									<tr className={cx('table-header-row')}>
										<th className={cx('table-header-cell')}>Mã Đề Tài</th>
										<th className={cx('table-header-cell')}>Tên Nhóm</th>
										<th className={cx('table-header-cell')}>Tên Đề Tài</th>
										<th className={cx('table-header-cell')}>Điểm</th>
										<th className={cx('table-header-cell')}>Ghi Chú</th>
									</tr>
								</thead>
								<tbody>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>DT01</td>
										<td className={cx('table-inner-row-content')}>Nhóm 1</td>
										<td className={cx('table-inner-row-content')}>
											Tìm hiểu ReactJs phát triển phần mềm cho công ty HSRIS
										</td>
										<td className={cx('table-inner-row-content')}>90</td>
										<td className={cx('table-inner-row-content')}></td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>DT01</td>
										<td className={cx('table-inner-row-content')}>Nhóm 1</td>
										<td className={cx('table-inner-row-content')}>
											Tìm hiểu ReactJs phát triển phần mềm cho công ty HSRIS
										</td>
										<td className={cx('table-inner-row-content')}>90</td>
										<td className={cx('table-inner-row-content')}></td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>DT01</td>
										<td className={cx('table-inner-row-content')}>Nhóm 1</td>
										<td className={cx('table-inner-row-content')}>
											Tìm hiểu ReactJs phát triển phần mềm cho công ty HSRIS
										</td>
										<td className={cx('table-inner-row-content')}>90</td>
										<td className={cx('table-inner-row-content')}></td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>DT01</td>
										<td className={cx('table-inner-row-content')}>Nhóm 1</td>
										<td className={cx('table-inner-row-content')}>
											Tìm hiểu ReactJs phát triển phần mềm cho công ty HSRIS
										</td>
										<td className={cx('table-inner-row-content')}>90</td>
										<td className={cx('table-inner-row-content')}></td>
									</tr>
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
		</div>
	);
}

export default ListScoreCard;
