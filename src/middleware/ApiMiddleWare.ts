
import { AxiosError } from 'axios';
import { Middleware } from 'redux';

import Api, { API_REQUEST, apiAction } from 'api';
import { RootState } from 'store';

import { ApiResponseError } from 'interfaces/api';

const ApiMiddleWare: Middleware<{}, RootState> = (_store) => {
  const makeAction = (type: string, payload?: unknown) => ({
    type,
    payload,
  });

  return (next) => async (action: ReturnType<typeof apiAction>) => {
    if (action.type !== API_REQUEST) {
      return next(action);
    }

    const { types, payload, ...config } = action.payload;
    const [RequestAction, ResponseAction, FailureAction] = types;

    next(makeAction(RequestAction, payload));

    try {
      const response = await Api(config);
      return next(makeAction(ResponseAction, response));
    } catch (error) {
      const { response } = error as AxiosError;
      const errorMessage = response?.data.message
        || response?.data.errorMessage
        || 'Произошла ошибка в запросе';

      const errorPayload: ApiResponseError = {
        code: response?.data.code || 400,
        status: response?.status?.toString() || 'fail',
        message: errorMessage,
      };

      return next(makeAction(FailureAction, errorPayload));
    }
  };
};

export default ApiMiddleWare;