type sendMessageProps = {
  action: string;
  payload: any;
};
export const sendMessageToPage = ({ action, payload }: sendMessageProps) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0]?.id;
    if (!tabId) {
      return;
    }
    chrome.tabs.sendMessage(tabId, { action, payload });
  });
};
