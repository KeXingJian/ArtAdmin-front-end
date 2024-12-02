import axios from 'axios';
import router from '@/router'; // 引入Vue Router实例
const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // 你的API基础URL
    headers: {
        'Content-Type': 'application/json',
    }
});


// 请求拦截器，用于在每个请求中添加JWT令牌
apiClient.interceptors.request.use(config => {

    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        config.headers['token'] = token;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 添加响应拦截器
apiClient.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        return response;
    },
    error => {

        if (error.response && error.response.status === 406) {
            if (router.currentRoute.name !== 'loginPage') {
                localStorage.removeItem('token');
                alert("认证过期请重新登录")
                console.log('认证过期请重新登录');
                router.replace('/loginPage');
            }

        } else if ((error.response && error.response.status === 403)) {
            alert("权限不足")
            console.error('权限不足');
        } else if (error.response && error.response.status === 404) {
            console.log('非法请求');

            router.replace('/loginPage');

        }
        return Promise.reject(error);
    }
);

//video
export const editVideo = async (formData) => {
    try {
        const response = await apiClient.put('/video/editVideo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const changeVideoStatus = async (input) => {
    try {
        const response = await apiClient.put('/video/changeStatus', input);
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const searchVideo = async (uuid) => {
    try {
        const response = await apiClient.get(`/video/getByUuid/${uuid}`);
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const getUserVideos = async (index, size) => {
    try {
        const response = await apiClient.get(`/video/userList/${index}/${size}`);
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const playUserVideo = async (uuid, rangeHeader) => {
    try {
        return await apiClient.get(`/video/playUserVideo/${uuid}`,
            {
                responseType: 'blob', // 设置响应类型为blob
                headers: {
                    'Range': rangeHeader || 'bytes=0-', // 初始请求范围
                }
            });
    } catch (error) {
        console.log('请求错误');
    }
};

export const searchVideoByUser = async (uuid) => {
    try {
        const response = await apiClient.get(`/video/searchByUser/${uuid}`);
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const getVideosByLabel = async (index, size, labels) => {
    try {
        const response = await apiClient.post(`/video/searchByLabel/${index}/${size}`, labels);
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const playVideo = async (uuid, rangeHeader) => {
    try {
        return await apiClient.get(`/video/playVideo/${uuid}`,
            {
                responseType: 'blob', // 设置响应类型为blob
                headers: {
                    'Range': rangeHeader || 'bytes=0-', // 初始请求范围
                }

            });
    } catch (error) {
        console.log('请求错误');
    }
};

export const getAdminVideos = async (index, size, value) => {
    try {
        const response = await apiClient.get(`/video/getByStatus/${index}/${size}/${value}`);
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const loading = async () => {
    try {
        const response = await apiClient.get('/video/loading');
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};
//Artist
export const getArtists = async (index, size) => {
    try {
        const response = await apiClient.get(`/artist/getList/${index}/${size}`);
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const addArtist = async (formData) => {
    try {
        const response = await apiClient.post('/artist/addArtist', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const updateArtist = async (formData) => {
    try {
        const response = await apiClient.put('/artist/updateArtist', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const deleteArtist = async (artistId, path) => {
    try {
        const response =
            await apiClient.delete(`/artist/deleteArtist/${artistId}/${path}`)

        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const getAristSelect = async () => {
    try {
        const response = await apiClient.get('/artist/getSelect');
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

//Dictionary
export const getDictionaries = async () => {
    try {
        const response = await apiClient.get('/dictionary/getList');
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const getDictionaryTree = async () => {
    try {
        const response = await apiClient.get('/dictionary/getTree');
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

//Collection

export const getCollections = async () => {
    try {
        const response = await apiClient.get("/collection/getCollections");
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const addCollection = async (formData) => {
    try {
        const response = await apiClient.post('/collection/adminAddCollection', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const updateCollection = async (formData) => {
    try {
        const response = await apiClient.put('/collection/adminUpdateCollection', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const addVideoCollection = async (video) => {
    try {
        const response = await apiClient.put('/collection/addVideo', video, {});
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const deleteCollection = async (id) => {
    try {
        const response = await apiClient.delete(`/collection/delete/${id}`,);
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const deleteVideoCollection = async (id, uuid) => {
    try {
        const response = await apiClient.delete(`/collection/deleteVideo/${id}/${uuid}`);
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const getArtistCollections = async (page) => {
    try {
        const response = await apiClient.post('/artist/getArtistCollection', page)
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const getPublicCollection = async () => {
    try {
        const response = await apiClient.get('/collection/publicCollections')
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const upsertCollection = async (user) => {
    try {
        const response = await apiClient.post('/collection/upsertByUser', user)
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

//login
export const login = async (user) => {
    try {
        const response = await apiClient.post('/login', user)
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const logout = async () => {
    try {
        const response = await apiClient.get('/logout')
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const register = async (user, token) => {
    try {
        const response = await apiClient.post(`/register/${token}`, user)
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

//artUser
export const getSimpleUserInfo = async (account) => {
    try {
        const response = await apiClient.get(`/artUser/simpleUserInfo/${account}`)
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const getUserInfo = async (account) => {
    try {
        const response = await apiClient.get(`/artUser/userInfo/${account}`)
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const updateUser = async (formData) => {
    try {
        const response = await apiClient.put('/artUser/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const getUsers = async () => {
    try {
        const response = await apiClient.get('/artUser/getUsers', {

        });
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const changeLockUser = async (account) => {
    try {
        const response = await apiClient.get(`/artUser/changeLockUser/${account}`, {

        });
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const getCollectionSelect = async (account) => {
    try {
        const response = await apiClient.get(`/artUser/getCollectionSelect/${account}`, {

        });
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};

export const addVideoToCollection = async (input) => {
    try {
        const response = await apiClient.put('/artUser/addVideoToCollection',input)
        return response.data;
    } catch (error) {
        console.log('请求错误');
    }
};