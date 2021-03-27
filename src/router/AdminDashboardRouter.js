import React from 'react'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { BlogAdminDashboardScreen } from '../components/adminblog/BlogAdminDashboardScreen';
import { Navbar } from '../components/ui/Navbar';

export const AdminDashboardRouter = () => {
  return (
    <>
      <Navbar />

      <Switch>
        <Route exact path="/admin/dashboard" component={BlogAdminDashboardScreen}/>

        <Redirect to="/admin/dashboard" />
      </Switch>
    </>
  )
}
