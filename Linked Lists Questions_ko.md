# 연결 리스트 문제 번역

원본: `C:\jungle2\data_structures_docker\Data-Structures\Linked_List\Linked Lists Questions.pdf`

참고:
- 원문 PDF 중간에 깨진 문자나 주석처럼 보이는 텍스트가 섞여 있었는데, 문제 본문과 직접 관련 없는 부분은 제외했습니다.
- 함수 원형, 요구사항, 예시 입출력 중심으로 번역했습니다.

---

## Section A - Linked Lists

이 섹션에서 지정된 1개의 문제에 답하시오.

정보:
문제별 프로그램 템플릿은 APAS 시스템에 제공됩니다. 반드시 해당 템플릿을 사용하여 함수를 구현해야 합니다.

---

## 1. `insertSortedLL`

`insertSortedLL()` 함수를 작성하시오.

이 함수는 정수를 하나 입력받아, 연결 리스트에 **오름차순**이 유지되도록 삽입해야 합니다.

조건:
- 현재 연결 리스트에 같은 값이 이미 있으면 삽입하면 안 됩니다.
- 새 값이 추가된 **인덱스 위치**를 반환해야 합니다.
- 함수가 성공적으로 수행되지 못하면 `-1`을 반환해야 합니다.
- 연결 리스트는 **정렬된 연결 리스트**이거나 **빈 리스트**라고 가정해도 됩니다.

함수 원형:

```c
int insertSortedLL(LinkedList *ll, int item);
```

예시 1:

현재 연결 리스트:

```text
2, 3, 5, 7, 9
```

`insertSortedLL()`에 `8`을 넣으면 결과는:

```text
2, 3, 5, 7, 8, 9
```

반환값:

```text
The value 8 was added at index 4
```

예시 2:

현재 연결 리스트:

```text
5, 7, 9, 11, 15
```

`insertSortedLL()`에 `7`을 넣으면 결과는 그대로:

```text
5, 7, 9, 11, 15
```

중복이므로 삽입 실패, 반환값은:

```text
The value 7 was added at index -1
```

예시 메뉴:

```text
1: 정렬된 연결 리스트에 정수 삽입
2: 가장 최근 입력값의 인덱스 출력
3: 정렬된 연결 리스트 출력
0: 종료
```

예시 실행:

```text
Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 2
The resulting linked list is: 2

Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 3
The resulting linked list is: 2 3

Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 5
The resulting linked list is: 2 3 5

Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 7
The resulting linked list is: 2 3 5 7

Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 9
The resulting linked list is: 2 3 5 7 9

Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 8
The resulting linked list is: 2 3 5 7 8 9

Please input your choice(1/2/3/0): 2
The value 8 was added at index 4

Please input your choice(1/2/3/0): 3
The resulting sorted linked list is: 2 3 5 7 8 9

Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 5
The resulting linked list is: 2 3 5 7 8 9

Please input your choice(1/2/3/0): 2
The value 5 was added at index -1

Please input your choice(1/2/3/0): 3
The resulting sorted linked list is: 2 3 5 7 8 9

Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 11
The resulting linked list is: 2 3 5 7 8 9 11

Please input your choice(1/2/3/0): 2
The value 11 was added at index 6

Please input your choice(1/2/3/0): 3
The resulting sorted linked list is: 2 3 5 7 8 9 11
```

---

## 2. `alternateMergeLL`

`alternateMergeLL()` 함수를 작성하시오.

두 번째 연결 리스트의 노드들을 첫 번째 연결 리스트의 **번갈아 위치**에 삽입해야 합니다.

조건:
- 첫 번째 리스트에 번갈아 끼워 넣을 자리가 있을 때만 두 번째 리스트의 노드를 삽입합니다.
- 첫 번째 리스트가 더 길다면, 두 번째 리스트는 최종적으로 빈 리스트가 될 수 있습니다.

함수 원형:

```c
void alternateMergeLL(LinkedList *ll1, LinkedList *ll2);
```

예시 1:

```text
LinkedList1: 1, 2, 3
LinkedList2: 4, 5, 6, 7
```

결과:

```text
LinkedList1: 1, 4, 2, 5, 3, 6
LinkedList2: 7
```

예시 2:

```text
LinkedList1: 1, 5, 7, 3, 9, 11
LinkedList2: 6, 10, 2, 4
```

결과:

```text
LinkedList1: 1, 6, 5, 10, 7, 2, 3, 4, 9, 11
LinkedList2: empty
```

예시 실행:

```text
Linked list 1: 1 2 3
Linked list 2: 4 5 6 7
Please input your choice(1/2/3/0): 3
The resulting linked lists after merging the given linked list are:
Linked list 1: 1 4 2 5 3 6
Linked list 2: 7
```

---

## 3. `moveOddItemsToBackLL`

`moveOddItemsToBackLL()` 함수를 작성하시오.

연결 리스트 안의 **홀수 값들을 모두 뒤쪽으로 이동**시켜야 합니다.

함수 원형:

```c
void moveOddItemsToBackLL(LinkedList *ll);
```

예시:

```text
입력 리스트: 2, 3, 4, 7, 15, 18
결과 리스트: 2 4 18 3 7 15
```

```text
입력 리스트: 2, 7, 18, 3, 4, 15
결과 리스트: 2 18 4 7 3 15
```

```text
입력 리스트: 1, 3, 5
결과 리스트: 1 3 5
```

```text
입력 리스트: 2, 4, 6
결과 리스트: 2 4 6
```

---

## 4. `moveEvenItemsToBackLL`

`moveEvenItemsToBackLL()` 함수를 작성하시오.

연결 리스트 안의 **짝수 값들을 모두 뒤쪽으로 이동**시켜야 합니다.

함수 원형:

```c
void moveEvenItemsToBackLL(LinkedList *ll);
```

예시:

```text
입력 리스트: 2, 3, 4, 7, 15, 18
결과 리스트: 3 7 15 2 4 18
```

```text
입력 리스트: 2, 7, 18, 3, 4, 15
결과 리스트: 7 3 15 2 18 4
```

```text
입력 리스트: 1, 3, 5
결과 리스트: 1 3 5
```

```text
입력 리스트: 2, 4, 6
결과 리스트: 2 4 6
```

---

## 5. `frontBackSplitLL`

`frontBackSplitLL()` 함수를 작성하시오.

단일 연결 리스트를 두 개의 서브리스트로 분리해야 합니다.

- 앞쪽 절반을 담는 리스트: `frontList`
- 뒤쪽 절반을 담는 리스트: `backList`

조건:
- 원소 개수가 홀수라면 **앞 리스트가 하나 더 많이 가져야 합니다**.
- 함수는 분리 결과인 `frontList`와 `backList`를 출력합니다.

함수 원형:

```c
void frontBackSplitLL(LinkedList *ll, LinkedList *resultFrontList, LinkedList *resultBackList);
```

예시:

```text
입력 리스트: 2, 3, 5, 6, 7
```

결과:

```text
frontList: 2, 3, 5
backList: 6, 7
```

예시 메뉴:

```text
1: 연결 리스트에 정수 삽입
2: 연결 리스트 출력
3: 연결 리스트를 frontList 와 backList 두 개로 분리
0: 종료
```

예시 실행:

```text
Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 2
The resulting linked list is: 2

Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 3
The resulting linked list is: 2 3

Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 5
The resulting linked list is: 2 3 5

Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 6
The resulting linked list is: 2 3 5 6

Please input your choice(1/2/3/0): 1
Input an integer that you want to add to the linked list: 7
The resulting linked list is: 2 3 5 6 7

Please input your choice(1/2/3/0): 2
The resulting linked list is: 2 3 5 6 7

Please input your choice(1/2/3/0): 3
The resulting linked lists after splitting the given linked list are:
Front linked list: 2 3 5
Back linked list: 6 7
```

---

## 6. `moveMaxToFront`

`moveMaxToFront()` 함수를 작성하시오.

이 함수는 연결 리스트를 **최대 한 번만 순회**한 뒤, **가장 큰 값을 가진 노드**를 리스트의 맨 앞으로 이동시켜야 합니다.

함수 원형:

```c
int moveMaxToFront(ListNode **ptrHead);
```

예시:

```text
입력 리스트: 30, 20, 40, 70, 50
결과 리스트: 70, 30, 20, 40, 50
```

예시 메뉴:

```text
1: 연결 리스트에 정수 삽입
2: 가장 큰 값을 가진 노드를 맨 앞으로 이동
0: 종료
```

예시 실행:

```text
Please input your choice(1/2/0): 1
Input an integer that you want to add to the linked list: 30
The Linked List is: 30

Please input your choice(1/2/0): 1
Input an integer that you want to add to the linked list: 20
The Linked List is: 30 20

Please input your choice(1/2/0): 1
Input an integer that you want to add to the linked list: 40
The Linked List is: 30 20 40

Please input your choice(1/2/0): 1
Input an integer that you want to add to the linked list: 70
The Linked List is: 30 20 40 70

Please input your choice(1/2/0): 1
Input an integer that you want to add to the linked list: 50
The Linked List is: 30 20 40 70 50

Please input your choice(1/2/0): 2
The resulting Linked List is: 70 30 20 40 50

Please input your choice(1/2/0): 0
```

---

## 7. `recursiveReverse`

`recursiveReverse()` 함수를 작성하시오.

이 함수는 **재귀적으로** 연결 리스트를 뒤집어야 하며,

- 각 노드의 `next` 포인터를 바꾸고
- head 포인터도 함께 바꿔야 합니다.

함수 원형:

```c
void recursiveReverse(ListNode **ptrHead);
```

예시:

```text
입력 리스트: 1, 2, 3, 4, 5
결과 리스트: 5, 4, 3, 2, 1
```

예시 메뉴:

```text
1: 연결 리스트에 정수 삽입
2: 연결 리스트 뒤집기
0: 종료
```

예시 실행:

```text
Please input your choice(1/2/0): 1
Input an integer that you want to add to the linked list: 1
The resulting Linked List is: 1

Please input your choice(1/2/0): 1
Input an integer that you want to add to the linked list: 2
The resulting Linked List is: 1 2

Please input your choice(1/2/0): 1
Input an integer that you want to add to the linked list: 3
The resulting Linked List is: 1 2 3

Please input your choice(1/2/0): 1
Input an integer that you want to add to the linked list: 4
The resulting Linked List is: 1 2 3 4

Please input your choice(1/2/0): 1
Input an integer that you want to add to the linked list: 5
The resulting Linked List is: 1 2 3 4 5

Please input your choice(1/2/0): 2
The resulting Linked List after reversing its elements is: 5 4 3 2 1

Please input your choice(1/2/0): 0
```

---

## 재혁님용 짧은 정리

- 1번: 정렬 유지하면서 중복 없이 삽입
- 2번: 두 리스트를 번갈아 섞기
- 3번: 홀수를 뒤로 보내기
- 4번: 짝수를 뒤로 보내기
- 5번: 앞/뒤 절반으로 나누기
- 6번: 최댓값 노드를 맨 앞으로 보내기
- 7번: 재귀로 리스트 뒤집기
