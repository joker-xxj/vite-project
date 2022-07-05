// * 请求响应参数(不包含data)
export interface Result {
    code: string;
    msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
    data?: T;
}

export namespace Asset {
    export interface ReqForm {
        lastTime: string;
        productId: string;
        projectId: string;
        type: string;
    }
}
