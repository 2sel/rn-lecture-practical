import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import styled from "@emotion/native";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import VCard from "../components/VCard";
import HCard from "../components/HCard";
import { useQuery, useQueryClient } from "react-query";
import { getNowPlaying, getTopRated, getUpcoming } from "./../api";

export default function Movies({ navigation: { navigate } }) {
  // 서버 state는 useQuery가 알아서 관리함
  // const [nowPlayings, setNowPlayings] = useState([]);
  // const [topRateds, setTopRateds] = useState([]);
  // const [upcomings, setUpcomings] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  //"Movies"를 넣은 이유 : 동일한 useQuery를 사용함으로써 부분적으로 동일한 queryKey를 갖게 된다.
  const {
    data: nowPlayingData,
    isLoading: isLoadingNP,
    isRefetching,
  } = useQuery(["Movies", "NowPlaying"], getNowPlaying);
  console.log("isRefetching", isRefetching);
  const { data: topRatedData, isLoading: isLoadingTR } = useQuery(
    ["Movies", "TopRated"],
    getTopRated
  );
  const { data: upcomingData, isLoading: isLoadingUC } = useQuery(
    ["Movies", "Upcoming"],
    getUpcoming
  );

  // const getData = async () => {
  //   await Promise.all([getNowPlaying(), getTopRated(), getUpcoming()]);
  //   setIsLoading(false);
  // };

  const onRefresh = async () => {
    setIsRefreshing(true);
    // refetch
    // await refetchNP();
    // await refetchTR();
    // await refetchUC();

    // await Promise.all([refetchNP(), refetchTR(), refetchUC()]);

    queryClient.refetchQueries(["Movies"]);
    setIsRefreshing(false);
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  // 세개중에 하나라도 작동중이라면 참이다.
  const isLoading = isLoadingNP || isLoadingTR || isLoadingUC;

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    // 스크롤 뷰는 자식 컴포넌트를 한번에 렌더링해야하기 때문에 필요한 값만 불러와줄 수 있는 flatList를 사용한다
    // FlatList는 자식 컴포넌트를 가질 수 없다 모든 컨트롤은 props로 핸들링한다.
    // 필수적으로 renderItem와 data(배열필요)를 갖고 간다.
    // map함수는 필요없지만 콜백함수는 필요로 한다.
    // renderItem({item, index, separators}) => {가져올 값}
    <FlatList
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper height="100%" showsPagination={false} autoplay loop>
            {nowPlayingData.results.map((movie) => (
              <Slide key={movie.id} movie={movie} />
            ))}
          </Swiper>
          <ListTitle>Top Rated Movies</ListTitle>
          <FlatList
            horizontal
            contentContainerStyle={{ paddingHorizontal: 20 }}
            showsHorizontalScrollIndicator={false}
            data={topRatedData.results}
            renderItem={({ item }) => <VCard movie={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
          />
          <ListTitle>Upcoming Movies</ListTitle>
        </>
      }
      data={upcomingData.results}
      renderItem={({ item }) => <HCard movie={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ height: 15 }} />}
    />
  );
}

// tip
// height : ${SCREEN_HEIGHT /3 + "px"}로 작성할 때 "px"로 사용하면 잘 먹힘

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.title};
`;
