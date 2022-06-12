import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Props = {};
function Code({}: Props) {
  let { code } = useParams();
  const [isValid, setIsValid] = useState(true);

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
          setIsValid(false);
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
    <div className="flex flex-col justify-center items-center gap-4 w-screen h-screen">
      {isValid ? (
        <>
          <h1 className="font-bold text-xl">해당 페이지로 이동합니다.</h1>
          <progress className="progress progress-primary w-56"></progress>
        </>
      ) : (
        <h1 className="font-bold text-xl">
          올바르지 않은 URL입니다. <br />
          공유 URL을 확인해보세요!
        </h1>
      )}
    </div>
  );
}

export default Code;
