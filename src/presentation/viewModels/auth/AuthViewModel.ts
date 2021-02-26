import { IBaseViewModel } from './../BaseViewModel';

export interface IAuthDataStateViewModel {
  emailQuery: string
  passwordQuery: string
  isSignInButtonVisible: boolean
  isSignOutButtonVisible: boolean

  isShowError: boolean
  errorMessage: string

  authStatus: string
  isAuthStatusPositive: boolean
}

export interface IAuthViewModel extends IBaseViewModel {
  authState: IAuthDataStateViewModel

  onEmailQueryChanged(loginQuery: string): void
  onPasswordQueryChanged(passwordQuery: string): void
  onClickSignIn(): void
  onClickSignOut(): void
}