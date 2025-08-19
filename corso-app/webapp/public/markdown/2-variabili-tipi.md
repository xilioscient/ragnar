# Variabili e Tipi di Dati in C++

## Tipi Fondamentali

### Tipi Interi
```cpp
int numero = 42;          // Intero standard (32 bit)
short piccolo = 100;      // Intero corto (16 bit)
long lungo = 1000000L;    // Intero lungo (32/64 bit)
long long moltoLungo = 1000000000LL;  // Intero molto lungo (64 bit)
```

### Tipi in Virgola Mobile
```cpp
float decimale = 3.14f;           // Singola precisione (32 bit)
double doppio = 3.14159265359;    // Doppia precisione (64 bit)
long double lungo = 3.14159265359L;  // Precisione estesa
```

### Tipi Carattere
```cpp
char carattere = 'A';           // Carattere singolo
wchar_t wide = L'€';           // Carattere wide
char16_t utf16 = u'字';        // Carattere UTF-16
char32_t utf32 = U'字';        // Carattere UTF-32
```

### Tipo Booleano
```cpp
bool vero = true;
bool falso = false;
```

## Dichiarazione e Inizializzazione

### Dichiarazione Base
```cpp
int x;              // Dichiarazione
x = 10;             // Assegnazione
int y = 20;         // Dichiarazione con inizializzazione
int z{30};          // Inizializzazione uniforme (C++11)
```

### Inizializzazione Multipla
```cpp
int a = 1, b = 2, c = 3;
int d{1}, e{2}, f{3};
```

### Costanti
```cpp
const int MAX = 100;           // Costante
constexpr int DIM = 50;        // Costante calcolata a compile-time
```

## Modificatori di Tipo

### Modificatori di Segno
```cpp
unsigned int positivo = 42;    // Solo valori positivi
signed int conSegno = -42;     // Con segno (default)
```

### Modificatori di Dimensione
```cpp
short int piccolo = 100;       // 16 bit
long int lungo = 1000000;      // 32/64 bit
long long int moltoLungo = 1000000000;  // 64 bit
```

## Type Inference

### Auto
```cpp
auto numero = 42;              // int
auto decimale = 3.14;          // double
auto testo = "Ciao";           // const char*
auto carattere = 'A';          // char
```

### Decltype
```cpp
int x = 10;
decltype(x) y = 20;            // y è dello stesso tipo di x
```

## Esercizi Pratici

### Esercizio 1: Calcolatore di Area
Scrivi un programma che calcoli l'area di un rettangolo usando tipi appropriati.

```cpp
#include <iostream>

int main() {
    double lunghezza, larghezza;
    
    std::cout << "Inserisci la lunghezza: ";
    std::cin >> lunghezza;
    
    std::cout << "Inserisci la larghezza: ";
    std::cin >> larghezza;
    
    double area = lunghezza * larghezza;
    
    std::cout << "L'area del rettangolo è: " << area << std::endl;
    
    return 0;
}
```

### Esercizio 2: Convertitore di Unità
Crea un programma che converta chilometri in miglia.

```cpp
#include <iostream>

int main() {
    const double KM_TO_MILES = 0.621371;
    double chilometri;
    
    std::cout << "Inserisci la distanza in chilometri: ";
    std::cin >> chilometri;
    
    double miglia = chilometri * KM_TO_MILES;
    
    std::cout << chilometri << " km = " << miglia << " miglia" << std::endl;
    
    return 0;
}
``` 