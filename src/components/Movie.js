import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// styled-components를 좀 더 잘 써야 디자인이 편해진다.
//react에서 href를 쓰면 안되고 Link를 쓴다.

const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  overflow: hidden;
  border-radius: 7px;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

export default ({ id, bg }) => (
  <Container>
    <Link to={`/${id}`}>
      {id}
      <Poster bg={bg} />
    </Link>
  </Container>
);
