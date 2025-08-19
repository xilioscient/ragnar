
# 1. Array in C++: il buono, il brutto e il cattivo

## 1.1 Array statici (C-style)

**Dichiarazione:**

```cpp
int v[5];             // 5 elementi non inizializzati
double m[3][4];       // matrice 3×4
char name[] = "Sasha"; // 6 caratteri compreso '\0'
```

**Caratteristiche:**

- Contiguo in memoria: `&v[i+1] == (&v[i] + 1)`
- Nessun controllo di bound: uscire dall’array = comportamento indefinito (UB).
- *Lifetime*: su stack o static storage duration (globali/static), deallocazione automatica a fine scope.

---

## 1.2 Array dinamici

**`new/delete`:**

```cpp
int* p = new int[10];   // 10 int su heap
// … usa p[0] … p[9]
delete[] p;             // ricordati sempre il delete[]
```

**Pitfall:**

- Dimenticare `delete[]` → memory leak.
- Usare `delete` (senza `[]`) su array → UB.
- Dereferenziare dopo `delete` → dangling pointer.

---

## 1.3 Alternative moderne

### `std::array<T, N>`

- Wrap leggero su array statico con interfaccia STL.
- Dimensione nota a compile-time.
- Metodi: `.size()`, `.begin()`, `.end()`, `.at()` (con controllo bound).

### `std::vector<T>`

- Array dinamico con gestione automatica di:
  - allocazione/deallocazione
  - capacità e riallocazioni
- Funzioni utili: `reserve()`, `shrink_to_fit()`, `emplace_back()`

---

# 2. Puntatori: la chiave (a volte spada) della memoria

## 2.1 Tipi di puntatore e sintassi

```cpp
int x = 42;
int* p1 = &x;          // puntatore a int
const int* p2 = &x;    // puntatore a int costante (non modifica *p2)
int* const p3 = &x;    // puntatore costante (non può cambiare l’indirizzo)
```

- `T*`: puntatore a `T`
- `T const*` ≡ `const T*`: non puoi modificare `*p`
- `T* const`: l’indirizzo è costante
- `const T* const`: entrambe le cose

---

## 2.2 Operazioni fondamentali

- **Dereferenziazione:** `*p`
- **Aritmetica dei puntatori:**
  - `p + 1` avanza di `sizeof(T)` byte
  - `p[i]` ≡ `*(p + i)`
- **Confronti:** in un array puoi confrontare puntatori per ordine, altrimenti UB.

---

## 2.3 Puntatori a puntatori e funzioni

### Puntatore a puntatore:

```cpp
int** pp = &p1;
```

### Passaggio per puntatore per modificare l’argomento:

```cpp
void resetToZero(int* ptr) { *ptr = 0; }
void resetToNull(int*& ptr) { ptr = nullptr; }  // con riferimento-sequel
```

---

## 2.4 Gestione dei puntatori null e dangling

- **Null pointer:** sempre inizializza con `nullptr`.

```cpp
if (p) { /* p non è null */ }
```

- **Dangling pointer:**
  - Puntatore a oggetto deallocato o a variabile fuori scope.
  - Strategia: dopo `delete`, fare `p = nullptr`.

---

# 3. Riferimenti: alias sicuro e leggibile

## 3.1 Riferimento lvalue

```cpp
int y = 100;
int& r = y;    // r alias per y
r = 200;       // modifica anche y
```

**Proprietà:**

- Deve essere inizializzato appena dichiarato.
- Non può essere “re-bindato” (sempre alias del primo oggetto).

---

## 3.2 Riferimenti `const`

```cpp
const int& cr = y;
```

**Utile per:**

- Evitare copie di oggetti pesanti (passaggio per `const ref`).
- Leggere oggetto senza rischio di modifica.

---

## 3.3 Quando usare riferimenti vs puntatori

| Caratteristica     | Riferimento         | Puntatore               |
|--------------------|---------------------|--------------------------|
| Deve esistere      | sempre valido       | può essere `nullptr`     |
| Rebind             | no                  | sì                       |
| Sintassi           | più leggibile       | più flessibile           |
| Uso comune         | passaggio funzione  | strutture dati, API C    |
```

---
