# 🧰 Introduzione al C++: Sintassi, Differenze da C, Funzioni, Compilazione

## 🧰 Strumenti minimi per iniziare

| Necessario         | Esempi                         |
|--------------------|--------------------------------|
| Compilatore        | `g++`, `clang++`               |
| Editor / IDE       | VSCode, CLion, vim + cmake     |
| Tool di build      | `cmake`, `make`, build manuale |

🔧 **Esecuzione base**
```bash
g++ main.cpp -o programma
./programma
```

---

## 📦 1. Differenze fondamentali tra C e C++

| Concetto        | C                           | C++                               |
|------------------|-----------------------------|------------------------------------|
| Paradigma        | Procedurale                 | Multi-paradigma (OOP, generico…)   |
| I/O              | `printf`, `scanf`           | `std::cout`, `std::cin`            |
| Libreria         | `<stdio.h>`, `<stdlib.h>`   | `<iostream>`, `<string>`, `<vector>` |
| Strutture        | `struct` semplice           | `class`, `struct` con metodi       |
| Funzioni         | Nomi unici                  | Overloading, default args          |
| Header           | `.h`                        | `.h`, `.hpp`, namespace            |

---

## 🔤 2. Tipi di base e variabili

```cpp
int a = 10;
float b = 3.14f;
char c = 'X';
bool flag = true;
```

🔹 **Modificatori:** `short`, `long`, `unsigned`, `signed`  
🔹 **Moderni:** `auto` (C++11+), `constexpr`, `const`

---

## 🖨️ 3. Input / Output (iostream)

```cpp
#include <iostream>

int main() {
    std::string nome;
    std::cout << "Nome? ";
    std::cin >> nome;
    std::cout << "Ciao, " << nome << "!\n";
}
```

📌 Note:
- `<<`, `>>` sono operatori sovraccaricati
- `std::endl`: newline + flush

---

## 🧠 4. Funzioni in C++

```cpp
int somma(int a, int b) {
    return a + b;
}
```

🔹 **Overloading**
```cpp
int moltiplica(int a, int b = 2) { return a * b; }
```

---

## 🧱 5. Strutture e classi base

```cpp
struct Punto {
    int x, y;
};

class Rettangolo {
    int base, altezza;
public:
    Rettangolo(int b, int h) : base(b), altezza(h) {}
    int area() { return base * altezza; }
};
```

| Differenza      | `struct`         | `class`        |
|-----------------|------------------|----------------|
| Accesso default | `public`         | `private`      |
| Ereditarietà    | `public`         | `private`      |

---

## 🚧 6. Compilazione e linking

```bash
g++ -Wall -std=c++17 -o programma main.cpp
```

🔹 **Flag utili:**
- `-Wall`: warning completi
- `-Wextra`: warning extra
- `-std=c++17`: standard (valido anche: c++20, c++23…)

---

## ✅ Best Practice per neofiti professionali

- ✅ Usa `std::string` (niente `char[]`)
- ✅ Non mischiare `stdio.h` con `iostream`
- ✅ Compila **sempre** con warning attivi
- ✅ Funzioni brevi e con scopo chiaro
- ✅ Usa header file anche per piccoli progetti

---

## 🧪 Esercizi consigliati

1. 🔢 Leggi 2 numeri e stampa somma, prodotto, differenza
2. 🔁 Scrivi `int doppio(int x = 5);`
3. 👩‍🎓 Crea `struct Studente { std::string nome; int età; float media; }` con stampa
4. ⚪ Fai una `class Cerchio { double raggio; double area(); }`
5. 🔁 Scrivi un programma C base e riscrivilo in C++

---

## 🧠 Bonus Tip: VSCode Setup Rapido

- Estensioni: `C++` (Microsoft), `CMake Tools`
- `tasks.json` per build rapida
- Usa `g++ -g -Wall` per debug e warning
