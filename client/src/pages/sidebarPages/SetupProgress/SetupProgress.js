import styles from './SetupProgress.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function SetupProgress() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Lập đợt tiến độ</div>

				<div className={cx('frame-common')}>
					<div className={cx('frame-container')}>
						<div className={cx('frame-desc')}>
							<div className={cx('frame-text')}>Tiến độ đề tài</div>
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
									<div className={cx('frame-item')}>
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

									<div className={cx('frame-item')}>
										<div className={cx('frame-item-desc')}>
											<div className={cx('frame-item-text')}>Tên đề tài</div>
											<div className={cx('frame-item-content')}>
												Tìm hiểu ReactJS phát triển hệ thống quản lý Nghiên cứu khoa học tương
												thích đa thiết bị
											</div>
										</div>
									</div>
								</div>
								<div className={cx('frame-container-progress')}>
									<div className={cx('frame-desc-progress')}>
										<div className={cx('frame-item-text')}>Tiến độ</div>
										<button className={cx('button-add')}>+</button>
									</div>
									<div className={cx('frame-container-border')}>
										<div className={cx('frame-progress-timeline')}>
											<div className={cx('progress-item')}>
												<div className={cx('progress-item-card')}>
													<div className={cx('frame-item-text')}>Ngày bắt đầu</div>
													<input type="date" className={cx('input-item')} />
												</div>
												<div className={cx('progress-item-card')}>
													<div className={cx('frame-item-text')}>Ngày kết thúc</div>
													<input type="date" className={cx('input-item')} />
												</div>
												<button className={cx('button-remove')}>-</button>
											</div>

											<div className={cx('progress-item')}>
												<div className={cx('progress-item-card')}>
													<div className={cx('frame-item-text')}>Ngày bắt đầu</div>
													<input type="date" className={cx('input-item')} />
												</div>
												<div className={cx('progress-item-card')}>
													<div className={cx('frame-item-text')}>Ngày kết thúc</div>
													<input type="date" className={cx('input-item')} />
												</div>
												<button className={cx('button-remove')}>-</button>
											</div>
											<div className={cx('progress-item')}>
												<div className={cx('progress-item-card')}>
													<div className={cx('frame-item-text')}>Ngày bắt đầu</div>
													<input type="date" className={cx('input-item')} />
												</div>
												<div className={cx('progress-item-card')}>
													<div className={cx('frame-item-text')}>Ngày kết thúc</div>
													<input type="date" className={cx('input-item')} />
												</div>
												<button className={cx('button-remove')}>-</button>
											</div>
										</div>
									</div>
								</div>

								<div className={cx('button-container')}>
									<button className={cx('button-submit')}>Lưu</button>
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
