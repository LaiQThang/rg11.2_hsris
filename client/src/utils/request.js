import axios from 'axios';

const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api',
});
const requestTiktok = axios.create({
    baseURL: 'https://www.tiktok.com/api',
});
export const get = async (baseurl, options = {}) => {
    const res = await request.get(baseurl, options);
    return res.data;
};
export const getTiktok = async (baseurl, options = {}) => {
    const res = await requestTiktok.get(baseurl, options);
    return res.data;
};

export default request;
// api
// https://www.tiktok.com/api/search/general/preview/?keyword=ca
