import { ACTIONS } from '../types';

export const isAction = (action: any) => ACTIONS.includes(action);
