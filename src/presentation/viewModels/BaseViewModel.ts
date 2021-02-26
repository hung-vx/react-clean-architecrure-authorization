import { IBaseView } from "../views/BaseView";

export interface IBaseViewModel {
  attachView(baseView: IBaseView): void
  detachView(): void
}