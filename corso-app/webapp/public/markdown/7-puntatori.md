# Puntatori in C++

## Indice
- [Concetti Base](#concetti-base)
- [Operatori sui Puntatori](#operatori-sui-puntatori)
- [Puntatori e Array](#puntatori-e-array)
- [Puntatori a Funzioni](#puntatori-a-funzioni)
- [Smart Pointers](#smart-pointers)
- [Esercizi Pratici](#esercizi-pratici)

## Concetti Base

### Dichiarazione e Inizializzazione
```cpp
// Dichiarazione di un puntatore
int* ptr;  // Puntatore a intero

// Inizializzazione
int x = 5;
int* ptr = &x;  // ptr punta all'indirizzo di x

// Puntatore nullo
int* ptr = nullptr;  // C++11
int* ptr = NULL;     // C-style
int* ptr = 0;        // Non raccomandato
```

### Accesso ai Valori
```cpp
int x = 5;
int* ptr = &x;

// Accesso al valore puntato (dereferenziazione)
int valore = *ptr;  // valore = 5

// Modifica del valore puntato
*ptr = 10;  // x diventa 10
```

## Operatori sui Puntatori

### Operatore Indirizzo (&)
```cpp
int x = 5;
int* ptr = &x;  // ptr contiene l'indirizzo di x

std::cout << "Indirizzo di x: " << ptr << std::endl;
std::cout << "Valore di x: " << *ptr << std::endl;
```

### Operatore Dereferenziazione (*)
```cpp
int x = 5;
int* ptr = &x;

// Modifica del valore tramite puntatore
*ptr = 10;
std::cout << "Nuovo valore di x: " << x << std::endl;  // Output: 10
```

### Aritmetica dei Puntatori
```cpp
int arr[] = {1, 2, 3, 4, 5};
int* ptr = arr;  // ptr punta al primo elemento

// Incremento del puntatore
ptr++;  // ptr punta al secondo elemento
std::cout << *ptr << std::endl;  // Output: 2

// Decremento del puntatore
ptr--;  // ptr punta di nuovo al primo elemento
std::cout << *ptr << std::endl;  // Output: 1
```

## Puntatori e Array

### Accesso agli Elementi
```cpp
int arr[] = {1, 2, 3, 4, 5};
int* ptr = arr;

// Accesso agli elementi
for (int i = 0; i < 5; i++) {
    std::cout << *(ptr + i) << " ";  // Output: 1 2 3 4 5
}
```

### Puntatori a Array Multidimensionali
```cpp
int matrice[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Puntatore al primo elemento
int* ptr = &matrice[0][0];

// Accesso agli elementi
for (int i = 0; i < 9; i++) {
    std::cout << *(ptr + i) << " ";  // Output: 1 2 3 4 5 6 7 8 9
}
```

## Puntatori a Funzioni

### Dichiarazione e Uso
```cpp
// Dichiarazione di una funzione
int somma(int a, int b) {
    return a + b;
}

// Dichiarazione di un puntatore a funzione
int (*ptrFunzione)(int, int) = somma;

// Uso del puntatore a funzione
int risultato = ptrFunzione(5, 3);  // risultato = 8
```

### Callback
```cpp
void eseguiOperazione(int a, int b, int (*operazione)(int, int)) {
    int risultato = operazione(a, b);
    std::cout << "Risultato: " << risultato << std::endl;
}

int main() {
    eseguiOperazione(5, 3, somma);  // Output: Risultato: 8
    return 0;
}
```

## Smart Pointers

### unique_ptr
```cpp
#include <memory>

// Creazione di un unique_ptr
std::unique_ptr<int> ptr = std::make_unique<int>(5);

// Accesso al valore
std::cout << *ptr << std::endl;  // Output: 5

// Il puntatore viene automaticamente deallocato
```

### shared_ptr
```cpp
#include <memory>

// Creazione di shared_ptr
std::shared_ptr<int> ptr1 = std::make_shared<int>(5);
std::shared_ptr<int> ptr2 = ptr1;  // Condivisione della proprietà

// Conteggio dei riferimenti
std::cout << "Riferimenti: " << ptr1.use_count() << std::endl;  // Output: 2
```

### weak_ptr
```cpp
#include <memory>

std::shared_ptr<int> shared = std::make_shared<int>(5);
std::weak_ptr<int> weak = shared;  // Non incrementa il conteggio

// Verifica se l'oggetto esiste ancora
if (auto ptr = weak.lock()) {
    std::cout << *ptr << std::endl;
}
```

## Esercizi Pratici

### Esercizio 1: Gestione della Memoria
Implementa una classe per gestire un array dinamico.

```cpp
#include <iostream>

class ArrayDinamico {
private:
    int* dati;
    size_t dimensione;
    
public:
    ArrayDinamico(size_t dim) : dimensione(dim) {
        dati = new int[dim];
    }
    
    ~ArrayDinamico() {
        delete[] dati;
    }
    
    // Costruttore di copia
    ArrayDinamico(const ArrayDinamico& altro) : dimensione(altro.dimensione) {
        dati = new int[dimensione];
        for (size_t i = 0; i < dimensione; i++) {
            dati[i] = altro.dati[i];
        }
    }
    
    // Operatore di assegnazione
    ArrayDinamico& operator=(const ArrayDinamico& altro) {
        if (this != &altro) {
            delete[] dati;
            dimensione = altro.dimensione;
            dati = new int[dimensione];
            for (size_t i = 0; i < dimensione; i++) {
                dati[i] = altro.dati[i];
            }
        }
        return *this;
    }
    
    int& operator[](size_t indice) {
        return dati[indice];
    }
    
    size_t size() const {
        return dimensione;
    }
};

int main() {
    ArrayDinamico arr(5);
    
    // Inizializzazione
    for (size_t i = 0; i < arr.size(); i++) {
        arr[i] = i + 1;
    }
    
    // Stampa
    for (size_t i = 0; i < arr.size(); i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Esercizio 2: Lista Collegata
Implementa una lista collegata semplice.

```cpp
#include <iostream>

struct Nodo {
    int valore;
    Nodo* prossimo;
    
    Nodo(int v) : valore(v), prossimo(nullptr) {}
};

class Lista {
private:
    Nodo* testa;
    
public:
    Lista() : testa(nullptr) {}
    
    ~Lista() {
        while (testa) {
            Nodo* temp = testa;
            testa = testa->prossimo;
            delete temp;
        }
    }
    
    void aggiungi(int valore) {
        Nodo* nuovo = new Nodo(valore);
        nuovo->prossimo = testa;
        testa = nuovo;
    }
    
    void stampa() {
        Nodo* corrente = testa;
        while (corrente) {
            std::cout << corrente->valore << " ";
            corrente = corrente->prossimo;
        }
        std::cout << std::endl;
    }
};

int main() {
    Lista lista;
    
    // Aggiungi elementi
    lista.aggiungi(3);
    lista.aggiungi(2);
    lista.aggiungi(1);
    
    // Stampa la lista
    lista.stampa();  // Output: 1 2 3
    
    return 0;
}
```