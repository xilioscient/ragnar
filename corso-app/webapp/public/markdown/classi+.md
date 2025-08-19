# 🧩 Classi Annidate, Forward Declaration e PIMPL Idiom in C++

> Strategie avanzate per modellare relazioni interne, ridurre dipendenze e nascondere dettagli di implementazione.

---

## 🧱 1. Classi annidate (Nested Classes)

```cpp
class Motore {
public:
    class Pistone {
    public:
        void accendi() { std::cout << "Pistone attivo\n"; }
    };

    Pistone creaPistone() { return Pistone(); }
};
```

### ✅ Vantaggi
- Raggruppa concettualmente classi usate solo all’interno di un’altra
- Riduce l’inquinamento del namespace globale
- **Nota:** la nested class **non ha accesso diretto** ai membri della classe contenitore (a meno di `friend` o passaggio di `this`)

---

## 🛰️ 2. Forward declaration

### 🔹 Quando usarla?
- Quando non serve conoscere i dettagli completi della classe
- Per evitare di includere header pesanti nei file `.h`
- Per separare interfaccia e implementazione

```cpp
// file A.h
class B;  // forward declaration

class A {
    B* ptr;  // puntatore o riferimento va bene
};
```

```cpp
// file A.cpp
#include "B.h"  // uso completo di B
```

### ❌ Limitazioni
- Non si può forward-declare se la classe è usata per **valore** (serve la dimensione completa)
- Non puoi definire metodi della classe forward-declared nel `.h`

---

## 🔒 3. PIMPL Idiom (Pointer to IMPLementation)

> Nasconde i dettagli di implementazione dietro un puntatore, migliora incapsulamento, ABI e tempi di compilazione.

### 🔹 Struttura base

**Libreria.h (interfaccia)**
```cpp
#pragma once
#include <memory>

class LibreriaImpl;  // forward declaration

class Libreria {
public:
    Libreria();
    ~Libreria();

    void stampaTitoli() const;

private:
    std::unique_ptr<LibreriaImpl> pImpl;
};
```

**Libreria.cpp (implementazione privata)**
```cpp
#include "Libreria.h"
#include <iostream>
#include <vector>
#include <string>

class LibreriaImpl {
    std::vector<std::string> titoli;
public:
    LibreriaImpl() {
        titoli = {"C++ Primer", "Effective Modern C++", "Clean Code"};
    }

    void stampaTitoli() const {
        for (const auto& titolo : titoli)
            std::cout << titolo << "\n";
    }
};

Libreria::Libreria() : pImpl(std::make_unique<LibreriaImpl>()) {}
Libreria::~Libreria() = default;

void Libreria::stampaTitoli() const {
    pImpl->stampaTitoli();
}
```

### ✅ Vantaggi del PIMPL
- Evita ricompilazioni a cascata dovute a modifiche interne
- Nasconde completamente i dettagli di implementazione
- Protegge la stabilità dell’interfaccia binaria (ABI)
- Mantiene il file `.h` leggero e stabile

### 🔥 Trucchi avanzati
- Usa `std::unique_ptr` per gestione automatica della memoria
- Per supportare copy/move, devi implementare manualmente i relativi operatori (o usare il clone idiom)
- `std::shared_ptr` se vuoi condividere la stessa implementazione fra istanze

---

## 📑 Best Practice

| Situazione                         | Soluzione                   |
|-----------------------------------|----------------------------|
| Classe usata solo internamente    | Falla nested               |
| Dipendenza pesante nel `.h`       | Usa forward declaration    |
| Vuoi stabilità ABI e privacy      | Applica il PIMPL idiom     |
| Troppi header inclusi nel `.h`    | Spostali nel `.cpp`        |

---

## 🧪 Esercizi consigliati

- Scrivi una classe `Computer` con una nested class `CPU`
- Usa forward declaration per collegare due classi che si puntano a vicenda (`class A`, `class B`)
- Implementa una classe `Archivio` con PIMPL e un metodo `aggiungiDocumento(std::string)`
- Refactoring: sposta l’inclusione di `<vector>` dal `.h` al `.cpp` usando forward declaration
- Crea una classe `Config` annidata dentro `App`, visibile solo all’interno della classe

---