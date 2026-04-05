# 스택과 큐 문제 번역

원본: `C:\jungle2\data_structures_docker\Data-Structures\Stack_and_Queue\Stack and Queues Questions.pdf`

참고:
- 원문 PDF 중간에 깨진 문자와 메모처럼 보이는 힌트 텍스트가 섞여 있었는데, 문제 본문과 직접 관련 없는 부분은 제외했습니다.
- 함수 원형, 요구사항, 예시 입출력 중심으로 번역했습니다.

---

## Section C - Stack and Queues

이 섹션에서 지정된 1개의 문제에 답하시오.

정보:
- 각 문제의 프로그램 템플릿은 APAS 시스템에 제공됩니다.
- 반드시 제공된 템플릿을 사용하여 함수를 구현해야 합니다.

---

## 1. `createQueueFromLinkedList`

`createQueueFromLinkedList()` 함수를 작성하시오.

이 함수는 연결 리스트에 저장된 모든 정수를 차례대로 `enqueue`하여, `연결 리스트 기반 큐`를 만들어야 합니다.

조건:
- 연결 리스트의 첫 번째 노드를 먼저 enqueue
- 그다음 두 번째 노드, 세 번째 노드 순서로 enqueue
- 큐가 비어 있지 않다면, 시작할 때 먼저 큐를 비워야 함

함수 원형:

```c
void createQueueFromLinkedList(LinkedList *ll, Queue *q);
```

예시:

현재 연결 리스트가

```text
1 2 3 4 5
```

이라면,

```text
The resulting linked list is: 1 2 3 4 5
Please input your choice(1/2/3/0): 2
The resulting queue is: 1 2 3 4 5
```

---

## 2. `createStackFromLinkedList`

`createStackFromLinkedList()` 함수를 작성하시오.

이 함수는 연결 리스트에 저장된 모든 정수를 차례대로 `push`하여, `연결 리스트 기반 스택`을 만들어야 합니다.

조건:
- 연결 리스트의 첫 번째 노드를 먼저 push
- 그다음 두 번째 노드, 세 번째 노드 순서로 push
- 스택이 비어 있지 않다면, 시작할 때 먼저 스택을 비워야 함

함수 원형:

```c
void createStackFromLinkedList(LinkedList *ll, Stack *stack);
```

예시:

현재 연결 리스트가

```text
1 3 5 6 7
```

이라면,

```text
The resulting linked list is: 1 3 5 6 7
Please input your choice(1/2/3/0): 2
The resulting stack is: 7 6 5 3 1
```

---

## 3. `isStackPairwiseConsecutive`

`isStackPairwiseConsecutive()` 함수를 작성하시오.

이 함수는 스택 안의 숫자들이 `두 개씩 짝지었을 때 연속된 수(pairwise consecutive)`인지 검사해야 합니다.

조건:
- 스택에서 값을 넣거나 뺄 때는 `push()`와 `pop()`만 사용해야 함

함수 원형:

```c
int isStackPairwiseConsecutive(Stack *s);
```

의미:
- 예를 들어 `(16, 15)`, `(11, 10)`, `(5, 4)`처럼 각 쌍의 차이가 1이면 연속된 수라고 봅니다.
- 스택의 원소 개수가 홀수이면 마지막 원소는 짝이 없으므로 연속 쌍 조건을 만족하지 않는 것으로 처리됩니다.

예시 1:

```text
The stack is: 16 15 11 10 5 4
The stack is pairwise consecutive
```

예시 2:

```text
The stack is: 16 15 11 10 5 1
The stack is not pairwise consecutive
```

예시 3:

```text
The stack is: 16 15 11 10 5
The stack is not pairwise consecutive
```

---

## 4. `reverseQueue`

`reverseQueue()` 함수를 작성하시오.

이 함수는 `스택을 사용해서` 큐의 순서를 뒤집어야 합니다.

조건:
- 스택에서는 `push()`와 `pop()`만 사용
- 큐에서는 `enqueue()`와 `dequeue()`만 사용
- 스택이 비어 있지 않다면, 시작할 때 먼저 스택을 비워야 함

함수 원형:

```c
void reverseQueue(Queue *q);
```

예시:

큐가

```text
(1, 2, 3, 4, 5)
```

이면, 결과는

```text
(5, 4, 3, 2, 1)
```

---

## 5. `recursiveReverseQueue`

`recursiveReverseQueue()` 함수를 작성하시오.

이 함수는 `재귀 함수`를 사용해서 큐 안의 정수 순서를 뒤집어야 합니다.

함수 원형:

```c
void recursiveReverseQueue(Queue *q);
```

예시:

큐가

```text
(1, 2, 3, 4, 5)
```

이면, 결과는

```text
(5, 4, 3, 2, 1)
```

---

## 6. `removeUntilStack`

`removeUntilStack()` 함수를 작성하시오.

이 함수는 스택에서 값을 계속 `pop`하다가, 선택한 값이 `처음 등장하는 위치`까지 제거해야 합니다.

함수 원형:

```c
void removeUntilStack(Stack *s, int value);
```

설명:
- 스택의 맨 위(top)는 왼쪽에 표시된다고 가정함
- `value`를 만날 때까지 pop
- `value`를 만나면 그 값은 스택에 남겨두고 종료

예시 1:

스택이

```text
(1, 2, 3, 4, 5, 6, 7)
```

이고, top이 왼쪽일 때 `value = 4`로 호출하면 결과는

```text
(4, 5, 6, 7)
```

예시 2:

스택이

```text
(10, 20, 15, 25, 5)
```

이고, top이 왼쪽일 때 `value = 15`로 호출하면 결과는

```text
(15, 25, 5)
```

---

## 7. `balanced`

`balanced()` 함수를 작성하시오.

이 함수는 `()[]{} ` 문자들로 이루어진 식이 `균형 잡힌 괄호식`인지 판단해야 합니다.

함수 원형:

```c
int balanced(char *expression);
```

설명:
- 여는 괄호와 닫는 괄호의 개수가 맞아야 함
- 순서도 올바르게 짝이 맞아야 함

균형 잡힌 예시:

```text
()
([])
{[]()[]}
```

예시 입력/출력:

```text
1: Enter a string:
2: Check whether expressions comprised of the characters ()[]{} is balanced:
0: Quit:
Please input your choice(1/0): 1
Enter expressions without spaces to check whether it is balanced or not: {[]()[]}
{[]()[]}
balanced!
Please input your choice(1/0): 0
```

균형이 맞지 않는 예시:

```text
{{)]
[({{)])
```

예시 입력/출력:

```text
1: Enter a string:
2: Check whether expressions comprised of the characters ()[]{} is balanced:
0: Quit:
Please input your choice(1/0): 1
Enter expressions without spaces to check whether it is balanced or not: [({{)])
[({{)])
not balanced!
Please input your choice(1/0): 0
```

---

## 재혁님용 짧은 해석

- 1번은 `연결 리스트 -> 큐`로 옮기는 문제
- 2번은 `연결 리스트 -> 스택`으로 옮기는 문제
- 3번은 스택 원소를 `2개씩` 보며 차이가 1인지 확인하는 문제
- 4번은 `스택 1개를 보조로 써서` 큐를 뒤집는 문제
- 5번은 `재귀`만으로 큐를 뒤집는 문제
- 6번은 원하는 값이 나올 때까지 스택 위쪽을 제거하는 문제
- 7번은 `괄호 짝 검사` 문제

요약: `Stack and Queues Questions.pdf`의 7개 문제를 한국어로 번역해서 `C:\jungle2\data_structures_docker\Stack and Queues Questions_ko.md` 파일로 정리했습니다.
