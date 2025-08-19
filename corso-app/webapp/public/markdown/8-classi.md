# Classi e Oggetti in C++

## Indice
- [Introduzione](#introduzione)
- [Dichiarazione di Classe](#dichiarazione-di-classe)
- [Costruttori e Distruttori](#costruttori-e-distruttori)
- [Membri della Classe](#membri-della-classe)
- [Incapsulamento](#incapsulamento)
- [Operatori](#operatori)
- [Esercizi Pratici](#esercizi-pratici)

## Introduzione

Le classi sono il fondamento della programmazione orientata agli oggetti in C++. Permettono di definire nuovi tipi di dati che combinano dati e funzionalità correlate.

## Dichiarazione di Classe

### Struttura Base
```cpp
class Rettangolo {
private:
    double base;
    double altezza;

public:
    // Costruttore
    Rettangolo(double b, double h) : base(b), altezza(h) {}
    
    // Metodi
    double calcolaArea() const {
        return base * altezza;
    }
    
    double calcolaPerimetro() const {
        return 2 * (base + altezza);
    }
};
```

### Uso della Classe
```cpp
int main() {
    Rettangolo r(5.0, 3.0);
    
    std::cout << "Area: " << r.calcolaArea() << std::endl;      // Output: 15
    std::cout << "Perimetro: " << r.calcolaPerimetro() << std::endl;  // Output: 16
    
    return 0;
}
```

## Costruttori e Distruttori

### Costruttori
```cpp
class Studente {
private:
    std::string nome;
    int eta;
    double media;

public:
    // Costruttore di default
    Studente() : nome(""), eta(0), media(0.0) {}
    
    // Costruttore con parametri
    Studente(const std::string& n, int e, double m) 
        : nome(n), eta(e), media(m) {}
    
    // Costruttore di copia
    Studente(const Studente& altro) 
        : nome(altro.nome), eta(altro.eta), media(altro.media) {}
};
```

### Distruttori
```cpp
class GestoreRisorse {
private:
    int* risorsa;

public:
    GestoreRisorse() : risorsa(new int(0)) {}
    
    ~GestoreRisorse() {
        delete risorsa;  // Libera la memoria
    }
};
```

## Membri della Classe

### Membri Dati
```cpp
class ContoBancario {
private:
    std::string numeroConto;
    double saldo;
    static int numeroConti;  // Membro statico

public:
    static int getNumeroConti() {
        return numeroConti;
    }
};

int ContoBancario::numeroConti = 0;  // Inizializzazione membro statico
```

### Metodi
```cpp
class Calcolatrice {
public:
    // Metodo const
    double somma(double a, double b) const {
        return a + b;
    }
    
    // Metodo non-const
    void reset() {
        risultato = 0;
    }
    
private:
    double risultato = 0;
};
```

## Incapsulamento

### Accesso ai Membri
```cpp
class Persona {
private:
    std::string nome;
    int eta;

public:
    // Getters
    std::string getNome() const { return nome; }
    int getEta() const { return eta; }
    
    // Setters
    void setNome(const std::string& n) { nome = n; }
    void setEta(int e) { 
        if (e >= 0) eta = e;  // Validazione
    }
};
```

### Amici della Classe
```cpp
class Matrice {
private:
    int dati[3][3];

public:
    friend std::ostream& operator<<(std::ostream& os, const Matrice& m);
};

std::ostream& operator<<(std::ostream& os, const Matrice& m) {
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            os << m.dati[i][j] << " ";
        }
        os << std::endl;
    }
    return os;
}
```

## Operatori

### Operatori di Assegnazione
```cpp
class Vettore {
private:
    double x, y;

public:
    Vettore& operator=(const Vettore& altro) {
        if (this != &altro) {
            x = altro.x;
            y = altro.y;
        }
        return *this;
    }
    
    Vettore operator+(const Vettore& altro) const {
        return Vettore(x + altro.x, y + altro.y);
    }
};
```

### Operatori di Input/Output
```cpp
class Frazione {
private:
    int numeratore;
    int denominatore;

public:
    friend std::ostream& operator<<(std::ostream& os, const Frazione& f) {
        os << f.numeratore << "/" << f.denominatore;
        return os;
    }
    
    friend std::istream& operator>>(std::istream& is, Frazione& f) {
        char slash;
        is >> f.numeratore >> slash >> f.denominatore;
        return is;
    }
};
```

## Esercizi Pratici

### Esercizio 1: Gestione Biblioteca
Implementa una classe per gestire i libri di una biblioteca.

```cpp
#include <iostream>
#include <string>
#include <vector>

class Libro {
private:
    std::string titolo;
    std::string autore;
    bool disponibile;

public:
    Libro(const std::string& t, const std::string& a) 
        : titolo(t), autore(a), disponibile(true) {}
    
    void presta() {
        if (disponibile) {
            disponibile = false;
            std::cout << "Libro prestato con successo." << std::endl;
        } else {
            std::cout << "Libro non disponibile." << std::endl;
        }
    }
    
    void restituisci() {
        disponibile = true;
        std::cout << "Libro restituito con successo." << std::endl;
    }
    
    bool isDisponibile() const {
        return disponibile;
    }
    
    void stampaInfo() const {
        std::cout << "Titolo: " << titolo << std::endl;
        std::cout << "Autore: " << autore << std::endl;
        std::cout << "Stato: " << (disponibile ? "Disponibile" : "In prestito") << std::endl;
    }
};

class Biblioteca {
private:
    std::vector<Libro> libri;

public:
    void aggiungiLibro(const Libro& libro) {
        libri.push_back(libro);
    }
    
    void prestaLibro(int indice) {
        if (indice >= 0 && indice < libri.size()) {
            libri[indice].presta();
        }
    }
    
    void restituisciLibro(int indice) {
        if (indice >= 0 && indice < libri.size()) {
            libri[indice].restituisci();
        }
    }
    
    void stampaCatalogo() const {
        for (size_t i = 0; i < libri.size(); i++) {
            std::cout << "\nLibro #" << i + 1 << ":" << std::endl;
            libri[i].stampaInfo();
        }
    }
};

int main() {
    Biblioteca biblio;
    
    // Aggiungi libri
    biblio.aggiungiLibro(Libro("Il Nome della Rosa", "Umberto Eco"));
    biblio.aggiungiLibro(Libro("1984", "George Orwell"));
    
    // Stampa catalogo
    biblio.stampaCatalogo();
    
    // Presta un libro
    biblio.prestaLibro(0);
    
    // Stampa catalogo aggiornato
    biblio.stampaCatalogo();
    
    return 0;
}
```

### Esercizio 2: Calcolatrice Avanzata
Implementa una calcolatrice con operazioni avanzate.

```cpp
#include <iostream>
#include <cmath>

class Calcolatrice {
private:
    double memoria;

public:
    Calcolatrice() : memoria(0) {}
    
    double somma(double a, double b) const {
        return a + b;
    }
    
    double sottrai(double a, double b) const {
        return a - b;
    }
    
    double moltiplica(double a, double b) const {
        return a * b;
    }
    
    double dividi(double a, double b) const {
        if (b == 0) {
            throw std::runtime_error("Divisione per zero");
        }
        return a / b;
    }
    
    double potenza(double base, double esponente) const {
        return std::pow(base, esponente);
    }
    
    double radiceQuadrata(double x) const {
        if (x < 0) {
            throw std::runtime_error("Numero negativo");
        }
        return std::sqrt(x);
    }
    
    void salvaInMemoria(double x) {
        memoria = x;
    }
    
    double recuperaDaMemoria() const {
        return memoria;
    }
};

int main() {
    Calcolatrice calc;
    
    try {
        double risultato = calc.somma(5, 3);
        std::cout << "5 + 3 = " << risultato << std::endl;
        
        risultato = calc.potenza(2, 3);
        std::cout << "2^3 = " << risultato << std::endl;
        
        calc.salvaInMemoria(risultato);
        std::cout << "Memoria: " << calc.recuperaDaMemoria() << std::endl;
        
    } catch (const std::exception& e) {
        std::cerr << "Errore: " << e.what() << std::endl;
    }
    
    return 0;
}
```