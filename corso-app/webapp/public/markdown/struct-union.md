# 🧱 1. `struct`: molto più che contenitori dati

## 1.1 Dichiarazione base

```cpp
struct Punto {
    int x;
    int y;
};
```

- I membri sono **`public` di default** (al contrario delle classi).
- È un tipo utente: può essere usato come qualunque altro tipo.

```cpp
Punto p;
p.x = 10;
p.y = 20;
```

---

## 1.2 Inizializzazione moderna

```cpp
Punto p1 = {1, 2};           // C-style
Punto p2{3, 4};              // Uniform init (C++11)
auto p3 = Punto{5, 6};       // C++17: con type deduction
```

---

## 1.3 `struct` con metodi

```cpp
struct Punto {
    int x, y;

    void stampa() const {
        std::cout << "(" << x << "," << y << ")\n";
    }
};
```

- Può contenere **funzioni membro** come una classe.
- Il `const` dopo `stampa()` indica che **non modifica** lo stato interno.

---

## 1.4 `struct` con costruttore

```cpp
struct Punto {
    int x, y;
    Punto(int x_, int y_) : x(x_), y(y_) {}
};
```

- I costruttori funzionano come nelle classi.
- Se non definito, il compilatore ne crea uno di default (C++20 → può essere `explicit`, `defaulted` o `deleted`).

---

## 1.5 Access specifiers (come le classi)

```cpp
struct Segreto {
private:
    int password = 1234;

public:
    int getPassword() const { return password; }
};
```

⚠️ In C++ le `struct` e le `class` sono **identiche**, tranne per il fatto che:
- `struct`: membri **public** di default
- `class`: membri **private** di default

---

# 🧩 2. `union`: salvataggio memoria, rischio identità

## 2.1 Cos’è una `union`?

```cpp
union Dato {
    int i;
    float f;
    char c;
};
```

- Tutti i membri **condividono lo stesso spazio di memoria**.
- Solo uno dei membri può essere attivamente usato alla volta.

---

## 2.2 Utilizzo

```cpp
Dato d;
d.i = 42;
std::cout << d.i;

d.f = 3.14f;  // ora il contenuto è float
```

---

## 2.3 Perché usarla?

- Per risparmiare spazio (es. **microcontrollori**).
- Per rappresentare **variant types**, spesso in combinazione con `enum`.

```cpp
struct Variant {
    enum Tipo { INT, FLOAT } tipo;
    union {
        int i;
        float f;
    };
};
```

⚠️ Estrema attenzione: leggere un membro diverso da quello scritto → **undefined behavior**

---

# 🎌 3. `enum` ed `enum class`: enumerazioni e tipi forti

## 3.1 `enum` classico (stile C)

```cpp
enum Giorno { LUN, MAR, MER, GIO, VEN };
Giorno g = LUN;
if (g == MAR) ...
```

- Le costanti sono visibili **globalmente**.
- Internamente trattati come `int`.
- 👎 **Non type-safe**: puoi fare `Giorno g = 99;` senza errori!

---

## 3.2 `enum class`: il modo moderno

```cpp
enum class Stato { Idle, InEsecuzione, Terminato };
Stato s = Stato::InEsecuzione;

if (s == Stato::Idle) ...
```

- Fortemente **tipizzato**
- Le costanti sono **scoped**: `Stato::Idle`
- Non si converte implicitamente in `int`

✅ Usa sempre `enum class` a meno che non serva **compatibilità con C**

---

# 🧠 4. Tipi composti: `struct` + `enum` + `union`

Esempio pratico: **Token** per parser lessicale

```cpp
enum class TokenType { Numero, Operatore };

struct Token {
    TokenType tipo;
    union {
        int numero;
        char operatore;
    };

    void stampa() const {
        if (tipo == TokenType::Numero) std::cout << numero;
        else std::cout << operatore;
    }
};
```

- Tipo che **cambia comportamento dinamicamente**
- In C++17+ meglio usare `std::variant`, ma questa è la base concettuale

---

# 🔥 5. Avanzamenti moderni (C++11+)

## 5.1 `struct` con `=default`, `=delete`

```cpp
struct A {
    A() = default;
    A(const A&) = delete;
};
```

- Utile per definire oggetti **non copiabili**, non movibili, o con semantica controllata

---

## 5.2 `enum class` con tipo sottostante

```cpp
enum class Colore : uint8_t {
    Rosso, Verde, Blu
};
```

- Risparmia memoria
- Evita cast impliciti

---

# 💡 6. Esercizi professionali consigliati

- ✏️ Crea una `struct` `Rettangolo` con:
  - metodo `area()`
  - costruttore
  - metodo `toString()`

- 🔐 Crea un `enum class TipoUtente { Admin, Guest, Member }` e una funzione:
  ```cpp
  bool haAccesso(TipoUtente);
  ```

- 🔁 Crea una `union` per rappresentare un dato che può essere `int`, `float` o `bool`, con un `enum` associato

- 📐 Crea una `struct Vec3` (`x`, `y`, `z`) con overload per:
  - somma (`operator+`)
  - confronto (`operator==`)

- 🧮 Crea un parser che legge un input e restituisce un `Token` con `TokenType` e valore nella `union`