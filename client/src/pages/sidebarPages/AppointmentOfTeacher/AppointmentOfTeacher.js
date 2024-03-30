import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AppointmentOfTeacher.module.scss';
import classNames from 'classnames/bind';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function AppointmentOfTeacher() {
    const [selectedYear, setSelectedYear] = useState('2020');
    const [dataFromApi, setDataFromApi] = useState(null);

    useEffect(() => {
        // Hàm này được gọi mỗi khi selectedYear thay đổi
        if (selectedYear !== '') {
            // Gửi yêu cầu đến API để lấy dữ liệu dựa trên năm đã chọn
            fetchContentData(selectedYear);
        }
    }, [selectedYear]);

    const handleYearChange = (event) => {
        const selectedYearValue = event.target.value;
        setSelectedYear(selectedYearValue);
    };

    const fetchContentData = (year) => {
        // Gửi yêu cầu đến API để lấy dữ liệu dựa trên năm đã chọn
        // Ví dụ: 
        fetch(`your_api_endpoint/${year}`)
            .then(response => response.json())
            .then(data => {
                // Cập nhật state của contentData với dữ liệu mới nhận được từ API
                setDataFromApi(data);
            })
            .catch(error => {
                console.error('Error fetching content data:', error);
            });
    };
    return ( <div className={cx('wrapper')}>
    <div className={cx('inner')}>
        <div className={cx('name-page')}>Quản lý chung - Phân nhóm đề tài</div>

        <div className={cx('frame-container')}>
            <div className={cx('frame-desc')}>
                <div className={cx('text')}>Danh sách phân công</div>
                <div className={cx('frame-year')}>

                    <select className={cx('year')} id="year" name="year">
                        <option className={cx(selectedYear === '2020' && 'year-active')} value="2020">2020-2021</option>
                        <option className={cx(selectedYear === '2021' && 'year-active')} value="2021">2021-2022</option>
                        <option className={cx(selectedYear === '2022' && 'year-active')} value="2022">2022-2023</option>
                        <option className={cx(selectedYear === '2023' && 'year-active')} value="2023">2023-2024</option>
                    </select>
                </div>
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
                                <div className={cx('item')}>
                                    <div className={cx('item-title')}>Tìm Kiếm Giảng Viên</div>
                                    <div className={cx('item-content')}>
                                        <div className={cx('input-wrap')}>
                                            <input
                                                type="text"
                                                className={cx('input')}
                                                placeholder="Lại Quang Thắng - 20A10010223"
                                            />
                                            <FontAwesomeIcon className={cx('search-btn')} icon={faMagnifyingGlass}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('item-wrap')}>
                                <div className={cx('item-title')}>Danh sách giảng viên</div>
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
                                    <div className={cx('item-title')}>Số lượng sinh viên(*)</div>
                                    <div className={cx('item-content')}>
                                    <select
                                            className={cx('custom-select')}
                                            id="custom-select"
                                            name="custom-select"
                                        >
                                            <option value="Khai phá dữ liệu">1</option>
                                            <option value="Lập trình web">2</option>
                                            <option value="Thiết kế đồ họa">3</option>
                                        </select>   
                                    </div>
                                    <div className={cx('notify')}>Tên nhóm không được để trống</div>
                                </div>
                            </div>

                            <div className={cx('item-wrap')}>
                                <div className={cx('item-title')}>Giảng viên được chọn(*)</div>
                                <div className={cx('notify')}>Giảng viên không được để trống</div>

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

export default AppointmentOfTeacher;