import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { UserProvider } from "./context/userContext";
import { GamesProvider } from "./context/gamesContext";
import { MoviesProvider } from "./context/moviesContext";
import Routes from "./routes/routes";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <MoviesProvider>
          <GamesProvider>
            <Routes />
          </GamesProvider>
        </MoviesProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
