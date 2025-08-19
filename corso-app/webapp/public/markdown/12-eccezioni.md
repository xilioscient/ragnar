# Gestione delle Eccezioni

## Indice
- [Introduzione](#introduzione)
- [Try-Catch](#try-catch)
- [Tipi di Eccezioni](#tipi-di-eccezioni)
- [Eccezioni Personalizzate](#eccezioni-personalizzate)
- [RAII e Gestione delle Risorse](#raii-e-gestione-delle-risorse)
- [Best Practices](#best-practices)
- [Esercizi Pratici](#esercizi-pratici)

## Introduzione

La gestione delle eccezioni in C++ è un meccanismo per gestire errori e situazioni anomale durante l'esecuzione del programma. Permette di separare il codice che rileva gli errori da quello che li gestisce, migliorando la leggibilità e la manutenibilità del codice.

## Try-Catch

### Sintassi Base
```cpp
#include <iostream>
#include <stdexcept>

int main() {
    try {
        // Codice che potrebbe generare un'eccezione
        throw std::runtime_error("Errore di runtime");
    } catch (const std::exception& e) {
        std::cout << "Eccezione catturata: " << e.what() << std::endl;
    }
    
    return 0;
}
```

### Gestione di Eccezioni Multiple
```cpp
#include <iostream>
#include <stdexcept>

int main() {
    try {
        int x = -1;
        if (x < 0) {
            throw std::invalid_argument("Numero negativo non valido");
        }
        if (x > 100) {
            throw std::out_of_range("Numero troppo grande");
        }
    } catch (const std::invalid_argument& e) {
        std::cout << "Errore di argomento: " << e.what() << std::endl;
    } catch (const std::out_of_range& e) {
        std::cout << "Errore di range: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Altro errore: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## Tipi di Eccezioni

### Eccezioni Standard
```cpp
#include <iostream>
#include <stdexcept>

void testEccezioni() {
    // std::logic_error
    throw std::invalid_argument("Argomento non valido");
    throw std::domain_error("Dominio non valido");
    throw std::length_error("Lunghezza non valida");
    throw std::out_of_range("Indice fuori range");
    
    // std::runtime_error
    throw std::range_error("Range non valido");
    throw std::overflow_error("Overflow");
    throw std::underflow_error("Underflow");
}

int main() {
    try {
        testEccezioni();
    } catch (const std::exception& e) {
        std::cout << "Tipo: " << typeid(e).name() << std::endl;
        std::cout << "Messaggio: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## Eccezioni Personalizzate

### Definizione di Eccezioni
```cpp
#include <iostream>
#include <stdexcept>
#include <string>

class ErroreCalcolatrice : public std::runtime_error {
public:
    ErroreCalcolatrice(const std::string& msg) 
        : std::runtime_error(msg) {}
};

class DivisionePerZero : public ErroreCalcolatrice {
public:
    DivisionePerZero() 
        : ErroreCalcolatrice("Divisione per zero non consentita") {}
};

double dividi(double a, double b) {
    if (b == 0) {
        throw DivisionePerZero();
    }
    return a / b;
}

int main() {
    try {
        double risultato = dividi(10, 0);
    } catch (const DivisionePerZero& e) {
        std::cout << "Errore: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## RAII e Gestione delle Risorse

### Gestione Automatica delle Risorse
```cpp
#include <iostream>
#include <memory>

class Risorsa {
public:
    Risorsa() { std::cout << "Risorsa creata" << std::endl; }
    ~Risorsa() { std::cout << "Risorsa distrutta" << std::endl; }
};

void funzioneSicura() {
    auto risorsa = std::make_unique<Risorsa>();
    // La risorsa viene automaticamente deallocata
    // anche se viene lanciata un'eccezione
    throw std::runtime_error("Errore");
}

int main() {
    try {
        funzioneSicura();
    } catch (const std::exception& e) {
        std::cout << "Eccezione: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## Best Practices

### Gestione delle Eccezioni
```cpp
#include <iostream>
#include <stdexcept>
#include <vector>

class GestoreFile {
public:
    void apriFile(const std::string& nome) {
        try {
            // Simulazione apertura file
            if (nome.empty()) {
                throw std::invalid_argument("Nome file vuoto");
            }
            // ... codice per aprire il file
        } catch (const std::exception& e) {
            // Log dell'errore
            std::cerr << "Errore apertura file: " << e.what() << std::endl;
            // Rilancio l'eccezione per gestione superiore
            throw;
        }
    }
    
    std::vector<int> leggiDati() {
        std::vector<int> dati;
        try {
            // Simulazione lettura dati
            dati.push_back(1);
            dati.push_back(2);
            if (dati.empty()) {
                throw std::runtime_error("Nessun dato letto");
            }
        } catch (const std::exception& e) {
            // Gestione locale dell'errore
            std::cerr << "Errore lettura dati: " << e.what() << std::endl;
            return std::vector<int>();  // Ritorno valore di default
        }
        return dati;
    }
};

int main() {
    GestoreFile gf;
    try {
        gf.apriFile("dati.txt");
        auto dati = gf.leggiDati();
    } catch (const std::exception& e) {
        std::cout << "Errore gestione file: " << e.what() << std::endl;
    }
    
    return 0;
}
```

## Esercizi Pratici

### Esercizio 1: Calcolatrice Sicura
Implementa una calcolatrice che gestisce le eccezioni in modo appropriato.

```cpp
#include <iostream>
#include <stdexcept>
#include <string>

class ErroreCalcolatrice : public std::runtime_error {
public:
    ErroreCalcolatrice(const std::string& msg) 
        : std::runtime_error(msg) {}
};

class DivisionePerZero : public ErroreCalcolatrice {
public:
    DivisionePerZero() 
        : ErroreCalcolatrice("Divisione per zero non consentita") {}
};

class Calcolatrice {
public:
    double somma(double a, double b) { return a + b; }
    
    double sottrai(double a, double b) { return a - b; }
    
    double moltiplica(double a, double b) { return a * b; }
    
    double dividi(double a, double b) {
        if (b == 0) {
            throw DivisionePerZero();
        }
        return a / b;
    }
    
    double radice(double x) {
        if (x < 0) {
            throw std::domain_error("Radice di numero negativo non definita");
        }
        return std::sqrt(x);
    }
};

int main() {
    Calcolatrice calc;
    
    try {
        std::cout << "Somma: " << calc.somma(5, 3) << std::endl;
        std::cout << "Divisione: " << calc.dividi(10, 2) << std::endl;
        std::cout << "Radice: " << calc.radice(16) << std::endl;
        
        // Test errori
        calc.dividi(5, 0);  // Lancia DivisionePerZero
        calc.radice(-4);    // Lancia domain_error
    } catch (const DivisionePerZero& e) {
        std::cout << "Errore divisione: " << e.what() << std::endl;
    } catch (const std::domain_error& e) {
        std::cout << "Errore dominio: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Errore generico: " << e.what() << std::endl;
    }
    
    return 0;
}
```

### Esercizio 2: Gestore File
Implementa un gestore file con gestione delle eccezioni e RAII.

```cpp
#include <iostream>
#include <fstream>
#include <string>
#include <stdexcept>
#include <memory>

class ErroreFile : public std::runtime_error {
public:
    ErroreFile(const std::string& msg) 
        : std::runtime_error(msg) {}
};

class GestoreFile {
private:
    std::unique_ptr<std::fstream> file;
    std::string nomeFile;
    
public:
    GestoreFile(const std::string& nome) : nomeFile(nome) {
        file = std::make_unique<std::fstream>();
        file->open(nome, std::ios::in | std::ios::out);
        
        if (!file->is_open()) {
            throw ErroreFile("Impossibile aprire il file: " + nome);
        }
    }
    
    ~GestoreFile() {
        if (file && file->is_open()) {
            file->close();
        }
    }
    
    void scrivi(const std::string& contenuto) {
        if (!file->is_open()) {
            throw ErroreFile("File non aperto");
        }
        
        *file << contenuto;
        if (file->fail()) {
            throw ErroreFile("Errore durante la scrittura");
        }
    }
    
    std::string leggi() {
        if (!file->is_open()) {
            throw ErroreFile("File non aperto");
        }
        
        std::string contenuto;
        std::string linea;
        while (std::getline(*file, linea)) {
            contenuto += linea + "\n";
        }
        
        if (file->fail() && !file->eof()) {
            throw ErroreFile("Errore durante la lettura");
        }
        
        return contenuto;
    }
};

int main() {
    try {
        GestoreFile gf("test.txt");
        gf.scrivi("Hello, World!\n");
        std::cout << "Contenuto: " << gf.leggi() << std::endl;
    } catch (const ErroreFile& e) {
        std::cout << "Errore file: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cout << "Errore generico: " << e.what() << std::endl;
    }
    
    return 0;
}
```