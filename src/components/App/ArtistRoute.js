import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PlayButton from "./PlayButton";
import RelatedArtist from "./RelatedArtist";
import Tag from "./Tag";
import { GlobalStyle } from "../GlobalStyle";
import { COLORS } from "../../constants";
import {
  fetchArtistProfile,
  fetchRelatedArtist,
  fetchTopTracks,
} from "../../helpers/api-helper";
import {
  requestArtist,
  receiveArtist,
  receiveArtistError,
  receiveTopTracks,
  receiveTopTracksError,
  receiveRelatedArtists,
  receiveRelatedArtistsError,
} from "../../actions";

const ArtistRoute = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const accessToken = useSelector((state) => state.auth.token);
  const curArtistProfile = useSelector((state) => {
    let tmp = state.artists.currentArtist;
    return tmp ? tmp.profile : null;
  });
  const curArtistRelated = useSelector((state) => {
    let tmp = state.artists.currentArtist;
    return tmp ? (tmp.related ? tmp.related : null) : null;
  });
  const curArtistTopTracks = useSelector((state) => {
    console.log(state.artists.currentArtist);
    let tmp = state.artists.currentArtist;
    return tmp ? (tmp.topTracks ? tmp.topTracks.slice(0, 3) : null) : null;
  });

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    dispatch(requestArtist());

    const fetchData = async () => {
      const arrPromises = [
        () => fetchArtistProfile(accessToken, id),
        () => fetchTopTracks(accessToken, id),
        () => fetchRelatedArtist(accessToken, id),
      ];
      const arrDispatch = [
        {
          task: (info) => receiveArtist(info),
          err: receiveArtistError,
        },
        {
          task: (info) => receiveTopTracks(info.tracks),
          err: receiveTopTracksError,
        },
        {
          task: (info) => receiveRelatedArtists(info.artists),
          err: receiveRelatedArtistsError,
        },
      ];
      await Promise.all(
        arrPromises.map(async (p, ind) => {
          try {
            const info = await p();
            dispatch(arrDispatch[ind].task(info));
          } catch (err) {
            dispatch(arrDispatch[ind].err());
          }
        })
      );
    };

    // call the async function
    fetchData();
  }, [accessToken, id]);

  return curArtistProfile ? (
    <ArtistWrapper>
      <ArtistHeader>
        {/*image*/}
        {curArtistProfile.images && (
          <ArtistPicture src={curArtistProfile.images[0].url} />
        )}
        {/*name*/}
        <ArtistName>{curArtistProfile.name}</ArtistName>
        {/*followers*/}
        <ArtistFollowers>
          <ArtistFollowersSub>
            {convertFollowers(curArtistProfile.followers.total)}
          </ArtistFollowersSub>
          &nbsp;&nbsp;followers
        </ArtistFollowers>
      </ArtistHeader>
      {/*tracks*/}
      {curArtistTopTracks && (
        <ArtistTracksWrapper>
          <ArtistTitle>top tracks previews</ArtistTitle>
          <ArtistTracksPlay>
            {curArtistTopTracks.map((ele) => {
              //console.log(ele.preview_url);
              return <PlayButton key={ele.id} audioSrc={ele.preview_url} />;
            })}
          </ArtistTracksPlay>
        </ArtistTracksWrapper>
      )}
      {/*tags*/}
      <ArtistTagWrapper>
        <ArtistTitle>tags</ArtistTitle>
        <ArtistTagInner>
          {curArtistProfile.genres &&
            curArtistProfile.genres.map((ele) => {
              return <Tag key={ele} tagInfo={ele} />;
            })}
        </ArtistTagInner>
      </ArtistTagWrapper>
      {curArtistRelated && (
        <ArtistRelatedWrapper>
          <ArtistTitle>related artists</ArtistTitle>
          <ArtistRelatedInner>
            {curArtistRelated.map((ele) => {
              return <RelatedArtist key={ele.id} relatedSrc={ele} />;
            })}
          </ArtistRelatedInner>
        </ArtistRelatedWrapper>
      )}
    </ArtistWrapper>
  ) : (
    <ArtistWrapper>Loading...</ArtistWrapper>
  );
};

const convertFollowers = (numF) => {
  // numF is an integer
  // return a string, e.g. 5M
  // 98534 => 98K
  let k = 0;
  while (numF >= 10) {
    // extract the number of 10s
    // maximum for k is million, which is 6 extractions
    numF /= 10;
    k++;
  }
  // check if k is larger than 6 => ceil at M
  if (k >= 6) {
    while (k > 6) {
      k--;
      numF *= 10;
    }
    return `${numF.toFixed(1)}M`;
  }
  // Otherwise check if k is larger than 3 => ceil at K
  if (k >= 3) {
    while (k > 3) {
      k--;
      numF *= 10;
    }
    return `${numF.toFixed(1)}K`;
  }
  // other cases => return directly the numF
  return `${numF.toFixed(1)}`;
};

// wrapper
const ArtistWrapper = styled.div`
  max-width: 375px;
  max-height: 812px;
  width: 375px;
  height: 812px;
  background: ${COLORS.black};
  overflow: hidden;
`;

// header
const ArtistHeader = styled.div`
  height: 250px;
  width: 100%;
  position: absolute;
  left: 0px;
  top: 59px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ArtistPicture = styled.img`
  border-radius: 50%;
  width: 175px;
  height: 175px;
  overflow: hidden;
  object-fit: cover;
`;

const ArtistName = styled.div`
  width: 375px;
  height: 59px;
  font-family: "Montserrat";
  font-style: normal;
  text-align: center;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
  color: ${COLORS.white};
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.75), 0px 4px 4px rgba(0, 0, 0, 0.5),
    4px 8px 25px #000000;

  position: absolute;
  top: 80px;
`;

const ArtistFollowers = styled.div`
  width: 100%;
  height: 17px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: ${COLORS.white};

  position: absolute;
  top: 190px;
`;
const ArtistFollowersSub = styled.span`
  color: ${COLORS.pink};
`;

// play list
const ArtistTracksWrapper = styled.div`
  min-width: 180px;
  min-height: 92px;
  width: 180px;
  position: absolute;
  top: 338px;
  left: 104px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const ArtistTitle = styled.div`
  width: 100%;
  height: 20px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 20px;
  color: ${COLORS.white};
  text-align: center;
`;
const ArtistTracksPlay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

// tag wrapper
const ArtistTagWrapper = styled.div`
  width: 100%;
  height: auto;

  position: absolute;
  top: 478px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ArtistTagInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  align-items: center;
`;

// related artists
const ArtistRelatedWrapper = styled.div`
  position: relative;
  top: 605px;
  display: flex;
  flex-direction: column;
`;
const ArtistRelatedInner = styled.div`
  margin-top: 5px;
  overflow: hidden;
  overflow-x: scroll;
  display: flex;

  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export default ArtistRoute;
