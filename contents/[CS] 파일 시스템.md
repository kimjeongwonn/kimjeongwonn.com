---
title: '[CS] 파일 시스템'
date: 2021-09-03T10:57:11Z
excerpt: '운영체제가 저장매체에 파일을 읽고 쓰기 위한 자료구조 / 알고리즘'
---

- 운영체제가 저장매체에 파일을 읽고 쓰기 위한 자료구조 / 알고리즘

## 파일 시스템이 필요한 이유

- 데이터를 저장매체에서 관리하는데에 0과 1로 이루어진 비트를 단위로 관리하기에 오버헤드가 너무 큼
- 때문에 데이터를 블록단위로 묶어서 관리하기로 함 (보통 4KB)
- 블록마다 고유 번호를 부여해서 관리
- 그러나 사용자가 블록의 고유번호를 관리하는 것은 불가능
  - 사용자가 접근하기 쉬운 추상적인 객체로 묶어서 관리 → 파일
  - 각 파일 안에서는 데이터가 블록단위로 관리됨
- 저장매체에 파일을 효율적으로 저장하기 위해서는 가능한 연속적인 공간에 파일을 저장해야 함
  - 그러나 외부 단편화 문제, 파일 사이즈 변경 문제로 연속적인 공간을 보장할 수 없기 때문에 불연속 공간에서 파일을 저장하는 방법이 필요
  - 블록 체이닝 : 각 블록을 링크드 리스트로 연결 → 파일을 탐색하기 위해 항상 첫 번째 블록부터 주소를 따라가서 탐색해야 하는 단점
  - 인덱스 블록 : 각 블록에 대한 위치 정보(주소)를 기록해서 한 번에 블록을 찾아갈 수 있도록 함

## 다양한 파일 시스템

- Window : FAT, FAT32, NTFS
  - 블록 위치를 FAT라는 자료구조에 기록
- 리눅스(UNIX) : ext2, ext3, ext4
  - 인덱스 블록의 일종인 inode 방식을 사용

## 파일 시스템과 시스템 콜

- 파일 시스템이 다르더라도 하나의 시스템콜을 통해서 지원되도록 구현되어 있음
- 시스템 콜을 통해 저장매체에 접근하게 되면 운영체제에서 파일 시스템에 맞게끔 동작하게 됨

## inode 파일 시스템 구조

- 수퍼 블록 : 파일 시스템에 대한 정보
  - 파일 시스템의 정보와 파티션에 대한 정보를 갖고 있음
- 아이노드 블록 : 파일 상세 정보 → 프로세스의 PCB와 비슷한 역할
  - 파일별로 inode를 하나씩 갖고 있으며 각 inode는 식별자를 갖음 → inode 식별자로 실제 데이터에 접근할 수 있음
  - 파일 시스템 내부에서는 inode를 기반으로 파일을 엑세스 함
  - inode 기반 메타 데이터들을 저장하고 있음
    - 파일 접근 권한
    - 소유자 정보
    - 파일 사이즈
    - 생성 시간, 수정 시간
    - 데이터의 위치 등
  - 다이렉트 블록안에 실제 데이터 블록의 주소를 보관할 수 있는 공간
    - 다이렉트 블록은 보통 12개
    - 실제 데이터 블록은 12개를 훨씬 상이하는 경우가 많음
    - 추가적인 데이터 블록의 주소는 인다이렉트 블록안에 저장되며
    - 재귀적으로 데이터 블록의 주소를 저장할 수 있음
      - 싱글 → 더블 → 트리플
    - 다이렉트 블록의 사이즈에 따라서 파일 하나당 최대 사이즈가 달라짐
- 데이터 블록 : 실제 데이터

## 가상 파일 시스템 (Virtual File System)

- 파일 시스템 관리를 추상화하는 기법
- 네트워크 등 다양한 기기에서 동일한 파일 시스템 인터페이스를 통해 관리할 수 있도록 하는 방법
- 하나의 시스템콜을 기기별로 알맞은 read_spec/write_spec 코드를 구현
- 이를 통해 모두 다른 디바이스 / 파일시스템도 같은 동일한 인터페이스로 사용 가능

### 디바이스의 종류

- 블록 디바이스 (Block Device)
  - HDD, CD/DVD와 같이 블록 혹은 섹터 등 정해진 단위로 데이터를 송수신, IO 송수신 속도가 높음
- 캐릭터 디바이스 (Character Device)
  - 키보드, 마우스 등 Byte 단위 데이터 전송, IO 송수신 속도가 낮음
