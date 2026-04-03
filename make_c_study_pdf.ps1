$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = "C:\jungle2\data_structures_docker"
$outputPdf = Join-Path $root "c-study-6hours-step2.pdf"
$tempDir = Join-Path $root ".pdf-build"

if (Test-Path $tempDir) {
    Remove-Item -LiteralPath $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

$pageWidth = 1240
$pageHeight = 1754
$marginX = 96
$startY = 150
$contentWidth = $pageWidth - ($marginX * 2)

$titleFont = New-Object System.Drawing.Font("Malgun Gothic", 30, [System.Drawing.FontStyle]::Bold)
$sectionFont = New-Object System.Drawing.Font("Malgun Gothic", 22, [System.Drawing.FontStyle]::Bold)
$subFont = New-Object System.Drawing.Font("Malgun Gothic", 16, [System.Drawing.FontStyle]::Bold)
$bodyFont = New-Object System.Drawing.Font("Malgun Gothic", 13, [System.Drawing.FontStyle]::Regular)
$smallFont = New-Object System.Drawing.Font("Malgun Gothic", 11, [System.Drawing.FontStyle]::Regular)
$codeFont = New-Object System.Drawing.Font("Consolas", 11, [System.Drawing.FontStyle]::Regular)

$darkBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(28, 36, 48))
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(93, 101, 111))
$accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(184, 92, 56))
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$cardBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 250, 243))
$codeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(246, 241, 232))
$linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(214, 203, 189), 2)

$stringFormat = New-Object System.Drawing.StringFormat
$stringFormat.Alignment = [System.Drawing.StringAlignment]::Near
$stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Near
$stringFormat.Trimming = [System.Drawing.StringTrimming]::Word

function Add-TextBlock {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$Text,
        [System.Drawing.Font]$Font,
        [System.Drawing.Brush]$Brush,
        [float]$X,
        [float]$Y,
        [float]$Width,
        [float]$Spacing = 14
    )

    $size = $Graphics.MeasureString($Text, $Font, [int]$Width)
    $rect = [System.Drawing.RectangleF]::new([float]$X, [float]$Y, [float]$Width, [float]($size.Height + 10))
    $Graphics.DrawString($Text, $Font, $Brush, $rect, $script:stringFormat)
    return [float]($Y + $size.Height + $Spacing)
}

function Add-Bullets {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string[]]$Items,
        [float]$X,
        [float]$Y,
        [float]$Width
    )

    foreach ($item in $Items) {
        $Y = Add-TextBlock -Graphics $Graphics -Text ("- " + $item) -Font $script:bodyFont -Brush $script:darkBrush -X $X -Y $Y -Width $Width -Spacing 8
    }
    return $Y + 6
}

function Add-CodeBlock {
    param(
        [System.Drawing.Graphics]$Graphics,
        [string]$Text,
        [float]$X,
        [float]$Y,
        [float]$Width
    )

    $height = $Graphics.MeasureString($Text, $script:codeFont, [int]($Width - 28)).Height + 28
    $rect = [System.Drawing.RectangleF]::new([float]$X, [float]$Y, [float]$Width, [float]$height)
    $Graphics.FillRectangle($script:codeBrush, $rect)
    $Graphics.DrawRectangle($script:linePen, $X, $Y, $Width, $height)
    $inner = [System.Drawing.RectangleF]::new([float]($X + 14), [float]($Y + 12), [float]($Width - 28), [float]($height - 20))
    $Graphics.DrawString($Text, $script:codeFont, $script:darkBrush, $inner, $script:stringFormat)
    return [float]($Y + $height + 14)
}

function New-PageCanvas {
    $bitmap = New-Object System.Drawing.Bitmap($script:pageWidth, $script:pageHeight)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
    $graphics.Clear([System.Drawing.Color]::FromArgb(255, 253, 248))
    $graphics.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(243, 216, 200))), 0, 0, $script:pageWidth, 54)
    $graphics.FillRectangle((New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(247, 241, 230))), 0, 54, $script:pageWidth, 54)
    return @{ Bitmap = $bitmap; Graphics = $graphics }
}

function Save-Jpeg {
    param(
        [System.Drawing.Bitmap]$Bitmap,
        [string]$Path
    )

    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)
    $Bitmap.Save($Path, $encoder, $encoderParams)
}

function Write-PdfFromJpegs {
    param(
        [string[]]$ImagePaths,
        [string]$OutputPath
    )

    $pdfWidth = 595
    $pdfHeight = 842
    $pageCount = $ImagePaths.Count
    $objectCount = 2 + ($pageCount * 3)
    $offsets = New-Object long[] ($objectCount + 1)

    $fs = [System.IO.File]::Open($OutputPath, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write)
    $writer = New-Object System.IO.BinaryWriter($fs)

    function Write-Ascii([System.IO.BinaryWriter]$BinaryWriter, [string]$Text) {
        $bytes = [System.Text.Encoding]::ASCII.GetBytes($Text)
        $BinaryWriter.Write($bytes)
    }

    Write-Ascii $writer "%PDF-1.4`n"

    $offsets[1] = $fs.Position
    Write-Ascii $writer "1 0 obj`n<< /Type /Catalog /Pages 2 0 R >>`nendobj`n"

    $kids = @()
    for ($i = 0; $i -lt $pageCount; $i++) {
        $pageObj = 3 + ($i * 3)
        $kids += "$pageObj 0 R"
    }

    $offsets[2] = $fs.Position
    Write-Ascii $writer ("2 0 obj`n<< /Type /Pages /Count {0} /Kids [{1}] >>`nendobj`n" -f $pageCount, ($kids -join " "))

    for ($i = 0; $i -lt $pageCount; $i++) {
        $pageObj = 3 + ($i * 3)
        $imageObj = $pageObj + 1
        $contentObj = $pageObj + 2
        $name = "/Im$($i + 1)"

        $image = [System.Drawing.Image]::FromFile($ImagePaths[$i])
        $imgWidth = $image.Width
        $imgHeight = $image.Height
        $image.Dispose()
        $imageBytes = [System.IO.File]::ReadAllBytes($ImagePaths[$i])
        $content = "q $pdfWidth 0 0 $pdfHeight 0 0 cm $name Do Q"
        $contentBytes = [System.Text.Encoding]::ASCII.GetBytes($content)

        $offsets[$pageObj] = $fs.Position
        Write-Ascii $writer ("{0} 0 obj`n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {1} {2}] /Resources << /XObject << {3} {4} 0 R >> >> /Contents {5} 0 R >>`nendobj`n" -f $pageObj, $pdfWidth, $pdfHeight, $name, $imageObj, $contentObj)

        $offsets[$imageObj] = $fs.Position
        Write-Ascii $writer ("{0} 0 obj`n<< /Type /XObject /Subtype /Image /Width {1} /Height {2} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length {3} >>`nstream`n" -f $imageObj, $imgWidth, $imgHeight, $imageBytes.Length)
        $writer.Write($imageBytes)
        Write-Ascii $writer "`nendstream`nendobj`n"

        $offsets[$contentObj] = $fs.Position
        Write-Ascii $writer ("{0} 0 obj`n<< /Length {1} >>`nstream`n" -f $contentObj, $contentBytes.Length)
        $writer.Write($contentBytes)
        Write-Ascii $writer "`nendstream`nendobj`n"
    }

    $startXref = $fs.Position
    Write-Ascii $writer ("xref`n0 {0}`n" -f ($objectCount + 1))
    Write-Ascii $writer "0000000000 65535 f `n"
    for ($obj = 1; $obj -le $objectCount; $obj++) {
        Write-Ascii $writer ("{0:0000000000} 00000 n `n" -f $offsets[$obj])
    }
    Write-Ascii $writer ("trailer`n<< /Size {0} /Root 1 0 R >>`nstartxref`n{1}`n%%EOF" -f ($objectCount + 1), $startXref)

    $writer.Flush()
    $writer.Close()
    $fs.Close()
}

$pages = @()

# Page 1
$page = New-PageCanvas
$bmp = $page.Bitmap
$g = $page.Graphics
$y = 120
$g.DrawString("6시간 C 언어 다음 단계 학습서", $titleFont, $darkBrush, 96, $y)
$y += 60
$g.DrawString("문법 이해 다음에 해야 할 것: 구현, 디버깅, 자료구조 연결", $subFont, $accentBrush, 96, $y)
$y += 60
$y = Add-TextBlock -Graphics $g -Text "대상: C 기본 문법을 한 번 끝까지 보고, 이제 이해했다에서 직접 구현할 수 있다로 넘어가려는 재혁님." -Font $bodyFont -Brush $darkBrush -X 96 -Y $y -Width $contentWidth
$y = Add-TextBlock -Graphics $g -Text "이 PDF의 목표는 문법 암기가 아니라, 현재 저장소 문제 파일로 자연스럽게 넘어갈 수 있는 학습 흐름을 만드는 것입니다." -Font $bodyFont -Brush $darkBrush -X 96 -Y $y -Width $contentWidth
$y += 10
$g.DrawString("핵심 목표", $sectionFont, $darkBrush, 96, $y)
$y += 42
$y = Add-Bullets -Graphics $g -Items @(
    "배운 문법을 실제 문제 코드에 연결한다.",
    "배열, 포인터, 구조체, 함수가 같이 쓰이는 상황을 익힌다.",
    "Linked List, Stack/Queue, Tree 문제를 보고 겁먹지 않게 만든다.",
    "컴파일 에러와 런타임 오류를 스스로 좁혀가는 습관을 만든다."
) -X 104 -Y $y -Width ($contentWidth - 8)
$y += 8
$g.DrawString("6시간 전체 흐름", $sectionFont, $darkBrush, 96, $y)
$y += 42
$y = Add-Bullets -Graphics $g -Items @(
    "1시간차: 문법을 짧은 구현으로 다시 묶기",
    "2시간차: 포인터와 구조체 체감하기",
    "3시간차: Linked List 손으로 만들기",
    "4시간차: Stack / Queue 규칙 익히기",
    "5시간차: Tree와 재귀 구조 읽기",
    "6시간차: 현재 저장소 문제 한 개 완주하기"
) -X 104 -Y $y -Width ($contentWidth - 8)
$y += 16
$g.DrawString("성공 기준", $sectionFont, $darkBrush, 96, $y)
$y += 42
$y = Add-TextBlock -Graphics $g -Text "모르는 것이 하나도 없는 상태가 아니라, 막혀도 어디서부터 확인해야 하는지 아는 상태면 성공입니다." -Font $bodyFont -Brush $accentBrush -X 96 -Y $y -Width $contentWidth
$page1 = Join-Path $tempDir "page-01.jpg"
Save-Jpeg -Bitmap $bmp -Path $page1
$g.Dispose()
$bmp.Dispose()
$pages += $page1

# Page 2
$page = New-PageCanvas
$bmp = $page.Bitmap
$g = $page.Graphics
$y = $startY
$g.DrawString("1시간차: 문법을 구현으로 다시 묶기", $sectionFont, $darkBrush, 96, $y)
$y += 50
$y = Add-TextBlock -Graphics $g -Text "변수, 함수, 배열, 구조체를 각각 따로 외우지 말고 작은 예제로 다시 연결합니다. 각 항목당 10분 정도로 짧게 돌리는 것이 핵심입니다." -Font $bodyFont -Brush $darkBrush -X 96 -Y $y -Width $contentWidth
$g.DrawString("연습 1. 함수와 반환값", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-CodeBlock -Graphics $g -Text "int add(int a, int b) {\n    return a + b;\n}" -X 96 -Y $y -Width $contentWidth
$y = Add-Bullets -Graphics $g -Items @(
    "함수 선언과 호출을 직접 세 번 써본다.",
    "return이 없으면 왜 문제가 되는지 말로 설명해본다.",
    "입력 2개, 반환 1개 구조를 익힌다."
) -X 104 -Y $y -Width ($contentWidth - 8)
$g.DrawString("연습 2. 배열과 반복문", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-CodeBlock -Graphics $g -Text "int arr[5] = {1, 2, 3, 4, 5};\nfor (int i = 0; i < 5; i++) {\n    printf(\"%d\\n\", arr[i]);\n}" -X 96 -Y $y -Width $contentWidth
$y = Add-Bullets -Graphics $g -Items @(
    "i++, i += 2를 각각 바꿔 써본다.",
    "배열 길이와 인덱스 차이를 구분한다.",
    "오프바이원 실수를 일부러 만들고 고친다."
) -X 104 -Y $y -Width ($contentWidth - 8)
$g.DrawString("연습 3. 구조체", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-CodeBlock -Graphics $g -Text "struct Student {\n    int id;\n    int score;\n};" -X 96 -Y $y -Width $contentWidth
$y = Add-TextBlock -Graphics $g -Text "체크 질문: 배열은 무엇을 저장하고, 포인터는 무엇을 저장하고, 구조체는 무엇을 묶는가?" -Font $bodyFont -Brush $accentBrush -X 96 -Y $y -Width $contentWidth
$page2 = Join-Path $tempDir "page-02.jpg"
Save-Jpeg -Bitmap $bmp -Path $page2
$g.Dispose()
$bmp.Dispose()
$pages += $page2

# Page 3
$page = New-PageCanvas
$bmp = $page.Bitmap
$g = $page.Graphics
$y = $startY
$g.DrawString("2시간차: 포인터와 구조체를 진짜로 이해하기", $sectionFont, $darkBrush, 96, $y)
$y += 50
$y = Add-TextBlock -Graphics $g -Text "자료구조는 결국 주소를 저장하고 따라가는 기술입니다. 포인터를 넘기지 못하면 Linked List도 바로 막힙니다." -Font $bodyFont -Brush $darkBrush -X 96 -Y $y -Width $contentWidth
$y = Add-CodeBlock -Graphics $g -Text "#include <stdio.h>\n\nint main(void) {\n    int x = 10;\n    int* p = &x;\n\n    printf(\"x = %d\\n\", x);\n    printf(\"p = %p\\n\", (void*)p);\n    printf(\"*p = %d\\n\", *p);\n\n    *p = 20;\n    printf(\"x = %d\\n\", x);\n    return 0;\n}" -X 96 -Y $y -Width $contentWidth
$g.DrawString("여기서 꼭 느껴야 하는 것", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-Bullets -Graphics $g -Items @(
    "p는 주소이고, *p는 그 주소가 가리키는 실제 값이다.",
    "값을 직접 건드리지 않아도 포인터를 통해 바꿀 수 있다.",
    "NULL 체크 없이 접근하면 위험하다."
) -X 104 -Y $y -Width ($contentWidth - 8)
$g.DrawString("구조체 포인터도 같은 원리", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-CodeBlock -Graphics $g -Text "struct Student s;\nstruct Student* ps = &s;\nps->id = 1;\nps->score = 95;" -X 96 -Y $y -Width $contentWidth
$y = Add-TextBlock -Graphics $g -Text "목표: 주소를 따라가서 값을 바꾼다는 문장을 코드 없이 말로 설명할 수 있으면 충분합니다." -Font $bodyFont -Brush $accentBrush -X 96 -Y $y -Width $contentWidth
$page3 = Join-Path $tempDir "page-03.jpg"
Save-Jpeg -Bitmap $bmp -Path $page3
$g.Dispose()
$bmp.Dispose()
$pages += $page3

# Page 4
$page = New-PageCanvas
$bmp = $page.Bitmap
$g = $page.Graphics
$y = $startY
$g.DrawString("3시간차: Linked List를 손으로 만들기", $sectionFont, $darkBrush, 96, $y)
$y += 50
$y = Add-TextBlock -Graphics $g -Text "배열처럼 옆 칸으로 가는 것이 아니라, 다음 노드의 주소를 따라간다는 감각만 정확히 잡으면 됩니다." -Font $bodyFont -Brush $darkBrush -X 96 -Y $y -Width $contentWidth
$y = Add-CodeBlock -Graphics $g -Text "struct Node {\n    int data;\n    struct Node* next;\n};\n\nhead->data = 10;\nhead->next = second;\nsecond->data = 20;\nsecond->next = third;\nthird->data = 30;\nthird->next = NULL;" -X 96 -Y $y -Width $contentWidth
$g.DrawString("이 시간의 연습 순서", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-Bullets -Graphics $g -Items @(
    "노드 3개 연결하기",
    "while (current != NULL) 로 순회하기",
    "맨 앞에 노드 1개 추가하기",
    "맨 끝에 노드 1개 추가하기"
) -X 104 -Y $y -Width ($contentWidth - 8)
$g.DrawString("반드시 설명할 수 있어야 하는 문장", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-Bullets -Graphics $g -Items @(
    "Linked List는 각 노드가 다음 노드 주소를 저장하는 구조다.",
    "head는 첫 노드를 가리킨다.",
    "current = current->next 는 다음 노드로 이동하는 코드다."
) -X 104 -Y $y -Width ($contentWidth - 8)
$y = Add-TextBlock -Graphics $g -Text "추천 연결: 현재 저장소의 Linked List 첫 문제를 열고, 함수가 어떤 포인터를 받고 어떤 포인터를 바꾸는지만 먼저 읽어보세요." -Font $bodyFont -Brush $accentBrush -X 96 -Y $y -Width $contentWidth
$page4 = Join-Path $tempDir "page-04.jpg"
Save-Jpeg -Bitmap $bmp -Path $page4
$g.Dispose()
$bmp.Dispose()
$pages += $page4

# Page 5
$page = New-PageCanvas
$bmp = $page.Bitmap
$g = $page.Graphics
$y = $startY
$g.DrawString("4시간차: Stack / Queue는 규칙의 차이", $sectionFont, $darkBrush, 96, $y)
$y += 50
$y = Add-TextBlock -Graphics $g -Text "새로운 마법처럼 보이지만 실제로는 넣는 규칙과 빼는 규칙이 다를 뿐입니다. Stack은 LIFO, Queue는 FIFO입니다." -Font $bodyFont -Brush $darkBrush -X 96 -Y $y -Width $contentWidth
$y = Add-CodeBlock -Graphics $g -Text "int stack[100];\nint top = -1;\n\nvoid push(int x) {\n    top++;\n    stack[top] = x;\n}\n\nint pop(void) {\n    int value = stack[top];\n    top--;\n    return value;\n}" -X 96 -Y $y -Width $contentWidth
$g.DrawString("이 시간 목표", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-Bullets -Graphics $g -Items @(
    "top, front, rear가 각각 무엇을 뜻하는지 구분한다.",
    "push/pop, enqueue/dequeue를 손으로 추적한다.",
    "배열 버전과 연결 리스트 버전 차이를 말로 설명한다."
) -X 104 -Y $y -Width ($contentWidth - 8)
$g.DrawString("권장 미션", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-Bullets -Graphics $g -Items @(
    "숫자 3개를 push 하고 pop 결과를 예상해본다.",
    "숫자 3개를 enqueue 하고 dequeue 결과를 예상해본다.",
    "비어 있을 때 pop 하면 어떻게 처리할지 직접 정한다."
) -X 104 -Y $y -Width ($contentWidth - 8)
$page5 = Join-Path $tempDir "page-05.jpg"
Save-Jpeg -Bitmap $bmp -Path $page5
$g.Dispose()
$bmp.Dispose()
$pages += $page5

# Page 6
$page = New-PageCanvas
$bmp = $page.Bitmap
$g = $page.Graphics
$y = $startY
$g.DrawString("5시간차: Tree와 재귀를 두려워하지 않기", $sectionFont, $darkBrush, 96, $y)
$y += 50
$y = Add-TextBlock -Graphics $g -Text "Tree는 노드 하나가 자식 포인터를 여러 개 가질 수 있는 구조입니다. 재귀를 완벽히 외우는 것보다 구조를 읽는 것이 먼저입니다." -Font $bodyFont -Brush $darkBrush -X 96 -Y $y -Width $contentWidth
$y = Add-CodeBlock -Graphics $g -Text "struct TreeNode {\n    int data;\n    struct TreeNode* left;\n    struct TreeNode* right;\n};\n\nvoid preorder(struct TreeNode* node) {\n    if (node == NULL) return;\n    printf(\"%d\\n\", node->data);\n    preorder(node->left);\n    preorder(node->right);\n}" -X 96 -Y $y -Width $contentWidth
$g.DrawString("재귀를 볼 때 확인할 것", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-Bullets -Graphics $g -Items @(
    "이 함수는 언제 멈추는가?",
    "현재 노드에서 무엇을 처리하는가?",
    "다음에는 왼쪽과 오른쪽 중 어디로 가는가?"
) -X 104 -Y $y -Width ($contentWidth - 8)
$g.DrawString("재혁님 단계의 핵심", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-Bullets -Graphics $g -Items @(
    "Linked List의 next 하나가 Tree에서는 left, right 두 개로 늘어난 느낌으로 이해한다.",
    "루트, 왼쪽 자식, 오른쪽 자식을 그림으로 그릴 수 있어야 한다.",
    "멈추는 조건과 다음 호출 방향 두 가지만 놓치지 않는다."
) -X 104 -Y $y -Width ($contentWidth - 8)
$page6 = Join-Path $tempDir "page-06.jpg"
Save-Jpeg -Bitmap $bmp -Path $page6
$g.Dispose()
$bmp.Dispose()
$pages += $page6

# Page 7
$page = New-PageCanvas
$bmp = $page.Bitmap
$g = $page.Graphics
$y = $startY
$g.DrawString("6시간차: 현재 저장소 문제 한 개 끝까지 가기", $sectionFont, $darkBrush, 96, $y)
$y += 50
$y = Add-TextBlock -Graphics $g -Text "작은 예제에서 끝내지 말고 실제 문제 파일로 연결합니다. 한 문제를 완벽히 맞히는 것보다 코드 흐름을 읽고 한 칸씩 수정하는 힘이 중요합니다." -Font $bodyFont -Brush $darkBrush -X 96 -Y $y -Width $contentWidth
$g.DrawString("추천 진입 순서", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-Bullets -Graphics $g -Items @(
    "Linked List 첫 문제 파일 열기",
    "입출력보다 함수 역할부터 읽기",
    "주어진 틀에서 비어 있는 부분만 채우기",
    "작은 입력으로 직접 테스트하기",
    "출력이 틀리면 중간 값을 print 해서 좁히기"
) -X 104 -Y $y -Width ($contentWidth - 8)
$g.DrawString("막혔을 때 순서", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-Bullets -Graphics $g -Items @(
    "컴파일 에러를 한 개씩 먼저 없앤다.",
    "출력값이 틀리면 중간 값을 찍어본다.",
    "포인터면 주소와 값 둘 다 확인한다.",
    "마지막 노드, 빈 구조, 경계 조건을 다시 본다."
) -X 104 -Y $y -Width ($contentWidth - 8)
$g.DrawString("오늘 끝나고 남겨야 할 것", $subFont, $accentBrush, 96, $y)
$y += 36
$y = Add-Bullets -Graphics $g -Items @(
    "내가 헷갈린 문법 3개",
    "직접 구현한 예제 2개",
    "스스로 설명 가능해진 개념 1개"
) -X 104 -Y $y -Width ($contentWidth - 8)
$y = Add-TextBlock -Graphics $g -Text "다음 추천 순서: Linked List 한 문제 완주 -> Stack/Queue 한 문제 완주 -> Tree 코드 읽기." -Font $bodyFont -Brush $accentBrush -X 96 -Y $y -Width $contentWidth
$page7 = Join-Path $tempDir "page-07.jpg"
Save-Jpeg -Bitmap $bmp -Path $page7
$g.Dispose()
$bmp.Dispose()
$pages += $page7

Write-PdfFromJpegs -ImagePaths $pages -OutputPath $outputPdf

Remove-Item -LiteralPath $tempDir -Recurse -Force

Write-Output "Created: $outputPdf"
