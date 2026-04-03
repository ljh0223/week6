#include <stdio.h>

int main(void) {
    int a = 3;
    int b = 5;
    printf("%d\n", a+b);

    for (int i=1; i<=10; i+=2){
        printf("%d\n", i);
    }

    int score=80;
    if (score<80){
        printf("C\n");
    }else if (score=80){
        printf("B\n");
    }else{
        printf("A\n");
    }
    return 0;
}
