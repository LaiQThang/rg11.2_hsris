import config from '~/config';
import styles from './ApprovalTopic.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function ApprovalTopicDetail() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Phân nhóm đề tài</div>
				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Thêm đề tài</div>
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
										<div className={cx('item-title')}>Tên nhóm</div>
										<div className={cx('item-content')}>
											<div className={cx('item-text')}>Khai phá dữ liệu</div>
										</div>
									</div>
								</div>
								<div className={cx('content-item-card')}>
									<div className={cx('item')}>
										<div className={cx('item-title')}>Tên đề tài</div>
										<div className={cx('item-content')}>
											<div className={cx('item-text')}>Khai phá dữ liệu</div>
										</div>
									</div>
								</div>
							</div>

							<div className={cx('item')}>
								<div className={cx('item-title')}>Hướng nghiên cứu</div>
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

							<div className={cx('btn-container-detail')}>
								<Link className={cx('btn-pre')} to={config.routes.approvalTopic}>
									Quay Lại
								</Link>
								<span className={cx('space')} />
								<Link className={cx('btn-submit')} to={config.routes.approvalTopic}>
									Duyệt
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ApprovalTopicDetail;
