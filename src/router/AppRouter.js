import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";

import { Footer } from '../components/ui/Footer';
import { DashboardRouter } from './DashboardRouter';
import { PublicRoute } from './PublicRoute';
import { Loading } from '../components/ui/Loading';

import {firebase} from '../firebase/firebase-config'
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { AdminDashboardRouter } from './AdminDashboardRouter';


export const AppRouter = () => {

  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged( async(user) => {
      
      if ( user?.uid ) {
        dispatch(login(user.uid, user.displayName))
        setIsLoggedIn(true);

        // const notes = await loadNotes(user.uid);
        // dispatch(startLoadingNotes(user.uid))

      } else {
        setIsLoggedIn(false)
      }

      setChecking(false)

    })
  }, [dispatch, setChecking, setIsLoggedIn])

  if (checking) {
    return (
      <div className="fill-height">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Router>
        <div>
          <Switch>
            <PrivateRoute path="/admin" component={AdminDashboardRouter} isAuthenticated={isLoggedIn}/>
            
            <PublicRoute path="/" component={DashboardRouter} isAuthenticated={false}/>
          </Switch>
        </div>
      </Router>

      <Footer />
    </>
  )
}
