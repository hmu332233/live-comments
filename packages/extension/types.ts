export const ACTIONS = [
  'INIT_MAIN',
  'EXIT_MAIN',
  'LOGIN',
  'ADD_COMMENT',
  'UPDATE_COMMENT',
  'VALIDATE_CODE',
  'MOVE_PAGE',
] as const;
export type ActionName = typeof ACTIONS[number];
export type ControllerProps = {
  payload: any;
  sender: chrome.runtime.MessageSender;
  sendResponse: (response?: any) => void;
};
export type ControllerFunc = (props: ControllerProps) => Promise<void>;
export type ControllerFuncMap = {
  [key in ActionName]: ControllerFunc;
};
