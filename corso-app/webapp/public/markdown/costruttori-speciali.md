# 📦 Gestione delle risorse in C++: Copy, Move, Rule of 5

> 💡 È qui che il C++ smette di essere “C con classi” e diventa un linguaggio di proprietà e risorse.

---

## 🧱 1. Copy Constructor – Costruttore di copia

```cpp
class Libro {
    std::string titolo;
public:
    Libro(const Libro& altro) {
        titolo = altro.titolo;
    }
};
```

### 🔄 Chiamato quando:
- Passi un oggetto per valore
- Lo ritorni per valore
- Lo assegni in dichiarazione (`Libro b = a;`)

---

## ✏️ 2. Copy Assignment Operator – Operatore di assegnazione

```cpp
class Libro {
public:
    Libro& operator=(const Libro& altro) {
        if (this != &altro) {  // evita autoassegnazione
            titolo = altro.titolo;
        }
        return *this;
    }
};
```

### ✅ Sovrascrive un oggetto esistente con un altro già costruito

---

## 🧹 3. Distruttore

```cpp
class File {
public:
    ~File() {
        std::cout << "File chiuso!\n";
    }
};
```

- Eseguito **automaticamente** alla fine della vita dell’oggetto
- Libera **risorse**: memoria, file, mutex, ecc.
- Fondamentale per RAII (Resource Acquisition Is Initialization)

---

## 🚚 4. Move Constructor & Move Assignment Operator

```cpp
class Risorsa {
    char* dati;
public:
    Risorsa(Risorsa&& other) noexcept {
        dati = other.dati;
        other.dati = nullptr;  // "spostiamo", non copiamo
    }

    Risorsa& operator=(Risorsa&& other) noexcept {
        if (this != &other) {
            delete[] dati;
            dati = other.dati;
            other.dati = nullptr;
        }
        return *this;
    }
};
```

### 🎯 Usati quando:
- Ritorni un oggetto da funzione
- Usi `std::move()`
- Passi oggetti temporanei

---

## 📏 5. Rule of Three / Five / Zero

| Regola         | Quando si applica                       | Cosa include                              |
|----------------|-----------------------------------------|-------------------------------------------|
| **Rule of 3**  | Gestione manuale risorse (`new`)        | Copy constructor, copy assignment, dtor   |
| **Rule of 5**  | Se supporti move semantics              | Aggiungi move constructor e move assign   |
| **Rule of 0**  | Se usi solo RAII / smart pointers       | Nessuno dei 5 → lasci fare al compilatore |

> 📢 Se ne scrivi **una**, probabilmente devi scrivere **tutte e cinque**!

---

## 💡 6. Esempio completo: `Buffer`

```cpp
class Buffer {
private:
    char* data;
    size_t size;

public:
    Buffer(size_t size) : size(size) {
        data = new char[size];
    }

    // Copy constructor
    Buffer(const Buffer& other) : size(other.size) {
        data = new char[size];
        std::copy(other.data, other.data + size, data);
    }

    // Copy assignment
    Buffer& operator=(const Buffer& other) {
        if (this != &other) {
            delete[] data;
            size = other.size;
            data = new char[size];
            std::copy(other.data, other.data + size, data);
        }
        return *this;
    }

    // Move constructor
    Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) {
        other.data = nullptr;
        other.size = 0;
    }

    // Move assignment
    Buffer& operator=(Buffer&& other) noexcept {
        if (this != &other) {
            delete[] data;
            data = other.data;
            size = other.size;
            other.data = nullptr;
            other.size = 0;
        }
        return *this;
    }

    // Destructor
    ~Buffer() {
        delete[] data;
    }
};
```

---

## 🧠 Best Practice

✅ Usa `= default` o `= delete` se vuoi esplicitare le intenzioni  
✅ Usa `noexcept` nei costruttori/move assignment  
✅ Usa `if (this != &other)` nei metodi di assegnazione  
✅ Evita `new/delete` → preferisci `std::vector`, `std::string`, `std::unique_ptr`

---

## 🧪 Esercizi consigliati

1. 🎨 Crea una classe `Immagine` che alloca dinamicamente un array di pixel
2. 🧪 Implementa tutti i 5 metodi per `Buffer` con tracciamento via `std::cout`
3. 📓 Scrivi una classe `LogFile` che apre un file nel costruttore e lo chiude nel distruttore
4. 🚀 Simula un'operazione costosa che diventa veloce con move (es. `std::vector`)
5. 🧰 Usa `std::move()` per spostare un oggetto invece di copiarlo

---

## 📦 Tool consigliati

- **`clang-tidy`** – avvisi su Rule of 5 dimenticata
- **`cppinsights.io`** – mostra codice generato dal compilatore
- **`AddressSanitizer`** – individua errori di memoria (con `-fsanitize=address`)
- **`std::is_copy_constructible<T>`** – introspezione dei tipi

---

## 🔚 Conclusione

🔑 La gestione esplicita delle risorse in C++ è potente ma pericolosa.  
Usa **RAII**, **smart pointer** e **semantiche di spostamento** per scrivere codice sicuro e performante.
