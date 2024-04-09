import { useEffect, useRef, useState } from 'react';
import styles from './Decentralization.module.scss';
import classNames from 'classnames/bind';
import * as Result from '~/apiService/adminService'
import { useParams } from "react-router-dom";
import { useAuth } from '~/Components/Auth';
import { showToast } from '~/Components/ToastMessage/Toast';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);

function Decentralization() {
    const {id} = useParams()
    const [data, setData] = useState([]);
    const [dataPermission, setDataPermission] = useState([]);

    const fetchApi = async ()=>{
		let result
		result = await Result.getListPermissionAdmin()
		return result
	}
    useEffect(()=>{
        callApi()
                .then(function(res){
                    fetchApiPermission().then((res)=>{
                        setDataPermission(res.data)
                    })
                })
                .catch(function(error){
                    console.log(error);
                });
    },[])

    function callApi(){
		return new Promise(function(resolve,reject){
			const res = fetchApi().then((data)=>{
                setData(data.data)
            })
			if(res){
				resolve(res);
			} 
			reject('Error');
		});
	}

    const fetchApiPermission = async ()=>{
		let result
		result = await Result.getDetailPermissionAdmin(id)
		return result
	}
    const permissionDetail = dataPermission.map(value => value.permissionDetail)

    const filteredIds = permissionDetail.filter(id => data.includes(id))
    
    console.log(...dataPermission);
    const handleCheckboxChange = (e) => {
        console.log(e.target.checked);
    }
    return ( 
        <div className={cx('wrapper')}>
        <ToastContainer/>
        <div className={cx('inner')}>
            <div className={cx('name-page')}>Quản lý tài khoản - Loại quyền</div>
            <div className={cx('frame-container')}>
                <div className={cx('frame-desc')}>
                    <div className={cx('text')}>Phân quyền</div>
                </div>
                <table className={cx('table')}>
                    <thead className={cx('table-header')}>
                        <tr className={cx('table-header-row')}>
                            <th className={cx('table-header-cell')}>Chức năng</th>
                            <th className={cx('table-header-cell')}>Lựa chọn</th>
                        </tr>
                    </thead>  
                        <tbody>
                        {dataPermission.length > 0 && (
                            data.map(valueData => (
                                <tr key={valueData.id} className={cx('table-inner-row')}>
                                    <td className={cx('table-inner-row-content')}>{valueData.nameList}</td>
                                    <td className={cx('table-inner-row-content')}>
                                    <input 
                type='checkbox' 
                value={valueData.id}
                checked={dataPermission[0].permissionDetail ? 
                    dataPermission[0].permissionDetail.some(permissionValue => permissionValue.id === valueData.id )
                    : false}
                
                onChange={(e) => handleCheckboxChange(e)}
            />
                                    </td>
                                </tr>
                            ))
                        )}
                      </tbody>  
                </table>
                <div className={cx('btn-container')}>
					<button className={cx('btn-submit')}>Cập nhật</button>
				</div>
            </div>
        </div>
    </div>
    );
}

export default Decentralization;