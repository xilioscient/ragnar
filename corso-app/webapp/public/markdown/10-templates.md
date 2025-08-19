# Template in C++

## Indice
- [Introduzione](#introduzione)
- [Template di Funzione](#template-di-funzione)
- [Template di Classe](#template-di-classe)
- [Template Variadici](#template-variadici)
- [Specializzazione](#specializzazione)
- [Concepts (C++20)](#concepts-c20)
- [Esercizi Pratici](#esercizi-pratici)

## Introduzione

I template sono un potente meccanismo di C++ che permette di scrivere codice generico, riutilizzabile per diversi tipi di dati. Permettono di creare funzioni e classi che possono lavorare con qualsiasi tipo di dato, mantenendo la type safety del linguaggio.

## Template di Funzione

### Sintassi Base
```cpp
template<typename T>
T massimo(T a, T b) {
    return (a > b) ? a : b;
}
```

### Uso
```cpp
int main() {
    int i = massimo(5, 10);        // T = int
    double d = massimo(3.14, 2.72); // T = double
    char c = massimo('a', 'b');    // T = char
    
    std::cout << "Massimo intero: " << i << std::endl;     // Output: 10
    std::cout << "Massimo double: " << d << std::endl;     // Output: 3.14
    std::cout << "Massimo char: " << c << std::endl;       // Output: b
    
    return 0;
}
```

### Template con Più Parametri
```cpp
template<typename T, typename U>
auto somma(T a, U b) -> decltype(a + b) {
    return a + b;
}

int main() {
    auto r1 = somma(5, 3.14);    // T = int, U = double
    auto r2 = somma(2.5, 3.5);   // T = double, U = double
    
    std::cout << "Somma 1: " << r1 << std::endl;  // Output: 8.14
    std::cout << "Somma 2: " << r2 << std::endl;  // Output: 6.0
    
    return 0;
}
```

## Template di Classe

### Sintassi Base
```cpp
template<typename T>
class Pila {
private:
    std::vector<T> elementi;

public:
    void push(const T& elemento) {
        elementi.push_back(elemento);
    }
    
    T pop() {
        if (elementi.empty()) {
            throw std::runtime_error("Pila vuota");
        }
        T elemento = elementi.back();
        elementi.pop_back();
        return elemento;
    }
    
    bool vuota() const {
        return elementi.empty();
    }
};
```

### Uso
```cpp
int main() {
    Pila<int> pilaInt;
    Pila<std::string> pilaString;
    
    pilaInt.push(1);
    pilaInt.push(2);
    pilaInt.push(3);
    
    pilaString.push("Ciao");
    pilaString.push("Mondo");
    
    while (!pilaInt.vuota()) {
        std::cout << pilaInt.pop() << " ";  // Output: 3 2 1
    }
    std::cout << std::endl;
    
    while (!pilaString.vuota()) {
        std::cout << pilaString.pop() << " ";  // Output: Mondo Ciao
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Template Variadici

### Sintassi
```cpp
template<typename... Args>
void stampa(Args... args) {
    (std::cout << ... << args) << std::endl;
}

template<typename... Args>
auto somma(Args... args) {
    return (args + ...);
}
```

### Uso
```cpp
int main() {
    stampa(1, " ", 2.5, " ", 'c');  // Output: 1 2.5 c
    
    int risultato = somma(1, 2, 3, 4, 5);
    std::cout << "Somma: " << risultato << std::endl;  // Output: 15
    
    return 0;
}
```

## Specializzazione

### Specializzazione Completa
```cpp
template<typename T>
class Comparatore {
public:
    bool maggiore(T a, T b) {
        return a > b;
    }
};

// Specializzazione per stringhe
template<>
class Comparatore<std::string> {
public:
    bool maggiore(const std::string& a, const std::string& b) {
        return a.length() > b.length();
    }
};
```

### Specializzazione Parziale
```cpp
template<typename T, typename U>
class Coppia {
public:
    T primo;
    U secondo;
    
    Coppia(T p, U s) : primo(p), secondo(s) {}
};

// Specializzazione parziale per puntatori
template<typename T>
class Coppia<T*, T*> {
public:
    T* primo;
    T* secondo;
    
    Coppia(T* p, T* s) : primo(p), secondo(s) {}
    
    bool stessiOggetti() const {
        return primo == secondo;
    }
};
```

## Concepts (C++20)

### Definizione di Concept
```cpp
template<typename T>
concept Numerico = std::is_arithmetic_v<T>;

template<typename T>
concept Iterabile = requires(T t) {
    { t.begin() } -> std::same_as<typename T::iterator>;
    { t.end() } -> std::same_as<typename T::iterator>;
};
```

### Uso dei Concepts
```cpp
template<Numerico T>
T raddoppia(T valore) {
    return valore * 2;
}

template<Iterabile T>
void stampaElementi(const T& container) {
    for (const auto& elemento : container) {
        std::cout << elemento << " ";
    }
    std::cout << std::endl;
}
```

## Esercizi Pratici

### Esercizio 1: Container Generico
Implementa un container generico con funzionalità di base.

```cpp
#include <iostream>
#include <vector>
#include <stdexcept>

template<typename T>
class Container {
private:
    std::vector<T> elementi;

public:
    void aggiungi(const T& elemento) {
        elementi.push_back(elemento);
    }
    
    T rimuovi() {
        if (elementi.empty()) {
            throw std::runtime_error("Container vuoto");
        }
        T elemento = elementi.back();
        elementi.pop_back();
        return elemento;
    }
    
    bool vuoto() const {
        return elementi.empty();
    }
    
    size_t dimensione() const {
        return elementi.size();
    }
    
    void stampa() const {
        for (const auto& elemento : elementi) {
            std::cout << elemento << " ";
        }
        std::cout << std::endl;
    }
};

int main() {
    Container<int> numeri;
    Container<std::string> stringhe;
    
    numeri.aggiungi(1);
    numeri.aggiungi(2);
    numeri.aggiungi(3);
    
    stringhe.aggiungi("Ciao");
    stringhe.aggiungi("Mondo");
    
    std::cout << "Numeri: ";
    numeri.stampa();  // Output: 1 2 3
    
    std::cout << "Stringhe: ";
    stringhe.stampa();  // Output: Ciao Mondo
    
    return 0;
}
```

### Esercizio 2: Funzioni di Utility
Implementa funzioni di utility generiche.

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

template<typename T>
class Utility {
public:
    static T massimo(const std::vector<T>& v) {
        if (v.empty()) {
            throw std::runtime_error("Vector vuoto");
        }
        return *std::max_element(v.begin(), v.end());
    }
    
    static T minimo(const std::vector<T>& v) {
        if (v.empty()) {
            throw std::runtime_error("Vector vuoto");
        }
        return *std::min_element(v.begin(), v.end());
    }
    
    static double media(const std::vector<T>& v) {
        if (v.empty()) {
            throw std::runtime_error("Vector vuoto");
        }
        T somma = std::accumulate(v.begin(), v.end(), T{});
        return static_cast<double>(somma) / v.size();
    }
    
    static void ordina(std::vector<T>& v) {
        std::sort(v.begin(), v.end());
    }
};

int main() {
    std::vector<int> numeri = {5, 2, 8, 1, 9};
    std::vector<std::string> stringhe = {"Ciao", "Mondo", "C++", "Template"};
    
    std::cout << "Massimo: " << Utility<int>::massimo(numeri) << std::endl;
    std::cout << "Minimo: " << Utility<int>::minimo(numeri) << std::endl;
    std::cout << "Media: " << Utility<int>::media(numeri) << std::endl;
    
    Utility<std::string>::ordina(stringhe);
    for (const auto& s : stringhe) {
        std::cout << s << " ";  // Output: C++ Ciao Mondo Template
    }
    std::cout << std::endl;
    
    return 0;
}
```