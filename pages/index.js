/* eslint-disable @next/next/link-passhref */
/* eslint-disable jsx-a11y/alt-text */
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../components/Layout";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState({});
  const [tracksData, setTrackData] = useState({});
  const [artistsData, setArtistData] = useState({});

  const getUser = async () => {
    const res = await fetch("/api/profile");
    const response = await res.json();
    setUserData(response);
  };

  const getTopTracks = async () => {
    const res = await fetch("/api/top-tracks");
    const response = await res.json();
    setTrackData(response);
  };

  const getTopArtists = async () => {
    const res = await fetch("/api/top-artist");
    const response = await res.json();
    setArtistData(response);
  };

  useEffect(() => {
    getUser();
    getTopTracks();
    getTopArtists();
  }, []);

  console.log(tracksData);

  return session ? (
    <Layout>
      <div className="py-10">
        <div className="flex flex-col items-center mb-20">
          <Image
            className="rounded-full"
            src={
              userData.images
                ? userData.images[0].url
                : "https://www.searchpng.com/wp-content/uploads/2019/02/Profile-PNG-Icon.png"
            }
            alt="Profile Picture"
            width={140}
            height={140}
          />
          <h1 className="text-4xl mt-4 font-medium">
            {userData?.display_name}
          </h1>
          <p className="text-md my-1 text-gray-300">
            {" "}
            <span className="capitalize">Spotify {userData?.product}</span>{" "}
            Member
          </p>

          <button
            className="px-[24px] py-[2px] border-[2px] rounded-full mt-2"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
        <div>
          <div className="flex w-full justify-center gap-x-[10vw] px-10">
            <div className="w-full">
              <div className="w-full flex justify-between items-start mb-6">
                <h2 className="text-3xl font-medium mb-4">
                  Top songs of all time
                </h2>
                <button className="px-[24px] py-[2px] border-[2px] rounded-full">
                  See More
                </button>
              </div>
              {tracksData.items
                ? tracksData.items.map((src, i) => (
                    <div key={i}>
                      <Link href={`/track/${src.id}`} >
                      <div className="flex items-center mb-5">
                        <div>
                          <Image
                            width={80}
                            height={80}
                            src={src.album.images[0].url}
                          />
                        </div>
                        <div className="ml-5">
                          <h3 className="text-xl">{src.name}</h3>
                          <p>{src.artists[0].name}</p>
                          <p className="flex items-center">
                            {src.album.name} <span className="mx-[6px] text-2xl">·</span>{" "}
                            {src.album.release_date.substr(0, 4)}
                          </p>
                        </div>
                      </div>
                      </Link>
                    </div>
                  ))
                : null}
            </div>

            <div className="w-full">
              <div className="w-full flex justify-between items-start mb-6">
                <h2 className="text-3xl font-medium mb-4">
                  Top artist of all time
                </h2>
                <button className="px-[24px] py-[2px] border-[2px] rounded-full">
                  See More
                </button>
              </div>
              <div>
                {artistsData.items
                  ? artistsData.items.map((src, i) => (
                      <div className="flex items-center mb-5" key={i}>
                        <Image width={80} height={80} src={src.images[0].url} />
                        <div className="ml-5">
                          <h3 className="text-xl">{src.name}</h3>
                          <p className="capitalize">
                            {src.genres[0]}
                          </p>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}