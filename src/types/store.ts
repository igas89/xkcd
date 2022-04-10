import { Action } from 'redux';
import { rootReducer } from 'store';

export type ActionType = string | undefined | null;
export type ActionDispatch = { type: string; };
export type RootState = ReturnType<typeof rootReducer>;

export interface ActionTypes<Payload, Response> extends Action<string> {
  payload?: Payload;
  response?: Response;
  error?: ActionError;
}

export interface InitialState<Request, Response> {
  action: ActionType;
  error: ActionError;
  requestData: Request;
  responseData: Response;
}

export interface ActionError {
  message: string | null;
}