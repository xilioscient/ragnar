# Operatori in C++

## Operatori Aritmetici

### Operatori Base
```cpp
int a = 10, b = 3;

int somma = a + b;        // 13
int differenza = a - b;   // 7
int prodotto = a * b;     // 30
int quoziente = a / b;    // 3
int resto = a % b;        // 1
```

### Precedenza degli Operatori
```cpp
int risultato = 2 + 3 * 4;    // 14 (non 20)
int risultato2 = (2 + 3) * 4; // 20
```

## Operatori di Assegnazione

### Assegnazione Semplice
```cpp
int x = 5;              // Assegnazione base
x = x + 3;              // x diventa 8
x += 3;                 // Equivalente a x = x + 3
```

### Operatori Composti
```cpp
int y = 10;
y += 5;    // y = y + 5
y -= 3;    // y = y - 3
y *= 2;    // y = y * 2
y /= 4;    // y = y / 4
y %= 3;    // y = y % 3
```

## Operatori di Incremento/Decremento

### Pre e Post Incremento
```cpp
int a = 5;
int b = ++a;    // a = 6, b = 6 (pre-incremento)
int c = a++;    // c = 6, a = 7 (post-incremento)

int d = 5;
int e = --d;    // d = 4, e = 4 (pre-decremento)
int f = d--;    // f = 4, d = 3 (post-decremento)
```

## Operatori di Confronto

### Confronti Base
```cpp
int x = 5, y = 10;

bool uguale = (x == y);           // false
bool diverso = (x != y);          // true
bool maggiore = (x > y);          // false
bool minore = (x < y);            // true
bool maggioreUguale = (x >= y);   // false
bool minoreUguale = (x <= y);     // true
```

## Operatori Logici

### Operatori AND, OR, NOT
```cpp
bool a = true, b = false;

bool andLogico = a && b;    // false
bool orLogico = a || b;     // true
bool notLogico = !a;        // false
```

### Short-Circuit Evaluation
```cpp
int x = 5;
bool risultato = (x > 0) && (x < 10);  // true
bool risultato2 = (x > 10) && (x < 0); // false (seconda condizione non valutata)
```

## Operatori Bitwise

### Operazioni sui Bit
```cpp
int a = 5;    // 0101 in binario
int b = 3;    // 0011 in binario

int andBit = a & b;     // 0001 (1)
int orBit = a | b;      // 0111 (7)
int xorBit = a ^ b;     // 0110 (6)
int notBit = ~a;        // 1010 (-6)
int shiftLeft = a << 1; // 1010 (10)
int shiftRight = a >> 1;// 0010 (2)
```

## Esercizi Pratici

### Esercizio 1: Calcolatore di BMI
Scrivi un programma che calcoli l'indice di massa corporea (BMI).

```cpp
#include <iostream>

int main() {
    double peso, altezza;
    
    std::cout << "Inserisci il peso in kg: ";
    std::cin >> peso;
    
    std::cout << "Inserisci l'altezza in metri: ";
    std::cin >> altezza;
    
    double bmi = peso / (altezza * altezza);
    
    std::cout << "Il tuo BMI è: " << bmi << std::endl;
    
    if (bmi < 18.5) {
        std::cout << "Sottopeso" << std::endl;
    } else if (bmi < 25) {
        std::cout << "Normale" << std::endl;
    } else if (bmi < 30) {
        std::cout << "Sovrappeso" << std::endl;
    } else {
        std::cout << "Obeso" << std::endl;
    }
    
    return 0;
}
```

### Esercizio 2: Convertitore di Base
Crea un programma che converta un numero da decimale a binario usando operatori bitwise.

```cpp
#include <iostream>
#include <string>

std::string decToBin(int num) {
    std::string bin;
    while (num > 0) {
        bin = (num % 2 ? "1" : "0") + bin;
        num >>= 1;
    }
    return bin;
}

int main() {
    int numero;
    
    std::cout << "Inserisci un numero decimale: ";
    std::cin >> numero;
    
    std::cout << "Rappresentazione binaria: " << decToBin(numero) << std::endl;
    
    return 0;
}
```