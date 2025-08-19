# 🔢 Puntatori in C++

## 1. Cos’è un puntatore

```cpp
int x = 42;
int* ptr = &x;     // ptr contiene l'indirizzo di x
std::cout << *ptr; // stampa 42
```

- `&x`: prende l’indirizzo di `x`
- `*ptr`: dereferenziazione → accedi/modifichi `x` indirettamente

```cpp
*ptr = 99;  // x ora vale 99
```

---

## 📍 2. Reference vs Pointer

```cpp
int a = 5;
int& r = a;     // reference
int* p = &a;    // puntatore
```

| Caratteristica       | Reference (`int&`) | Pointer (`int*`)     |
|----------------------|--------------------|------------------------|
| Sintassi             | `int& r = x;`      | `int* p = &x;`         |
| Nullabile            | ❌ No              | ✅ Sì (`nullptr`)      |
| Riassegnabile        | ❌ No              | ✅ Sì (`p = &y;`)       |
| Accesso              | Diretto (`r`)      | Indiretto (`*p`)       |
| Sicurezza            | ✅ più sicura      | ⚠️ meno sicura         |

✅ Preferisci `&` (reference) se non serve flessibilità dinamica.  
⚠️ Usa `*` (puntatori) con attenzione.

---

## 🧮 3. Aritmetica dei puntatori

```cpp
int arr[] = {10, 20, 30};
int* p = arr;
std::cout << *(p + 2); // stampa 30
```

### Iterazione:

```cpp
for (int* p = arr; p < arr + 3; ++p)
    std::cout << *p;
```

⚠️ Mai oltrepassare i limiti → **undefined behavior (UB)**.

---

## 🫥 4. `nullptr`, `NULL`, `0`: differenze

```cpp
int* p1 = nullptr; // ✅ sicuro
int* p2 = NULL;    // ⚠️ legacy
int* p3 = 0;       // 😱 ambiguo
```

| Valore     | Sicuro? | Note                         |
|------------|---------|------------------------------|
| `nullptr`  | ✅ Sì   | Type-safe, moderno           |
| `NULL`     | ⚠️ No   | È spesso `#define NULL 0`    |
| `0`        | 🚫 No   | Ambiguo con `int`            |

🧠 **Usa sempre `nullptr`** in C++ moderno.

---

## 🧨 5. Dangling pointers e reference

```cpp
int* p;
{
    int x = 42;
    p = &x;
} // x è distrutto
std::cout << *p;  // 💥 dangling pointer → UB
```

### Anche le reference:

```cpp
int& f() {
    int x = 5;
    return x; // 💀 ritorna ref a variabile locale
}
```

❌ Non restituire mai reference/puntatori a oggetti locali o temporanei.

---

## 🧬 6. Aliasing e side effects

```cpp
int x = 100;
int& r = x;
int* p = &x;

*r = 42;  // x == 42
*p = 7;   // x == 7
```

- **Aliasing**: più nomi per la stessa memoria
- Attenzione a effetti collaterali, soprattutto in:
  - multithreading
  - funzioni ottimizzabili
  - passaggio di parametri

✅ Usa `const` per ridurre gli effetti collaterali

---

## 💀 7. Undefined Behavior (UB) in memoria

Casi tipici:
- Dereferenziare puntatori non inizializzati
- Accesso a memoria deallocata
- Accesso fuori dai limiti
- `delete` doppio
- Mescolare `delete` e `delete[]`

```cpp
int* p = nullptr;
std::cout << *p;  // 💀 crash
```

### Strumenti utili:
- `valgrind`
- `AddressSanitizer` (`-fsanitize=address`)
- `clang-tidy`, `cppcheck`

---

## 🧠 8. Best practice: sicurezza e ownership

✅ Inizializza sempre i puntatori  
✅ Usa `nullptr`, evita `NULL` o `0`  
✅ Preferisci `std::unique_ptr`, `std::shared_ptr`  
✅ Evita di passare ref/puntatori a temporanei  
✅ Usa `const T*` o `T const&` quando puoi  
❌ Evita `new`/`delete` a meno che sia strettamente necessario

---

## 🧪 Esercizi professionali consigliati

1. ✏️ Scrivi una funzione `int somma(int* arr, int size)` e testala con `new[]`.
2. 🧪 Crea una funzione `void raddoppia(int& x)` che modifica il valore tramite reference.
3. 📐 Simula una matrice 2D con `double**` (dinamica).
4. 💣 Genera UB con dangling pointer, poi correggilo usando smart pointer.
5. 🧬 Mostra un caso di aliasing pericoloso e risolvilo con `const` o copy-on-write.
