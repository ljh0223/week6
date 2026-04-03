const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");
const fontkit = require("@pdf-lib/fontkit");

const rootDir = "C:/jungle2/data_structures_docker";
const outputPath = path.join(rootDir, "c-study-6hours-step2-text.pdf");
const fontPath = "C:/Windows/Fonts/malgun.ttf";

const pages = [
  {
    title: "6시간 C 언어 다음 단계 학습서",
    blocks: [
      "대상: C 기본 문법을 한 번 끝까지 보고, 이제 이해했다에서 직접 구현할 수 있다로 넘어가려는 재혁님.",
      "핵심 방향: 문법 복습보다 구현 연습, 디버깅 습관, 자료구조 감각을 만드는 6시간입니다.",
      {
        heading: "이 PDF의 목표",
        bullets: [
          "배운 문법을 실제 문제 코드에 연결한다.",
          "배열, 포인터, 구조체, 함수가 함께 쓰이는 흐름을 익힌다.",
          "Linked List, Stack/Queue, Tree 문제를 보고 겁먹지 않게 만든다.",
          "컴파일 에러와 런타임 오류를 스스로 좁혀가는 습관을 만든다.",
        ],
      },
      {
        heading: "6시간 전체 흐름",
        bullets: [
          "1시간차: 문법을 짧은 구현으로 다시 묶기",
          "2시간차: 포인터와 구조체 체감하기",
          "3시간차: Linked List 손으로 만들기",
          "4시간차: Stack / Queue 규칙 익히기",
          "5시간차: Tree와 재귀 구조 읽기",
          "6시간차: 현재 저장소 문제 한 개 완주하기",
        ],
      },
      "성공 기준: 모르는 것이 하나도 없는 상태가 아니라, 막혀도 어디서부터 확인해야 하는지 아는 상태면 성공입니다.",
    ],
  },
  {
    title: "1시간차: 문법을 구현으로 다시 묶기",
    blocks: [
      "변수, 함수, 배열, 구조체를 각각 따로 외우지 말고 작은 예제로 다시 연결합니다. 각 항목당 10분 정도로 짧게 돌리는 것이 핵심입니다.",
      {
        heading: "연습 1. 함수와 반환값",
        code: [
          "int add(int a, int b) {",
          "    return a + b;",
          "}",
        ],
      },
      {
        bullets: [
          "함수 선언과 호출을 직접 세 번 써본다.",
          "return이 없으면 왜 문제가 되는지 말로 설명해본다.",
          "입력 2개, 반환 1개 구조를 익힌다.",
        ],
      },
      {
        heading: "연습 2. 배열과 반복문",
        code: [
          "int arr[5] = {1, 2, 3, 4, 5};",
          "for (int i = 0; i < 5; i++) {",
          '    printf("%d\\n", arr[i]);',
          "}",
        ],
      },
      {
        bullets: [
          "i++, i += 2를 각각 바꿔 써본다.",
          "배열 길이와 인덱스 차이를 구분한다.",
          "오프바이원 실수를 일부러 만들고 고친다.",
        ],
      },
      {
        heading: "연습 3. 구조체",
        code: [
          "struct Student {",
          "    int id;",
          "    int score;",
          "};",
        ],
      },
      "체크 질문: 배열은 무엇을 저장하고, 포인터는 무엇을 저장하고, 구조체는 무엇을 묶는가?",
    ],
  },
  {
    title: "2시간차: 포인터와 구조체를 진짜로 이해하기",
    blocks: [
      "자료구조는 결국 주소를 저장하고 따라가는 기술입니다. 포인터를 넘기지 못하면 Linked List도 바로 막힙니다.",
      {
        code: [
          "#include <stdio.h>",
          "",
          "int main(void) {",
          "    int x = 10;",
          "    int* p = &x;",
          '    printf("x = %d\\n", x);',
          '    printf("p = %p\\n", (void*)p);',
          '    printf("*p = %d\\n", *p);',
          "    *p = 20;",
          '    printf("x = %d\\n", x);',
          "    return 0;",
          "}",
        ],
      },
      {
        heading: "여기서 꼭 느껴야 하는 것",
        bullets: [
          "p는 주소이고, *p는 그 주소가 가리키는 실제 값이다.",
          "값을 직접 건드리지 않아도 포인터를 통해 바꿀 수 있다.",
          "NULL 체크 없이 접근하면 위험하다.",
        ],
      },
      {
        heading: "구조체 포인터도 같은 원리",
        code: [
          "struct Student s;",
          "struct Student* ps = &s;",
          "ps->id = 1;",
          "ps->score = 95;",
        ],
      },
      "목표: 주소를 따라가서 값을 바꾼다는 문장을 코드 없이 말로 설명할 수 있으면 충분합니다.",
    ],
  },
  {
    title: "3시간차: Linked List를 손으로 만들기",
    blocks: [
      "배열처럼 옆 칸으로 가는 것이 아니라, 다음 노드의 주소를 따라간다는 감각만 정확히 잡으면 됩니다.",
      {
        code: [
          "struct Node {",
          "    int data;",
          "    struct Node* next;",
          "};",
          "",
          "head->data = 10;",
          "head->next = second;",
          "second->data = 20;",
          "second->next = third;",
          "third->data = 30;",
          "third->next = NULL;",
        ],
      },
      {
        heading: "이 시간의 연습 순서",
        bullets: [
          "노드 3개 연결하기",
          "while (current != NULL) 로 순회하기",
          "맨 앞에 노드 1개 추가하기",
          "맨 끝에 노드 1개 추가하기",
        ],
      },
      {
        heading: "반드시 설명할 수 있어야 하는 문장",
        bullets: [
          "Linked List는 각 노드가 다음 노드 주소를 저장하는 구조다.",
          "head는 첫 노드를 가리킨다.",
          "current = current->next 는 다음 노드로 이동하는 코드다.",
        ],
      },
      "추천 연결: 현재 저장소의 Linked List 첫 문제를 열고, 함수가 어떤 포인터를 받고 어떤 포인터를 바꾸는지만 먼저 읽어보세요.",
    ],
  },
  {
    title: "4시간차: Stack / Queue는 규칙의 차이",
    blocks: [
      "새로운 마법처럼 보이지만 실제로는 넣는 규칙과 빼는 규칙이 다를 뿐입니다. Stack은 LIFO, Queue는 FIFO입니다.",
      {
        code: [
          "int stack[100];",
          "int top = -1;",
          "",
          "void push(int x) {",
          "    top++;",
          "    stack[top] = x;",
          "}",
          "",
          "int pop(void) {",
          "    int value = stack[top];",
          "    top--;",
          "    return value;",
          "}",
        ],
      },
      {
        heading: "이 시간 목표",
        bullets: [
          "top, front, rear가 각각 무엇을 뜻하는지 구분한다.",
          "push/pop, enqueue/dequeue를 손으로 추적한다.",
          "배열 버전과 연결 리스트 버전 차이를 말로 설명한다.",
        ],
      },
      {
        heading: "권장 미션",
        bullets: [
          "숫자 3개를 push 하고 pop 결과를 예상해본다.",
          "숫자 3개를 enqueue 하고 dequeue 결과를 예상해본다.",
          "비어 있을 때 pop 하면 어떻게 처리할지 직접 정한다.",
        ],
      },
    ],
  },
  {
    title: "5시간차: Tree와 재귀를 두려워하지 않기",
    blocks: [
      "Tree는 노드 하나가 자식 포인터를 여러 개 가질 수 있는 구조입니다. 재귀를 완벽히 외우는 것보다 구조를 읽는 것이 먼저입니다.",
      {
        code: [
          "struct TreeNode {",
          "    int data;",
          "    struct TreeNode* left;",
          "    struct TreeNode* right;",
          "};",
          "",
          "void preorder(struct TreeNode* node) {",
          "    if (node == NULL) return;",
          '    printf("%d\\n", node->data);',
          "    preorder(node->left);",
          "    preorder(node->right);",
          "}",
        ],
      },
      {
        heading: "재귀를 볼 때 확인할 것",
        bullets: [
          "이 함수는 언제 멈추는가?",
          "현재 노드에서 무엇을 처리하는가?",
          "다음에는 왼쪽과 오른쪽 중 어디로 가는가?",
        ],
      },
      {
        heading: "재혁님 단계의 핵심",
        bullets: [
          "Linked List의 next 하나가 Tree에서는 left, right 두 개로 늘어난 느낌으로 이해한다.",
          "루트, 왼쪽 자식, 오른쪽 자식을 그림으로 그릴 수 있어야 한다.",
          "멈추는 조건과 다음 호출 방향 두 가지만 놓치지 않는다.",
        ],
      },
    ],
  },
  {
    title: "6시간차: 현재 저장소 문제 한 개 끝까지 가기",
    blocks: [
      "작은 예제에서 끝내지 말고 실제 문제 파일로 연결합니다. 한 문제를 완벽히 맞히는 것보다 코드 흐름을 읽고 한 칸씩 수정하는 힘이 중요합니다.",
      {
        heading: "추천 진입 순서",
        bullets: [
          "Linked List 첫 문제 파일 열기",
          "입출력보다 함수 역할부터 읽기",
          "주어진 틀에서 비어 있는 부분만 채우기",
          "작은 입력으로 직접 테스트하기",
          "출력이 틀리면 중간 값을 print 해서 좁히기",
        ],
      },
      {
        heading: "막혔을 때 순서",
        bullets: [
          "컴파일 에러를 한 개씩 먼저 없앤다.",
          "출력값이 틀리면 중간 값을 찍어본다.",
          "포인터면 주소와 값 둘 다 확인한다.",
          "마지막 노드, 빈 구조, 경계 조건을 다시 본다.",
        ],
      },
      {
        heading: "오늘 끝나고 남겨야 할 것",
        bullets: [
          "내가 헷갈린 문법 3개",
          "직접 구현한 예제 2개",
          "스스로 설명 가능해진 개념 1개",
        ],
      },
      "다음 추천 순서: Linked List 한 문제 완주 -> Stack/Queue 한 문제 완주 -> Tree 코드 읽기.",
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
    accent: rgb(0.72, 0.36, 0.22),
    codeBg: rgb(0.96, 0.95, 0.91),
    line: rgb(0.85, 0.8, 0.74),
  };

  for (const pageData of pages) {
    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = topY;

    page.drawRectangle({
      x: 0,
      y: pageHeight - 18,
      width: pageWidth,
      height: 18,
      color: rgb(0.95, 0.85, 0.79),
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
        const codeSize = 10.5;
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

    page.drawText("C Study Step 2", {
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
