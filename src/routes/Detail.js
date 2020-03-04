import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      isLiked @client
      title
      medium_cover_image
      language
      rating
      description_intro
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-60deg, #7207b5, #e2b6fd);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 15px;
  width: 50%;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center;
`;

//React Apollo의 최고!! - cache가 있어서 뒤로 갔다 다시오면 로딩이 없다!!
export default () => {
  let { id } = useParams(); //잘못된 부분이였는데 직접 찾아냈다.
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) }
  });
  return (
    //이 부분이 Detail.js에서 제일 중요한 부분!! 제일 오류를 많이내는 부분!!
    //{data.movie.title}와 같이 그냥 가져다 쓰면 로딩이 아직 안되서 오류!!
    //삼항연산자를 써서 저런 형태로 가져와야 이를 방지할 수 있다!!
    // Optional Chainig : 삼항연산자 대신에 저렇게 짧아진다.
    // <Poster bg={data?.movie?.medium_cover_image}></Poster>
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading..."
            : `${data.movie.title} ${data.movie.isLiked ? "O" : "X"}`}
          {/*Apollo는 isLiked가 home에서 detail로 전달되는지 몰라 */}
        </Title>
        {!loading && data.movie && (
          <>
            <Subtitle>
              {data.movie.language} : {data.movie.rating}
            </Subtitle>
            <Description>{data.movie.description_intro}</Description>
          </>
        )}
      </Column>
      <Poster
        bg={data && data.movie ? data.movie.medium_cover_image : ""}
      ></Poster>
    </Container>
  );
};
