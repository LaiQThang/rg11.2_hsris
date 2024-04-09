import * as request from '~/utils/requests'

export const postAddStudent = async(code, name,className, status,birthday, phone, email, sex, address, password, idCard, tokenBearer )=>{
    try{
        const array = {
            code: code,
            name: name,
            className: className,
            status: status,
            birthday: birthday,
            phone: phone,
            email: email,
            sex: sex,
            address: address,
            passWord: password,
            idCard : idCard,
            permissionId: "7fb1b312-1841-45ef-8f82-c572a08b2410",
        }
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization':` Bearer ${tokenBearer}`
            },
        }
        const res = await request.post('/v1/students', array,header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}

export const postAddListStudent = async(data, tokenBearer )=>{
    try{

        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization':` Bearer ${tokenBearer}`
            },
        }
        const res = await request.post('/v1/students/bulk', data,header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}

export const postAddTeacher = async(code, name,birthday, phone, email, sex, address, password, tokenBearer )=>{
    try{
        const array = {
            code: code,
            name: name,
            birthday: birthday,
            phone: phone,
            email: email,
            sex: sex,
            address: address,
            passWord: password,
            permissionId: "d289c64a-176f-45e0-aa48-49f1fdb8d965",
        }
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization':` Bearer ${tokenBearer}`
            },
        }
        const res = await request.post('/v1/infoTeacher/add', array,header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}
export const postAddListTeacher = async(data, tokenBearer )=>{
    try{
        
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization':` Bearer ${tokenBearer}`
            },
        }
        const res = await request.post('/v1/infoTeacher/addbulk', data,header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}
export const getPermissionAdmin = async()=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                    //'Authorization': `Bearer ${tokenBearer}`
            },

        }
        const res = await request.get('/v1/permissionadmin',header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}

export const getListPermissionAdmin = async()=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                    //'Authorization': `Bearer ${tokenBearer}`
            },

        }
        const res = await request.get('/v1/permissionadmin/list',header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}

export const getDetailPermissionAdmin = async(id)=>{
    try{

        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                    //'Authorization': `Bearer ${tokenBearer}`
            },
            params:{
                id:id,
            }

        }
        const res = await request.get('/v1/permissionadmin/detail',header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}
export const postUpdatePermission = async(id,namePermission,permissionDetail,tokenBearer )=>{
    try{
        const array = {
            id: id,
            namePermission: namePermission,
            permissionDetail: permissionDetail
        }
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization':` Bearer ${tokenBearer}`
            },
        }
        const res = await request.post('/permissionadmin/edit', array,header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}