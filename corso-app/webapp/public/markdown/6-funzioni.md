# Funzioni in C++

## Indice
- [Dichiarazione e Definizione](#dichiarazione-e-definizione)
- [Parametri e Valori di Ritorno](#parametri-e-valori-di-ritorno)
- [Overloading](#overloading)
- [Funzioni Inline](#funzioni-inline)
- [Funzioni Lambda](#funzioni-lambda)
- [Esercizi Pratici](#esercizi-pratici)

## Dichiarazione e Definizione

### Dichiarazione Base
```cpp
// Dichiarazione (prototipo)
int somma(int a, int b);

// Definizione
int somma(int a, int b) {
    return a + b;
}
```

### Funzione Main
```cpp
int main() {
    int risultato = somma(5, 3);
    std::cout << "La somma è: " << risultato << std::endl;
    return 0;
}
```

## Parametri e Valori di Ritorno

### Parametri per Valore
```cpp
void incrementa(int x) {
    x++;  // Modifica solo la copia locale
}

int main() {
    int num = 5;
    incrementa(num);
    std::cout << num << std::endl;  // Output: 5
    return 0;
}
```

### Parametri per Riferimento
```cpp
void incrementa(int& x) {
    x++;  // Modifica la variabile originale
}

int main() {
    int num = 5;
    incrementa(num);
    std::cout << num << std::endl;  // Output: 6
    return 0;
}
```

### Parametri Costanti
```cpp
void stampa(const std::string& testo) {
    std::cout << testo << std::endl;
    // testo = "altro";  // Errore: non posso modificare un parametro const
}
```

### Valori di Ritorno
```cpp
// Ritorno di un valore
int quadrato(int x) {
    return x * x;
}

// Ritorno di un riferimento
int& max(int& a, int& b) {
    return (a > b) ? a : b;
}

// Ritorno di void
void saluta() {
    std::cout << "Ciao!" << std::endl;
}
```

## Overloading

### Overloading di Funzioni
```cpp
// Overloading per tipo di parametri
int somma(int a, int b) {
    return a + b;
}

double somma(double a, double b) {
    return a + b;
}

// Overloading per numero di parametri
int somma(int a, int b, int c) {
    return a + b + c;
}
```

### Overloading di Operatori
```cpp
struct Punto {
    int x, y;
    
    Punto operator+(const Punto& altro) {
        return {x + altro.x, y + altro.y};
    }
};
```

## Funzioni Inline

### Dichiarazione Inline
```cpp
inline int quadrato(int x) {
    return x * x;
}
```

### Funzioni Member Inline
```cpp
class Calcolatrice {
public:
    inline int somma(int a, int b) {
        return a + b;
    }
};
```

## Funzioni Lambda

### Sintassi Base
```cpp
auto somma = [](int a, int b) { return a + b; };
int risultato = somma(5, 3);  // 8
```

### Cattura di Variabili
```cpp
int moltiplicatore = 2;
auto moltiplica = [moltiplicatore](int x) { return x * moltiplicatore; };
int risultato = moltiplica(5);  // 10
```

### Cattura per Riferimento
```cpp
int contatore = 0;
auto incrementa = [&contatore]() { contatore++; };
incrementa();
std::cout << contatore << std::endl;  // 1
```

## Esercizi Pratici

### Esercizio 1: Calcolatrice
Implementa una calcolatrice con funzioni per le operazioni base.

```cpp
#include <iostream>

// Funzioni per le operazioni base
double somma(double a, double b) {
    return a + b;
}

double sottrazione(double a, double b) {
    return a - b;
}

double moltiplicazione(double a, double b) {
    return a * b;
}

double divisione(double a, double b) {
    if (b == 0) {
        throw std::runtime_error("Divisione per zero!");
    }
    return a / b;
}

int main() {
    double a, b;
    char operazione;
    
    std::cout << "Inserisci due numeri e un'operazione (+, -, *, /): ";
    std::cin >> a >> b >> operazione;
    
    try {
        double risultato;
        switch (operazione) {
            case '+': risultato = somma(a, b); break;
            case '-': risultato = sottrazione(a, b); break;
            case '*': risultato = moltiplicazione(a, b); break;
            case '/': risultato = divisione(a, b); break;
            default: throw std::runtime_error("Operazione non valida!");
        }
        std::cout << "Risultato: " << risultato << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Errore: " << e.what() << std::endl;
    }
    
    return 0;
}
```

### Esercizio 2: Gestione Array
Crea funzioni per manipolare array di numeri.

```cpp
#include <iostream>
#include <vector>

// Funzioni per la gestione dell'array
void stampaArray(const std::vector<int>& arr) {
    for (int num : arr) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
}

int trovaMassimo(const std::vector<int>& arr) {
    if (arr.empty()) {
        throw std::runtime_error("Array vuoto!");
    }
    int max = arr[0];
    for (int num : arr) {
        if (num > max) max = num;
    }
    return max;
}

double calcolaMedia(const std::vector<int>& arr) {
    if (arr.empty()) {
        throw std::runtime_error("Array vuoto!");
    }
    double somma = 0;
    for (int num : arr) {
        somma += num;
    }
    return somma / arr.size();
}

int main() {
    std::vector<int> numeri = {5, 2, 8, 1, 9, 3};
    
    std::cout << "Array originale: ";
    stampaArray(numeri);
    
    std::cout << "Massimo: " << trovaMassimo(numeri) << std::endl;
    std::cout << "Media: " << calcolaMedia(numeri) << std::endl;
    
    return 0;
}
```