import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ListTopic.module.scss';
import classNames from 'classnames/bind';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);

function ListTopic() {
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
							<table className={cx('table')}>
								<thead className={cx('table-header')}>
									<tr className={cx('table-header-row')}>
										<th className={cx('table-header-cell')}>Tên Đề Tài</th>
										<th className={cx('table-header-cell')}>Hướng Nghiên Cứu</th>
										<th className={cx('table-header-cell')}>Ngày Tạo</th>
										<th className={cx('table-header-cell')}>Trạng Thái</th>
										<th className={cx('table-header-cell')}>Lựa Chọn</th>
									</tr>
								</thead>
								<tbody>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>
											Nghiên cứu blockchain ứng dụng nhận diện khuôn mặt Nghiên cứu blockchain ứng
											dụng nhận diện khuôn mặt ác ác ascasc a acascasc âcs
										</td>
										<td className={cx('table-inner-row-content')}>Khai phá dữ liệu</td>
										<td className={cx('table-inner-row-content')}>03/08/2023</td>
										<td className={cx('table-inner-row-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
											>
												<option value="Duyệt">Duyệt</option>
												<option value="Chờ duyệt">Chờ duyệt</option>
											</select>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('btn-container')}>
												<button className={cx('btn-del')}>Xóa</button>
												<span className={cx('space')} />
												<Link className={cx('btn-fix')} to={config.routes.listTopicDetail}>
													Sửa
												</Link>
											</div>
										</td>
									</tr>

									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>
											Nghiên cứu blockchain ứng dụng nhận diện khuôn mặt
										</td>
										<td className={cx('table-inner-row-content')}>Khai phá dữ liệu</td>
										<td className={cx('table-inner-row-content')}>03/08/2023</td>
										<td className={cx('table-inner-row-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
											>
												<option value="Duyệt">Duyệt</option>
												<option value="Chờ duyệt">Chờ duyệt</option>
											</select>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('btn-container')}>
												<button className={cx('btn-del')}>Xóa</button>
												<span className={cx('space')} />
												<Link className={cx('btn-fix')} to={config.routes.listTopicDetail}>
													Sửa
												</Link>
											</div>
										</td>
									</tr>

									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>
											Nghiên cứu blockchain ứng dụng nhận diện khuôn mặt
										</td>
										<td className={cx('table-inner-row-content')}>Khai phá dữ liệu</td>
										<td className={cx('table-inner-row-content')}>03/08/2023</td>
										<td className={cx('table-inner-row-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
											>
												<option value="Duyệt">Duyệt</option>
												<option value="Chờ duyệt">Chờ duyệt</option>
											</select>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('btn-container')}>
												<button className={cx('btn-del')}>Xóa</button>
												<span className={cx('space')} />
												<Link className={cx('btn-fix')} to={config.routes.listTopicDetail}>
													Sửa
												</Link>
											</div>
										</td>
									</tr>

									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>
											Nghiên cứu blockchain ứng dụng nhận diện khuôn mặt
										</td>
										<td className={cx('table-inner-row-content')}>Khai phá dữ liệu</td>
										<td className={cx('table-inner-row-content')}>03/08/2023</td>
										<td className={cx('table-inner-row-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
											>
												<option value="Duyệt">Duyệt</option>
												<option value="Chờ duyệt">Chờ duyệt</option>
											</select>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('btn-container')}>
												<button className={cx('btn-del')}>Xóa</button>
												<span className={cx('space')} />

												<Link className={cx('btn-fix')} to={config.routes.listTopicDetail}>
													Sửa
												</Link>
											</div>
										</td>
									</tr>

									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>
											Nghiên cứu blockchain ứng dụng nhận diện khuôn mặt
										</td>
										<td className={cx('table-inner-row-content')}>Khai phá dữ liệu</td>
										<td className={cx('table-inner-row-content')}>03/08/2023</td>
										<td className={cx('table-inner-row-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
											>
												<option value="Duyệt">Duyệt</option>
												<option value="Chờ duyệt">Chờ duyệt</option>
											</select>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('btn-container')}>
												<button className={cx('btn-del')}>Xóa</button>
												<span className={cx('space')} />

												<Link className={cx('btn-fix')} to={config.routes.listTopicDetail}>
													Sửa
												</Link>
											</div>
										</td>
									</tr>

									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>
											Nghiên cứu blockchain ứng dụng nhận diện khuôn mặt
										</td>
										<td className={cx('table-inner-row-content')}>Khai phá dữ liệu</td>
										<td className={cx('table-inner-row-content')}>03/08/2023</td>
										<td className={cx('table-inner-row-content')}>
											<select
												className={cx('custom-select')}
												id="custom-select"
												name="custom-select"
											>
												<option value="Duyệt">Duyệt</option>
												<option value="Chờ duyệt">Chờ duyệt</option>
											</select>
										</td>
										<td className={cx('table-inner-row-content')}>
											<div className={cx('btn-container')}>
												<button className={cx('btn-del')}>Xóa</button>
												<span className={cx('space')} />

												<Link className={cx('btn-fix')} to={config.routes.listTopicDetail}>
													Sửa
												</Link>
											</div>
										</td>
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

export default ListTopic;
