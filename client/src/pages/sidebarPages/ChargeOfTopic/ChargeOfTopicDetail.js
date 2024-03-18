import styles from './ChargeOfTopic.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);
function ChargeOfTopicDetail() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Phân nhóm đề tài</div>
				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Chi tiết đề tài</div>
					</div>

					<div className={cx('border')}>
						<div className={cx('content')}>
							<div className={cx('content-list-card')}>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Hướng nghiên cứu</div>
										<div className={cx('item-content')}>
											<div className={cx('item-text')}>Khai phá dữ liệu</div>
										</div>
									</div>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Thời gian hoàn thành</div>
										<div className={cx('item-content')}>
											<div className={cx('item-text')}>
												Từ ngày 03/08/2002 đến ngày 02/08/2023
											</div>
										</div>
									</div>
									<div className={cx('content-list-card')}>
										<div className={cx('content-item-card')}>
											<div className={cx('item')}>
												<div className={cx('item-title')}>Điểm </div>
												<div className={cx('item-content')}>
													<div className={cx('item-text')}>90</div>
												</div>
											</div>
										</div>

										<div className={cx('content-item-card')}>
											<div className={cx('item')}>
												<div className={cx('item-title')}>Giải thưởng </div>
												<div className={cx('item-content')}>
													<div className={cx('item-text')}>Chưa xét giải</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên đề tài</div>
										<div className={cx('item-content')}>
											<div className={cx('item-text')}>
												Tìm hiểu ReactJS phát triển hệ thống quản lý Nghiên cứu khoa học tương
												thích đa thiết bị
											</div>
										</div>
									</div>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Hội đồng chấm</div>
										<div className={cx('item-content')}>
											<div className={cx('item-text')}>Chưa phân công</div>
										</div>
									</div>

									<div className={cx('item')}>
										<div className={cx('item-title')}>Trạng thái</div>
										<div className={cx('item-content')}>
											<div className={cx('item-text')}>Hoàn thành</div>
										</div>
									</div>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Tóm tắt</div>
								<div className={cx('item-content')}>
									<div className={cx('item-text')}>
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
										Ipsum has been the industry's standard dummy text ever since the 1500s, when an
										unknown printer took a galley of type and scrambled it to make a type specimen
										book.
									</div>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Mục tiêu</div>
								<div className={cx('item-content')}>
									<div className={cx('item-text')}>
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
										Ipsum has been the industry's standard dummy text ever since the 1500s, when an
										unknown printer took a galley of type and scrambled it to make a type specimen
										book.
									</div>
								</div>
							</div>
							<div className={cx('item')}>
								<div className={cx('item-title')}>Phạm vi</div>
								<div className={cx('item-content')}>
									<div className={cx('item-text')}>
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
										Ipsum has been the industry's standard dummy text ever since the 1500s, when an
										unknown printer took a galley of type and scrambled it to make a type specimen
										book.
									</div>
								</div>
							</div>
							<div className={cx('item')}>
								<div className={cx('item-title')}>Nhận xét</div>
								<div className={cx('item-content')}>
									<div className={cx('item-text')}>
										Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
										Ipsum has been the industry's standard dummy text ever since the 1500s, when an
										unknown printer took a galley of type and scrambled it to make a type specimen
										book.
									</div>
								</div>
							</div>

							<div className={cx('btn-container')}>
								<Link className={cx('btn-pre')} to={config.routes.trackProgress}>
									Quay Lại
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChargeOfTopicDetail;
