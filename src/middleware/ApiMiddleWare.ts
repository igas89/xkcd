
import { AxiosRequestConfig } from 'axios';
import { Middleware } from 'redux';

import Api, { API_REQUEST } from 'api';
import { ApiAction } from 'types/api';
import { ComicsData } from 'reducers/comicsReducer';

const ApiMiddleWare: Middleware = (store) => (next) => (action: ApiAction<AxiosRequestConfig>) => {
    if (action.type !== API_REQUEST) {
        return next(action);
    }

    const { type, payload } = action.requestData;
    const [Request, Response, Failure] = type;

    next({ type: Request, payload });

    Api<ComicsData>(payload)
        .then((response) => {
            next({
                type: Response,
                response: response
            })
        })
        .catch(error => {
            next({
                type: Failure,
                error: error,
            })
        })
}

export default ApiMiddleWare;