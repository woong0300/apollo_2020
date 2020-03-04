import ApolliClient from "apollo-boost";

const client = new ApolliClient({
  uri: "http://localhost:4000/",
  resolvers: {
    Movie: {
      isLiked: () => false
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        cache.writeData({
          id: `Movie:${id}`,
          data: {
            isLiked: !isLiked
          }
        });
      }
    }
  }
});

export default client;

// 직접 설정한 필드인 isLiked와 같은 식으로 추가할 수 있다.
//백엔드나 API에서 reslove하는 역할이고 필드 또한 resolve가능
//Home에 있는 query에 추가해주고 이게 @client 측에서 준거라고 알려주고!!
//백엔드에 있는게 아니란 것을 알려줘야지!!
//저 resolver는 마치 서버에 있는 graphql resolver같이 동작한다.
