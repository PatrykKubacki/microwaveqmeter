type methodType = 'POST' | 'GET';

type requestOptions = {
    url: string;
    method: methodType;
    body?: string;
}

export const createRequestObject = (method: methodType, url: string, body?: string): requestOptions => {
    const request: requestOptions = {
        url: url,
        method: method,
        body: body,
    };
    return request;
}

export const apiCall = (request: requestOptions) => {
    const options = {
        method: request.method,
        headers: { 'Content-Type': 'application/json' },
        body: request.body
    }
    fetch(request.url, options)
        .catch((error) => {
            console.error('Error:', error);
        });
}

