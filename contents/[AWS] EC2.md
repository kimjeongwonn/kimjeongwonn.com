---
title: '[AWS] EC2'
date: 2022-03-19T11:28:00.000Z
excerpt: 'AWS의 근본, 클라우딩 컴퓨터 인스턴스를 관리하는 EC2에 대해서'
---

# EC2

# 인스턴스

- 클라우딩 컴퓨팅의 단위
- 하나의 인스턴스는 격리된 컴퓨팅 공간으로 동작한다
- 인스턴스는 유형별로 성능이 모두 다르며, 성능이나 목적에 맞는 유형을 선택해서 만들어야 한다
- 인스턴스의 네트워크 정책은 보안그룹을 통해 결정된다
- 사용자 데이터를 통해서 인스턴스가 실행될 때 자동으로 동작할 스크립트를 지정할 수 있다

## 온디멘드 인스턴스

- 사용한 만큼 초 단위로 요금을 내는 인스턴스, 가장 기본적인 방식이다.
- 가장 유연하게 운용이 가능하다

## 예약 인스턴스

- 1년, 3년 단위로 계약해서 사용하는 인스턴스
- 최대 75% 저렴하다 (온디멘드 대비)

## 스팟 인스턴스

- 싯가로 책정된 여분의 인스턴스를 사용하는 방식
- 요금은 인스턴스중 가장 저렴 (최대 90%)
- 하지만 지정한 요금 이상으로 인스턴스의 삿가가 올라가면 해당 인스턴스는 2분의 유예기간 이후 자동으로 중단됨
- 때문에 진행 상황을 잃으면 안되는 작업에는 적합하지 않음

### 스팟 요청

- 하나의 작업을 위해 스팟 인스턴스를 유지할 수 있도록 하는 서비스
- 스팟 요청에서는 설정한 예산에 맞춰서 최적의 스팟 인스턴스를 계속 요청해서 작업을 유지해줌
- 인스턴스가 계속해서 지속적으로 중단되고 재실행 될 수 있기 때문에 복구가 보장되는 작업에 적합
- 더 이상 작업이 불필요 하게 되면 반드시 스팟 요청을 철회하고 스팟 인스턴스를 직접 종료해줘야 함
  - 만약 스팟 요청이 실행되고 있고 스팟 인스턴스만 종료하면 스팟 요청은 다시 스팟 인스턴스를 만들어서 실행시킴

## 전용 호스트

- AWS 데이터 센터의 물리적인 서버를 렌탈하는 방식
- 클라이언트 정책에 따라 물리적인 서버가 필요하거나 라이센스 관련 제한이 있을 때 사용
- 요금은 온디멘드와 예약 방식중에 선택해서 지불할 수 있다
  - 마찬가지로 예약이 최대 75% 저렴하다

## 전용 인스턴스

- 전용 호스트 같이 물리적으로 격리된 공간에 EC2 인스턴스를 제공받는 방식
- 동일한 AWS계정 내의 다른 인스턴스와 하드웨어 공유가 가능

## Hibernate (절전 모드)

- EC2 인스턴스를 절전 모드로 들어가게 해준다.
- 기존의 인스턴스 중단을 하게 되면 작업 내역과 루트 EBS불륨의 모든 데이터를 잃게 되고, 인스턴스를 재시동할 때 사용자 데이터의 스크립트를 다시 시작하여 비효율적일 수 있다.
- 절전 모드에서는 인스턴스의 메모리를 모두 저장한 채로 중단하고 저장한 메모리를 복구하여 인스턴스를 재시작하기 때문에 상태를 유지하면서 빠르게 인스턴스를 재시작 시킬 수 있다.
  - 메모리 전체를 루트 EBS볼륨에 덤프하여 보관하고 해당 EBS볼륨을 암호화 처리 해야한다
- 모든 인스턴스 유형에서 지원하지 않음
- 인스턴스의 램은 최대 150GB까지만 지원하며 EBS불륨의 사이즈는 램의 데이터를 모두 덤프할 수 있을만큼 충분히 여유있어야 한다
- 스팟 인스턴스에서는 사용이 불가능
- 절전 모드로는 60일까지만 유지 가능

## EC2 Nitro

- EC2의 개선된 가상화 기술을 도입한 차세대 플랫폼
- 고성능 컴퓨팅과 네트워킹을 제공하고 더 빠른 속도의 EBS볼륨을 제공
  - 최대 64,000 IOPS의 속도를 제공
  - 기존에는 최대 32,000 IOPS의 속도로 제공
- 더 나은 보안 제공
- A1, T3, C5, C6, D3, M5 등의 인스턴스 패밀리에서 제공

## vCPU 최적화

- 인스턴스는 컴퓨팅을 담당하는 코어와 스레드를 제공한다
- 만약 4코어 2스레드라면 총 8개의 스레드가 제공되며 각 스레드 하나를 vCPU로 일컫는다.
- 상황에 따라 코어의 갯수, 코어당 스레드의 갯수를 축소하여 비용을 절감할 수 있다
  - 컴퓨팅 성능이 필요 이상으로 부여되는 경우
  - 코어당 라이센스를 지불해야 하는 경우
  - 코어당 하나의 스레드가 성능에 더 좋은 경우

## 용량 예약

- AZ내에서 원하는 인스턴스의 공간을 미리 할당하여 확보할 수 있다.
- 해당 인스턴스가 당장 필요하지는 않지만 공간을 미리 확보하여 필요할 때 동작을 보장받을 수 있어야 할 때 사용한다

# 보안그룹

- 하나 이상의 인스턴스의 네트워크 인/아웃바운드 규칙을 지정해 줄 수 있음
- 인스턴스 역시 하나 이상의 보안규칙을 가질 수 있음
- 각 포트별로 들어오고 나갈 수 있는 포트와 IP주소를 지정해 줄 수 있음
- IP주소 뿐만 아니라 다른 보안그룹을 예외 규칙에 추가하여 인스턴스 사이의 네트워크 규칙을 쉽게 지정해 줄 수 있다.

# SSH

- 외부에서 인스턴스 내부로 터미널을 통해서 접속할수 있다. 인스턴스에 지정한 키 페어를 통해 자격증명을 해야 접속할 수 있다.
- 키 페어는 생성할 때 한 번 컴퓨터에 저장할 수 있고 그 이후에는 절대 재발급이 안되기 때문에 잘 보관해야 한다.

# IP

- 하나의 인스턴스는 퍼블릭IP와 프라이빗IP를 갖는데 퍼블릭IP를 통해 외부와 통신할 수 있다.
- 프라이빗IP를 통해서는 AWS서비스 내에서 통신할 수 있다.
- 퍼블릭IP는 인스턴스를 실행할 때 마다 변경된다.
- 탄력적IP를 통해서 인스턴스가 재실행되어도 퍼블릭IP를 유지할 수 있고 계정별로 5개를 기본으로 사용할 수 있다
  - 탄력적IP는 발급받고 인스턴스에 바인딩 하지 않고 보관하게 되면 요금이 발생
  - 로드밸런서 등을 이용해서 외부와 연결하는 게 더 좋기 때문에 사용을 지양하는 게 좋다

# 배치 그룹

- 다수의 인스턴스를 다양한 방법으로 AZ(Availability Zone)에 배치할 수 있다.
- 작업에 따라 적절한 배치 전략을 선택할 수 있다.

## 클러스터 배치 그룹

- 같은 AZ내에 같은 클러스터 내에 인스턴스들을 배치하는 방식으로 동작한다.
- 물리적으로 같은 랙 내부에 인스턴스들이 동작하므로 인스턴스간의 통신에서 초저지연을 기대할 수 있다.
- 단 클러스터가 포함된 랙이 이슈가 생기면 모든 인스턴스가 영향을 받기 때문에 위험도가 높다.

## 분산형 배치 그룹

- 모든 인스턴스를 AZ내에 모두 다른 랙에 배치한다
- 하나의 배치그룹 당 최대 7개의 인스턴스를 포함할 수 있으며 각 인스턴스는 모두 다른 랙에 배치되기 때문에, 모든 인스턴스가 예상치 못한 하드웨어 이슈에 영향을 받을 확률이 거의 없다.

## 파티션 배치 그룹

- 인스턴스를 파티션이라는 논리 구조로 묶어서 배치한다.
- 하나의 파티션은 같은 랙에서 동작하며 스프레드 방식과 동일하게 같은 AZ내에서 최대 7개까지 관리할 수 있다.
- 인스턴스 별로 파티션을 지정해주거나 자동으로 배치할 수 있다.
- 하나의 랙에 이슈가 생기면 해당하는 파티션에 포함된 인스턴스들만 영향을 받게 된다.

# 네트워크

## ENI

- 가상 네트워크 인터페이스
- 하나의 ENI는 하나의 사설 아이피를 할당받는다.
- 하나의 EC2 인스턴스는 다수의 ENI가 바인딩 될 수 있다.
- 인스턴스간의 ENI는 이동 및 교체가 가능하다