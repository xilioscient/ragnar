# 🧩 1. Anatomia di una funzione in C++

## 1.1 Definizione base

```cpp
int somma(int a, int b) {
    return a + b;
}
```

- **Tipo di ritorno:** `int`
- **Nome:** `somma`
- **Parametri:** `a` e `b` di tipo `int`
- **Corpo:** blocco di codice racchiuso in `{}`

---

## 1.2 Dichiarazione (prototype)

```cpp
int somma(int, int);  // dichiarazione
```

Serve quando definisci funzioni **dopo il `main()`** o in **file separati**.

---

# 🔁 2. Passaggio dei parametri: modalità e semantica

## 2.1 Passaggio per valore

```cpp
void modifica(int x) {
    x = 10; // non modifica il chiamante
}
```

- Viene creata una **copia** del parametro.
- Veloce per tipi primitivi, **inefficiente per oggetti grandi**.

---

## 2.2 Passaggio per riferimento

```cpp
void modifica(int& x) {
    x = 10; // modifica il chiamante!
}
```

- Modifica direttamente l’oggetto originale.
- Più efficiente per grandi oggetti → usato nei costruttori/copy/move.

---

## 2.3 Passaggio per puntatore

```cpp
void modifica(int* x) {
    if (x) *x = 10;
}
```

- Meno idiomatico in C++, ma utile per **parametri opzionali**.
- **Richiede sempre** il check di `nullptr`.

---

## 2.4 Passaggio per `const` reference (il più usato in C++)

```cpp
void stampa(const std::string& s) {
    std::cout << s;
}
```

- Non copia l’oggetto.
- Garantisce che la funzione **non modifichi** il parametro.

---

# 📦 3. Default arguments & overloading

## 3.1 Default parameters

```cpp
void saluta(std::string nome = "Mondo") {
    std::cout << "Ciao " << nome;
}
```

- I **default devono essere nella dichiarazione**, non nella definizione se separate.

---

## 3.2 Overloading

```cpp
int area(int lato) { return lato * lato; }
int area(int base, int altezza) { return base * altezza; }
```

- C++ distingue le funzioni in base a **tipo e numero di parametri**.
- Supporta overload con `const`, `&`, `&&`.
- ⚠️ **Non puoi fare overload solo sul return type!**

---

# 🧬 4. Modificatori speciali moderni

## 4.1 `inline`

```cpp
inline int doppio(int x) { return 2 * x; }
```

- Suggerisce al compilatore di **sostituire il corpo** ovunque venga chiamata.
- Oggi usato per evitare **multiple definition** nei file header.

---

## 4.2 `constexpr`

```cpp
constexpr int quadrato(int x) { return x * x; }
```

- La funzione può essere eseguita a **compile time** se gli argomenti sono `constexpr`.

---

## 4.3 `noexcept`

```cpp
void foo() noexcept;
```

- Garantisce che la funzione **non lanci eccezioni**.
- Aiuta il compilatore a ottimizzare e influisce su move/copy.

---

## 4.4 `[[nodiscard]]`

```cpp
[[nodiscard]] int compute() { return 42; }
```

- Genera warning se il valore di ritorno viene **ignorato**.

---

# 🔗 5. Linkage e dichiarazioni

## 5.1 Forward declaration

```cpp
int calcola();  // dice al compilatore: "fidati, arriva dopo"
```

- Usato per **risolvere dipendenze circolari** o nei file header.

---

## 5.2 `extern` linkage

```cpp
extern int globale;   // dichiarazione (definita altrove)
```

Per funzioni C in un progetto C++:

```cpp
extern "C" {
    void funzione_c();
}
```

---

# 🔣 6. Variadic functions

## 6.1 C-style (poco sicure)

```cpp
#include <cstdarg>

int somma(int count, ...) {
    va_list args;
    va_start(args, count);
    int totale = 0;
    for (int i = 0; i < count; ++i)
        totale += va_arg(args, int);
    va_end(args);
    return totale;
}
```

❌ Non typesafe — usa solo con **codice legacy**.

---

## 6.2 Variadic templates (avanzato)

```cpp
template<typename... Args>
void stampa(Args... args) {
    (std::cout << ... << args);  // fold expression (C++17)
}
```

👉 Approfondimento in **fase 4.3: metaprogrammazione moderna**.

---

# 🧠 7. Funzioni come oggetti (Lambda)

```cpp
auto lambda = [](int x) -> int {
    return x * x;
};

std::cout << lambda(5); // stampa 25
```

- Le **lambda** sono funzioni anonime.
- In C++ sono **functor objects** (oggetti con `operator()`).
- Possono **catturare variabili** (`[=]`, `[&]`).

---

# 📚 8. Esercizi professionali consigliati

- Implementa overload di `area()` per:
  - quadrato
  - rettangolo
  - cerchio

- Scrivi:
  - `concat(std::string, ...)` usando **variadic template**
  - una funzione `constexpr` per calcolare il **fattoriale**
  - un **header** con funzioni `inline`, verifica gli errori di **multiple definition** senza `inline`
  - una **lambda** che filtra i numeri pari da un `std::vector<int>`