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

				<div className={cx('frame-common')}>
					<div className={cx('frame-container')}>
						<div className={cx('frame-desc')}>
							<div className={cx('frame-text')}>Danh sách sinh viên đăng ký hướng nghiên cứu</div>
							<div className={cx('frame-year')}>
								<label className={cx('frame-text')} htmlFor="year">
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

						<div className={cx('frame-container-border')}>
							<div className={cx('frame-container-inner')}>
								<div className={cx('container-wrap')}>
									<div className={cx('container-groupname-progress')}>
										<div className={cx('frame-item-groupname-progress')}>
											<div className={cx('frame-item-desc')}>
												<div className={cx('frame-item-text')}>Tên nhóm</div>
												<select
													className={cx('name-item-group')}
													id="name-item-group"
													name="name-item-group"
												>
													<option value="Nhóm 1">Nhóm 1</option>
													<option value="Nhóm 2">Nhóm 2</option>
													<option value="Nhóm 3">Nhóm 3</option>
												</select>
											</div>
										</div>

										<div className={cx('frame-item-groupname-progress')}>
											<div className={cx('frame-item-desc')}>
												<div className={cx('frame-item-text')}>Tiến độ</div>
												<select
													className={cx('name-item-group')}
													id="name-item-group"
													name="name-item-group"
												>
													<option value="Nhóm 1">Từ ngày ... đến ngày ...</option>
													<option value="Nhóm 2">Từ ngày ... đến ngày ...</option>
													<option value="Nhóm 3">Từ ngày ... đến ngày ...</option>
												</select>
											</div>
										</div>
									</div>

									<div className={cx('frame-item')}>
										<div className={cx('frame-item-desc')}>
											<div className={cx('frame-item-text')}>Tên đề tài</div>
											<div className={cx('frame-item-content')}>
												Tìm hiểu ReactJS phát triển hệ thống quản lý Nghiên cứu khoa học tương
												thích đa thiết bị
											</div>
										</div>
									</div>
									{/* table */}
									<div className={cx('frame-table')}>
										<table>
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
													<td>
														<select
															className={cx('name-item-group')}
															id="name-item-group"
															name="name-item-group"
														>
															<option value="Đạt">Đạt</option>
															<option value="Chưa Đạt">Chưa Đạt</option>
														</select>
													</td>
													<td>
														<Link
															className={cx('button-comment')}
															to={config.routes.trackProgressDetail}
														>
															Nhận xét
														</Link>
													</td>
												</tr>
												<tr className={cx('table-inner-row')}>
													<td className={cx('table-inner-row-content')}>Lại Quang Thắng</td>
													<td className={cx('table-inner-row-content')}>
														<Link to="#">Tailieu.docs</Link>
													</td>
													<td>
														<select
															className={cx('name-item-group')}
															id="name-item-group"
															name="name-item-group"
														>
															<option value="Đạt">Đạt</option>
															<option value="Chưa Đạt">Chưa Đạt</option>
														</select>
													</td>
													<td>
														<Link
															className={cx('button-comment')}
															to={config.routes.trackProgressDetail}
														>
															Nhận xét
														</Link>
													</td>
												</tr>
												<tr className={cx('table-inner-row')}>
													<td className={cx('table-inner-row-content')}>Lại Quang Thắng</td>
													<td className={cx('table-inner-row-content')}>
														<Link to="#">Tailieu.docs</Link>
													</td>
													<td>
														<select
															className={cx('name-item-group')}
															id="name-item-group"
															name="name-item-group"
														>
															<option value="Chưa Đạt">Chưa Đạt</option>
															<option value="Đạt">Đạt</option>
														</select>
													</td>
													<td>
														<Link
															className={cx('button-comment')}
															to={config.routes.trackProgressDetail}
														>
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
				</div>
			</div>
		</div>
	);
}

export default TrackProgress;
