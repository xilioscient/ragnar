# 📦 1. Array statici (C-style)

## 1.1 Dichiarazione base

```cpp
int arr[5] = {1, 2, 3, 4, 5};
```

- Memoria allocata **sullo stack**
- Dimensione **fissa** e nota a compile-time
- ⚠️ Nessun controllo di limiti!

```cpp
std::cout << arr[2];  // ok
std::cout << arr[5];  // ❌ Undefined Behavior (fuori dai limiti)
```

---

## 1.2 Array parzialmente inizializzati

```cpp
int arr[5] = {1, 2};  // → {1, 2, 0, 0, 0}
```

---

## 1.3 Iterazione idiomatica

```cpp
for (int i = 0; i < 5; ++i)
    std::cout << arr[i];
```

👎 I C-style array sono **pericolosi e limitati**, ma **necessari** per interoperabilità C o uso a basso livello.

---

# 📐 2. Array multidimensionali

```cpp
int matrice[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
```

- Sono array di array
- Accesso: `matrice[1][2]` → `6`
- Sempre **statici**
- Meglio usare `std::vector` per strutture dinamiche

⚠️ C++ non ha array dinamici multidimensionali nativi → si usano:
- `std::vector<std::vector<>>`
- o **flat vector** + indice calcolato

---

# 💾 3. Array dinamici (`new[]` / `delete[]`)

```cpp
int* arr = new int[10];
arr[0] = 1;

// ...

delete[] arr;
```

- Memoria allocata **sull'heap**
- Dimensione nota a **runtime**
- ⚠️ Usare `delete[]` (non `delete`)!

### Best practice: usare RAII

```cpp
#include <memory>
std::unique_ptr<int[]> arr(new int[10]);
```

✅ `unique_ptr<T[]>` → deallocazione **automatica** a fine scope  
❌ Dimenticare `delete[]` → memory leak  
❌ Usare `delete` su `new[]` → undefined behavior

---

# 📊 4. `std::array<T, N>` – Array statico C++11

```cpp
#include <array>

std::array<int, 5> arr = {1, 2, 3, 4, 5};
```

- Array **statico** ma **più sicuro** dei C-style array
- Allocato sullo **stack**
- Supporta:
  - `.size()`
  - `.at(i)` → **bounds checked**
  - `.begin()`, `.end()` → iterabile STL

✅ Usalo al posto di `int arr[5]` quando possibile  
🔒 `N` deve essere noto **a compile-time**

---

# 📈 5. `std::vector<T>` – L’array dinamico per eccellenza

```cpp
#include <vector>

std::vector<int> v = {1, 2, 3};
v.push_back(4);
```

- Memoria dinamica **gestita automaticamente**
- **Dimensione variabile**
- Funzioni utili:
  - `.size()`, `.capacity()`
  - `.push_back()`, `.resize()`, `.clear()`
  - `.at(i)` → bounds-checked

### Iterazione

```cpp
for (int x : v)
    std::cout << x;
```

⚠️ Attenzione:
- Reallocazione → può **invalidare puntatori/iteratori**
- Performance: costante ammortizzata ma **non gratuita**

---

# 🧪 6. `std::valarray<T>` – Uso scientifico

```cpp
#include <valarray>

std::valarray<int> v = {1, 2, 3};
v = v + 5;  // → {6, 7, 8}
```

- Supporta **operazioni vettoriali element-wise** efficienti
- ⚠️ Non ha `.push_back()`, quindi meno flessibile
- Ottimo per **calcoli numerici** e **DSP**

---

# 🧬 7. Array di oggetti: costruttori e distruttori

## 7.1 Con `std::vector` di classi

```cpp
struct Punto {
    int x, y;
    Punto(int x, int y) : x(x), y(y) {}
};

std::vector<Punto> punti;
punti.emplace_back(1, 2);
```

- `emplace_back` evita copie temporanee
- Se usi `new[]`, i **distruttori** vengono chiamati solo con `delete[]`

---

# 🛡️ 8. Errori comuni

| Errore                        | Descrizione                                       |
|-----------------------------|---------------------------------------------------|
| `delete` su `new[]`         | ❌ UB: chiama distruttore solo per il primo elemento |
| Accesso out-of-bounds       | `arr[1000] = 42` → crash                          |
| Dimenticare `delete[]`      | ❌ Memory leak silenzioso                         |
| Puntatore dangling          | Accesso dopo `delete[]`                          |
| Non usare `resize()`        | Accesso a elementi non allocati in `vector`      |

---

# 💡 9. Esercizi professionali

- ✏️ Crea una funzione `media(int* arr, int size)` che calcola la media di un array dinamico.
- 📍 Implementa un `std::vector<Punto>` e trova il punto **più vicino all’origine**.
- 🧱 Simula una **matrice 2D** con `std::vector<std::vector<int>>`, poi rifalla con un **flat vector**.
- 🛠️ Implementa un array dinamico manuale `MyArray` con `new[]` / `delete[]` e bounds checking.
- ⚙️ Usa `std::array` in una funzione `constexpr` che somma i primi `N` elementi.
