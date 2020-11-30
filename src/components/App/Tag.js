import React, { useEffect, useState, useRef } from "react";
import { COLORS } from "../../constants";
import styled from "styled-components";

const Tag = ({ tagInfo }) => {
  return <TagWrapper>{tagInfo}</TagWrapper>;
};

export default Tag;
const TagWrapper = styled.div`
  width: auto;
  margin: 3px;
  padding-left: 5px;
  padding-right: 5px;
  height: 25px;
  line-height: 25px;
  background: ${COLORS.grayFade};
  text-align: center;

  color: ${COLORS.white};
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 11px;
  text-transform: lowercase;
`;
