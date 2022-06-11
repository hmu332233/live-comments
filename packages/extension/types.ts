export const ACTIONS = [
  'INIT_MAIN',
  'EXIT_MAIN',
  'LOGIN',
  'ADD_COMMENT',
  'UPDATE_COMMENT',
] as const;
export type ActionName = typeof ACTIONS[number];
export type ControllerProps = {
  payload: any;
  sendResponse?: (response?: any) => void;
};
export type ControllerFunc = (props: ControllerProps) => Promise<void>;
export type ControllerFuncMap = {
  [key in ActionName]: ControllerFunc;
};
