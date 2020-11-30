import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { COLORS } from "../../constants";
import styled from "styled-components";
import PlayIcon from "./PlayIcon";

const RelatedArtist = ({ relatedSrc }) => {
  const { id, name, images } = relatedSrc;
  //const history = useHistory();
  //console.log(relatedSrc);
  return (
    <RelatedArtistWrapper to={`/artists/${id}`}>
      {images.length > 0 ? (
        <RelatedImg src={images[0].url} />
      ) : (
        <RelatedImg
          src={"https://www.riskkorea.com/themes/ipe/images/default-person.svg"}
        />
      )}
      <RelatedName>{name}</RelatedName>
    </RelatedArtistWrapper>
  );
};

export default RelatedArtist;
const RelatedArtistWrapper = styled(Link)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  margin: 5px;

  display: flex;
  flex-direction: column;
  width: 90px;
  height: auto;
`;
const RelatedImg = styled.img`
  height: 90px;
  width: 90px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 50%;
`;
const RelatedName = styled.div`
  width: 79px;
  height: 40px;
  color: ${COLORS.white};

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  text-transform: lowercase;

  word-wrap: break-word;
`;
