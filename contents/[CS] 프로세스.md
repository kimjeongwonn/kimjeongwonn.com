---
title: '[CS] 프로세스'
date: 2021-08-17T08:29:30Z
excerpt: '운영체제에서 프로세스의 동작에 대해서 알아보자'
---

## 스케쥴러

### 배치 처리 시스템

- 시스템이 여러개의 프로그램을 순차적으로 처리하는 방식
  - Queue 자료구조와 비슷한 방식으로 동작
- 하나의 프로그램이 실행되는 동안 다른 작업을 하지 못함 → 한 번에 하나의 프로그램 처리만 가능

### 멀티 태스킹

- 단일 CPU에서 다수의 응용 프로그램이 동시에 실행되는 것처럼 보이도록 하는 방법

#### 시 분할 시스템

- 시간단위로 아주 잘게 분할해서 여러가지 프로그램을 번갈아가면서 처리하는 방식
- 다중 사용자가 시스템을 사용할 수 있으며, 입력에 대한 응답시간을 최소화 할 수 있음

#### 멀티 태스킹과 멀티 프로세싱

- 멀티 태스킹은 단일 CPU가 시분할 시스템을 이용해 동시에 여러가지 프로그램을 처리하는 것
- 멀티 프로세싱은 다중 CPU가 하나의 프로그램을 병렬로 처리하는 것

#### 멀티 프로그래밍

- 응용 프로그램은 CPU만 사용하는 것이 아니라, 다른 작업을 중간에 필요로 하는 경우가 많음
  - 예) 저장 매체 사용, 입력 장치, 출력 장치 사용 등
- 하나의 응용프로그램이 CPU 외의 장치를 사용하면서 CPU를 사용하지 않으면서 점유할 때 다른 프로그램에서 CPU를 사용할 수 있도록 해서 CPU가 낭비되는 시간이 없도록 한다.
- CPU를 최대한 효율적으로 활용하도록 하는 시스템

### 프로세스

- 실행중인 프로그램의 실행단위 → 메모리 위에 올라가 있는 프로그램
  - 코드 이미지(바이너리): 실행 파일
- `작업`, `Task`, `Job` 등 용어를 혼용하여 사용한다.
- 응용 프로그램 ≠ 프로세스
  - 응용 프로그램은 여러개의 프로세스로 이루어질 수 있음
  - 하나의 응용 프로그램이 기능을 처리하기 위해 다수의 프로세스가 상호작용하여 실행될 수 있음

### 스케쥴러

- 스케쥴러는 프로세스의 실행을 단위별로 관리한다.

#### 스케쥴링 알고리즘

- 프로세스를 실행시키는 순서와 방법을 결정하는 알고리즘
- 시 분할 시스템을 구현 → 프로세스 응답 시간을 최대한 짧게
- 멀티 프로그래밍을 구현 → CPU의 활용도를 최대한 높여서 효율적으로

#### FIFO 스케쥴러

- 프로세스를 처음부터 끝까지 순차적으로 처리하는 가장 간단한 스케줄러
- 배치 처리 시스템과 가장 유사
- FCFS(First Come First Served) 스케쥴러라고 부르기도 함

#### SFJ 스케쥴러

- Shortest Job First 스케쥴러 → 최단 작업 우선
- 프로세스의 작업 시간을 알고 있을 때 가장 빠른 프로세스를 먼저 처리하는 스케줄러
- 장점
  - FIFO 스케쥴러 보다 응답시간이 짧을 수 있음
  - 같은 시간 내에 더 많은 프로세스를 처리할 수 있음
- 단점
  - 프로세스의 작업 시간을 미리 모두 알아야 함
  - 작업 시간이 오래 걸리는 프로세스는 계속해서 우선순위가 뒤로 밀리게 됨

#### 우선순위 기반 스케쥴러

- Priority-Based 스케쥴러
- 우선순위를 정하는 기준은 정적 우선순위, 동적 우선순위가 있다
- 정적 우선순위
  - 프로세스마다 우선순위를 미리 지정한다
- 동적 우선순위
  - 스케쥴러가 상황에 따라 우선순위를 동적으로 변경한다
  - 시스템이 목표하는 기준에 맞춰 이전에 처리한 내용을 기반으로 우선순위를 결정한다.

#### Round Robin 스케쥴러

- 시 분할 시스템을 기반으로 동작하는 스케쥴러
- 대기 큐에 있는 프로세스를 FCFS 방식으로 처리한다.
- 지정된 시간 내에 프로세스가 모두 처리가 되지 않으면 다시 대기 큐에 넣는다.

## 상태

- 프로세스 스케쥴러의 스케쥴링 알고리즘이 동작하기 위해서는 반드시 프로세스의 상태를 알 수 있어야 한다.
- 프로세스의 상태는 다음과 같이 정의되어 있다.
  - 프로세스 생성 `new`
    - 프로세스를 초기화 하고 있는 상태이므로 ready상태가 되면 실행 가능하다.
  - 실행 가능 `ready`
    - CPU에서 바로 실행이 가능한 상태
    - 스케쥴러의 대상이 된다.
  - 실행 중 `running`
    - 현재 CPU에서 작업중인 프로세스의 상태
    - 코어별로 최대 1개의 상태를 가질 수 있다.
    - 스케쥴러가 결정한다.
  - 대기 `blocked`
    - 특정 이벤트가 발생하기를 대기하는 상태
    - 예를 들어서 파일 읽기를 저장장치에 요청했다면, 파일 읽기 완료 이벤트가 발생할 때 까지 대기상태로 `blocked`되어 있다가, 이벤트가 발생하면 다시 `ready`가 된다.
  - 종료 `exit`
    - 프로세스가 사용했떤 자원을 반납하기 위해 처리중인 상태

### 프로세스 상태 기반 스케쥴링

- 스케쥴러는 프로세스의 상태만 보고 스케쥴링을 결정하기는 어렵기 때문에 정책이 필요함
- `ready`, `running`, `blocked`상태별로 큐를 만들어서 프로세스를 관리할 수 있음
  - `ready` 큐에 있는 프로세스를 계속 `dequeue`하여 처리하는 것을 반복 `running`큐에 `enqueue`
  - 프로세스가 대기(blocked)하게 된다면 그 동안 `blocked`큐에 넣어 `ready`큐에 들어가지 않음
- 이 과정의 반복을 통해 효율적으로 실행 가능한 프로세스를 처리하여 멀티 프로그래밍이 가능

#### 선점형 스케쥴러

- 하나의 프로세스가 CPU에서 running 상태로 동작하고 있는 중에 다른 프로세스가 선점하여 처리할 수 있음
- 시분할 시스템 구현 가능
- RoundRobin 스케쥴러

#### 비선점형 스케쥴러

- 하나의 프로세스가 end 상태가 되거나 blocked 상태가 될 때 까지 다른 프로세스가 선점하여 처리할 수 없음
- FCFS, SJF, Priority-based 스케쥴러

#### 스케쥴링 알고리즘 조합

- 운영체제는 다양한 스케쥴링 알고리즘을 조합한 스케쥴러로 동작한다.
- 예) RoundRobin + Priority-based
  - 우선순위를 갖는 시분할 스케쥴러

## 인터럽트

- CPU가 작업을 처리중인 상황에 하드웨어나 소프트웨어의 이벤트 발생, 예외상황 발생 처리를 위해 CPU에 알려주는 기술
- 일종의 이벤트로 볼 수 있음

### 인터럽트가 필요한 이유

- 선점형 스케쥴러의 구현을 위해서는 running 상태의 프로세스를 중단시키고 다른 프로세스로 교체해야 함
  - 이를 위해 스케쥴러 코드가 인터럽트를 통해 현재 실행중인 프로세스를 중단 시켜야 함
- 입출력 장치의 처리 혹은 예외상황(0으로 나누기 등)이 발생했을 때 CPU에서 해당 상황에 대한 처리를 위해 인터럽트를 통해 알릴 수 있음

### 인터럽트의 종류

#### 내부 인터럽트 (소프트웨어 인터럽트)

1. Divide-by-Zero 인터럽트 : 0으로 나누는 명령 실행 시 발생하는 인터럽트

- 사용자 모드에서 잘못된 공간 접근 시
  - 프로세스는 4GB의 메모리를 사용할 수 있는데 사용자 모드에서는 0GB~3GB, 커널모드에서는 3GB~4GB에 접근할 수 있음
- 계산 결과에서 Overflow 혹은 Underflow가 발생할 때

#### 외부 인터럽트 (하드웨어 인터럽트)

1. 타이머 인터럽트 : 선점형 스케쥴러를 구현하기 위해 일정 시간마다 인터럽트를 계속 발생시켜 현재 처리해야 하는 프로세스를 결정할 수 있음
2. 입출력 인터럽트 : 입출력 장치(키보드, 마우스, 저장매체, 프린터 등)에서 작업을 처리하고 완료됐음을 알려서 후속 처리를 할 수 있음

### 인터럽트 동작

#### 시스템 콜 인터럽트

- 시스템 콜을 실행하기 위해 인터럽트 명령을 넣어 실행시켜야 한다. → 커널 모드로 전환을 위해
  - eax 레지스터에 시스템 콜 번호를, ebx 레지스터에 인자값을 넣고 소프트웨어 인터럽트를 호출하면서 시스템콜에 해당하는 0x80값을 넘겨서 호출
  - CPU가 커널모드로 IDT에서 0x80에 해당하는 함수(시스템 콜)를 실행
  - 시스템 콜 함수가 eax 레지스터에 저장된 시스템 콜 번호를 통해 원하는 시스템 콜 호출
  - 함수 실행 후, 다시 사용자 모드로 변경하고 다시 해당 프로세스 다음코드 실행

#### IDT

- 인터럽트는 미리 정의되어 있는 실행코드의 주소를 IDT에 저장하고 있음
- 컴퓨터 부팅 시 운영체제가 커널 영역에 IDT영역을 초기화하고 정의함
- 리눅스 기준으로 아래와 같이 구분되어 있음
  - 0 ~ 31 : 예외상황 인터럽트
  - 32 ~ 47 : 하드웨어 인터럽트
  - 128(`0x80`) : 시스템 콜

## 컨텍스트 스위칭

### 프로세스의 구조

- 코드가 컴파일 되면서 기계어로 전환되어 실행파일로 만들어 진다.
- 실행 파일을 실행하면 프로세스가 생성되고 프로세스 내부에 코드 영역에 기계어로 변환 된 코드가 올라간다.
- 코드 영역의 코드를 실행하고 코드 내부에서 전역으로 선언 된 변수는 데이터 영역에 저장된다
- 함수가 실행되고 내부에서 선언된 매개변수, 변수는 함수 반환 시 메모리 함께 사라지기 때문에 스택 영역에 저장된다.
  - 함수가 실행 될 때 함수가 반환되고 이동할 Return Address를 먼저 Push한다.
  - 차례대로 매개변수와 변수를 Push한다.
  - 함수가 종료되면 차례대로 Pop하고 마지막에 Return Address가 Pop되면 해당 주소로 이동한다.
- 프로세스 내에서 동적인 데이터를 담는 메모리 공간이 필요할 때 힙 영역에 저장된다.
- 코드 영역과 데이터 영역은 프로세스 생성시 정적으로 결정된다.
- 스택 영역은 프로세스 메모리주소의 최대값 부터 힙 영역은 코드영역 다음부터 정의되며 동적으로 할당된다.

#### 프로세스 레지스터

- PC(Program counter) : 코드가 실행되는 주소값을 저장하는 레지스터
- SP(Stack Pointer) : 현재 스택의 Top주소를 저장하는 레지스터
- EBP : 함수가 호출되면 EBP에서 함수가 시작되는 부분을 기록해서 예외가 발생했을 때 예외가 발생한 함수를 특정할 수 있게 해 주는 레지스터
- EAX : 함수의 반환값을 저장하는 레지스터

### 힙 영역

- 동적인 메모리의 공간을 관리하는 영역
- 힙 영역의 주소값을 스택 영역에 저장하여 변수에 할당할 수 있음

### 데이터 영역

- 데이터 영역은 두가지로 구분된다.
- BSS : 초기화되지 않은 전역변수
  - 코드 내에서 선언만 했을 경우
- DATA : 초기값이 있는 전역변수
  - 코드 내에서 선언과 함께 초기값을 할당했을 경우

## 컨텍스트 스위칭

- 스케쥴러가 running 상태의 프로세스를 바꿀 때 두 프로세스에서 상태를 변경하는 방법
- A → B 로 컨텍스트 스위칭이 일어나면 현재 레지스터의 PC와 SP를 `PCB(Process Control Block)`에 저장해서 현재 실행중인 상태를 보관할 수 있음
- B → A 로 다시 컨텍스트 스위칭이 일어나면 PCB를 확인해서 저장된 PC와 SP를 레지스터에 덮어씌워 이전에 진행하던 상태로 돌아옴

#### PCB

- 프로세스가 실행중인 상태를 캡쳐/구조화 해서 저장하는 공간
- 프로세스ID, 레지스터 값(PC, SP 등), 스케쥴링 상태 정보, 메모리 정보 등을 저장
- 컨텍스트 스위칭은 매우 자주일어나고 오버헤드등으로 지연될 경우 성능 전체에 영향을 주기 때문에 동작이 어셈블리어로 작성되어 있음

## 프로세스간 커뮤니케이션

- 프로세스간의 공간은 완전히 분리되어 있음
- 다른 프로세스간의 상호 접근하는 방법은 보안상의 이유로 제공되지 않음
- 필요한 경우 프로세스간의 통신을 할 수 있는 IPC(InterProcess Communication)라는 방법을 제공함

#### `fork()` 시스템 콜

- `fork()` 시스템 콜을 통해 하나의 프로세스를 복사하여 새로운 프로세스를 만들 수 있음
- 복사된 프로세스와 통신하기 위해서는 IPC를 사용해야 함

#### 프로세스간 통신이 필요한 이유

- 하나의 프로그램을 다수의 프로세스를 사용해 구동시켜 효율적으로 프로세서를 사용할 수 있게됨 (멀티코어 프로세스에서 각 코어별로 프로세스를 병렬로 동작)
- 이 때 다른 코어에서 작동하는 프로세스간의 상태 확인 및 데이터 송수신이 필요

#### 프로세스 가상메모리의 커널영역

- 각 프로세스는 가상메모리로 4GB씩 할당받는다. 이는 실제 물리메모리에 올라가는 크기가 아니라 프로세스 내에서 활용할 수 있는 공간을 가상으로 할당한 영역이다.
- 이 때 0\~3GB는 프로세스가 사용하는 공간 3\~4GB는 운영체제 커널이 할당된 공간이다
- 커널 영역은 실제 물리메모리에 올라갈 때 모든 프로세스가 같은 공간을 공유하게 되어있음
- 이 영역을 활용해서 IPC가 가능

### IPC 기법

#### 파일을 사용한 커뮤니케이션

- 각 프로세스 별로 처리한 내용을 파일에 저장해서 공유하는 방법
- 실시간으로 원하는 프로세스에 전달하기 어려움
- 저장매체를 사용하기 때문에 효율이 떨어짐
- 커널영역을 사용하지 않는 방법으로 사용성이 매우 떨어짐

#### Pipe

- `fork()`를 통해 복사된 프로세스를 향해 단방향으로 데이터를 전달할 수 있음
- `pipe()` 시스템 콜에 배열을 전달하면 배열의 1번 인덱스에 작성한 내용을 0번 인덱스에서 읽을 수 있음
  - 단방향 통신이기 때문에 1에서 작성해서 0에서 읽는 건 가능하나, 0에서 작성해서 1로(역방향) 가는 것은 불가능하다

#### 메세지 큐 (Message Queue)

- 모든 프로세스 사이에서 양방향으로 데이터를 통신할 수 있음
- FIFO 정책을 기반으로 데이터를 enqueue, dequeue하여 프로세스간 통신한다
- 메세지 큐를 생성하고 해당 큐의 key를 프로세스간에 공유하면 key를 통해 해당 큐에 접근할 수 있음

#### 공유 메모리 (Shared Memory)

- 커널에 대놓고 메모리 영역을 만들고 해당 영역을 변수처럼 사용하는 방식
- 해당 공유 메모리의 key를 가지고 다수의 프로세스에서 접근할 수 있음

#### 시그널 (Signal)

- 유닉스에서 30년 이상 사용하고 있는 커널 또는 프로세스에서 다른 프로세스로 이벤트 발생을 알려주는 기법
- 프로세스 관련 코드에 미리 시그널 핸들러를 등록하고 시그널을 받으면 해당 시그널 핸들러를 실행
  - 프로그램에서 특정 시그널에 대한 동작을 임의로 지정해 줄 수 있음
    - 해당 시그널을 무시
    - 시그널 블록과 언블록을 통해 지연전달
    - 특정 동작을 핸들러로 등록해서 임의로 지정
    - 별도로 지정하지 않으면 커널의 기본 동작 수행
  - 지정되지 않는 시그널을 받으면 기본적으로 지정된 핸들러가 동작
  - 프로세스의 PCB 내부에 해당 프로세스에서 블록된 혹은 처리해야하는 시그널에 관련 정보를 관리함
  - 커널모드에서 사용자모드로 전환 할 때 PCB의 대기중인 시그널을 확인해 커널모드를 유지하는 경우도 있음

#### 소켓 (Socket)

- 서버와 클라이언트 등 두개의 다른 컴퓨터간 네트워크 기반 통신을 위한 기술
- 소켓을 시스템 콜로 사용해 하나의 컴퓨터 안에서 두 개의 프로세스간의 통신 기법으로 활용할 수 있음

## 마무리

- 하나의 코드를 실행하게 되면 다음의 단계를 따라 진행된다.
  1. 프로세스 생성 후 NEW 상태로 변경
  2. 메모리에 스택, 힙, 데이터(BBS, DATA), 코드 영역이 할당
  3. 소스코드 텍스트가 코드 영역에 입력
  4. 전역 변수를 데이터 영역에 입력
  5. 프로세의 상태를 READY 상태로 전환
  6. 스케쥴러에 의해 컨텍스트 스위칭이 일어나 RUNNING 상태로 전환
  7. 프로세스의 PCB를 불러와서 PC와 SP를 초기화
  8. 코드의 메인함수를 실행 → SP를 EBP에 저장, 다음 SP에 리턴 주소를 할당
  9. 함수내의 지역변수를 스택에 입력
  10. 함수내의 시스템 콜이 일어나게 되면 다음의 단계를 따라 진행된다.
      1. 시스템 콜의 번호와 시스템 콜의 인자를 EAX, EBX에 저장한 뒤, 0x80 주소로 시스템 콜 인터럽트를 실행
      2. CPU의 모드가 커널 모드로 변경
      3. IDT에서 0x80에 해당하는 주소의 함수를 찾아서 호출
      4. `system_call`함수에서 EAX에 저장된 시스템 콜의 번호를 찾아서, 해당 번호에 맞는 시스템 콜 함수로 이동
      5. 해당 시스템 콜 함수를 실행한 뒤, 다시 사용자 모드로 변경하고 프로세스의 다음 코드 진행
      6. 만약 시스템 콜 함수에 대기가 필요하다면 프로세스의 상태를 WAITING으로 변경 한다
      7. 시스템 콜의 처리가 끝나면 인터럽트를 통해 WAITING된 프로세스를 READY상태로 바꿔준다
  11. 함수가 종료하게 될 때 반환값이 있다면 프로세스 레지스터의 EAX에 저장한 뒤 스택을 모두 POP한다.
  12. 리턴 어드레스를 POP하게 되면 해당 주소의 코드를 실행하고 만약 반환값을 사용한다면 EAX에 저장된 값을 사용한다
  13. 프로세스가 종료하게 되면 프로세스의 상태를 TERMINATED로 변경하고 종료한다.
