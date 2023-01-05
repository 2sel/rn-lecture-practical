import { Dimensions } from "react-native";

// Dimensions = 실제 디바이스의 가로, 세로 너비를 알아서 계산해준다.
// 구조분해할당을 해서 width, height값을 뽑아냄
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

export const getImgPath = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};
