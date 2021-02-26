import React from 'react';
import './App.css';

import AuthFakeApi from './data/auth/AuthFakeApi';
import AuthHolder from './domain/entities/auth/models/AuthHolder';
import LoginUseCase from './domain/interactors/auth/LoginUseCase';
import { AuthViewModelImpl } from './presentation/viewModels/auth/AuthViewModelImpl';
import Auth from './presentation/views/auth/Auth';


function App(): JSX.Element {
  // data layer
  const authRepository = new AuthFakeApi();
  // domain layer
  const authHolder = new AuthHolder();
  const loginUseCase = new LoginUseCase(authRepository, authHolder);
  // view layer
  const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);
  console.log('appp')
  return (
    <div className="app-container d-flex container-fluid">
      <Auth authViewModel={authViewModel} />
    </div>
  );
}

export default App;