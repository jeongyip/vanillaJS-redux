import { createStore } from "redux";

//DOM 에 직접 접근
const lightDiv = document.getElementsByClassName("light")[0];
const switchButton = document.getElementById("switch-btn");

const counterHeadings = document.getElementsByTagName("h1")[0];
const plusButton = document.getElementById("plus-btn");
const minusButton = document.getElementById("minus-btn");

//ACTION TYPE 정의
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

//ACTION 생성 함수 = ACTION 객체를 만드는 함수
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increment = diff => ({ type: INCREMENT, diff });
const decrement = () => ({ type: DECREMENT });

const initialState = {
  light: false,
  counter: 0
};

//Reducer= 변화를 일으키는 함수
function reducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state,
        light: !state.light
      };
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + action.diff
      };
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
}

//store 생성
const store = createStore(reducer);

// **** render 함수 만들기
const render = () => {
  const state = store.getState(); // 현재 상태를 가져옵니다.
  const { light, counter } = state; // 편의상 비구조화 할당
  if (light) {
    lightDiv.style.background = "green";
    switchButton.innerText = "끄기";
  } else {
    lightDiv.style.background = "gray";
    switchButton.innerText = "켜기";
  }
  counterHeadings.innerText = counter;
};

render();

// 구독하기
store.subscribe(render);

// **** 이벤트 달아주기, 액션 발생 시키기
switchButton.onclick = () => {
  store.dispatch(toggleSwitch());
};

plusButton.onclick = () => {
  store.dispatch(increment(5));
};

minusButton.onclick = () => {
  store.dispatch(decrement());
};
