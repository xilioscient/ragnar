# 🚀 Introduzione al C++

## Indice
- [Cos'è il C++](#cosè-il-c)
- [Perché imparare il C++?](#perché-imparare-il-c)
- [Differenze con altri linguaggi](#differenze-con-altri-linguaggi)
- [Il Primo Programma](#il-primo-programma)
- [Struttura di un Programma](#struttura-di-un-programma)
- [Compilazione](#compilazione)
- [Esercizi Pratici](#esercizi-pratici)

---

## Cos'è il C++

Il **C++** è un linguaggio di programmazione potente e versatile che combina:
- **Programmazione procedurale**
- **Programmazione orientata agli oggetti (OOP)**
- **Programmazione generica (template)**

> **Curiosità:** Il C++ nasce come estensione del C, aggiungendo il supporto all'OOP e molte altre funzionalità moderne.

---

## Perché imparare il C++?

- **Performance**: Esecuzione veloce e controllo diretto della memoria.
- **Portabilità**: Codice eseguibile su diverse piattaforme (Windows, Linux, Mac).
- **Flessibilità**: Supporto per diversi paradigmi di programmazione.
- **Utilizzo reale**: Usato in videogiochi, sistemi embedded, finanza, motori grafici, sistemi operativi, IoT, robotica.

---

## Differenze con altri linguaggi

| Caratteristica      | C++            | Python         | Java           |
|---------------------|----------------|---------------|----------------|
| Paradigma           | Multi-paradigma| OOP, scripting| OOP            |
| Tipizzazione        | Statica        | Dinamica      | Statica        |
| Gestione memoria    | Manuale/RAII   | Garbage Col.  | Garbage Col.   |
| Performance         | Alta           | Bassa-media   | Media          |
| Compilazione        | Compilato      | Interpretato  | Compilato JVM  |

---

## Il Primo Programma

### 👋 Hello World

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

#### Spiegazione del Codice

1. `#include <iostream>`: Includiamo la libreria per input/output.
2. `int main()`: Funzione principale del programma.
3. `std::cout`: Oggetto per l'output a console.
4. `<<`: Operatore di inserimento.
5. `std::endl`: Fine riga e flush del buffer.
6. `return 0`: Indica che il programma è terminato con successo.

#### Output Atteso

```console
Hello, World!
```

---

## Struttura di un Programma

### Componenti Base

1. **Direttive al Preprocessore**
   ```cpp
   #include <iostream>
   #include <string>
   ```

2. **Namespace**
   ```cpp
   using namespace std;  // Non raccomandato in progetti grandi
   ```

3. **Funzioni**
   ```cpp
   int somma(int a, int b) {
       return a + b;
   }
   ```

> **Nota:** In C++ è buona pratica evitare `using namespace std;` a livello globale per evitare conflitti di nomi.

---

## Compilazione

### Compilatore GCC (GNU Compiler Collection)

```bash
g++ programma.cpp -o programma
```

### Esecuzione

```bash
./programma
```

> **Suggerimento:** Usa sempre i flag `-Wall -Wextra` per abilitare tutti i warning.

---

## Esercizi Pratici

### 🧮 Esercizio 1: Calcolatrice Semplice

Scrivi un programma che:
1. Chieda all'utente di inserire due numeri
2. Mostri la somma, differenza, prodotto e quoziente

```cpp
#include <iostream>

int main() {
    double num1, num2;
    
    std::cout << "Inserisci il primo numero: ";
    std::cin >> num1;
    
    std::cout << "Inserisci il secondo numero: ";
    std::cin >> num2;
    
    std::cout << "Somma: " << num1 + num2 << std::endl;
    std::cout << "Differenza: " << num1 - num2 << std::endl;
    std::cout << "Prodotto: " << num1 * num2 << std::endl;
    
    if (num2 != 0) {
        std::cout << "Quoziente: " << num1 / num2 << std::endl;
    } else {
        std::cout << "Impossibile dividere per zero!" << std::endl;
    }
    
    return 0;
}
```

---

### 🌡️ Esercizio 2: Convertitore di Temperature

Scrivi un programma che converta la temperatura da Celsius a Fahrenheit.

```cpp
#include <iostream>

int main() {
    double celsius;
    
    std::cout << "Inserisci la temperatura in Celsius: ";
    std::cin >> celsius;
    
    double fahrenheit = (celsius * 9/5) + 32;
    
    std::cout << celsius << "°C = " << fahrenheit << "°F" << std::endl;
    
    return 0;
}
```