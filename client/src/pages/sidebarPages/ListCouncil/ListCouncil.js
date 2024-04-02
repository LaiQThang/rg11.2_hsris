import styles from './ListCouncil.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function ListCouncil() {
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
										<th className={cx('table-header-cell')}>Mã Hội Đồng</th>
										<th className={cx('table-header-cell')}>Tên Hội Đồng</th>
										<th className={cx('table-header-cell')}>Thời Gian</th>
										<th className={cx('table-header-cell')}>Địa Điểm</th>
										<th className={cx('table-header-cell')}>Ghi Chú</th>
									</tr>
								</thead>
								<tbody>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>HD01</td>
										<td className={cx('table-inner-row-content')}>Hội đồng công nghệ phần mềm</td>
										<td className={cx('table-inner-row-content')}>12/04/2024</td>
										<td className={cx('table-inner-row-content')}>12/04/2024</td>
										<td className={cx('table-inner-row-content')}></td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>HD01</td>
										<td className={cx('table-inner-row-content')}>Hội đồng công nghệ phần mềm</td>
										<td className={cx('table-inner-row-content')}>12/04/2024</td>
										<td className={cx('table-inner-row-content')}>12/04/2024</td>
										<td className={cx('table-inner-row-content')}></td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>HD01</td>
										<td className={cx('table-inner-row-content')}>Hội đồng công nghệ phần mềm</td>
										<td className={cx('table-inner-row-content')}>12/04/2024</td>
										<td className={cx('table-inner-row-content')}>12/04/2024</td>
										<td className={cx('table-inner-row-content')}></td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>HD01</td>
										<td className={cx('table-inner-row-content')}>Hội đồng công nghệ phần mềm</td>
										<td className={cx('table-inner-row-content')}>12/04/2024</td>
										<td className={cx('table-inner-row-content')}>12/04/2024</td>
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

export default ListCouncil;
