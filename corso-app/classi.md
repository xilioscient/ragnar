

# 🧱 Classi in C++ – Fondamenti di Programmazione a Oggetti

## 1. Cos’è una classe?

```cpp
class Persona {
public:
    std::string nome;
    int età;
};
````

* La `class` è il **blocco base dell'OOP**
* Combina **dati (membri)** e **funzioni (metodi)**
* I membri di default sono `private` (al contrario di `struct`)

---

## 🔐 2. Incapsulamento: `public`, `private`, `protected`

```cpp
class ContoBancario {
private:
    double saldo;

public:
    void deposita(double importo) {
        saldo += importo;
    }

    double getSaldo() const {
        return saldo;
    }
};
```

| Visibilità  | Accessibile da…                   |
| ----------- | --------------------------------- |
| `public`    | Ovunque                           |
| `private`   | Solo dalla classe stessa          |
| `protected` | Dalla classe e dalle sue derivate |

✅ **Information hiding**: mostra solo ciò che serve, nascondi il resto.

---

## 🏗️ 3. Costruttori e Distruttori

```cpp
class File {
public:
    File(const std::string& nome) {
        std::cout << "Apro file " << nome;
    }

    ~File() {
        std::cout << "Chiudo file";
    }
};
```

* **Costruttore**: viene eseguito alla creazione dell’oggetto
* **Distruttore**: eseguito alla distruzione dell’oggetto
* Legati al principio RAII: gestione automatica del ciclo di vita

---

## 🎯 4. Il puntatore `this`

```cpp
class Punto {
private:
    int x;
public:
    void setX(int x) {
        this->x = x;  // disambiguazione
    }
};
```

* `this` è un puntatore all’istanza corrente
* Utile anche per il chaining:

```cpp
Punto& setX(int x) {
    this->x = x;
    return *this;
}
```

---

## 🧪 5. Initializer list

```cpp
class Punto {
    int x, y;
public:
    Punto(int x, int y) : x(x), y(y) {}
};
```

* Più efficiente rispetto all'assegnazione nel corpo
* **Obbligatoria** per:

  * `const` membri
  * `reference`
  * Oggetti senza costruttore di default

---

## 📚 6. Differenza tra `class` e `struct`

```cpp
struct Vec2 {
    float x, y;  // public di default
};
```

| Differenza | `class`           | `struct`         |
| ---------- | ----------------- | ---------------- |
| Visibilità | `private` default | `public` default |
| Uso tipico | OOP completa      | Dati semplici    |

Altrimenti sono **funzionalmente equivalenti**.

---

## 🧬 7. Oggetti: valore vs puntatore

```cpp
Persona p1;                 // automatico (stack)
Persona* p2 = new Persona;  // dinamico (heap)

delete p2;
```

⚠️ Se usi `new`, devi fare `delete`
✅ Meglio usare smart pointers: `std::unique_ptr`, `std::shared_ptr`

---

## 🔄 8. Metodi `const` e membri `mutable`

```cpp
class C {
    mutable int chiamate = 0;

public:
    int get() const {
        chiamate++;  // ammesso grazie a mutable
        return 42;
    }
};
```

* `const`: garantisce che il metodo non modifica l’oggetto
* `mutable`: consente modifiche in metodi `const` (utile per cache/log)

---

## 📁 9. Separazione tra header e source

### 🔹 `Punto.h`

```cpp
class Punto {
public:
    int x, y;
    Punto(int x, int y);
    void stampa() const;
};
```

### 🔹 `Punto.cpp`

```cpp
#include "Punto.h"
#include <iostream>

Punto::Punto(int x, int y) : x(x), y(y) {}

void Punto::stampa() const {
    std::cout << "(" << x << ", " << y << ")";
}
```

✅ Buona separazione per manutenibilità e compilazione modulare

---

## 💡 Best Practice OOP in C++

* ✅ Usa `private` per i dati, esponi solo API significative
* ✅ Aggiungi `const` dove possibile
* ✅ Dai nomi chiari e coerenti (`getSaldo`, `deposita`)
* ✅ Metodi semplici → inline nel `.h`; complessi → `.cpp`
* ⚠️ Evita `new/delete` diretti, preferisci smart pointer

---

## 🧪 Esercizi consigliati

1. 📐 Crea una classe `Rettangolo` con metodi `area()` e `perimetro()`
2. 👤 Fai una `Persona` con `nome`, `età`, e un metodo `presentati()`
3. 💰 Implementa `ContoBancario` con `saldo` privato, `deposita()` e `preleva()`
4. ⏱️ Crea una classe `Timer` che stampa messaggi nel costruttore e distruttore
5. 📖 Separa `Libro` in `.h` e `.cpp`, aggiungi `stampaDettagli()`

