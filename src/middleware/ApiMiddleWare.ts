
import { Middleware } from 'redux';
import Api, { API_REQUEST, ApiAction } from 'api';

const ApiMiddleWare: Middleware = (store) => (next) => (action: ApiAction) => {
    console.group('ApiMiddleWare');
    console.log('store:', store);
    console.log('action:', action);
    console.groupEnd();

    if (action.type !== API_REQUEST) {
        next(action);
    }

    const [Request, Response, Failure] = action.requestData.type;

    next({
        type: Request,
        payload: action.requestData.payload,
    })

    Api({
        url: 'https://xkcd.com/info.0.json'
    }).then((response) => {
        console.log('response:', response);
        next({
            type: 'COMICS_SUCCESS',
            // response: action.requestData.type
            response: action.requestData.payload
        })
    })
    // setTimeout(() => {
    //     next({
    //         type: 'COMICS_SUCCESS',
    //         // response: action.requestData.type
    //         response: action.requestData.payload
    //     })
    // }, 2500)
    // return next(action);
}

export default ApiMiddleWare;