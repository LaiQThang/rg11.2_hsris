import styles from './ListTopic.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ListTopicDetail() {
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
							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Hướng nghiên cứu</div>
										<div className={cx('item-content')}>
											<select
												className={cx('custom-select-detail')}
												id="custom-select-detail"
												name="custom-select-detail"
											>
												<option value="Khai phá dữ liệu">Khai phá dữ liệu</option>
												<option value="Lập trình web">Lập trình web</option>
												<option value="Thiết kế đồ họa">Thiết kế đồ họa</option>
											</select>
										</div>
									</div>
								</div>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên đề tài</div>
										<div className={cx('item-content')}>
											<textarea type="text" className={cx('input')} placeholder="Tên đề tài" />
										</div>
									</div>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Hướng nghiên cứu</div>
								<div className={cx('item-content')}>
									<textarea type="text" className={cx('input')} placeholder="Tóm tắt" />
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Mục tiêu</div>
								<div className={cx('item-content')}>
									<textarea type="text" className={cx('input')} placeholder="Mục tiêu" />
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Phạm vi</div>
								<div className={cx('item-content')}>
									<textarea type="text" className={cx('input')} placeholder="Phạm vi" />
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('btn-container-detail')}>
									<button className={cx('btn-pre')}>Quay Lại</button>
									<span className={cx('space')} />

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

export default ListTopicDetail;
