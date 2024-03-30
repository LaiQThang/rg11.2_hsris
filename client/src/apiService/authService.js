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
export const permission = async (id) => {
    try {
        const config= {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${tokenBearer}`
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

export const postDetailReseach = async (idHNC, idSV) => {
    try {
        const array = {
            idHNC: idHNC,
            idSV: idSV,
        }
        const config= {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            //'Authorization': `Bearer ${tokenBearer}`
        }
    }
    const res = await request.post('/v1/hncsinhvien', array,config);
    return res;
    }
    catch (error)
    {
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản:', error);
    }
};
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

export const postTopicGroup = async(name, note, contents, listStudents,HNC, tokenBearer )=>{
    try{
        const array = {
            name: name,
            note: note,
            contents: contents,
            students: listStudents,
            HNC: HNC,

        }
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization':` Bearer ${tokenBearer}`
            },
        }
        const res = await request.post('/v1/bienbanphancong', array,header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}

export const getSetupProgress = async(year, tokenBearer)=>{
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
        const res = await request.get('/v1/baocaodetai-listnhom',header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}

export const postSetupProgress = async(idDT, idBB,timeArray, tokenBearer )=>{
    try{
        const array = {
            idDT: idDT,
            idBB: idBB,
            timeArray: timeArray
        }
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization':` Bearer ${tokenBearer}`
            },
        }
        const res = await request.post('/v1/baocaodetai', array,header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}

export const getAllTeacher = async()=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //'Authorization': `Bearer ${tokenBearer}`
            },

        }
        const res = await request.get('/v1/giangvien',header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}

export const getTopicNoCouncil = async(year)=>{
    try{
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //'Authorization': `Bearer ${tokenBearer}`
            },
            params:{
                y: year,
            }

        }
        const res = await request.get('/v1/hoidong/list-no-council',header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}

export const postAddCouoncil = async(tenHD, ngayCham,diaDiem, ghiChu,topicArr, teacherArr, tokenBearer )=>{
    try{
        const array = {
            tenHD: tenHD,
            ngayCham: ngayCham,
            diaDiem: diaDiem,
            ghiChu: ghiChu,
            topicArr: topicArr,
            teacherArr: teacherArr,
        }
        const header = {

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                 'Authorization':` Bearer ${tokenBearer}`
            },
        }
        const res = await request.post('/v1/hoidong', array,header)
        return res.data
    }
    catch(e){
        console.error('Đã xảy ra lỗi khi lấy dữ liệu tài khoản', e)
    }
}