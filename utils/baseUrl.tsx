import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  isCancel,
} from "axios";

// const baseUrl = "http://localhost:3000/v1/api";

const baseUrl = "https://api.supersconto24.com/v1/api";

type AxiosRequestType = { url: string; data?: any; method?: string };
export const axiosRequest = () => {
  let cancelTokenSource: CancelTokenSource;

  return async ({ url, data = null, method = "get" }: AxiosRequestType) => {
    // Check if a previous request was made
    if (cancelTokenSource) {
      // Cancel the previous request before making a new one
      cancelTokenSource.cancel("Request canceled due to a new request.");
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
        console.log("Request canceled:", error.message);
      } else {
        // Handle other errors
        console.log("Something went wrong:", error.message);
      }
    }
  };
};

export function updateParamValue(data: any) {
  const params =
    window.location.href.indexOf("?") !== -1
      ? window.location.href
          .slice(window.location.href.indexOf("?") + 1)
          .split("&")
      : [];

  const updatedParams = [...params];

  data.forEach((item: any) => {
    const { key, value } = item;
    const paramIndex = updatedParams.findIndex((param) =>
      param.startsWith(`${key}=`)
    );

    if (paramIndex !== -1) {
      updatedParams[paramIndex] = `${key}=${value}`;
    } else {
      updatedParams.push(`${key}=${value}`);
    }
  });

  return `${window.location.pathname}?${updatedParams.join("&")}`;
}

export const setCookie = (c_name: string, c_value: string, exDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() + exDays);
  document.cookie = encodeURIComponent(c_name)
      + "=" + encodeURIComponent(c_value)
      + (!exDays ? "" : "; expires=" + date.toUTCString()) + "path=/;";
}
export default baseUrl;
