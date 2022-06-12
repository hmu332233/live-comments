import { AuthActionContext } from '../contexts/AuthContext';
import React, { useContext, useEffect } from 'react';
import Iframe from '../components/Iframe';
import LoginModal from '../components/LoginModal';
import { useLocation } from 'react-router-dom';

type Props = {};

function Not({}: Props) {
  // const { state: { url } } = useLocation();

  useEffect(() => {
    chrome.runtime.sendMessage('nncehbhgcgjelpihekdbihfelkdmonhc', {
      action: 'TEST',
    });
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div className="flex relative w-full h-full">
        {/* {url} */}
        해당 페이지로 이동합니다.
      </div>
    </div>
  );
}

export default Not;
