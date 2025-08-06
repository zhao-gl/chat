// 封装一个fetch请求
import {httpCustomerOption} from "@/types/api";

const baseURL = undefined; // 使用代理就不使用baseURL
// const baseURL = "http://127.0.0.1:3000";

/**
 * GET 请求
 * @param url
 * @param params
 * @param options 使用者传递过来的参数, 用于以后的扩展用户自定义的行为
 * @returns {Promise}
 */
const get = async function (url: string, params = {}, options: httpCustomerOption): Promise<object> {
    console.log("httpCustomerOption", options)
    const method = "GET"
    // 构建查询字符串
    const queryString = new URLSearchParams(params).toString();
    let fetchUrl = queryString ? `${url}?${queryString}` : url;
    if(baseURL) fetchUrl = baseURL + fetchUrl;
    // 构建请求参数
    const headers = {
        'Content-Type': 'application/json',
        // 如果有自定义头部则合并
        ...(options.customHead || {})
    };
    const fetchParams: RequestInit = {
        method,
        headers,
    }
    // 如果设置了超时
    if (options.timeout) {
        const controller = new AbortController();
        fetchParams.signal = controller.signal;
        setTimeout(() => controller.abort(), options.timeout);
    }
    // 显示loading（如果需要）
    if (options.isShowLoading) {
        // 这里可以调用显示loading的方法
        console.log('显示loading');
    }
    try {
        const response = await fetch(fetchUrl, fetchParams);
        // 隐藏loading
        if (options.isShowLoading) {
            console.log('隐藏loading');
        }
        // 处理响应
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        // 隐藏loading
        if (options.isShowLoading) {
            console.log('隐藏loading');
        }
        // 处理错误
        if (options.isHandleResult) {
            console.error('请求失败:', error);
            throw error;
        } else {
            throw error;
        }
    }
}

/**
 * POST 请求
 * @param url
 * @param data
 * @param options 使用者传递过来的参数, 用于以后的扩展用户自定义的行为
 * @returns {Promise}
 */
const post = async function (url: string, data = {}, options: httpCustomerOption): Promise<object> {
    console.log("httpCustomerOption", options)
    const method = "POST"
    if(baseURL) url = baseURL + url;
    // 构建请求头
    const headers = {
        'Content-Type': 'application/json',
        // 如果有自定义头部则合并
        ...(options.customHead || {})
    };
    // 构建请求参数
    const fetchParams: RequestInit = {
        method,
        headers,
        body: JSON.stringify(data),
    }
    // 如果设置了超时
    if (options.timeout) {
        const controller = new AbortController();
        fetchParams.signal = controller.signal;
        setTimeout(() => controller.abort(), options.timeout);
    }
    // 显示loading（如果需要）
    if (options.isShowLoading) {
        // 这里可以调用显示loading的方法
        console.log('显示loading');
    }
    try {
        const response = await fetch(url, fetchParams);
        // 隐藏loading
        if (options.isShowLoading) {
            console.log('隐藏loading');
        }
        // 处理响应
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        // 隐藏loading
        if (options.isShowLoading) {
            console.log('隐藏loading');
        }
        // 处理错误
        if (options.isHandleResult) {
            console.error('请求失败:', error);
            throw error;
        } else {
            throw error;
        }
    }
}

export {get,post}