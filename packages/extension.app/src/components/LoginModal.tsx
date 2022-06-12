import React, { useState } from 'react';
import cn from 'classnames';

type Props = {
  onSubmit: ({ name, code }: { name: string; code: string }) => void;
};

function LoginModal({ onSubmit }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const { name, code } = Object.fromEntries(formData);

    onSubmit({
      name: name.toString(),
      code: code?.toString(),
    });
    setIsLoading(true);
    e.preventDefault();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box flex p-0 max-w-5xl h-full max-h-80">
        <div className="hero flex-1 bg-neutral-focus text-base-100">
          <div className="hero-content flex-col p-12">
            <div className="text-left">
              <h1 className="text-5xl font-bold">Live Comment</h1>
              <p className="mt-6">실제 웹페이지에 댓글을 남겨 QA를 해보세요!</p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="card w-full max-w-xs">
            <div className="card-body p-12">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">이름</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">공유 코드</span>
                  </label>
                  <input
                    name="code"
                    type="text"
                    value={'추후 고정 값이 들어갑니다.'}
                    className="input input-bordered"
                    disabled
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    className={cn('btn', isLoading && 'loading')}
                    type="submit"
                  >
                    입장하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
