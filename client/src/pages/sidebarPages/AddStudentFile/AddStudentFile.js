import classNames from 'classnames/bind'
import { useEffect, useState } from 'react';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
import * as Result from '~/apiService/adminService'
import { useAuth } from "~/Components/Auth";
import styles from './AddStudent.module.scss'
import * as XLSX from 'xlsx';
import config from '~/config';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles)

function AddStudentFile() {
    const auth = useAuth()
	const tokenBearer = auth.getTokens()

    const [jsonData, setJsonData] = useState(null);

    const handleFileUpload = event => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = event => {
        const binaryData = event.target.result;
        const workbook = XLSX.read(binaryData, { type: 'binary' });
  
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
  
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const headers = data[0];
        const jsonData = [];
  
        for (let i = 1; i < data.length; i++) {
          const row = {};
          for (let j = 0; j < headers.length; j++) {
            // Kiểm tra nếu trường không có dữ liệu, chuyển thành null
            const cellValue = data[i][j] !== undefined ? data[i][j] : null;
            row[headers[j]] = cellValue;
          }
          jsonData.push(row);
        }
  
        setJsonData(jsonData);
      };
  
      reader.readAsBinaryString(file);
    };
    const handleAddListStudent = () => {
        const show = window.confirm("Bạn có chắc chắn với lựa chọn này?");
        if (show) {
            let successCount = 0; // Số lượng yêu cầu thành công
            let errorCount = 0; // Số lượng yêu cầu thất bại
    
            // Lặp qua mỗi đối tượng trong danh sách và gửi yêu cầu
            jsonData.forEach(jsonValue => {
                posthApiLIST(jsonValue.code, jsonValue.name, jsonValue.className, jsonValue.status, jsonValue.birthday, jsonValue.phone, jsonValue.email, jsonValue.sex, jsonValue.address, jsonValue.passWord)
                    .then((res) => {
                        if (res) {
                            successCount++; // Tăng số lượng yêu cầu thành công
                        } else {
                            errorCount++; // Tăng số lượng yêu cầu thất bại
                        }
    
                        // Kiểm tra nếu đã hoàn thành tất cả yêu cầu
                        if (successCount + errorCount === jsonData.length) {
                            // Hiển thị toast sau khi tất cả yêu cầu đã hoàn thành
                            if (successCount === jsonData.length) {
                                showToast('success', 'Tất cả sinh viên đã được thêm thành công!');
                            } else {
                                showToast('error', 'Có lỗi xảy ra khi thêm sinh viên!');
                            }
                        }
                    })
                    .catch((error) => {
                        console.error('Lỗi khi xử lý yêu cầu:', error);
                        showToast('error', 'Đã xảy ra lỗi khi gửi yêu cầu!');
                    });
            });
        }
    };
    
    //POST LIST API
	const posthApiLIST = async (a,b,c,d,e,f,g,h,i,k,l) => {
		try {
			const result = await Result.postAddStudent(a,b,c,d,e,f,g,h,i,k,l, tokenBearer.access_token);
			return result;
		} catch (error) {
			console.error('Đã xảy ra lỗi khi gửi dữ liệu:', error);
			throw error;
		}
	} 

    return ( 
        <div className={cx('wrapper')}>
        <ToastContainer/>
        <div className={cx('inner')}>
            <div className={cx('name-page')}>Quản lý sinh viên - Thêm sinh viên</div>
            <div className={cx('frame-container')}>
                <div className={cx('list-btn')}>
                    <Link  className={cx('item-btn')}to={config.routes.addStudent}>Thêm sinh viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.addTeacher}>Thêm giảng viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.addStudentFile}>Nhập file sinh viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.addTeacherFile}>Nhập file giảng viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.permissionType}>Loại quyền</Link>
                </div>
                <div className={cx('frame-desc')}>
                    <div className={cx('text')}>Thêm sinh viên</div>
                </div>
                    <div className={cx('border')}>
                        <div className={cx('content')}>
                            <div className={cx('content-item-card')}>
                            <div className={cx('item')}>
                                <div className={cx('item-title')}>Nhập File</div>
                                <div className={cx('item-content')}>
                                <input className={cx('input')} type="file" onChange={handleFileUpload} />
                                </div>
                            </div>
                            </div>
                            <div className={cx('btn-container')}>
                            <button onClick={handleAddListStudent} className={cx('btn-save')}>
                                Thêm
                            </button>
                        </div>
                        </div>
                    </div>


                <div>
                    {jsonData && (
                    <pre>{JSON.stringify(jsonData, null, 2)}</pre>
                    )}
                </div>
            </div>
        </div>
    </div>
    );
}

export default AddStudentFile;