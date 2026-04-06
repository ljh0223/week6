const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");
const fontkit = require("@pdf-lib/fontkit");

const rootDir = "C:/jungle2/data_structures_docker";
const outputPath = path.join(rootDir, "c-stack-queue-for-jaehyeok.pdf");
const fontPath = "C:/Windows/Fonts/malgun.ttf";

const pages = [
  {
    title: "C 스택과 큐 입문서",
    blocks: [
      "대상: C 언어를 막 배우는 재혁님이 스택과 큐를 헷갈리지 않도록 개념부터 구현까지 한 번에 정리하는 자료입니다.",
      "핵심 목표: 스택과 큐를 암기하는 것이 아니라, 언제 넣고 어디서 빼는 구조인지 코드로 이해하는 것입니다.",
      {
        heading: "먼저 큰 그림",
        bullets: [
          "스택(Stack)은 나중에 넣은 것을 먼저 빼는 구조입니다. LIFO라고 부릅니다.",
          "큐(Queue)는 먼저 넣은 것을 먼저 빼는 구조입니다. FIFO라고 부릅니다.",
          "둘 다 데이터를 순서 있게 관리하지만, 꺼내는 규칙이 다릅니다.",
          "구현은 배열로도 할 수 있고, 연결리스트로도 할 수 있습니다.",
        ],
      },
      {
        heading: "비유로 이해하기",
        bullets: [
          "스택: 책을 위로 쌓아 두면 맨 위 책부터 꺼내야 합니다.",
          "큐: 줄 서기처럼 먼저 온 사람이 먼저 나갑니다.",
          "스택의 핵심 위치는 top입니다.",
          "큐의 핵심 위치는 front와 rear입니다.",
        ],
      },
    ],
  },
  {
    title: "1. 스택 기본 개념",
    blocks: [
      "스택은 한쪽 끝에서만 넣고(push) 같은 쪽 끝에서만 빼는(pop) 구조입니다. 그래서 마지막에 들어간 값이 가장 먼저 나옵니다.",
      {
        heading: "배열로 스택 만들기",
        code: [
          "#define SIZE 100",
          "",
          "int stack[SIZE];",
          "int top = -1;",
          "",
          "void push(int value) {",
          "    if (top == SIZE - 1) {",
          '        printf("stack is full\\n");',
          "        return;",
          "    }",
          "    top++;",
          "    stack[top] = value;",
          "}",
          "",
          "int pop(void) {",
          "    int value;",
          "    if (top == -1) {",
          '        printf("stack is empty\\n");',
          "        return -1;",
          "    }",
          "    value = stack[top];",
          "    top--;",
          "    return value;",
          "}",
        ],
      },
      {
        heading: "이 코드에서 꼭 볼 것",
        bullets: [
          "top = -1 은 스택이 비어 있다는 뜻입니다.",
          "push 할 때는 top을 먼저 올리고 값을 저장합니다.",
          "pop 할 때는 top 위치 값을 꺼내고 top을 하나 내립니다.",
          "배열 범위를 넘지 않도록 가득 찼는지 먼저 검사해야 합니다.",
        ],
      },
      {
        heading: "직접 따라가 보기",
        bullets: [
          "처음: top = -1",
          "push(10): top = 0, stack[0] = 10",
          "push(20): top = 1, stack[1] = 20",
          "pop(): 20 반환, top = 0",
          "다시 pop(): 10 반환, top = -1",
        ],
      },
    ],
  },
  {
    title: "2. 큐 기본 개념",
    blocks: [
      "큐는 뒤(rear)로 넣고, 앞(front)에서 빼는 구조입니다. 먼저 넣은 값이 먼저 나옵니다.",
      {
        heading: "배열로 큐 만들기",
        code: [
          "#define SIZE 100",
          "",
          "int queue[SIZE];",
          "int front = 0;",
          "int rear = -1;",
          "int count = 0;",
          "",
          "void enqueue(int value) {",
          "    if (count == SIZE) {",
          '        printf("queue is full\\n");',
          "        return;",
          "    }",
          "    rear++;",
          "    queue[rear] = value;",
          "    count++;",
          "}",
          "",
          "int dequeue(void) {",
          "    int value;",
          "    if (count == 0) {",
          '        printf("queue is empty\\n");',
          "        return -1;",
          "    }",
          "    value = queue[front];",
          "    front++;",
          "    count--;",
          "    return value;",
          "}",
        ],
      },
      {
        heading: "이 코드에서 꼭 볼 것",
        bullets: [
          "enqueue 는 rear 쪽으로 들어갑니다.",
          "dequeue 는 front 쪽에서 빠집니다.",
          "큐는 비어 있는지 확인할 때 count == 0 을 많이 씁니다.",
          "배열 큐는 front와 rear가 계속 증가하므로, 실제로는 원형 큐를 배우는 경우가 많습니다.",
        ],
      },
      {
        heading: "직접 따라가 보기",
        bullets: [
          "enqueue(3), enqueue(5), enqueue(7) 하면 큐 순서는 3 5 7",
          "dequeue() 하면 3이 나갑니다.",
          "그다음 dequeue() 하면 5가 나갑니다.",
          "즉 먼저 들어간 값이 먼저 나옵니다.",
        ],
      },
    ],
  },
  {
    title: "3. 연결리스트로 구현할 때",
    blocks: [
      "배열은 크기가 고정되어 있지만, 연결리스트는 필요한 만큼 노드를 만들 수 있다는 장점이 있습니다.",
      {
        heading: "공통 노드 구조",
        code: [
          "typedef struct _listnode {",
          "    int item;",
          "    struct _listnode *next;",
          "} ListNode;",
        ],
      },
      {
        heading: "연결리스트 스택",
        code: [
          "void push(ListNode **top, int value) {",
          "    ListNode *newNode = malloc(sizeof(ListNode));",
          "    newNode->item = value;",
          "    newNode->next = *top;",
          "    *top = newNode;",
          "}",
          "",
          "int pop(ListNode **top) {",
          "    ListNode *temp;",
          "    int value;",
          "    if (*top == NULL) return -1;",
          "    temp = *top;",
          "    value = temp->item;",
          "    *top = temp->next;",
          "    free(temp);",
          "    return value;",
          "}",
        ],
      },
      {
        heading: "연결리스트 큐",
        code: [
          "typedef struct _queue {",
          "    ListNode *front;",
          "    ListNode *rear;",
          "} Queue;",
          "",
          "void enqueue(Queue *q, int value) {",
          "    ListNode *newNode = malloc(sizeof(ListNode));",
          "    newNode->item = value;",
          "    newNode->next = NULL;",
          "    if (q->rear == NULL) {",
          "        q->front = newNode;",
          "        q->rear = newNode;",
          "        return;",
          "    }",
          "    q->rear->next = newNode;",
          "    q->rear = newNode;",
          "}",
          "",
          "int dequeue(Queue *q) {",
          "    ListNode *temp;",
          "    int value;",
          "    if (q->front == NULL) return -1;",
          "    temp = q->front;",
          "    value = temp->item;",
          "    q->front = temp->next;",
          "    if (q->front == NULL) q->rear = NULL;",
          "    free(temp);",
          "    return value;",
          "}",
        ],
      },
    ],
  },
  {
    title: "4. 꼭 구분해야 할 포인트",
    blocks: [
      {
        heading: "스택 vs 큐 핵심 비교",
        bullets: [
          "스택: push 와 pop 이 같은 쪽(top)에서 일어납니다.",
          "큐: enqueue 는 rear, dequeue 는 front 에서 일어납니다.",
          "스택은 최근 데이터가 먼저 나옵니다.",
          "큐는 오래된 데이터가 먼저 나옵니다.",
        ],
      },
      {
        heading: "초보자가 자주 하는 실수",
        bullets: [
          "스택에서 top 증가와 저장 순서를 헷갈립니다.",
          "큐에서 front 와 rear 역할을 바꿔 씁니다.",
          "비어 있는 상태를 검사하지 않고 pop, dequeue 를 호출합니다.",
          "malloc 으로 만든 노드를 free 하지 않아 메모리 누수가 생깁니다.",
          "연결리스트 큐에서 마지막 원소를 뺀 뒤 rear 를 NULL 로 안 바꿉니다.",
        ],
      },
      {
        heading: "재혁님용 체크 질문",
        bullets: [
          "왜 스택은 top 하나만으로도 동작할까요?",
          "왜 큐는 보통 front 와 rear 둘 다 필요할까요?",
          "배열 스택에서 가득 찼는지 확인하는 조건은 무엇일까요?",
          "연결리스트 큐에서 마지막 원소를 뺀 뒤 어떤 포인터를 같이 정리해야 할까요?",
        ],
      },
    ],
  },
  {
    title: "5. 작은 연습과 다음 단계",
    blocks: [
      {
        heading: "연습 1. 스택 손으로 추적",
        bullets: [
          "빈 스택에서 push(1), push(2), push(3)을 합니다.",
          "그다음 pop 두 번 하면 어떤 값이 나오는지 직접 써 봅니다.",
          "정답은 3, 2 입니다.",
        ],
      },
      {
        heading: "연습 2. 큐 손으로 추적",
        bullets: [
          "빈 큐에서 enqueue(1), enqueue(2), enqueue(3)을 합니다.",
          "그다음 dequeue 두 번 하면 어떤 값이 나오는지 써 봅니다.",
          "정답은 1, 2 입니다.",
        ],
      },
      {
        heading: "연습 3. 코드로 해보기",
        code: [
          "int main(void) {",
          "    push(10);",
          "    push(20);",
          '    printf("%d\\n", pop());',
          '    printf("%d\\n", pop());',
          "    return 0;",
          "}",
        ],
      },
      {
        heading: "다음 추천 순서",
        bullets: [
          "배열 버전 스택과 큐를 먼저 직접 손으로 추적합니다.",
          "그다음 연결리스트 버전에서 포인터가 어떻게 바뀌는지 봅니다.",
          "마지막으로 현재 저장소의 Stack_and_Queue 문제를 한 문제씩 풀어 봅니다.",
        ],
      },
      "핵심 한 줄: 스택과 큐는 새로운 마법 구조가 아니라, 데이터를 넣고 빼는 규칙이 다른 구조입니다.",
    ],
  },
];

function wrapText(text, font, size, maxWidth) {
  const lines = [];
  const paragraphs = String(text).split("\n");

  for (const paragraph of paragraphs) {
    if (paragraph === "") {
      lines.push("");
      continue;
    }

    const words = paragraph.split(" ");
    let current = "";

    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      const width = font.widthOfTextAtSize(candidate, size);

      if (width <= maxWidth) {
        current = candidate;
      } else {
        if (current) lines.push(current);
        if (font.widthOfTextAtSize(word, size) <= maxWidth) {
          current = word;
        } else {
          let chunk = "";
          for (const char of word) {
            const chunkCandidate = chunk + char;
            if (font.widthOfTextAtSize(chunkCandidate, size) <= maxWidth) {
              chunk = chunkCandidate;
            } else {
              if (chunk) lines.push(chunk);
              chunk = char;
            }
          }
          current = chunk;
        }
      }
    }

    if (current) lines.push(current);
  }

  return lines;
}

function drawWrappedText(page, text, font, size, x, y, maxWidth, color) {
  const lines = wrapText(text, font, size, maxWidth);
  for (const line of lines) {
    page.drawText(line, { x, y, size, font, color });
    y -= size + 5;
  }
  return y;
}

async function main() {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const fontBytes = fs.readFileSync(fontPath);
  const regularFont = await pdfDoc.embedFont(fontBytes, { subset: true });

  const pageWidth = 595;
  const pageHeight = 842;
  const marginX = 52;
  const topY = 790;
  const maxWidth = pageWidth - marginX * 2;
  const colors = {
    text: rgb(0.11, 0.14, 0.18),
    muted: rgb(0.37, 0.4, 0.44),
    accent: rgb(0.1, 0.38, 0.53),
    codeBg: rgb(0.94, 0.97, 0.98),
    line: rgb(0.76, 0.84, 0.88),
    bar: rgb(0.84, 0.92, 0.95),
  };

  for (const pageData of pages) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = topY;

    page.drawRectangle({
      x: 0,
      y: pageHeight - 18,
      width: pageWidth,
      height: 18,
      color: colors.bar,
    });

    page.drawText(pageData.title, {
      x: marginX,
      y,
      size: 22,
      font: regularFont,
      color: colors.text,
    });
    y -= 34;

    for (const block of pageData.blocks) {
      if (typeof block === "string") {
        y = drawWrappedText(page, block, regularFont, 11.5, marginX, y, maxWidth, colors.text);
        y -= 10;
        continue;
      }

      if (block.heading) {
        page.drawText(block.heading, {
          x: marginX,
          y,
          size: 14,
          font: regularFont,
          color: colors.accent,
        });
        y -= 24;
      }

      if (block.code) {
        const codeLines = block.code;
        const codeSize = 10.3;
        const lineHeight = codeSize + 4;
        const boxHeight = codeLines.length * lineHeight + 20;
        page.drawRectangle({
          x: marginX,
          y: y - boxHeight + 8,
          width: maxWidth,
          height: boxHeight,
          color: colors.codeBg,
          borderColor: colors.line,
          borderWidth: 1,
        });
        let codeY = y - 6;
        for (const codeLine of codeLines) {
          page.drawText(codeLine, {
            x: marginX + 12,
            y: codeY,
            size: codeSize,
            font: regularFont,
            color: colors.text,
          });
          codeY -= lineHeight;
        }
        y -= boxHeight + 10;
      }

      if (block.bullets) {
        for (const bullet of block.bullets) {
          const wrapped = wrapText(`- ${bullet}`, regularFont, 11.5, maxWidth - 8);
          for (const line of wrapped) {
            page.drawText(line, {
              x: marginX + 8,
              y,
              size: 11.5,
              font: regularFont,
              color: colors.text,
            });
            y -= 16;
          }
          y -= 3;
        }
        y -= 4;
      }
    }

    page.drawText("C Stack and Queue for Jaehyeok", {
      x: marginX,
      y: 24,
      size: 9,
      font: regularFont,
      color: colors.muted,
    });
  }

  const pdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Created: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
