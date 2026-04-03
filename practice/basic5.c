#include <stdio.h>

struct student{
    int id;
    int score;
};

int main(void){
    struct student s1;
    struct student s2;
    s1.id=1;
    s1.score=95;
    s2.id=2;
    s2.score=89;

    printf("s1->id:%d, score:%d\n", s1.id, s1.score);

    return 0;
    
}