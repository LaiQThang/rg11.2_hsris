/* eslint-disable react-hooks/rules-of-hooks */
import Styles from "./detailStudent.module.scss"
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { showToast } from "~/Components/ToastMessage/Toast";
import * as Result from '~/apiService/authService'
import { useAuth } from '~/Components/Auth'
import images from "~/assets/images";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
const cx = classNames.bind(Styles)
function detailStudent() {
    const {id} = useParams()
    const [data,setData] = useState({code: '',
	name: '',
	className: '',
	birthday: '',
	sex: '',
	status: '',
	idCard: '',
	email: '',
	address: '',
	phone: '',
	permissionId: ''})
	const [dataTopic,setDataTopic] = useState([])
	const [permission,setPermission] = useState([])
	const auth = useAuth()
	const username = auth.getEmails()
	const tokenBearer = auth.getTokens()
	const {register,handleSubmit} = useForm()
	const handlePermissionChange = (event) => {
        const { value } = event.target;
        setData({ ...data, permissionId: value });
    };
	const handleInputChange = (event) => {
        const { name, value } = event.target;
		const newData = ({ ...data });
		if (name === 'class') {
            newData.className = value; // Đổi tên lớp thành className
            delete newData.class; // Xóa trường class
        }
		else {
			newData[name] = value;
		}
		setData(newData)
    };
	const handleUpdate = ()=>{
		const { passWord, ...dataWithoutPassword } = data;
    	console.log(dataWithoutPassword);
		let result = Result.updateProfileStudent(dataWithoutPassword)
		if(result){
			showToast('success','Cập nhật thông tin thành công')
		}
		else{
			showToast('error','Cập nhật thông tin thất bại')
		}
	}
    useEffect(()=>{
        fetchApi().then((res)=>{
			setData(res.student)
			setDataTopic(res.topic.data)
		})
		fetchApiPermission().then((res)=>{
			setPermission(res.data)
		})
    },[])
	const fetchApi = async ()=>{
       let result = Result.getDetailStudent(id)
	   return result
    }
	const fetchApiPermission = async()=>{
		let result = Result.getAllPermissionadmin()
		return result
	}
	return (
		<div className={cx('container')}>
			<ToastContainer/>
			<div className={cx('table')}>
				<div className ={cx('header')}>Quản lý sinh viên - Thông tin sinh viên</div>
				<div className={cx('line')}></div>
				<div className={cx('id')}> Thông tin sinh viên </div>
				{data && (<div className={cx('content-table')} key ={data.id}>
							<div className={cx('information')}>
								<div className={cx('info-left')}>
									<div htmlFor = "code" className={cx('text',)}>Mã sinh viên</div>
									<input type="text" name="name" className={cx('disabled')} value={data.code} disabled/>
									<div htmlFor="name" className={cx('text')}>Họ tên</div>
									<input type="text" name="name" className={cx('')} value={data.name}  onChange={e=>handleInputChange(e)}/>
									<div className={cx('text')}>Lớp hành chính</div>
									<input type="text" name="className" className={cx('')} value={data.className}  onChange={handleInputChange} />
									<div className={cx('text')}>Ngày sinh</div>
									<input type="text" name="birthday" className={cx('')} value={data.birthday} onChange={handleInputChange}/>
									<div className={cx('text')}>Giới tính</div>
									<input type="text" name="sex" className={cx('')} value={data.sex === '0' ? 'Nam' : 'Nữ'} onChange={handleInputChange} disabled/>
                                    <div className={cx('text')} >Mật khẩu</div>
									<input type="text" name="passWord" className={cx('')} value={data.passWord} onChange={handleInputChange}/>
								</div>
								<div className={cx('info-right')}>
									<div className={cx('text')} >Tình trạng</div>
									<input type="text" name="status" className={cx('')} value={data.status} onChange={handleInputChange} disabled/>
									<div className={cx('text')}>Căn cước công dân</div>
									<input type="text" name="idCard" value={data.idCard}  onChange={handleInputChange}disabled/>
									<div className={cx('text')} >Email</div>
									<input type="text" name="email" className={cx('')} value={data.email} onChange={handleInputChange}/>
									<div className={cx('text')}>Địa chỉ</div>
									<input type="text" name="address" value={data.address}  onChange={handleInputChange}/>
									<div className={cx('text')}>Số điện thoại</div>
									<input type="text" name="phone" value={data.phone}  onChange={handleInputChange}/>
									<select className={cx('option-permisstion')} onChange={handlePermissionChange} >
										<option>--Chọn quyền--</option>
										{permission.map(data=>(<option key={data.id} value ={data.id}>{data.namePermission}</option>))}
									</select>
                                    <div className={cx('update')}>
                                        <button className={cx('btn-update')} onClick = {handleUpdate}>Cập nhật</button>
                                    </div>
								</div>
							</div>
							<div className={cx('text-name')}>Đề tài đã thực hiện</div>
							{dataTopic.length > 0 ? (<div className={cx('content')}>
							<table className={cx('table')}>
							<thead className={cx('table-header')}>
								<tr className={cx('table-header-row')}>
									<th className={cx('table-header-cell')}>STT</th>
									<th className={cx('table-header-cell')}>Tên đề tài</th>
									<th className={cx('table-header-cell')}>Thời gian</th>
									<th className={cx('table-header-cell')}>Hướng nghiên cứu</th>
                                    <th className={cx('table-header-cell')}>Đạt giải</th>
								</tr>
							</thead>
							<tbody>
								{dataTopic.map((data,index)=>(
									<tr className={cx('table-inner-row')} key ={index}>
										<td className={cx('table-inner-row-content')}>
										{index + 1}
										</td>
										<td className={cx('table-inner-row-content')}><div className={cx('name-topic')}>{data.name}</div></td>
										<td className={cx('table-inner-row-content')}>
										<div className={cx('name-topic')}>{data.dateCreate}</div>
										</td>
										<td className={cx('table-inner-row-content')}>
										
										{data.hnc.name}
										</td>
                                        <td className={cx('table-inner-row-content')}>
										
										<div>{data.cup.name ? data.cup.name : 'Chưa đạt giải'}</div>
										</td>
								</tr>
									
								))}
							</tbody>
						</table>
							</div>): (<div style={{textAlign:'center',padding:'50px',color:'red'}}>Chưa tham gia đề tài nào</div>)}
						</div>)}
			</div>
		</div>
	);
}

export default detailStudent;
