#include <stdio.h>

// int arr[5]={1,2,3,4,10};
// int main(void){
//     for (int i = 0; i<5; i++){
//         if (i%2==0){
//         printf("%d\n", arr[i]);
//         }
//     }    
// }

int main(void){
    int x=10;
    int* p=&x;
    printf("x=%d\n", x);
    printf("p=%p\n", (void*)p);
    printf("*p=%d\n", *p);
    *p=20;
    printf("x=%d\n", x);
    return 0;
}