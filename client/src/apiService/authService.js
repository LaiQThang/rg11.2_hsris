import * as request from '~/utils/requests'
export const login = async (username, password) => {
    try {
        const user = {
            email: username,
            password: password
        };
        const header = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const res = await request.post('/auth/login', user, header);
        return res.data;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const profileStudent = async (username,tokenBearer) => {
    try {
        const user = {
            email: username,
        };
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            }
        }
        const res = await request.post('/auth/profile-me', user, header);
        return res.data;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const updateProfileStudent = async (username,tokenBearer) => {
    try {
        const user = {
            email: username,
        };
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            }
        }
        const res = await request.post('/auth/update-profile', user, header,);
        return res.data;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const detailTopic = async (tokenBearer,id) => {
    try {
        const config= {
            
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            },
        }
        const res = await request.get(`/v1/detai/${id}`,config);
        return res.data;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const permission = async (id,tokenBearer) => {
    try {
        const config= {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            },
        }
        const res = await request.get(`/v1/permission/${id}`,config);
        return res.data;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const updateResearch = async (data) => {
    try {
        
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${tokenBearer}`
            }
        }
        const res = await request.post('/v1/huongnghiencuu', data, header);
        return res;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const registerTopicConfirm = async (id,tokenBearer) => {
    try {
        const data ={
            idDT: id
        }
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            }
        }
        const res = await request.post('/v1/ct-detai', data, header);
        return res;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const updateNewTopic = async(data,tokenBearer) =>{
    try {
        
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            }
        }
        const res = await request.post('/v1/detai', data, header);
        return res;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
}
export const AddTopic = async(data,tokenBearer) =>{
    try {
        
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            }
        }
        const res = await request.post('/v1/detai-giangvien', data, header);
        return res;
    } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
}
export const getResearch = async(year)=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${tokenBearer}`
            },
            params:{
                year: year,
            }
        }
        const res = await request.get('/v1/huongnghiencuu',header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}
export const getTopicTeacher = async(year,tokenBearer)=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            },
            params:{
                year: year,
            }
        }
        const res = await request.get('/v1/detai-giangvien-xetduyet',header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}
export const registerTopic = async (tokenBearer,year) => {
    try {
        const config= {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenBearer}`
        },
        params:{
            year: year,
        }
    }
    const res = await request.get('/v1/detai',config);
    return res.data;
    }
    catch (error)
    {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const browseTopic = async (tokenBearer,id) => {
    try {
        const config= {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenBearer}`
        },
    }
    const data = {
        idDT: id
    }
    const res = await request.post('/v1/detai-giangvien-xetduyet-post',data,config);
    return res.data;
    }
    catch (error)
    {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const browseTopicAdmin = async (id) => {
    try {
        const config= {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': `Bearer ${tokenBearer}`
        },
    }
    const data = {
        idDT: id
    }
    const res = await request.post('/v1/xet-duyet/update',data,config);
    return res.data;
    }
    catch (error)
    {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const reportStudent = async (formData,tokenBearer) => {
    try {
        const config= {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${tokenBearer}`
        },
    }
    const res = await request.post('/v1/ct-baocaosinhvien',formData,config);
    return res.data;
    }
    catch (error)
    {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const reportTeacher = async (data,tokenBearer) => {
    try {
        const config= {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${tokenBearer}`
        },
    }
    const res = await request.post('/v1/nhanxet',data,config);
    return res.data;
    }
    catch (error)
    {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const createScoreCard = async (data,tokenBearer) => {
    try {
        const config= {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenBearer}`
        },
    }
    const res = await request.post('/v1/hoidong/point',data,config);
    return res.data;
    }
    catch (error)
    {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const updateScore = async (data,tokenBearer) => {
    try {
        const config= {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenBearer}`
        },
    }
    const res = await request.post('v1/giaithuong/capnhatdiem',data,config);
    return res.data;
    }
    catch (error)
    {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const updateAward = async (data,tokenBearer) => {
    try {
        const config= {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenBearer}`
        },
    }
    const res = await request.post('v1/giaithuong',data,config);
    return res.data;
    }
    catch (error)
    {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
export const getNameTeacher = async()=>{
    try{
        const config ={
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        const res = await request.get('/v1/giangvien',config)
        return res.data
    }
    catch(e){
        console.log('Đã xãy ra lỗi khi lấy dữ liệu',e)
    }
}
// thang
export const getAllHNC = async(year, tokenBearer)=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            },
            params:{
                y: year,
            }
        }
        const res = await request.get('/v1/ct-huongnghiencuu',header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}

export const postTopicGroup = async(data, tokenBearer )=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization': `Bearer ${tokenBearer}`
            },
        }
        const res = await request.get('/v1/bienbanphancong', data,header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}
export const getTopicAdmin = async(year,id)=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //  'Authorization': `Bearer ${tokenBearer}`
            },
            params:{
                y:year,
                i:id
            }
        }
        const res = await request.get('/v1/xet-duyet/list', header)
        return res.data
    }
    catch(e){
        console.log('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}
export const getProgressTopic = async(year,tokenBearer)=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            },
            params:{
                year:year,
            }
        }
        const res = await request.get('/v1/baocaodetai', header)
        return res.data
    }
    catch(e){
        console.log('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}
export const getTrackProgress = async(year,tokenBearer)=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            },
            params:{
                y:year,
            }
        }
        const res = await request.get('/v1/nhanxet/view', header)
        return res.data
    }
    catch(e){
        console.log('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}
export const getViewPoint = async(year,tokenBearer)=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            },
            params:{
                y:year,
            }
        }
        const res = await request.get('/v1/hoidong/view-point', header)
        return res.data
    }
    catch(e){
        console.log('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}
export const getPointAdmin = async(year,tokenBearer)=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            },
            params:{
                y:year,
            }
        }
        const res = await request.get('/v1/giaithuong/tinhdiem', header)
        return res.data
    }
    catch(e){
        console.log('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}
export const getAward = async(tokenBearer)=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${tokenBearer}`
            },
        }
        const res = await request.get('/v1/giaithuong/list', header)
        return res.data
    }
    catch(e){
        console.log('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}