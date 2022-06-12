import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

type Props = {};
function Code({}: Props) {
  let { code } = useParams();

  useEffect(() => {
    const extensionId = process.env.EXTENSION_ID;
    if (!extensionId) {
      return;
    }

    chrome.runtime.sendMessage(
      extensionId,
      {
        action: 'VALIDATE_CODE',
        payload: { code },
      },
      (res) => {
        const { isValid, data } = res;
        console.log(isValid, data);
        if (!isValid) {
          console.log('올바르지 않은 code');
          return;
        }

        chrome.runtime.sendMessage(extensionId, {
          action: 'MOVE_PAGE',
          payload: { url: data.url },
        });
      },
    );
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex relative w-full h-full">
        해당 페이지로 이동합니다.
      </div>
    </div>
  );
}

export default Code;
