import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { UserContext } from "context/userContext";
import Layout from "components/layout";

import HomePage from "pages/Home";
import MoviesPage from "pages/Movies";
import GamesPage from "pages/Games";
import AuthPage from "pages/Auth";
import DetailPage from "pages/Detail";

import AdminMoviesPage from "pages/admin/Movies";
import AdminGamesPage from "pages/admin/Games";
import ChangePasswordPage from "pages/admin/ChangePassword";

import FormMovies from "components/movie-game/FormMovies";
import FormGames from "components/movie-game/FormGames";

const Routes = () => {
  const { userData } = useContext(UserContext);
  // console.log(userData);
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies/detail/:id">
            <DetailPage type="movie" />
          </Route>
          <Route exact path="/games">
            <GamesPage />
          </Route>
          <Route path="/games/detail/:id">
            <DetailPage type="game" />
          </Route>
          <Route path="/auth">
            {userData.isLoggedIn ? <Redirect to="/" /> : <AuthPage />}
          </Route>
          {userData.isLoggedIn ? (
            <>
              <Route exact path="/admin/movies">
                <AdminMoviesPage />
              </Route>
              <Route path="/admin/movies/add-data">
                <FormMovies />
              </Route>
              <Route path="/admin/movies/edit-data/:id">
                <FormMovies />
              </Route>
              <Route exact path="/admin/games">
                <AdminGamesPage />
              </Route>
              <Route path="/admin/games/add-data">
                <FormGames />
              </Route>
              <Route path="/admin/games/edit-data/:id">
                <FormGames />
              </Route>
              <Route exact path="/admin/change-password">
                <ChangePasswordPage />
              </Route>
            </>
          ) : (
            <Redirect to="/auth" />
          )}
        </Switch>
      </Layout>
    </Router>
  );
};

export default Routes;
