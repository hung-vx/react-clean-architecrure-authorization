
import React, { ReactElement, useEffect, useState } from 'react'

import { IAuthViewModel } from '../../viewModels/auth/AuthViewModel'
import { IBaseView } from '../BaseView'
import './auth.css'

export interface AuthComponentProps {
  authViewModel: IAuthViewModel
}

export interface AuthComponentState {
  emailQuery: string
  passwordQuery: string;
  isSignInButtonVisible: boolean
  isSignOutButtonVisible: boolean

  isShowError: boolean
  errorMessage: string

  authStatus: string
  isAuthStatusPositive: boolean
}


export default function Auth({ authViewModel }: AuthComponentProps): ReactElement {
  const [authModel, setAuthModel] = useState({ ...authViewModel.authState })

  useEffect(() => {
    const onViewModelChanged = () => {
      setAuthModel({ ...authViewModel.authState })
    }

    authViewModel.attachView({ onViewModelChanged })

    return () => {
      authViewModel.detachView()
    }
  }, [authViewModel])



  return (
    <div className="row flex-grow-1 d-flex justify-content-center align-items-center">
      <div className="auth-container col bg-white border rounded-lg py-4 px-5">
        <div className="row mt-2 mb-4">
          Status:&nbsp;
        <span className={`${authModel.isAuthStatusPositive ? 'text-success' : 'text-danger'}`}>
            {authModel.authStatus}
          </span>
        </div>

        <div className="row mt-2">
          <input
            type="text"
            placeholder="user@email.com"
            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
              authViewModel.onEmailQueryChanged(e.currentTarget.value);
            }}
            value={authModel.emailQuery}
            className="form-control"
          />
        </div>
        <div className="row mt-2">
          <input
            type="password"
            placeholder="password"
            onChange={(e: React.FormEvent<HTMLInputElement>): void => {
              authViewModel.onPasswordQueryChanged(e.currentTarget.value);
            }}
            value={authModel.passwordQuery}
            className="form-control"
          />
        </div>

        {authModel.isShowError && (
          <div className="row my-3 text-danger justify-content-center">{authModel.errorMessage}</div>
        )}

        {authModel.isSignInButtonVisible && (
          <div className="row mt-4">
            <button
              type="button"
              className="col btn btn-primary"
              onClick={(): void => authViewModel.onClickSignIn()}
            >
              Sign in
          </button>
          </div>
        )}

        {authModel.isSignOutButtonVisible && (
          <div className="row mt-4">
            <button
              type="button"
              className="col btn btn-primary"
              onClick={(): void => authViewModel.onClickSignOut()}
            >
              Sign out
          </button>
          </div>
        )}
      </div>
    </div>
  )
}

// export default class Auth extends React.Component<AuthComponentProps, AuthComponentState>
//   implements IBaseView {
//   private authViewModel: IAuthViewModel

//   public constructor(props: AuthComponentProps) {
//     super(props)

//     const { authViewModel } = this.props
//     this.authViewModel = authViewModel

//     this.state = {
//       emailQuery: authViewModel.emailQuery,
//       passwordQuery: authViewModel.passwordQuery,
//       isSignInButtonVisible: authViewModel.isSignInButtonVisible,
//       isSignOutButtonVisible: authViewModel.isSignOutButtonVisible,

//       isShowError: authViewModel.isShowError,
//       errorMessage: authViewModel.errorMessage,

//       authStatus: authViewModel.authStatus,
//       isAuthStatusPositive: authViewModel.isAuthStatusPositive,
//     };
//   }

//   public componentDidMount(): void {
//     this.authViewModel.attachView(this)
//   }

//   public componentWillUnmount(): void {
//     this.authViewModel.detachView()
//   }

//   // We update state of our component
//   // on each update of ViewModel
//   public onViewModelChanged(): void {
//     console.log(123)
//     this.setState({
//       emailQuery: this.authViewModel.emailQuery,
//       passwordQuery: this.authViewModel.passwordQuery,
//       isSignInButtonVisible: this.authViewModel.isSignInButtonVisible,
//       isSignOutButtonVisible: this.authViewModel.isSignOutButtonVisible,

//       isShowError: this.authViewModel.isShowError,
//       errorMessage: this.authViewModel.errorMessage,

//       authStatus: this.authViewModel.authStatus,
//       isAuthStatusPositive: this.authViewModel.isAuthStatusPositive,
//     })
//   }

//   public render(): JSX.Element {
//     const {
//       emailQuery,
//       passwordQuery,
//       isSignInButtonVisible,
//       isSignOutButtonVisible,

//       isShowError,
//       errorMessage,

//       authStatus,
//       isAuthStatusPositive,
//     } = this.state

//     return (
//       <div className="row flex-grow-1 d-flex justify-content-center align-items-center">
//         <div className="auth-container col bg-white border rounded-lg py-4 px-5">
//           <div className="row mt-2 mb-4">
//             Status:&nbsp;
//             <span className={`${isAuthStatusPositive ? 'text-success' : 'text-danger'}`}>
//               {authStatus}
//             </span>
//           </div>

//           <div className="row mt-2">
//             <input
//               type="text"
//               placeholder="user@email.com"
//               onChange={(e: React.FormEvent<HTMLInputElement>): void => {
//                 this.authViewModel.onEmailQueryChanged(e.currentTarget.value);
//               }}
//               value={emailQuery}
//               className="form-control"
//             />
//           </div>
//           <div className="row mt-2">
//             <input
//               type="password"
//               placeholder="password"
//               onChange={(e: React.FormEvent<HTMLInputElement>): void => {
//                 this.authViewModel.onPasswordQueryChanged(e.currentTarget.value);
//               }}
//               value={passwordQuery}
//               className="form-control"
//             />
//           </div>

//           {isShowError && (
//             <div className="row my-3 text-danger justify-content-center">{errorMessage}</div>
//           )}

//           {isSignInButtonVisible && (
//             <div className="row mt-4">
//               <button
//                 type="button"
//                 className="col btn btn-primary"
//                 onClick={(): void => this.authViewModel.onClickSignIn()}
//               >
//                 Sign in
//               </button>
//             </div>
//           )}

//           {isSignOutButtonVisible && (
//             <div className="row mt-4">
//               <button
//                 type="button"
//                 className="col btn btn-primary"
//                 onClick={(): void => this.authViewModel.onClickSignOut()}
//               >
//                 Sign out
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }