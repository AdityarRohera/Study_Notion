import axios from "axios";

interface ApiRequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  bodyData?: any;
  headers?: Record<string, string>;
  params?: any;
  id?: string | number;
}

export const apiConnector = ({method , url , bodyData , headers , params , id} : ApiRequestConfig) => {
             
        return axios({
        method : `${method}`,
        url : `${id? (url + '/' + id) : url}`,
        data : bodyData ? bodyData : undefined,
        headers : headers ? headers : undefined,
        params : params ? params : undefined
      })
}