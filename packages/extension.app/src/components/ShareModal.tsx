import React from 'react';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  code: string;
};

function ShareModal({ isOpen, toggle, code }: Props) {
  const url = `https://live-comments.minung.dev/code/${code}`;

  const handleCopy = async () => {
    if (typeof navigator.share !== 'undefined') {
      await navigator.share({
        title: `Live Comments - ${code}`,
        url,
      });
    } else {
      // share api 지원하지 않을시 clipboard 복사로 대체
      await navigator.clipboard.writeText(url);
      alert('복사되었습니다.');
    }
  };

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
          <div className="input-group">
            <input
              type="text"
              value={url}
              className="input input-bordered w-full cursor-pointer"
              disabled
            />
            <button className="btn btn-square" onClick={handleCopy}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-copy"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
          </div>
        </label>
      </label>
    </>
  );
}

export default ShareModal;
