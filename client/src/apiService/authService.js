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


