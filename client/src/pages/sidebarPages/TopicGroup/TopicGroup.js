import styles from './TopicGroup.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function TopicGroup() {
	return (
		<div className={cx('wrapper')}>
			<div className={cx('inner')}>
				<div className={cx('name-page')}>Quản lý chung - Phân nhóm đề tài</div>

				<div className={cx('frame-container')}>
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Danh sách sinh viên đăng ký hướng nghiên cứu</div>
						<div className={cx('frame-year')}>

							<select className={cx('year')} id="year" name="year">
								<option value="2020-2021">2020-2021</option>
								<option value="2021-2022">2021-2022</option>
								<option value="2022-2023">2022-2023</option>
								<option value="2023-2024">2023-2024</option>
							</select>
						</div>
					</div>

					<table className={cx('table')}>
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
					<div className={cx('frame-desc')}>
						<div className={cx('text')}>Phân nhóm đề tài</div>
					</div>
					<div className={cx('border')}>
						<div className={cx('content')}>
							<div className={cx('content-spacing')}>
								<div className={cx('content-block')}>
									<div className={cx('item-wrap')}>
										<div className={cx('item')}>
											<div className={cx('item-title')}>Hướng nghiên cứu</div>
											<div className={cx('item-content')}>
												<select
													className={cx('custom-select')}
													id="custom-select"
													name="custom-select"
												>
													<option value="Khai phá dữ liệu">Khai phá dữ liệu</option>
													<option value="Lập trình web">Lập trình web</option>
													<option value="Thiết kế đồ họa">Thiết kế đồ họa</option>
												</select>
											</div>
										</div>
									</div>
									<div className={cx('item-wrap')}>
										<div className={cx('item-title')}>Danh sách sinh viên</div>
										<div className={cx('item-child')}>
											<div className={cx('item-content')}>
												<input
													type="text"
													className={cx('input')}
													placeholder="Lại Quang Thắng - 20A10010223"
												/>
											</div>
											<button className={cx('btn-add')}>Thêm</button>
										</div>
										<div className={cx('item-child')}>
											<div className={cx('item-content')}>
												<input
													type="text"
													className={cx('input')}
													placeholder="Lại Quang Thắng - 20A10010223"
												/>
											</div>
											<button className={cx('btn-add')}>Thêm</button>
										</div>
										<div className={cx('item-child')}>
											<div className={cx('item-content')}>
												<input
													type="text"
													className={cx('input')}
													placeholder="Lại Quang Thắng - 20A10010223"
												/>
											</div>
											<button className={cx('btn-add')}>Thêm</button>
										</div>
										<div className={cx('item-child')}>
											<div className={cx('item-content')}>
												<input
													type="text"
													className={cx('input')}
													placeholder="Lại Quang Thắng - 20A10010223"
												/>
											</div>
											<button className={cx('btn-add')}>Thêm</button>
										</div>
									</div>
								</div>
								<div className={cx('content-block')}>
									<div className={cx('item-wrap')}>
										<div className={cx('item')}>
											<div className={cx('item-title')}>Tên nhóm(*)</div>
											<div className={cx('item-content')}>
												<input
													type="text"
													className={cx('input')}
													placeholder="Lại Quang Thắng - 20A10010223"
												/>
											</div>
											<div className={cx('notify')}>Tên nhóm không được để trống</div>
										</div>
									</div>

									<div className={cx('item-wrap')}>
										<div className={cx('item-title')}>Thành viên được chọn(*)</div>
										<div className={cx('notify')}>Thành viên không được để trống</div>

										<div className={cx('item-child')}>
											<div className={cx('item-content')}>
												<input
													type="text"
													className={cx('input')}
													placeholder="Lại Quang Thắng - 20A10010223"
												/>
											</div>
											<button className={cx('btn-del')}>Xóa</button>
										</div>
										<div className={cx('item-child')}>
											<div className={cx('item-content')}>
												<input
													type="text"
													className={cx('input')}
													placeholder="Lại Quang Thắng - 20A10010223"
												/>
											</div>
											<button className={cx('btn-del')}>Xóa</button>
										</div>
										<div className={cx('item-child')}>
											<div className={cx('item-content')}>
												<input
													type="text"
													className={cx('input')}
													placeholder="Lại Quang Thắng - 20A10010223"
												/>
											</div>
											<button className={cx('btn-del')}>Xóa</button>
										</div>
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
	);
}

export default TopicGroup;
