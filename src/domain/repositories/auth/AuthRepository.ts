import IAuthorizationResult from "../../entities/auth/structures/AuthorizationResult";
import IValidationResult from "../../entities/auth/structures/ValidationResult";


export default interface IAuthRepository {
  /**
   * @throw {Error} if validation has not passed
   */
  validateCredentials(email: string, password: string): Promise<IValidationResult>

  /**
   * @throw {Error} if credentials have not passed
   */
  login(email: string, password: string, validationKey: string): Promise<IAuthorizationResult>
}