type methodType = 'POST' | 'GET';

type requestOptions = {
    url: string;
    method: methodType;
    body?: string;
    payload?: (respone: object) => void;
}

export const createRequestObject = (method: methodType, url: string, body?: string, payload?: (respone: object) => void): requestOptions => {
    const request: requestOptions = {
        url: url,
        method: method,
        body: body,
        payload: payload
    };
    return request;
}

export const apiCall = async(request: requestOptions) => {
    const options = {
        method: request.method,
        headers: { 'Content-Type': 'application/json' },
        body: request.body,
    }

    const rawResponse = await fetch(request.url, options)
         .then(response => response.json())
        // .then(data => request.payload(data))
        //.then(data => console.log(data))
        // .then(data => callBack !== undefined ? callBack() : null)
        .catch((error) => {
            console.error('Error:', error);
        });

    if(request.payload) {
        request.payload(rawResponse)
    }

}

