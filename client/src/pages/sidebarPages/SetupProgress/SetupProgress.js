import styles from './SetupProgress.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function SetupProgress() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Lập đợt tiến độ</div>

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
							<div className={cx('content-list-name')}>
								<div className={cx('content-item-name')}>
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
								<div className={cx('content-item-name')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên đề tài</div>
										<div className={cx('item-content')}>
											<div className={cx('item-text')}>
												Tìm hiểu ReactJS phát triển hệ thống quản lý Nghiên cứu khoa học tương
												thích đa thiết bị
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className={cx('content-progress')}>
								<div className={cx('progress-spacing')}>
									<div className={cx('progress-title')}>Tiến độ</div>
									<button className={cx('btn-add')}>+</button>
								</div>

								<div className={cx('border')}>
									<div className={cx('progress-timeline')}>
										<div className={cx('progress-item')}>
											<div className={cx('progress-item-card')}>
												<div className={cx('item-title')}>Ngày bắt đầu</div>
												<div className={cx('item-content')}>
													<input type="date" className={cx('input-item')} />
												</div>
											</div>
											<div className={cx('progress-item-card')}>
												<div className={cx('item-title')}>Ngày kết thúc</div>
												<div className={cx('item-content')}>
													<input type="date" className={cx('input-item')} />
												</div>
											</div>
											<button className={cx('btn-del')}>-</button>
										</div>
										<div className={cx('progress-item')}>
											<div className={cx('progress-item-card')}>
												<div className={cx('item-title')}>Ngày bắt đầu</div>
												<div className={cx('item-content')}>
													<input type="date" className={cx('input-item')} />
												</div>
											</div>
											<div className={cx('progress-item-card')}>
												<div className={cx('item-title')}>Ngày kết thúc</div>
												<div className={cx('item-content')}>
													<input type="date" className={cx('input-item')} />
												</div>
											</div>
											<button className={cx('btn-del')}>-</button>
										</div>
									</div>
								</div>

								<div className={cx('btn-container')}>
									<button className={cx('btn-submit')}>Lưu</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SetupProgress;
