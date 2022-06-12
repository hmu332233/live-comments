import React from 'react';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  code: string;
};

function ShareModal({ isOpen, toggle, code }: Props) {
  return (
    <>
      <input
        type="checkbox"
        id="share-modal"
        className="modal-toggle"
        checked={isOpen}
        onChange={toggle}
      />
      <label htmlFor="share-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Share</h3>
          <p className="py-4">다음 URL을 동료에게 공유해주세요!</p>
          <input
            type="text"
            value={`https://live-comments.minung.dev/code/${code}`}
            className="input input-bordered w-full max-w-xs"
            disabled
          />
        </label>
      </label>
    </>
  );
}

export default ShareModal;
