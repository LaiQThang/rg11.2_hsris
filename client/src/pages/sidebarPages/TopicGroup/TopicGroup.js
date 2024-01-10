import styles from './TopicGroup.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function TopicGroup() {
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

						<div className={cx('frame-table')}>
							<table>
								<thead className={cx('table-header')}>
									<tr className={cx('table-header-row')}>
										<th className={cx('table-header-cell')}>Tên Hướng Nghiên Cứu</th>
										<th className={cx('table-header-cell')}>Họ Và Tên Sinh Viên</th>
										<th className={cx('table-header-cell')}>Số Lượng Phân Công Tối Đa</th>
									</tr>
								</thead>
								<tbody>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>Khai phá dữ liệu</td>
										<td className={cx('table-inner-row-content')}>
											<div>Nguyễn Văn A</div>
											<div>Nguyễn Văn B</div>
											<div>Nguyễn Văn C</div>
										</td>
										<td className={cx('table-inner-row-content')}>5</td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>Lập trình web</td>
										<td className={cx('table-inner-row-content')}>
											<div>Nguyễn Văn A</div>
											<div>Nguyễn Văn B</div>
											<div>Nguyễn Văn C</div>
										</td>
										<td className={cx('table-inner-row-content')}>5</td>
									</tr>
									<tr className={cx('table-inner-row')}>
										<td className={cx('table-inner-row-content')}>Thiết kế đồ họa</td>
										<td className={cx('table-inner-row-content')}>
											<div>Nguyễn Văn A</div>
											<div>Nguyễn Văn B</div>
											<div>Nguyễn Văn C</div>
										</td>
										<td className={cx('table-inner-row-content')}>5</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div className={cx('frame-container')}>
						<div className={cx('frame-desc')}>
							<div className={cx('frame-text')}>Phân nhóm đề tài</div>
						</div>

						<div className={cx('frame-container-border')}>
							<div className={cx('frame-container-inner')}>
								<div className={cx('container-wrap')}>
									<div className={cx('frame-item')}>
										<div className={cx('frame-item-desc')}>
											<div className={cx('frame-item-text')}>Hướng nghiên cứu</div>
											<select
												className={cx('name-item-group')}
												id="name-item-group"
												name="name-item-group"
											>
												<option value="Khai phá dữ liệu">Khai phá dữ liệu</option>
												<option value="Lập trình web">Lập trình web</option>
												<option value="Thiết kế đồ họa">Thiết kế đồ họa</option>
											</select>
										</div>

										<div className={cx('frame-item-list-user')}>
											<div className={cx('frame-item-desc')}>
												<div className={cx('frame-item-text')}>Danh sách sinh viên</div>
											</div>
											<div className={cx('frame-item-form')}>
												<input
													type="text"
													disabled
													value="Lại Quang Thắng - 20A10010223"
													className={cx('input-item')}
												/>
												<button className={cx('button-add')}>Thêm</button>
											</div>
											<div className={cx('frame-item-form')}>
												<input
													type="text"
													disabled
													value="Lại Quang Thắng - 20A10010223"
													className={cx('input-item')}
												/>
												<button className={cx('button-add')}>Thêm</button>
											</div>
											<div className={cx('frame-item-form')}>
												<input
													type="text"
													disabled
													value="Lại Quang Thắng - 20A10010223"
													className={cx('input-item')}
												/>
												<button className={cx('button-add')}>Thêm</button>
											</div>
											<div className={cx('frame-item-form')}>
												<div className={cx('input-container')}>
													<input
														type="text"
														disabled
														value="Lại Quang Thắng - 20A10010223"
														className={cx('input-item')}
													/>
												</div>
												<button className={cx('button-add')}>Thêm</button>
											</div>
										</div>
									</div>

									<div className={cx('frame-item')}>
										<div className={cx('frame-item-desc')}>
											<div className={cx('frame-item-text')}>
												Tên nhóm{'('}*{')'}
											</div>
											<input
												type="text"
												placeholder="Nhập tên nhóm"
												className={cx('input-item')}
											/>
											<div className={cx('topic-noti')}>Tên nhóm không được để trống</div>
										</div>

										<div className={cx('frame-topic-list-user')}>
											<div className={cx('frame-item-desc')}>
												<div className={cx('frame-item-text')}>
													Thành viên được chọn{'('}*{')'}
												</div>
											</div>
											<div className={cx('topic-noti')}>Thành viên không được để trống</div>

											<div className={cx('frame-item-form')}>
												<input
													type="text"
													disabled
													value="Lại Quang Thắng - 20A10010223"
													className={cx('input-item')}
												/>
												<button className={cx('button-remove')}>Xóa</button>
											</div>

											<div className={cx('frame-item-form')}>
												<input
													type="text"
													disabled
													value="Lại Quang Thắng - 20A10010223"
													className={cx('input-item')}
												/>
												<button className={cx('button-remove')}>Xóa</button>
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

export default TopicGroup;
