import React from "react";
import { Video } from "../types";
import { NextPage } from "next";

interface IProps {
  text: string;
}

const NoResults: NextPage<IProps> = ({ text }) => {
  return <div>{text}</div>;
};

export default NoResults;
