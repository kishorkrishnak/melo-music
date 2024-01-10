import React from "react";
import { CiClock2 } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";
import { TableSong } from "../cards";

import Pagination from "./Pagination/Pagination";
const TableHeader = () => (
  <thead className="border-b border-[grey]">
    <tr>
      <td className="pl-3 text-[grey] pb-[2px]">#</td>
      <td className="text-[grey]">Title</td>
      <td className="pr-3 sm:pr-6 text-[grey]">
        <CiClock2 color="grey" />
      </td>
      <td></td>
    </tr>
  </thead>
);
const SongsTable = ({ songs, showHead }) => {
  const renderSongItems = (currentItems) => (
    <table className="text-black dark:text-white">
      {showHead && <TableHeader />}
      <tbody>
        {currentItems?.map((track, index) => (
          <TableSong
            track={track}
            index={songs.indexOf(track)}
            key={uuidv4()}
          />
        ))}
      </tbody>
    </table>
  );

  return (
    <Pagination items={songs} itemsPerPage={20} renderItems={renderSongItems} />
  );
};

export default SongsTable;
