---
title: ViewTransition API 알아보기
date: 2024-05-26T14:32:38Z
excerpt: 앱처럼 자연스러운 전환을 이제 웹에서도
---

최근 Google IO 2024 세션중에 MPA에서 ViewTransition API가 동작하는 것에 대한 세션을 봤는데 뭔가 웹의 미래를 살짝 엿본 것 같아서 재미있게 봤다.

사실 ViewTransition API는 Google IO 2022에서도 한 번 소개가 된 적이 있었는데, 당시에는 많이 실험적인 기능이었기 때문에 (사용하려면 크롬에서 플래그를 켜줘야 동작했었다.) 일단 이런 API가 있구나 하고 넘어갔었는데 이번에 세션을 보고 크롬 111 이상에서는 바로 사용할 수 있다고 해서 직접 살펴보기로 했다.

## 소개

ViewTransition API는 DOM요소의 애니메이션을 발생시키는 새로운 API이다. 기존에 DOM요소에 애니메이션을 주기 위해서는 크게 세 가지 방법을 활용할 수 있었다.

1. CSS의 animation
2. CSS의 transition
3. Element 인스턴스의 animate 메서드

3번의 경우 비교적 최근에 생긴 방식이라 모를 수도 있지만 앞의 두 가지 방식은 이미 익숙한 방법일 것이다. 다만 animation을 사용하면 미리 정적으로 정의된 애니메이션을 발생시키는 타이밍 정도만 결정할 수 있고, transition은 동일한 DOM요소의 상태의 변화가 있어야만 발생할 수 있다는 한계가 있었다.

그나마 animate 메서드를 활용하면 자바스크립트를 활용해서 동적인 값을 상황에 맞게 결정해서 선언적으로 애니메이션 효과를 줄 수 있어서 활용도가 훨씬 좋아졌지만 여전히 DOM요소가 완전히 바뀌었을 때 두 DOM요소 사이간의 보간(Interpolation)과 전환(Transition)을 선언적으로 같이 처리할 수 있는 방법은 제공되지 않았다. 이런 부족함을 ViewTransition API를 통해 해소할 수 있게 되었다.

## 용례

API를 사용하는 방법은 아주 간단하다. DOM을 변경하는 작업을 `document.startViewTransition`함수에 콜백으로 전달해주면 된다.

```ts
document.startViewTransition(() => {
  // DOM요소에 변화를 주는 작업
});
```

이렇게 사용하게 되면 ViewTransition API는 다음과 같은 작업을 진행한다.

![ViewTransition API 의 흐름도](/images/image-9.png)

브라우저에서 보이는 영역에서는 **이전 상태에서 트랜지션이 일어나고 이후 상태로 넘어가는 것** 뿐이지만 그 사이에 브라우저에서는 다양한 동작이 발생하고 프로미스를 통해 다양한 흐름 제어가 가능해진다. 바로 모든 것을 파악하지는 않아도 되고, 이중에서 중요한 포인트는 **DOM의 변경이 일어나기 직전에 스냅샷을 저장하고, DOM의 변경이 일어난 직후에 스냅샷을 저장해서 두 스냅샷 사이에 보간을 처리해준다는 것이다.** 이제부터는 실제로 만들어가면서 살펴보자.

리액트로 구현한 아래와 같은 이미지 갤러리 예시가 있다. 이 페이지에 ViewTransition API를 단계별로 적용해 보자

![간단한 이미지 갤러리 예시](/images/example1.gif)

List와 Detail로 나눠진 페이지이고 Detail에서는 Back 버튼이 있는 NavigationBar가 노출된다. 간단하지만 ViewTransition API의 다양한 기능들을 확인해 볼 수 있다.

리액트에서는 컴포넌트의 상태가 바뀌면 fiber tree를 새롭게 만들고 재조정을 거친 뒤 커밋과정에서 DOM요소가 변경된다. 일단 아래와 같이 `setState`함수를 `startViewTransition`의 콜백으로 넘겨볼 수 있다. 그러면 Cross Fade되면서 화면 전환이 일어난다.

```tsx
// ...
<div
  className="list-item"
  data-item-id={i.id}
  onClick={(e) => {
    document.startViewTransition(() => {
      onClickItem(i);
    });
  }}
>
// ...
```

![화면 전환이 일어나는 모습](/images/example2.gif)

그런데 리액트에서 리렌더링은 비동기적으로 발생하는데 어떻게 정상적으로 트랜지션이 일어나는지 의문이 생길 수 있다. 일단은 계속 진행해보자.

이번에는 다음과 같이 List의 타이틀이 Detail의 타이틀로 트랜지션이 일어나도록 처리해보자.

![title이 전환되는 모습](/images/example3.gif)

ViewTransition API의 멋진 점은 위와 같은 식으로 이전 상태에서 이후 상태로 DOM이 변경될 때 이전 상태의 특정 요소가 이후 상태의 특정 요소로 위치와 크기를 추적하면서 트랜지션을 만들 수 있다는 것이다. 그러기 위해서는 이전 상태의 요소와 이후 상태의 요소를 렌더트리에서 **유일한 트랜지션의 이름**으로 연결해주면 된다. 그리고 그 유일한 이름은 CSS의 `view-transition-name` 속성을 통해 정해줄 수 있다. Detail화면의 title text 요소에 다음과 같이 지정해줄 수 있다.

```css
.detail-title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 12px;
  view-transition-name: title;
}
```

이렇게 하면 Detail 페이지에 있는 유일한 트랜지션의 이름으로 title을 설정해 줄 수 있다. 그런데 List 페이지에 있는 title은 어떻게 지정해 줄 수 있을까? 만약 css를 통해서 `view-transition-name`를 지정한다면 List에 있는 모든 아이템들에 동일한 트랜지션의 이름(title)이 적용되어 이전 상태(List)에서 유일하지 않게 된다. 이런 문제를 해결하기 위해서 자바스크립트를 활용해서 스냅샷을 생성하기 직전에 정의해주면 된다.

나는 다음과 같이 처리했다.

```tsx
// ..

<div
  className="list-item"
  data-item-id={i.id}
  onClick={(e) => {
    const title =
      e.currentTarget.querySelector<HTMLDivElement>(".list-title")!;

    title.style.viewTransitionName = "title";
    document.startViewTransition(() => {
      onClickItem(i);
    });
  }}
>
// ..
```

이렇게 하면 클릭하는 순간에 .list-title을 클래스로 갖는 DOM요소에 직접 style을 적용해줄 수 있다. 그리고 그 이후에 `startViewTransition`메서드를 호출하면 그 시점 렌더트리에 `view-transition-name`이 지정된 요소들의 스냅샷(이전 상태)을 만든다. 그리고 `updateCallbackDone`의 상태가 `fulfilled`되면 변경된 렌더트리에서 마찬가지로 `view-transition-name`이 지정된 요소들의 스냅샷(이후 상태)을 만든다. 그렇게 하면 다음과 같은 의사요소 트리를 생성한다.

```
::view-transition
├─ ::view-transition-group(root)
│  └─ ::view-transition-image-pair(root)
│     ├─ ::view-transition-old(root)
│     └─ ::view-transition-new(root)
└─ ::view-transition-group(title)
   └─ ::view-transition-image-pair(title)
      ├─ ::view-transition-old(title)
      └─ ::view-transition-new(title)
```

`::view-transition`이라는 의사요소 아래에 같은 레벨의 두 개 트리가 존재한다. 하나는 root이고 하나는 우리가 지정한 title이다. root는 `:root`와 같이 최상위 범위이며 지정하지 않은 모든 요소의 단일 트랜지션을 담당한다고 생각하면 된다. 물론 우리가 지정한 title은 제외한다. 그리고 title은 별도로 트리를 생성하여 존재하게 된다. 각 트리에서 의사요소가 담당하는 것을 알아보자.

### `::view-transition-group`

이전 상태와 이후 상태의 **위치와 크기의 애니메이션**을 담당하는 의사요소이다. 이전 상태의 스냅샷과 이후 상태의 스냅샷이 모두 존재해야만 동작하며 그 순간 기본적인 animation을 생성해준다. css의 animation 속성을 활용하기 때문에 `duration이나` `timing-function`등을 수정해줄 수 있다.

### `::view-transition-image-pair`

`::view-transition-old`와 `::view-transition-new`의사요소를 포함하는 의사요소 기본적으로는 두 요소의 블렌딩 격리를 위해 사용되는데 아래에 다시 서술하겠지만 포함하고 있는 두 의사요소는 이전 스냅샷과 현재 실시간 상태의 cross fade를 담당한다. 기본적으로는 `isolation: isolate;` 속성이 적용되어 있으며 cross fade가 정상적으로 동작하기 위해서 하위요소에 각각의 쌓임 맥락을 만들어 블렌딩이 각각 적용되도록 하는 역할을 한다. 만약 두 의사요소의 전환에서 블렌딩이 필요 없다면 `isolation: auto;` 로 덮어씌워 불필요한 쌓임 맥락을 만들지 않도록 할 수 있다.

### `::view-transition-old`

이전 스냅샷 상태를 담당하는 의사요소이다. 기본적으로 적용되는 cross fade를 위해서 이전 상태는 fade out, 현재 상태는 fade in 되어야 교차되는데 이 때 fade out되어야 하는 이전 상태의 스냅샷의 fade out 애니메이션을 갖고있다. 이 요소에 적용된 animation keyframe을 덮어씌워 이전 스냅샷이 사라지게 하는 방법을 완전히 재지정해줄 수도 있다.

### `::view-transition-new`

현재 상태를 담당하는 의사요소이다. **old와는 다르게 스냅샷을 사용하는 게 아니라 변경이 적용된 실시간 화면을 담당한다.** `::view-transition-old`와 반대로 현재 상태의 fade in 애니메이션을 갖고 있으며 마찬가지로 animation keyframe을 덮어씌워 줄 수도 있다.

위에서 설명한 의사요소들 각각의 애니메이션을 통해서 최종적으로 트랜지션으로 보여지게 되는 것이다.

---

다시 돌아와서 위에서 변경한 코드로 이동을 하게되면 기대와 달리 title의 트랜지션이 제대로 적용되지 않는다. 이유는 아까 위에서 언급했듯이 리액트에서 렌더링 과정이 비동기적으로 처리되기 때문이다. 때문에 `startViewTransition`에 전달할 콜백이 끝난 뒤에 DOM의 변경이 발생하게 되고 이후 상태에 대한 스냅샷이 제대로 생성되지 않는다.

그런데 처음에 cross fade는 정상적으로 되었던 이유는, `::view-transition-new`의사요소가 fade in 시키는 화면은 스냅샷이 아니라 실시간 화면이기 때문이다. 비동기로 처리된다고 하더라도 변경된 화면이 즉각적으로 반영되기 때문에 문제가 없어 보였던 것이다. 그렇지만 요소의 위치와 크기의 트랜지션을 담당하는 `::view-transition-group`의사요소는 이후 상태의 스냅샷을 통해서 만들어진다. 하지만 비동기적으로 DOM요소의 변경이 일어나게 되기 때문에 `updateCallbackDone`이 fulfilled되는 시점에 렌더트리가 변경되지 않은 상태가 되고, 이전 스냅샷과 이후 스냅샷이 동일하게 만들어지는 일이 발생한다.

해결 방법은 간단하다. 리액트에서 제공하는 `flushSync`함수의 콜백안에서 리렌더링을 유발하여 리렌더링이 동기적으로 발생하도록 하면 된다. 이렇게 렌더링을 유발하게 되면 리액트에서 자체적으로 한 렌더링 사이클에서 다수의 setState의 결과를 한 번에 처리하는 과정(Auto Batching)을 생략하게 되고 그 즉시 렌더링 작업을 동기적으로 처리하게 된다. 그렇게 되면 `startViewTransition`의 콜백 내에서 DOM요소의 변경까지 완전히 이루어지기 때문에 문제없이 반영되게 된다. 물론 이렇게 된다면 Fiber Architecture의 장점 중 하나의 Concurrency Rendering의 혜택을 받을 수는 없다는 점을 참고하자.

코드를 다음과 같이 수정하게 되면 예상한 대로 동작하게 된다.

```tsx
// ..

<div
  className="list-item"
  data-item-id={i.id}
  onClick={(e) => {
    const title =
      e.currentTarget.querySelector<HTMLDivElement>(".list-title")!;

    title.style.viewTransitionName = "title";
    document.startViewTransition(() => {
      flushSync(() => onClickItem(i));
    });
  }}
>
// ..
```

동일한 방식으로 이미지영역도 처리해줄 수 있다.

![이미지의 트랜지션도 처리한 화면](/images/example4.gif)

Detail에서 보이는 Navigation Bar가 나타나고 사라질 때 트랜지션을 적용해 보자. 먼저 BACK버튼을 눌렀을 때도 transition이 적용되도록 변경한다.

```tsx
// ..
<nav className="bar">
  <button
    onClick={() => {
      let titleTarget: HTMLDivElement | null = null;
      let imageTarget: HTMLImageElement | null = null;

      document.startViewTransition(() => {
        flushSync(() => onBack());
      });
    }}
  >
    &lt; BACK
  </button>
</nav>
// ..
```

그리고 CSS에서 다음과 같이 Navigation Bar에 `view-transition-name`속성을 지정해준다

```css
.bar {
  view-transition-name: bar;
  display: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  background-color: orange;

  & > button {
    all: unset;
    appearance: none;
    padding: 8px;
    border-radius: 8px;
    color: white;
  }
}
```

Navigation Bar 같은 경우에는 List에서 Detail로 이동할 때는 이전 스냅샷이 없는 상태가 되고 Detail에서 다시 List로 이동할 때는 이전 스냅샷만 있는 상태가 된다. 때문에 `::view-transition-old(bar)`의사요소는 Bar가 어떻게 사라질지를 정의해주고 `::view-transition-new(bar)`의상요소는 Bar가 어떻게 나타날지를 정의해주면 된다. 다음과 같이 CSS에서 의사요소를 덮어씌우면 된다.

```css
@keyframes toDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes toUp {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

::view-transition-old(bar) {
  animation: toUp 500ms forwards;
}

::view-transition-new(bar) {
  animation: toDown 500ms forwards;
}
```

이렇게 해주면 아래와 같이 Navigation Bar가 나타나고 사라진다.

![Navigation Bar가 나타나고 사라질 때의 화면](images/example5.gif)

마지막으로 BACK버튼을 통해 뒤로갔을 때 title과 image가 원래 위치로 돌아가도록 할 수도 있다. 그러기 위해서는 현재 돌아가야 하는 List Item을 특정할 수 있어야 한다. 예시에서는 List Item에 `data-item-id`어트리뷰트를 통해 특정할 수 있도록 구성했다. 그리고 아래와 같이 코드를 작성한다.

```tsx
<nav className="bar">
  <button
    onClick={() => {
      let titleTarget: HTMLDivElement | null = null;
      let imageTarget: HTMLImageElement | null = null;

      const transition = document.startViewTransition(() => {
        flushSync(() => onBack());
        titleTarget = document.querySelector(
          `[data-item-id="${targetId}"] .list-title`,
        );
        imageTarget = document.querySelector(
          `[data-item-id="${targetId}"] .list-image`,
        );

        titleTarget!.style.viewTransitionName = "title";
        imageTarget!.style.viewTransitionName = "image";
      });

      transition.finished.finally(() => {
        titleTarget!.style.viewTransitionName = "";
        imageTarget!.style.viewTransitionName = "";
      });
    }}
  >
    &lt; BACK
  </button>
</nav>
```

먼저 List 화면으로 DOM을 갱신한 뒤 `startViewTransition`의 콜백이 끝나기 전에 `view-transition-name`속성을 정의해 준다. 그 다음 `updateCallbackDone`이 fulfilled되면 그 순간 스냅샷을 생성한다. 그리고 트랜지션이 완전히 종료된 다음에 `view-transition-name`속성을 초기화시켜야 한다. (이 때 ViewTransition 인스턴스의 finished 프로미스를 사용할 수 있다.) 그렇지 않으면 다른 Detail 화면으로 넘어갈 때 화면내에 `view-transition-name`이 유일하지 않기 때문에 정상적으로 동작하지 않게되기 때문이다.

이제 다음과 같이 List로 돌아갈 때도 트랜지션이 적용되는 것을 확인할 수 있다.

![뒤로가기 할 때의 트랜지션도 적용됨](/images/example6.gif)

이런 식으로 ViewTransition API를 활용하게 되면 더 선언적으로 서로 다른 화면 구성요소의 트랜지션을 적용해줄 수 있게 해준다.

만약 위의 예시들을 직접 테스트해보고 싶다면 아래의 Code Sandbox 링크를 통해서 확인해볼 수 있다. (크롬 111버전 이상에서만 정상동작하니 참고)

[Code Sandbox Link](https://codesandbox.io/p/sandbox/viewtransitiontest-lkt3ww)

## 활용

### SPA Navigation

ViewTransition API를 사용해서 Navigating을 하게되면 자연스러운 페이지 이동이 가능해질 것이다. React Router에서는 지금 실험적으로
[`unstable_useViewTransitionState`](https://reactrouter.com/en/main/hooks/use-view-transition-state)을 통해서 ViewTransition API를 지원해주고 있다. 또한 Next.js에서도 ViewTransition API 도입에 대한 [활발한 논의](https://github.com/vercel/next.js/discussions/46300)가 이루어지고 있다.

### MPA Navigation

이번 Google IO에서 발표된 내용으로는 MPA에서 페이지 전환시에도 ViewTransition API를 사용해서 트랜지션 효과를 줄 수 있다고 한다. 다만 아래의 조건이 충족 되어야 한다.

- Chrome 126이상
- 이전 페이지와 이후 페이지가 Same-Origin이어야 함
- 페이지와 페이지 사이의 전환에 4초 미만의 시간이 걸려야 함
- 이전 페이지와 이후 페이지 모두 아래의 CSS at-rule이 추가되어 있어야 함

```css
@view-transition {
  navigation: auto;
}
```

또한 페이지간의 ViewTransition API를 연동하기 위해서 `pageswap`, `pagereveal`이벤트가 추가된다. (Chrome 124 이상)

## 맺으며

이렇게 ViewTransition API에 대해서 간단하게(?) 살펴봤다. 아직까지도 ViewTransition API는 실험적이고 변화가 많은 상황이기 때문에 실제로 사용하기에는 무리가 있지만 웹의 미래의 한 모습을 먼저 체험해 보는 것 같아서 재미있었다. 나는 정말 기본적인 동작을 알아봤지만 아래의 링크를 통해서 좀 더 자세한 정보와 유즈케이스 그리고 예시들을 볼 수 있으니 관심이 더 생긴다면 참고해봐도 좋다.

또한 그렇게 깊게 알아보고 작성한 글이 아니다보니까 잘못된 정보나 부족한 부분들이 있을 수 있는데 댓글로 알려주면 감사히 반영하겠다. 물론 궁금한 점들도 아는 한에서 답변할 수 있도록 노력하겠다.

## 참고 자료

[Chrome for developer - ViewTransition API](https://developer.chrome.com/docs/web-platform/view-transitions?hl=ko)
[WICG - view-transition/explainer.md](https://github.com/WICG/view-transitions/blob/main/explainer.md)
