import { useEffect, useState } from "react";
import Heart from "react-heart";
import { IconContext } from "react-icons";
import { IoPauseCircleSharp, IoPlayCircleSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "../App";
import { PageLayout } from "../components/layout";
import { apiRequest } from "../services";

import { Album } from "../components/cards";
import SongsTable from "../components/sections/SongsTable";
import { convertMsToMinSec, notifyLoginRequired } from "../utils";
const Track = () => {
  const [track, setTrack] = useState(null);
  const [moreAlbums, setMoreAlbums] = useState(null);
  const [loading, setLoading] = useState(true);
  const { loadingRef } = useAppContext();
  const { id } = useParams();
  const [heartActive, setHeartActive] = useState(false);
  const { setPlayingTrack, playingTrack, isLoggedIn, setPlay, play } =
    useAppContext();
  const handlePlayPauseClick = () => {
    if (isLoggedIn) {
      setPlayingTrack(track);
      setPlay(!play);
    } else {
      notifyLoginRequired();
    }
  };
  const handleHeartClick = (song) => {
    const previousFavorites =
      JSON.parse(localStorage.getItem("favoriteSongs")) || [];

    if (heartActive) {
      const updatedFavorites = previousFavorites.filter(
        (favorite) => favorite.id !== song.id
      );
      localStorage.setItem("favoriteSongs", JSON.stringify(updatedFavorites));
      setHeartActive(false);
    } else {
      previousFavorites.push(song);
      localStorage.setItem("favoriteSongs", JSON.stringify(previousFavorites));
      setHeartActive(true);
    }
  };
  useEffect(() => {
    const isFavorite = (
      JSON.parse(localStorage.getItem("favoriteSongs")) || []
    ).some((favoriteSong) => favoriteSong.id === track?.id);

    if (isFavorite) setHeartActive(true);
  }, [track?.id]);
  const fetchMoreAlbums = async () => {
    try {
      const response = await apiRequest({
        url: `/artists/${track?.artists[0]?.id}/albums`,
      });

      setMoreAlbums(response?.items);
    } catch (error) {
      console.error("Error fetching data from Spotify API:", error);
    }
  };
  useEffect(() => {
    if (track) fetchMoreAlbums();
  }, [track]);

  useEffect(() => {
    const fetchTrack = async () => {
      setLoading(true);
      loadingRef.current?.continuousStart();

      setLoading(true);
      try {
        const track = await apiRequest({
          url: `/tracks/${id}`,
        });
        setTrack(track);
      } catch (error) {
        console.error("Error fetching data from Spotify API:", error);
      } finally {
        loadingRef.current?.complete();

        setLoading(false);
      }
    };
    fetchTrack();
    if (track) fetchMoreAlbums();
  }, [id]);

  return (
    <PageLayout>
      {track && (
        <div className="flex flex-col gap-6 lg:gap-0 justify-between px-3 sm:px-6">
          <div className="flex items-center gap-6 py-10">
            <img
              src={track?.album?.images[0]?.url}
              className="h-[200px] w-[200px] rounded-md"
              alt={track?.artists[0]?.name}
            />
            <div className="flex flex-col">
              <h1 className="text-white mt-4">
                {track?.followers?.total} Song
              </h1>

              <h1 className="text-white text-5xl font-bold mt-2">
                {track?.name}
              </h1>
              <h1 className="text-white mt-5">
                <Link
                  className="font-bold"
                  to={`/artist/${track?.artists[0]?.id}`}
                >
                  {track?.artists[0]?.name}
                </Link>{" "}
                •{" "}
                <Link to={`/album/${track?.album?.id}`}>
                  {track?.album?.name}
                </Link>{" "}
                • <span>{track?.album?.release_date.substring(0, 4)} • </span>
                <span>{convertMsToMinSec(track?.duration_ms)} </span>
              </h1>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-start gap-5 mb-4">
              {play && track?.id === playingTrack?.id ? (
                <IconContext.Provider value={{ color: "white" }}>
                  <IoPauseCircleSharp
                    onClick={handlePlayPauseClick}
                    color="#1FDF64"
                    size={60}
                    className="cursor-pointer scale-100 hover:scale-105"
                  />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ color: "white" }}>
                  <IoPlayCircleSharp
                    color="#1FDF64"
                    size={60}
                    onClick={handlePlayPauseClick}
                    className="cursor-pointer scale-100 hover:scale-105"
                  />
                </IconContext.Provider>
              )}
              <div style={{ width: "2rem" }}>
                <Heart
                  animationScale={1.25}
                  inactiveColor="transparent"
                  style={{
                    height: "30px",
                    fill: heartActive ? "red" : "transparent",
                    stroke: heartActive ? "" : "grey",
                  }}
                  isActive={heartActive}
                  onClick={() => handleHeartClick(track)}
                />
              </div>
            </div>

            <SongsTable songs={[track]} showHead />

            <div className="flex flex-col items-start mt-4 gap-5 sm:mb-2 lg:mb-7">
              {moreAlbums && (
                <div className="w-[100%] flex flex-col gap-4">
                  <h1 className="text-black dark:text-white text-xl font-bold flex justify-between items-center">
                   More by {track?.artists[0].name}
                    <Link
                      className="text-black dark:text-[#B3B3B3] text-xs"
                      to={`/stats/topartists`}
                    >
                      View All
                    </Link>
                  </h1>
                  <div className="w-[100%] grid grid-cols-2 justify-items-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-y-10">
                    {moreAlbums?.slice(0, 6).map((album) => (
                      <Album key={uuidv4()} album={album}></Album>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Track;
