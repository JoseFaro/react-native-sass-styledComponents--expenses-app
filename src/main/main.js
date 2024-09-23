import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { checkLoginStatus } from '../redux/actions/authActions';
import { resetAuthState } from '../redux/reducers/auth';
import { resetCompaniesState } from '../redux/reducers/companies';

import GuestNavigation from './guest-navigation';
import UserNavigation from './user-navigation';

const Main = () => {
   const dispatch = useDispatch();

   const { isLoggedIn, token } = useSelector((state) => state.auth);

   const showGuestNavigation = !isLoggedIn;
   const showUserNavigation = isLoggedIn;

   console.log('token', token);

   useEffect(() => {
      if (isLoggedIn) {
         // dispatch(checkLoginStatus());
      } else {
         dispatch(resetAuthState());
         dispatch(resetCompaniesState());
      }
   }, [isLoggedIn]);

   return (
      <>
         {showUserNavigation ? <UserNavigation /> : null}
         {showGuestNavigation ? <GuestNavigation /> : null}
      </>
   );
};

export default Main;
