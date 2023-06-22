import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource, Canceler, isCancel } from 'axios';


// const baseUrl = "http://localhost:3000/v1/api";


const baseUrl = 'https://api.supersconto24.com/v1/api'


type AxiosRequestType = { url: string; data?: any; method?: string }
export const axiosRequest = () => {
    let cancelTokenSource: CancelTokenSource;

    return async ({ url, data = null, method = 'get' }: AxiosRequestType) => {
        // Check if a previous request was made
        if (cancelTokenSource) {
            // Cancel the previous request before making a new one
            cancelTokenSource.cancel('Request canceled due to a new request.');
        }

        // Create a new CancelToken
        cancelTokenSource = axios.CancelToken.source();

        try {
            const config: AxiosRequestConfig = {
                url,
                method,
                data,
                cancelToken: cancelTokenSource.token,
            };

            const response: AxiosResponse<any> = await axios.request(config);
            return response.data;
        } catch (error: any) {
            if (isCancel(error)) {
                // Handle if the request was canceled
                console.log('Request canceled:', error.message);
            } else {
                // Handle other errors
                console.log('Something went wrong:', error.message);
            }
        }
    };
};

export default baseUrl;
