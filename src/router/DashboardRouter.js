import React from 'react'
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { BlogPostDetailPublic } from '../components/blog/BlogPostDetailPublic';
import { BlogScreenPublic } from '../components/blog/BlogScreenPublic';
import { HomeScreen } from '../components/home/HomeScreen';
import { Navbar } from '../components/ui/Navbar';

export const DashboardRouter = () => {
  return (
    <>
      <Navbar />

      <Switch>
        <Route exact path="/" component={HomeScreen}/>
        <Route exact path="/blog" component={BlogScreenPublic} />
        <Route exact path="/blog/post/:postId" component={BlogPostDetailPublic} />

        {/* Rutas de Autenticacion */}
        <Route exact path="/auth/login" component={LoginScreen} />

        <Redirect to="/" />
      </Switch>
    </>
  )
}
