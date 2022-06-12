import React, { useContext } from 'react';
import GithubIcon from './GithubIcon';
import ShareModal from './ShareModal';
import useToggle from '../hooks/useToggle';
import { AuthStateContext } from '../contexts/AuthContext';

type Props = {};

function Header({}: Props) {
  const auth = useContext(AuthStateContext)!;
  const [isOpen, toggle] = useToggle();

  const handleCloseClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="flex items-center w-full h-12 border-b bg-neutral text-neutral-content p-2">
        <span className="font-extrabold">Live Comment</span>
        <div className="flex gap-2 ml-auto">
          <button
            className="btn btn-xs btn-outline btn-primary"
            onClick={toggle}
          >
            Share
          </button>
          <button
            className="btn btn-xs btn-outline btn-error"
            onClick={handleCloseClick}
          >
            Close
          </button>
          <GithubIcon />
        </div>
      </div>
      <ShareModal isOpen={isOpen} toggle={toggle} code={auth.page.code} />
    </>
  );
}

export default Header;
