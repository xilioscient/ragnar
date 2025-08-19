# Array in C++

## Array Statici

### Dichiarazione e Inizializzazione
```cpp
// Dichiarazione
int numeri[5];  // Array di 5 interi non inizializzati

// Inizializzazione
int numeri[5] = {1, 2, 3, 4, 5};  // Inizializzazione completa
int numeri[] = {1, 2, 3};  // Dimensione automatica
int numeri[5] = {1, 2};  // Gli altri elementi sono 0
```

### Accesso agli Elementi
```cpp
int numeri[5] = {1, 2, 3, 4, 5};

// Accesso in lettura
int primo = numeri[0];  // 1
int ultimo = numeri[4];  // 5

// Accesso in scrittura
numeri[0] = 10;  // Modifica il primo elemento
```

### Iterazione
```cpp
int numeri[5] = {1, 2, 3, 4, 5};

// Con indice
for (int i = 0; i < 5; i++) {
    std::cout << numeri[i] << " ";
}
// Output: 1 2 3 4 5

// Range-based for (C++11)
for (int num : numeri) {
    std::cout << num << " ";
}
// Output: 1 2 3 4 5
```

## std::array

### Dichiarazione e Inizializzazione
```cpp
#include <array>

// Dichiarazione
std::array<int, 5> numeri;  // Array di 5 interi non inizializzati

// Inizializzazione
std::array<int, 5> numeri = {1, 2, 3, 4, 5};
std::array numeri = {1, 2, 3, 4, 5};  // C++17: deduzione del tipo
```

### Metodi Utili
```cpp
std::array<int, 5> numeri = {1, 2, 3, 4, 5};

// Dimensione
size_t dim = numeri.size();  // 5

// Accesso sicuro
int primo = numeri.at(0);  // 1
try {
    int fuori = numeri.at(10);  // Lancia std::out_of_range
} catch (const std::out_of_range& e) {
    std::cout << "Indice fuori range!" << std::endl;
}

// Primo e ultimo elemento
int primo = numeri.front();  // 1
int ultimo = numeri.back();  // 5

// Iteratori
auto it = numeri.begin();  // Iteratore al primo elemento
auto end = numeri.end();   // Iteratore dopo l'ultimo elemento
```

## std::vector

### Dichiarazione e Inizializzazione
```cpp
#include <vector>

// Dichiarazione
std::vector<int> numeri;  // Vector vuoto

// Inizializzazione
std::vector<int> numeri = {1, 2, 3, 4, 5};
std::vector<int> numeri(5, 0);  // 5 elementi inizializzati a 0
```

### Operazioni Comuni
```cpp
std::vector<int> numeri = {1, 2, 3};

// Aggiunta elementi
numeri.push_back(4);  // Aggiunge in fondo
numeri.insert(numeri.begin(), 0);  // Inserisce all'inizio

// Rimozione elementi
numeri.pop_back();  // Rimuove l'ultimo elemento
numeri.erase(numeri.begin());  // Rimuove il primo elemento

// Dimensione e capacità
size_t dim = numeri.size();  // Numero di elementi
size_t cap = numeri.capacity();  // Spazio allocato
numeri.reserve(10);  // Pre-alloca spazio
numeri.shrink_to_fit();  // Riduce la capacità alla dimensione

// Accesso
int primo = numeri.front();  // Primo elemento
int ultimo = numeri.back();  // Ultimo elemento
int elemento = numeri[0];    // Accesso diretto
int sicuro = numeri.at(0);   // Accesso con controllo
```

## Array Multidimensionali

### Array 2D Statici
```cpp
// Dichiarazione
int matrice[3][4];  // 3 righe, 4 colonne

// Inizializzazione
int matrice[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// Accesso
int elemento = matrice[1][2];  // 7
```

### Vector 2D
```cpp
#include <vector>

// Dichiarazione
std::vector<std::vector<int>> matrice;

// Inizializzazione
std::vector<std::vector<int>> matrice = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Accesso
int elemento = matrice[1][1];  // 5
```

## Esercizi Pratici

### Esercizio 1: Gestione di una Lista di Studenti
Scrivi un programma che gestisca una lista di studenti con i loro voti.

```cpp
#include <iostream>
#include <vector>
#include <string>

struct Studente {
    std::string nome;
    int voto;
};

int main() {
    std::vector<Studente> studenti;
    
    // Aggiungi studenti
    studenti.push_back({"Mario", 85});
    studenti.push_back({"Luigi", 90});
    studenti.push_back({"Anna", 95});
    
    // Calcola media
    double somma = 0;
    for (const auto& s : studenti) {
        somma += s.voto;
    }
    double media = somma / studenti.size();
    
    // Stampa risultati
    std::cout << "Media dei voti: " << media << std::endl;
    std::cout << "\nStudenti con voto sopra la media:" << std::endl;
    for (const auto& s : studenti) {
        if (s.voto > media) {
            std::cout << s.nome << ": " << s.voto << std::endl;
        }
    }
    
    return 0;
}
```

### Esercizio 2: Matrice di Numeri
Crea un programma che gestisca una matrice di numeri con operazioni di base.

```cpp
#include <iostream>
#include <vector>

void stampaMatrice(const std::vector<std::vector<int>>& matrice) {
    for (const auto& riga : matrice) {
        for (int num : riga) {
            std::cout << num << "\t";
        }
        std::cout << std::endl;
    }
}

int main() {
    // Crea matrice 3x3
    std::vector<std::vector<int>> matrice = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9}
    };
    
    // Stampa matrice originale
    std::cout << "Matrice originale:" << std::endl;
    stampaMatrice(matrice);
    
    // Calcola somma diagonale
    int somma = 0;
    for (size_t i = 0; i < matrice.size(); i++) {
        somma += matrice[i][i];
    }
    
    std::cout << "\nSomma diagonale: " << somma << std::endl;
    
    return 0;
}
```