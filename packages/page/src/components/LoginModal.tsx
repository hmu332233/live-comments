import React, { useState } from 'react';
import cn from 'classnames';

type Props = {
  onSubmit: ({ name, code }: { name: string; code: string }) => void;
};

function LoginModal({ onSubmit }: Props) {
  const [loginFormState, setLoginFormState] = useState({
    step: 'step1',
    useShareCode: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const { name, code } = Object.fromEntries(formData);

    onSubmit({ name: name.toString(), code: code?.toString() });
    setIsLoading(true);
    e.preventDefault();
  };

  const handleEntryClick = () => {
    setLoginFormState({ step: 'step2', useShareCode: false });
  };

  const handleShareClick = () => {
    setLoginFormState({ step: 'step2', useShareCode: true });
  };

  const STEPS = {
    step1: (
      <>
        <button className="btn" onClick={handleEntryClick}>
          현재 페이지에 댓글 남기기
        </button>
        <button className="btn btn-outline" onClick={handleShareClick}>
          공유 코드로 입장하기
        </button>
      </>
    ),
    step2: (
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
        {loginFormState.useShareCode && (
          <div className="form-control">
            <label className="label">
              <span className="label-text">공유 코드</span>
            </label>
            <input
              name="code"
              type="text"
              placeholder="Code"
              className="input input-bordered"
              required
            />
          </div>
        )}
        <div className="form-control mt-6">
          <button className={cn('btn', isLoading && 'loading')} type="submit">
            입장하기
          </button>
        </div>
      </form>
    ),
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
            <div className="card-body p-12">{STEPS[loginFormState.step]}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
