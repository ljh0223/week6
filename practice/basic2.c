#include <stdio.h>

struct Student {
    int id;
    int score;
};

int main(void) {
    struct Student s;

    s.id = 1;
    s.score = 95;

    printf("id: %d\n", s.id);
    printf("score: %d\n", s.score);

    return 0;
}
