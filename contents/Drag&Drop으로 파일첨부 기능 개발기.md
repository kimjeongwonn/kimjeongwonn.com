---
title: Drag and Drop을 활용한 파일첨부 기능 개발기
date: 2023-05-21T08:39:01Z
excerpt: '그거 그냥 Drag and Drop API 쓰면 되는 거 아니냐? (아님)'
---

작년에 개발한 Drag and Drop으로 파일 첨부하기 기능을 구현하면서 생겼던 문제와 해결방법에 대해서 거의 1년이 다 되어가는 시점에서 다시 정리해서 올려본다. 사실 사내 발표를 위해 준비했던 자료를 글로 다시 풀어 작성하는 정도인데, 지금 생각 해 보니 아쉬운 점이 많았던 결과와 과정이었던 것 같다. 그래도 그만큼 성장한 거라고 생각하기.

---

채용 솔루션에 메시지 기능을 추가하면서 PO님께서 조심스럽게 요청사항을 추가하셨다. 드래그 앤 드랍으로 파일을 첨부할 수 있도록 해달라는 것인데 채팅 화면에 파일을 가져와서 떨구면 바로 파일이 첨부되는 기능이었다. 그 때 이미 SDK를 이용해서 메시지 보내기와 파일 보내기 기능이 모두 구현되어 있었고 재미있을 것 같아서 흔쾌히 수락했고 작업은 금방 끝날 것 같다고 말했다. 전에 MDN에서 본 `Drag and Drop API`를 사용하면 금방 구현할 수 있을거라고 생각했었기 때문이다.

지금까지 그 어떤 태스크 진행하면서도 생각대로 된 적이 없었음에도 왜 그런 안일한 생각을 했던걸까... 아무튼 당연히 생각대로 되지 않은 부분들이 너무 많았고 해결 과정을 공유해볼까 한다.

### Drag and Drop API

말 그대로 브라우저 내에서 요소들을 Drag and Drop 할때의 동작을 제어해줄 수 있는 API이다. Draggable한 (image, anchor 등) 요소들이 Drag될 때 발생하는 이벤트들을 조작할 수 있으며 운영체제의 Drag and Drop API와도 연동이 되어서 외부로 파일을 끌어오는 기능에도 사용할 수 있다.

### 구현

기능 스펙은 매우 간단했다. 외부에서 파일을 드래그해서 채팅창 영역으로 끌고오면 첨부가 될 것을 알리는 오버레이로 띄우고 그 상태에서 드랍을 하게되면 파일을 전송해준다.

![](/images/dnd_example.gif)

처음에는 아래 코드 수준으로 간단하게 구현할 수 있을거라고 기대했다.

```tsx
const [enteredDrag, setEnteredDrag] = useState(false);

return (
  <ChatContainer
    onDragEnter={() => {
      setEnteredDrag(true);
    }}
    onDragLeave={() => {
      setEnteredDrag(false);
    }}
    onDrop={() => {
      // ...
    }}
  >
    {enteredDrag && <AttachmentOverlay />}
    <Chat />
  </ChatContainer>
);
```

그러나 생각한대로 overlay가 노출되지 않았다. 이유는 두가지가 있었는데 첫번째로는 overlay가 화면을 가리면서 dragLeave와 dragEnter이벤트가 무한 반복으로 발생하는 것이었다. overlay컴포넌트가 마운트 되면서 기존에 dragOver되어 있던 element에서 dragLeave가 발생하면서 enteredDrag가 `false`로 처리되고 다시 overlay아래쪽에 있던 element에서 dragEnter가 발생한다. 그러면서 enteredDrag는 다시 `true`가 되면서 이벤트가 무한반복하게 된다.

두번째로는 drag이벤트가 모두 버블링으로 이벤트가 전파되기 때문에 `ChatContainer`안에서 발생하는 모든 이벤트에 대해서 이벤트 핸들러가 동작하게 되어 기대하는 동작이 이뤄지지 않는 것이었다.

아무튼 특정 경계에서만 dragEnter와 dragLeave 이벤트 핸들러가 동작할 수 있도록 해야했다. 처음 시도했던 방법은 이벤트가 발생한 `target`과 `currentTarget`이 일치할 때만 이벤트가 발생하도록 했는데, 경계에 겹치는 요소가 있으면 거기서 문제가 발생했다. 경계에 겹치는 요소에서 dragEnter가 발생하면 `target`과 `currentTarget`이 다르기 때문에 의도대로 동작하지 않았다.

#### 경계 정하기

특정 경계를 넘어서 들어오는 dragEnter 이벤트에서만 동작하도록 하기 위해선 어떻게 해야할까? 결론적으로 `relatedTarget`을 통해서 분기를 나눌 수 있었다. `relatedTarget`은 MouseEvent객체의 속성 중 하나인데 커서가 들어오거나 나갈 때의 대상이 되는 요소를 담고 있다. (참고: [MDN - relatedTarget](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)) 즉 dragEnter의 `relatedTarget`이 `ChatContainer`에 포함(contain)되지 않는다면 `ChatContainer`를 기준으로 밖에서 진입한 dragEnter 이벤트라는 것을 알 수 있다. dragLeave이벤트도 동일하게 조건을 넣어줄 수 있다.

아래 이미지처럼 event의 `relatedTarget`이 경계로 지정한 요소에 contain 되고 있다면 경계에서 발생한 이벤트가 아니기 때문에 무시해버리면 된다.

![relatedTarget에 맞춰서 이벤트 동작의 여부를 결정하는 다이어그램](/images/2023-05-21-14-00-15.png)

위 방법으로 다음과 같이 코드를 작성해서 처리할 수 있었다.

```tsx
const [enteredDrag, setEnteredDrag] = useState(false);

const setEnterDragWithBoundary = (
  e: React.DragEvent<HTMLDivElement>,
  value: boolean
) => {
  if (
    relatedTarget instanceof HTMLElement &&
    // Container에 포함된다면 return
    (e.currentTarget.contains(relatedTarget) )
  ) {
    return;
  }

  setEnterDrag(value);
  };

return (
<ChatContainer
  onDragEnter={() => {
    setEnterDragWithBoundary(true);
  }}
  onDragLeave={() => {
    setEnterDragWithBoundary(false);
  }}
  onDrop={() => {
    // ...
  }}
>
  {enteredDrag && <AttachmentOverlay />}
  <Chat />
</ChatContainer>
```

이렇게 처리해서 drag이벤트가 Container의 밖에서 안으로 들어올때나 안에서 밖으로 나갈 때만 동작하도록 할 수 있었다.

그러나 이렇게해서 끝이 났다면, 블로그 포스팅까지는 하지 않았을 것이다... 새로운 시련이 생겼는데 바로 사파리에서 문제가 발생했다.

### 사파리(Safari) 이슈

사파리에서는 drag이벤트에서 `relatedTarget`이 모두 `null`로 평가되는 치명적인 이슈가 있었다. 찾아보니 굉장히 오래된 [버그](https://bugs.webkit.org/show_bug.cgi?id=66547)였고, 2011년에 보고 된 이후로 지금까지도 방치되고 있는 듯 하다. 아무튼 IE가 떠나고 나니 이제 사파리가 그 자리를 대신 하는듯한 느낌이 든다... 아무튼 서비스는 배포되어야 하고, 사파리를 배제할 수는 없었다... 다시 생각해 봐도 `relatedTarget`을 사용하지 않고 구현할 수 있는 방법은 떠오르질 않았고, 결국에는 ref를 사용해서 **`relatedTarget`을 직접 구현하는** 방식으로 진행했다.

#### `relatedTarget`을 직접 구현

`relatedTarget`을 직접 구현하기 위해서는 dragEnter, dragLeave일 때 참조하는 `relatedTarget`이 각자 다른 방식으로 구현되어야 했다. 먼저 dragEnter일 때는 간단하게 구현이 가능했다. 아래처럼 마지막으로 dragLeave가 발생할 때 `target`을 `relatedTarget`에 할당해주면 된다. 그럼 그 다음 바로 발생하는 dragEnter이벤트의 `relatedTarget`이 마지막으로 dragLeave가 일어난 element를 참조한다.

dragEnter의 relatedTarget이 결정되고 참조되는 과정을 이미지로 표현하면 아래와 같다.

![A에서 B로 드래그 이벤트가 이동하면서 ref를 사용하여 만든 임의의 relatedTargetRef을 결정하고 참조하는 방법을 보여주는 다이어그램, A에서 DragLeave이벤트가 발생하면 relatedTargetRef에 이벤트의 target을 할당하고 B에서 DragEnter이벤트가 발생하면 relatedTargetRef을 참조하여 relatedTarget을 찾는다.](/images/2023-05-21-16-38-45.png)
비교적 간단하게 dragEnter 이벤트의 `relatedTarget`을 결정할 수 있었다.

그러나 dragLeave이벤트의 `relatedTarget`을 결정하는 방법은 바로 떠오르지 않았다. dragEnter가 발생하는 요소를 참조해야 하는데 dragLeave이벤트가 발생하는 시점에서 외부 맥락에서는 어떤 요소로 이동할지를 알 수 없었기 때문이다. 즉 내가 갈 곳을 내가 나가는 시점에서 바로 알 수 있는 방법이 없다.

![](/images/2023-05-21-16-51-07.png)

이 문제를 해결하기 위해서 꽤나 많은 고민을 했는데, 결국에는 방법을 찾을 수 있었다. 바로 `document.elementFromPoint`메서드를 통해서 해결할 수 있었다. 아마 바로 이해되는 사람도 있을테고 그걸로 어떻게? 할 수도 있는데, 아주 원초적이고 단순한 방법으로 다음으로 이동할 요소를 가져올 수 있었다.

`elementFromPoint`메서드는 특정 위치에 존재하는 요소를 가져오는 메서드이다. 그리고 dragLeave가 발생한 시점의 마우스 좌표에 있는 요소는 dragLeave가 발생한 이후 dragEnter가 발생하는 요소와 동일할 것이다. 그렇다면 dragLeave가 발생하는 시점의 마우스 좌표를 가져와 `elementFromPoint`로 요소를 가져오면, 해당 요소가 dragLeave의 `relatedTarget`으로 사용될 수 있다는 것이다.

그리하여 아래와 같이 dragLeave와 dragEnter의 `relatedTarget`을 명령형으로 결정해 줄 수 있게되었다.

![](/images/2023-05-21-17-09-13.png)

```tsx
const [enterDrag, setEnterDrag] = useState(false);
const relatedTargetRef = useRef<HTMLElement | null>(null);

const setEnterDragWithBoundary = (
  e: React.DragEvent<HTMLDivElement>,
  value: boolean
) => {
  const relatedTarget =
    // e.relatedTarget이 없다면, enter일 때는 relatedTargetRef를, leave일 때는 elementFromPoint을 통해서 relatedTarget을 가져옴
    e.relatedTarget ||
    (value
      ? relatedTargetRef.current
      : window.document.elementFromPoint(e.clientX, e.clientY));

  if (
    relatedTarget instanceof HTMLElement &&
    e.currentTarget.contains(relatedTarget)
  ) {
    return;
  }

  relatedTargetRef.current = null;
  setEnterDrag(value);
};

return (
  <ChatContainer
    onDragEnter={e => {
      setEnterDragWithBoundary(e, true);
    }}
    onDragLeave={e => {
      // dragLeave를 할 때 dragEnter할 때 참조할 relatedTargetRef를 결정
      if (e.target instanceof HTMLElement) {
        relatedTargetRef.current = e.target;
      }
      setEnterDragWithBoundary(e, false);
    }}
    onDrop={() => {
      // ...
    }}
  >
    {enteredDrag && <AttachmentOverlay />}
    <Chat />
  </ChatContainer>
);
```

기본적으로는 `relatedTarget`을 참조하고 만약 `relatedTarget`이 `null`이라면, dragEnter의 상황에서는 직접 정의한 `relatedTargetRef`를 참조하도록 하고 dragLeave의 상황에서는 `elementFromPoint`으로 가져온 요소를 참조하도록 하여 구현하게 되었다.

물론 이후에도 몇가지 예외처리가 필요했지만, 이렇게 일단락하여 기능을 구현하여 배포할 수 있었고 그러면서 발생했던 가장 골치아팠던 문제들을 해결했던 과정을 정리해봤다.

---

### 회고

당시에는 이 문제를 해결했음에 성취감이 굉장했다. 불가능할 것 같은 상황을 내가 알고있는 지식을 활용해서 하나씩 해결해 내는 과정에서 느끼는 카타르시스는 '이 맛에 개발자 한다'는 느낌을 낭낭하게 받을 수 있게 해줬다. 주니어는 그렇다. 뭔가 복잡한 문제를 역량을 통해 해결하는 것을 통해서 성장한다고 느낀다. 그런 관점에서는 좋았지만 이제 와서 생각해 보면 나는 이런 해결 방법이 **좋지 못했다** 라고 회고한다. 개발역량을 증명하는 것과 좋은 코드를 쓰는 것은 비슷하면서도 다른 부분이 많은 것 같다. 내가 알고있는 다양한 API들과 메서드들을 잘 사용해서 어려운 문제를 해결해내는 것은 개발자로서 가져야 하는 소양임은 분명하지만, 그게 좋은 방법인지에 대한 고민도 함께 해야하는 것이다. 일단 위 코드는 실제로 다양한 예외처리와 함께 구현되었을 때 한 눈에 이해하기가 많이 어렵다. 만약 누군가 이 코드를 수정해야 하고, 나에게 설명을 요구한다면 나는 꽤나 민망한 상황을 마주하게 될 것 같다는 생각이다.

어떤 동료분이 '차력쇼'라는 표현을 자조적으로 사용했었다. 그러니까 이렇게 어떤 문제를 해결하기 위해서 A to Z로 명령형인 코드를 짜는 과정을 위트있게 표현한 것인데, 나는 이런 문제해결 방식이 말 그대로 차력쇼가 아니었을까 생각한다. 만약 **그 어떤 라이브러리나 마크업 구조를 변경하지 않고**라는 전제가 있는 상태로 파일 첨부 기능을 구현해야 하는 상황이었다면 최선을 다했다고 생각하겠지만, **유지보수 가능한 프로덕션 레벨의 서비스의 코드**를 작성해야 하는 상황에서 이렇게 한 땀 한 땀 구현한 건 그냥 주니어의 객기가 아니었을까... 싶은 아쉬움이 남는다. 하지만, 지금와서 이런 회고를 할 수 있다는 게 어느정도는 성장을 통해 가질 수 있는 시야라고 생각하기도 하기 때문에 내가 잘 가고있구나 라는 생각도 든다.

다음에는, '이렇게 차력소를 할 수 있겠군... 하지만, 좀 더 좋은 방법을 찾아볼까?' 라는 식으로 문제를 세련되게 해결해보고 싶다.
