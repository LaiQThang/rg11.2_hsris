import styles from './TrackProgress.module.scss';
import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);

function TrackProgressDetail() {
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
											<div className={cx('item-text')}>Nhóm 1</div>
										</div>
									</div>
								</div>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên đề tài</div>
										<div className={cx('item-content')}>
											<div className={cx('item-text')}>
												Từ ngày 03/08/2002 đến ngày 02/08/2023
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* {table} */}
							<table className={cx('table')}>
								<thead className={cx('table-header')}>
									<tr className={cx('table-header-row')}>
										<th className={cx('table-header-cell')}>Họ tên sinh viên</th>
										<th className={cx('table-header-cell')}>File báo cáo</th>
										<th className={cx('table-header-cell')}>Tình trạng</th>
									</tr>
								</thead>
								<tbody>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>Lại Quang Thắng</td>
										<td className={cx('table-inner-row-content')}>
											<Link to="#">Tailieu.docs</Link>
										</td>
										<td>
											<div className={cx('item-content')}>
												<div className={cx('item-text')}>Đạt</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tiêu đề</div>
										<div className={cx('item-content')}>
											<input
												type="text"
												className={cx('input')}
												placeholder="Nhận xét tiến độ đợt 1"
											/>
										</div>
									</div>
								</div>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tải lên tài liệu</div>
										<div className={cx('item-content')}>
											<input type="file" className={cx('input')} />
										</div>
									</div>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Nhận xét</div>
								<div className={cx('item-content')}>
									<textarea
										type="text"
										className={cx('input')}
										placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
									/>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Ghi chú</div>
								<div className={cx('item-content')}>
									<textarea
										type="text"
										className={cx('input')}
										placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
									/>
								</div>
							</div>

							<div className={cx('btn-container')}>
								<Link className={cx('btn-back')} to={config.routes.trackProgress}>
									Quay Lại
								</Link>
								<span className={cx('space')} />
								<Link className={cx('btn-save')} to={config.routes.trackProgress}>
									Lưu
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TrackProgressDetail;
