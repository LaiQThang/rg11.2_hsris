import styles from './MakeScoreCard.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function MakeScoreCard() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Phân nhóm đề tài</div>
				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Phiếu điểm</div>
						<div className={cx('frame-year')}>
							<label className={cx('text')} htmlFor="year">
								Năm học :
							</label>
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
							<div className={cx('item')}>
								<div className={cx('item-title')}>Tên nhóm</div>
								<div className={cx('item-content')}>
									<select className={cx('custom-select')} id="custom-select" name="custom-select">
										<option value="Hội đồng 1">Hội đồng 1</option>
										<option value="Hội đồng 2">Hội đồng 2</option>
									</select>
								</div>
							</div>

							<div className={cx('item-title')}>Phiếu điểm</div>
							<table className={cx('table')}>
								<thead className={cx('table-header')}>
									<tr className={cx('table-header-row')}>
										<th className={cx('table-header-cell')}>Mã Đề Tài</th>
										<th className={cx('table-header-cell')}>Tên Đề Tài</th>
										<th className={cx('table-header-cell')}>Tên Phiếu</th>
										<th className={cx('table-header-cell')}>Điểm</th>
										<th className={cx('table-header-cell')}>Ghi Chú</th>
									</tr>
								</thead>
								<tbody>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>DT01</td>
										<td className={cx('table-inner-row-content')}>
											Tìm hiểu ReactJS phát triển hệ thống quản lý NCKH tương thích đa thiết bị
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Nhâp Phiếu..." />
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Nhập Điểm..." />
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Ghi Chú..." />
										</td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>DT01</td>
										<td className={cx('table-inner-row-content')}>
											Tìm hiểu ReactJS phát triển hệ thống quản lý NCKH tương thích đa thiết bị
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Nhâp Phiếu..." />
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Nhập Điểm..." />
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Ghi Chú..." />
										</td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>DT01</td>
										<td className={cx('table-inner-row-content')}>
											Tìm hiểu ReactJS phát triển hệ thống quản lý NCKH tương thích đa thiết bị
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Nhâp Phiếu..." />
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Nhập Điểm..." />
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Ghi Chú..." />
										</td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>DT01</td>
										<td className={cx('table-inner-row-content')}>
											Tìm hiểu ReactJS phát triển hệ thống quản lý NCKH tương thích đa thiết bị
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Nhâp Phiếu..." />
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Nhập Điểm..." />
										</td>
										<td className={cx('table-inner-row-content')}>
											<input className={cx('input')} type="text" placeholder="Ghi Chú..." />
										</td>
									</tr>
								</tbody>
							</table>

							<div className={cx('btn-container')}>
								<div className={cx('btn-submit')}>Lưu</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MakeScoreCard;
