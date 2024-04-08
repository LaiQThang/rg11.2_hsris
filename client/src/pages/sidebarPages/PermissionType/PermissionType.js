import { useEffect, useRef, useState } from 'react';
import styles from './PermissionType.module.scss';
import classNames from 'classnames/bind';
import * as Result from '~/apiService/adminService'
import { useAuth } from '~/Components/Auth';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function PermissionType() {
    const [data, setData] = useState([]);
    const [idPermission, setIDPermission] = useState('');
    const fetchApi = async ()=>{
		let result
		result = await Result.getPermissionAdmin()
		return result
	}

    useEffect(()=> {
        fetchApi().then((data)=>{
			setData(data.data)
		})
    },[])
    useEffect(()=> {
        console.log(idPermission);
    },[idPermission])
    const handleBtnFix = (e) => {
        setIDPermission(e.target.value)
    }
    const handleBtnDel = (e) => {

    }
    const handleAddPermission = () => {

    }

    return ( 
        <div className={cx('wrapper')}>
            <ToastContainer/>
            <div className={cx('inner')}>
                <div className={cx('name-page')}>Quản lý tài khoản - Loại quyền</div>
                <div className={cx('frame-container')}>
                <div className={cx('list-btn')}>
                    <Link  className={cx('item-btn')}to={config.routes.addStudent}>Thêm sinh viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.addTeacher}>Thêm giảng viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.addStudentFile}>Nhập file sinh viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.addTeacherFile}>Nhập file giảng viên</Link>
                    <Link  className={cx('item-btn')}to={config.routes.permissionType}>Loại quyền</Link>
                </div>
                    <div className={cx('frame-desc')}>
						<div className={cx('text')}>Loại quyền</div>
						<button className={cx('btn-add')} onClick={handleAddPermission}>Thêm</button>
                    </div>
                    <table className={cx('table')}>
                        <thead className={cx('table-header')}>
                            <tr className={cx('table-header-row')}>
                                <th className={cx('table-header-cell')}>STT</th>
                                <th className={cx('table-header-cell')}>Tên quyền</th>
                                <th className={cx('table-header-cell')}>Ghi chú</th>
                                <th className={cx('table-header-cell')}>Lựa chọn</th>
                            </tr>
                        </thead>
                            <tbody >
                               {
                                    data.map((valueData, index) => 
                                        <tr key={valueData.id} className={cx('table-inner-row')}>
                                        <td className={cx('table-inner-row-content')}>{index+1}</td>
                                        <td className={cx('table-inner-row-content')}>{valueData.namePermission}</td>
                                        <td className={cx('table-inner-row-content')}>{valueData.note}</td>
                                        <td className={cx('table-inner-row-content')}>
                                            <Link to={`/decentralization/${valueData.id}`} onClick={handleBtnFix} value={valueData.id} className={cx('icon')}><FontAwesomeIcon icon={faPenToSquare}/></Link>
                                            <button onClick={handleBtnDel} value={valueData.id} className={cx('icon')}><FontAwesomeIcon icon={faTrashCan}/></button>
                                        </td>
                                    </tr>)
                               }
                            </tbody>           
                    </table>
                </div>
            </div>
        </div>
    );
}

export default PermissionType;