import IAuthorizationResult from "../../domain/entities/auth/structures/AuthorizationResult"
import IValidationResult from "../../domain/entities/auth/structures/ValidationResult"
import IAuthRepository from "../../domain/repositories/auth/AuthRepository"

// Class that imitates access to the API
export default class AuthFakeApi implements IAuthRepository {
  /**
   * @throws {Error} if validation has not passed
   */
  validateCredentials(email: string, password: string): Promise<IValidationResult> {
    return new Promise((resolve, reject) => {
      if (password.length < 5) {
        reject(new Error('Password length should be more than 5 characters'));
        return;
      }

      resolve({
        validationKey: 'A34dZ7',
      });
    });
  }

  /**
   * @throws {Error} if credentials have not passed
   */
  login(email: string, password: string, validationKey: string): Promise<IAuthorizationResult> {
    return new Promise((resolve, reject) => {
      if (validationKey === 'A34dZ7') {

        if (email === 'user@email.com' && password === 'password') {
          resolve({
            authorizationToken: 'Bearer ASKJdsfjdijosd93wiesf93isef',
          });
        }
      } else {
        reject(new Error('Validation key is not correct. Please try later'));
        return;
      }

      reject(new Error('Email or password is not correct'));
    });
  }
}