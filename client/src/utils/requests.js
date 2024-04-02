import axios from 'axios';

const request = axios.create({
     baseURL: 'http://127.0.0.1:8000/api',
    // baseURL: 'process.env.REACT_APP_BASE_URL',
    //baseURL: 'https://dlyn.id.vn/api',
    
    
});

export const post = async (baseurl, children, header) => {
    const res = await request.post(baseurl, children, header);
    return res;
};
export const get = async (baseurl,config) => {
    const res = await request.get(baseurl, config);
    return res;
};


export default request;
