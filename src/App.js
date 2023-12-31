import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/misc/ScrollToTop";
import NowPlaying from "./components/sections/NowPlaying";
import {
  Album,
  Artist,
  Artists,
  Category,
  Discover,
  Home,
  Songs,
} from "./pages";
import Playlist from "./pages/Playlist";
import PlaylistBuilder from "./pages/PlaylistBuilder";
import PlaylistBuilderResults from "./pages/PlaylistBuilderResults";
import SpotifyStats from "./pages/StatsForSpotify/SpotifyStats";
import TopArtists from "./pages/StatsForSpotify/TopArtists";
import TopGenres from "./pages/StatsForSpotify/TopGenres";
import TopTracks from "./pages/StatsForSpotify/TopTracks";

const AppContext = createContext();

function App() {
  const [playingTrack, setPlayingTrack] = useState(null);
  const [play, setPlay] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      try {
        const response = await axios.get("/auth/token");
        const accessToken = response.data.access_token;
        setToken(accessToken);
        localStorage.setItem("token", accessToken);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    getToken();
  }, []);

  const contextValues = {
    playingTrack,
    setPlayingTrack,
    token,
    setToken,
    play,
    setPlay,
    isLoggedIn: token ? true : false,
  };

  return (
    <AppContext.Provider value={contextValues}>
      {token && playingTrack ? (
        <NowPlaying accessToken={token} playingTrack={playingTrack} />
      ) : null}

      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/discover" element={<Discover />}></Route>
            <Route path="/artists" element={<Artists />}></Route>
            <Route path="/songs" element={<Songs />}></Route>
            <Route path="/category/:id" element={<Category />}></Route>
            <Route path="/artist/:id" element={<Artist />}></Route>
            <Route path="/album/:id" element={<Album />}></Route>
            <Route path="/playlist/:id" element={<Playlist />}></Route>
            <Route path="/stats" element={<SpotifyStats />}></Route>
            <Route path="/stats/toptracks" element={<TopTracks />}></Route>
            <Route path="/stats/topartists" element={<TopArtists />}></Route>
            <Route path="/stats/topgenres" element={<TopGenres />}></Route>
            <Route
              path="/playlistbuilder"
              element={<PlaylistBuilder />}
            ></Route>
            <Route
              path="/playlistbuilder/results"
              element={<PlaylistBuilderResults />}
            ></Route>
          </Routes>
        </ScrollToTop>
      </Router>

      <Toaster />
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);

export default App;
