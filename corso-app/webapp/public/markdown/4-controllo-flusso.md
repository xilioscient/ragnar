# Strutture di Controllo in C++

## Indice
- [If-Else](#if-else)
- [Switch-Case](#switch-case)
- [Cicli](#cicli)
- [Break e Continue](#break-e-continue)
- [Goto](#goto)
- [Esercizi Pratici](#esercizi-pratici)

## If-Else

### If Semplice
```cpp
int eta = 18;

if (eta >= 18) {
    std::cout << "Sei maggiorenne" << std::endl;
}
```

### If-Else
```cpp
int numero = 7;

if (numero % 2 == 0) {
    std::cout << "Il numero è pari" << std::endl;
} else {
    std::cout << "Il numero è dispari" << std::endl;
}
```

### If-Else If-Else
```cpp
int voto = 85;

if (voto >= 90) {
    std::cout << "A" << std::endl;
} else if (voto >= 80) {
    std::cout << "B" << std::endl;
} else if (voto >= 70) {
    std::cout << "C" << std::endl;
} else {
    std::cout << "F" << std::endl;
}
```

## Switch-Case

### Switch Base
```cpp
char operazione = '+';
int a = 10, b = 5;

switch (operazione) {
    case '+':
        std::cout << a + b << std::endl;
        break;
    case '-':
        std::cout << a - b << std::endl;
        break;
    case '*':
        std::cout << a * b << std::endl;
        break;
    case '/':
        if (b != 0) {
            std::cout << a / b << std::endl;
        } else {
            std::cout << "Divisione per zero!" << std::endl;
        }
        break;
    default:
        std::cout << "Operazione non valida" << std::endl;
}
```

## Cicli

### While
```cpp
int contatore = 0;
while (contatore < 5) {
    std::cout << contatore << " ";
    contatore++;
}
// Output: 0 1 2 3 4
```

### Do-While
```cpp
int numero;
do {
    std::cout << "Inserisci un numero positivo: ";
    std::cin >> numero;
} while (numero <= 0);
```

### For
```cpp
for (int i = 0; i < 5; i++) {
    std::cout << i << " ";
}
// Output: 0 1 2 3 4
```

### Range-Based For (C++11)
```cpp
int numeri[] = {1, 2, 3, 4, 5};
for (int num : numeri) {
    std::cout << num << " ";
}
// Output: 1 2 3 4 5
```

## Break e Continue

### Break
```cpp
for (int i = 0; i < 10; i++) {
    if (i == 5) {
        break;  // Esce dal ciclo quando i == 5
    }
    std::cout << i << " ";
}
// Output: 0 1 2 3 4
```

### Continue
```cpp
for (int i = 0; i < 5; i++) {
    if (i == 2) {
        continue;  // Salta l'iterazione quando i == 2
    }
    std::cout << i << " ";
}
// Output: 0 1 3 4
```

## Goto

### Esempio di Goto
```cpp
int x = 0;
inizio:
    x++;
    if (x < 5) {
        goto inizio;
    }
```

## Esercizi Pratici

### Esercizio 1: Indovina il Numero
Scrivi un programma che generi un numero casuale e chieda all'utente di indovinarlo.

```cpp
#include <iostream>
#include <cstdlib>
#include <ctime>

int main() {
    srand(time(0));
    int numeroSegreto = rand() % 100 + 1;
    int tentativo;
    
    do {
        std::cout << "Indovina il numero (1-100): ";
        std::cin >> tentativo;
        
        if (tentativo < numeroSegreto) {
            std::cout << "Troppo basso!" << std::endl;
        } else if (tentativo > numeroSegreto) {
            std::cout << "Troppo alto!" << std::endl;
        }
    } while (tentativo != numeroSegreto);
    
    std::cout << "Hai indovinato!" << std::endl;
    
    return 0;
}
```

### Esercizio 2: Tabellina
Crea un programma che mostri la tabellina di un numero scelto dall'utente.

```cpp
#include <iostream>

int main() {
    int numero;
    
    std::cout << "Inserisci un numero: ";
    std::cin >> numero;
    
    std::cout << "Tabellina del " << numero << ":" << std::endl;
    for (int i = 1; i <= 10; i++) {
        std::cout << numero << " x " << i << " = " << numero * i << std::endl;
    }
    
    return 0;
}
```

## Introduzione
Le strutture di controllo permettono di modificare il flusso di esecuzione del programma in base a condizioni o iterazioni.

## Istruzioni Condizionali

### Operatore Ternario
```cpp
risultato = (condizione) ? valore_se_vera : valore_se_falsa;
```

## Istruzioni di Salto

### Gestione delle Eccezioni

### Try-Catch
```cpp
try {
    // codice che potrebbe generare eccezioni
    throw std::runtime_error("Errore!");
} catch (const std::exception& e) {
    // gestione dell'eccezione
    std::cerr << e.what() << std::endl;
}
```

### Try-Catch Multipli
```cpp
try {
    // codice
} catch (const std::runtime_error& e) {
    // gestione runtime_error
} catch (const std::exception& e) {
    // gestione altre eccezioni
} catch (...) {
    // gestione eccezioni non specificate
}
```

## Best Practices

### Strutture Condizionali
- Usa `if-else` per condizioni semplici
- Usa `switch` per confronti multipli con valori costanti
- Evita `goto` quando possibile
- Usa l'operatore ternario per assegnazioni condizionali semplici

### Cicli
- Usa `for` quando conosci il numero di iterazioni
- Usa `while` quando la condizione di uscita è complessa
- Usa `do-while` quando il codice deve essere eseguito almeno una volta
- Usa range-based for per iterare su container

### Gestione Errori
- Usa le eccezioni per errori non recuperabili
- Usa valori di ritorno per errori previsti
- Evita di catturare tutte le eccezioni con `catch(...)`
- Documenta le eccezioni che una funzione può lanciare

## Risorse Aggiuntive

### Documentazione
- [C++ Reference - Control Flow](https://en.cppreference.com/w/cpp/language/statements)
- [C++ Control Structures](https://www.cplusplus.com/doc/tutorial/control/)

### Community
- Stack Overflow
- Reddit r/cpp
- C++ Forum