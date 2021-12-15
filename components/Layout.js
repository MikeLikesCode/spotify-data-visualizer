import { Component } from "react";
import {
  FaClock,
  FaGithub,
  FaList,
  FaMicrophoneAlt,
  FaRecordVinyl,
  FaSpotify,
  FaUserAlt,
} from "react-icons/fa";
import Link from "next/link";

export default class Layout extends Component {
  render() {
    return (
      <div className="flex flex-row flex-wrap min-h-screen">
        <nav className="w-full bg-[#211e1e] sm:w-1/3 md:w-1/12 px-1 text-white">
          <div className="sticky min-h-screen flex flex-col items-center justify-between top-0 p-4 py-6 w-full">
            <div>
              <FaSpotify className="text-5xl text-center" />
            </div>
            <div>
              <ul className="flex flex-col overflow-hidden text-center">
                <Link href="/" passHref>
                  <li className="flex flex-col items-center mb-8 hover:cursor-pointer">
                    <FaUserAlt className="text-xl" />
                    <p className="text-sm mt-2">Profile</p>
                  </li>
                </Link>
                <Link href="/top-artists" passHref>
                <li className="flex flex-col items-center mb-8 hover:cursor-pointer">
                  <FaMicrophoneAlt className="text-xl" />
                  <p className="text-sm mt-2">Top Artists</p>
                </li>
                </Link>
                <Link href="/top-tracks" passHref>
                <li className="flex flex-col items-center mb-8 hover:cursor-pointer">
                  <FaRecordVinyl className="text-xl" />
                  <p className="text-sm mt-2">Top Tracks</p>
                </li>
                </Link>
                <li className="flex flex-col items-center mb-8 hover:cursor-pointer">
                  <FaClock className="text-xl" />
                  <p className="text-sm mt-2">Recent</p>
                </li>
                <li className="flex flex-col items-center mb-8 hover:cursor-pointer">
                  <FaList className="text-xl" />
                  <p className="text-sm mt-2">Playlist</p>
                </li>
              </ul>
            </div>
            <div>
              <FaGithub className="text-5xl text-center" />
            </div>
          </div>
        </nav>
        <main
          role="main"
          className="w-full bg-[#141313] sm:w-2/3 md:w-11/12 px-12 py-4 text-white"
        >
          {this.props.children}
        </main>
      </div>
    );
  }
}
