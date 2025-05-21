{
    "message": "Request failed with status code 404",
    "name": "AxiosError",
    "stack": "AxiosError: Request failed with status code 404\n    at settle (http://localhost:5173/node_modules/.vite/deps/axios.js?v=40b2fe45:1235:12)\n    at XMLHttpRequest.onloadend (http://localhost:5173/node_modules/.vite/deps/axios.js?v=40b2fe45:1566:7)\n    at Axios.request (http://localhost:5173/node_modules/.vite/deps/axios.js?v=40b2fe45:2124:41)",
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http",
            "fetch"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpYXQiOjE3NDE4MDM2NTMsImV4cCI6MTc0MTg5MDA1M30.d1Y78dcj9imxOditNa0QN9knlpZTEpsY5yxcIYHIcl4"
        },
        "baseURL": "http://localhost:3000",
        "method": "post",
        "url": "/users/login",
        "data": "{\"email\":\"test@mail.co\",\"password\":\"test\"}"
    },
    "code": "ERR_BAD_REQUEST",
    "status": 404
}