# 🧠 C++ Idiomatico: `static`, `const`, `friend`, `inline`, `namespace`, `enum class`

> Scrivere C++ moderno richiede cura nell’uso dei costrutti fondamentali per **chiarezza, sicurezza e modularità**.

---

## 🔌 1. `static` – membri condivisi

### 🔹 Membro variabile `static`
```cpp
class Esempio {
public:
    static int contatore;
};

int Esempio::contatore = 0;
```
- **Unico per tutta la classe**
- Necessita di **definizione fuori** dalla classe
- Utile per: contatori di istanze, impostazioni globali, cache

---

### 🔹 Metodo statico
```cpp
class Matematica {
public:
    static int somma(int a, int b) {
        return a + b;
    }
};
```
- Non accede a `this`
- Può essere chiamato senza istanza:
  ```cpp
  Matematica::somma(2, 3);
  ```

---

## 🔒 2. `const` – immutabilità

### 🔹 Membro dati `const`
```cpp
class Punto {
    const int x;
public:
    Punto(int x) : x(x) {}
};
```
- Va **inizializzato nel costruttore**
- Non modificabile dopo l'inizializzazione

---

### 🔹 Metodo `const`
```cpp
class Persona {
    std::string nome;
public:
    std::string getNome() const {
        return nome;
    }
};
```
- Non modifica lo stato interno
- Obbligatorio per oggetti passati per `const &`

---

## 🤝 3. `friend` – accesso controllato

### 🔹 Funzione `friend`
```cpp
class Conto {
    double saldo = 100.0;
    friend void stampaSaldo(const Conto&);
};

void stampaSaldo(const Conto& c) {
    std::cout << c.saldo;
}
```

### 🔹 Classe `friend`
```cpp
class Segreto {
    friend class Amico;
private:
    int codice = 42;
};
```

> ⚠️ **Usare con moderazione**: rompe l'incapsulamento  
> ✅ Ideale per operatori, classi tightly-coupled

---

## ⚡ 4. `inline` – in header, una sola definizione

### 🔹 Funzione `inline`
```cpp
inline int quadrato(int x) {
    return x * x;
}
```
- Suggerisce l’inserimento diretto del codice
- Necessario in header **inclusi in più file**

### 🔹 Variabile `inline` (C++17+)
```cpp
inline constexpr int MAX = 100;
```
- Permette **una definizione globale unica** in header

---

## 🧭 5. `namespace` – organizzazione modulare

```cpp
namespace Calcolo {
    int somma(int a, int b) { return a + b; }
}
```

- Evita conflitti di nomi
- Struttura logica per moduli

### 🔹 Namespace annidati (C++17+)
```cpp
namespace App::Moduli::Grafica {
    class Finestra {};
}
```

### 🔹 Alias di namespace
```cpp
namespace G = App::Moduli::Grafica;
G::Finestra win;
```

> 🔧 Crea un namespace per ogni modulo/feature

---

## 🧱 6. `enum class` – enumerazioni fortemente tipizzate

```cpp
enum class Stato {
    Inizio,
    InCorso,
    Completato
};
```

### ✅ Vantaggi
- Nessuna contaminazione dello scope:
  ```cpp
  Stato s = Stato::InCorso;
  ```
- Tipo sottostante sicuro (default `int`, modificabile)
- Più leggibile e sicuro di `enum` classico

---

## ✅ Best Practice

- Usa `enum class` sempre → evita `enum`
- Rendi `inline` le funzioni definite in header
- Usa `static` solo quando è **necessaria** condivisione
- Applica `const` a parametri, membri, metodi ovunque possibile
- Organizza tutto con `namespace`
- Usa `friend` **solo quando strettamente necessario**

---

## 🧪 Esercizi consigliati

- ✴️ `Contatore`: classe con membro statico che conta le istanze create
- 🧭 `enum class Stato`: per rappresentare stati (`Start`, `Working`, `Error`)
- 🧮 `inline double media(double, double)`: funzione media tra due numeri
- 🧰 Namespace `Utils` con funzioni `max`, `min`, `clamp`
- 🔐 Classe `ChiaveSegreta` e `Sblocco` che è `friend` e può leggerne il codice

---

## 🔚 Conclusione

✳️ Il C++ moderno favorisce **struttura chiara**, **accesso controllato** e **codice sicuro**.  
L’uso idiomatico di `static`, `const`, `friend`, `inline`, `namespace`, `enum class` è ciò che distingue codice C++ **corretto** da codice **manutenibile e professionale**.
