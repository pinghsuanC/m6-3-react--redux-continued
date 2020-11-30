import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { GlobalStyle } from "../GlobalStyle";
import ArtistRoute from "./ArtistRoute";
import {
  requestAccessToken,
  receiveAccessToken,
  receiveAccessTokenError,
} from "../../actions";

const DEFAULT_ARTIST_ID = "0K05TDnN7xPwIHDOwD2YYs"; // Mili
const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(requestAccessToken());
    fetch("/spotify_access_token")
      .then((res) => res.json())
      .then((json) => {
        //console.log(json);
        dispatch(receiveAccessToken(json.access_token));
      })
      .catch((err) => {
        console.error(err);
        dispatch(receiveAccessTokenError());
      });
  }, []);

  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Route exact path="/artists/:id" component={ArtistRoute} />
          <Redirect to={`/artists/${DEFAULT_ARTIST_ID}`} />
        </Switch>
      </Router>
      <GlobalStyle />
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  overflow: hidden;
  width: 375px;
  height: 812px;
  position: relative;
`;
export default App;
