import styles from './TrackProgress.module.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);

function TrackProgress() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Phân nhóm đề tài</div>

				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Danh sách sinh viên đăng ký hướng nghiên cứu</div>
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
								<div className={cx('item-title')}>Tên đề tài</div>
								<div className={cx('item-content')}>
									<div className={cx('item-text')}>
										Tìm hiểu ReactJS phát triển hệ thống quản lý Nghiên cứu khoa học tương thích đa
										thiết bị
									</div>
								</div>
							</div>

							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên nhóm</div>
										<div className={cx('item-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
											>
												<option value="Nhóm 1">Nhóm 1</option>
												<option value="Nhóm 2">Nhóm 2</option>
												<option value="Nhóm 3">Nhóm 3</option>
											</select>
										</div>
									</div>
								</div>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên đề tài</div>
										<div className={cx('item-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
											>
												<option value="Nhóm 1">Từ ngày ... đến ngày ...</option>
												<option value="Nhóm 2">Từ ngày ... đến ngày ...</option>
												<option value="Nhóm 3">Từ ngày ... đến ngày ...</option>
											</select>
										</div>
									</div>
								</div>
							</div>

							<table className={cx('table')}>
								<thead className={cx('table-header')}>
									<tr className={cx('table-header-row')}>
										<th className={cx('table-header-cell')}>Họ tên sinh viên</th>
										<th className={cx('table-header-cell')}>File báo cáo</th>
										<th className={cx('table-header-cell')}>Tình trạng</th>
										<th className={cx('table-header-cell')}>Lựa chọn</th>
									</tr>
								</thead>
								<tbody>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>Lại Quang Thắng</td>
										<td className={cx('table-inner-row-content')}>
											<Link to="#">Tailieu.docs</Link>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('item-content')}>
												<select
													className={cx('custom-select')}
													id="custom-select"
													name="custom-select"
												>
													<option value="Đạt">Đạt</option>
													<option value="Chưa Đạt">Chưa Đạt</option>
												</select>
											</div>
										</td>
										<td className={cx('table-inner-row-content')}>
											<Link className={cx('btn-comment')} to={config.routes.trackProgressDetail}>
												Nhận xét
											</Link>
										</td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>Lại Quang Thắng</td>
										<td className={cx('table-inner-row-content')}>
											<Link to="#">Tailieu.docs</Link>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('item-content')}>
												<select
													className={cx('custom-select')}
													id="custom-select"
													name="custom-select"
												>
													<option value="Đạt">Đạt</option>
													<option value="Chưa Đạt">Chưa Đạt</option>
												</select>
											</div>
										</td>
										<td className={cx('table-inner-row-content')}>
											<Link className={cx('btn-comment')} to={config.routes.trackProgressDetail}>
												Nhận xét
											</Link>
										</td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>Lại Quang Thắng</td>
										<td className={cx('table-inner-row-content')}>
											<Link to="#">Tailieu.docs</Link>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('item-content')}>
												<select
													className={cx('custom-select')}
													id="custom-select"
													name="custom-select"
												>
													<option value="Đạt">Đạt</option>
													<option value="Chưa Đạt">Chưa Đạt</option>
												</select>
											</div>
										</td>
										<td className={cx('table-inner-row-content')}>
											<Link className={cx('btn-comment')} to={config.routes.trackProgressDetail}>
												Nhận xét
											</Link>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TrackProgress;
