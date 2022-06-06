import { AuthActionContext } from '../contexts/AuthContext';
import React, { useContext, useEffect } from 'react';

type Props = {};

function Login({}: Props) {
  const { login } = useContext(AuthActionContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const { name, code } = Object.fromEntries(formData);

    login({ name: name as string, code: code as string });

    e.preventDefault();
  };

  return (
    <div className="flex">
      <div className="hero min-h-screen flex-1 bg-neutral-focus text-neutral-content">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Live Comment</h1>
            <p className="py-6">실제 웹페이지에 댓글을 남겨 QA를 해보세요!</p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <div className="card w-full max-w-xs">
          <div className="card-body">
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
                  <span className="label-text">코드 (Optional)</span>
                </label>
                <input
                  name="code"
                  type="text"
                  placeholder="Code"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
