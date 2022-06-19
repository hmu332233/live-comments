import React, { useState } from 'react';
import cn from 'classnames';

type Props = {
  code: string;
  onSubmit: ({ name, code }: { name: string; code: string }) => void;
};

function LoginModal({ code, onSubmit }: Props) {
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
              <h1 className="text-5xl font-bold">Live Comments</h1>
              <p className="mt-6">Try QA by commenting on the live web page!</p>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <div className="card w-full max-w-xs">
            <div className="card-body p-12">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="name"
                    className="input input-bordered"
                    required
                  />
                </div>
                {code && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Share Code</span>
                    </label>
                    <input
                      name="code"
                      type="text"
                      value={code}
                      className="input input-bordered"
                      readOnly
                    />
                  </div>
                )}

                <div className="form-control mt-6">
                  <button
                    className={cn('btn', isLoading && 'loading')}
                    type="submit"
                  >
                    SignIn
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
