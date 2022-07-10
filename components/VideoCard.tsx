import React, { useState, useEffect, useRef } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";

import { Video } from "../types";

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes },
  isShowingOnHome,
}) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  const onVideoMute = () => {
    if (!isVideoMuted) {
      videoRef?.current?.setAttribute("muted", "muted");
    } else {
      videoRef?.current?.removeAttribute("muted");
    }
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                ></Image>
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {postedBy.userName}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize text-xs text-gray-500 hidden md:block">
                  {postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="lg:ml-20 flex gap-4 relative">
          <div
            className="rounded-3xl"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <Link href="/">
              <video
                onClick={onVideoPress}
                ref={videoRef}
                className="lg:w[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
                src={video.asset.url}
                loop
              ></video>
            </Link>
            {isHover && (
              <div className="absolute bottom-6 cursor-pointer left-8 md:left-4 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3">
                {playing ? (
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                  </button>
                ) : (
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                  </button>
                )}

                {isVideoMuted ? (
                  <button onClick={onVideoMute}>
                    <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                  </button>
                ) : (
                  <button onClick={onVideoMute}>
                    <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
