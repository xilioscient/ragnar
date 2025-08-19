# Standard Template Library (STL)

## Indice
- [Introduzione](#introduzione)
- [Container](#container)
- [Iteratori](#iteratori)
- [Algoritmi](#algoritmi)
- [Funzioni Lambda](#funzioni-lambda)
- [Smart Pointers](#smart-pointers)
- [Esercizi Pratici](#esercizi-pratici)

## Introduzione

La Standard Template Library (STL) è una libreria di componenti software inclusa nel C++ standard. Fornisce una collezione di classi template e funzioni per la manipolazione di dati, algoritmi, iteratori e funtori.

## Container

### Container Sequenziali

#### Vector
```cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5};
    
    // Aggiunta di elementi
    numeri.push_back(6);
    numeri.insert(numeri.begin() + 2, 10);
    
    // Accesso agli elementi
    std::cout << "Primo elemento: " << numeri[0] << std::endl;
    std::cout << "Elemento in posizione 2: " << numeri.at(2) << std::endl;
    
    // Iterazione
    for (const auto& n : numeri) {
        std::cout << n << " ";  // Output: 1 2 10 3 4 5 6
    }
    std::cout << std::endl;
    
    return 0;
}
```

#### List
```cpp
#include <list>
#include <iostream>

int main() {
    std::list<int> numeri = {1, 2, 3, 4, 5};
    
    // Aggiunta di elementi
    numeri.push_back(6);
    numeri.push_front(0);
    
    // Inserimento in posizione specifica
    auto it = numeri.begin();
    std::advance(it, 2);
    numeri.insert(it, 10);
    
    // Iterazione
    for (const auto& n : numeri) {
        std::cout << n << " ";  // Output: 0 1 10 2 3 4 5 6
    }
    std::cout << std::endl;
    
    return 0;
}
```

### Container Associativi

#### Map
```cpp
#include <map>
#include <string>
#include <iostream>

int main() {
    std::map<std::string, int> eta;
    
    // Inserimento di elementi
    eta["Mario"] = 25;
    eta["Luigi"] = 30;
    eta.insert({"Anna", 28});
    
    // Accesso agli elementi
    std::cout << "Età di Mario: " << eta["Mario"] << std::endl;
    
    // Iterazione
    for (const auto& [nome, anni] : eta) {
        std::cout << nome << ": " << anni << std::endl;
    }
    
    return 0;
}
```

#### Set
```cpp
#include <set>
#include <iostream>

int main() {
    std::set<int> numeri = {5, 2, 8, 1, 9};
    
    // Inserimento di elementi
    numeri.insert(3);
    numeri.insert(7);
    
    // Verifica di esistenza
    if (numeri.find(5) != numeri.end()) {
        std::cout << "5 è presente nel set" << std::endl;
    }
    
    // Iterazione
    for (const auto& n : numeri) {
        std::cout << n << " ";  // Output: 1 2 3 5 7 8 9
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Iteratori

### Tipi di Iteratori
```cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5};
    
    // Iteratore bidirezionale
    for (auto it = numeri.begin(); it != numeri.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    // Iteratore inverso
    for (auto it = numeri.rbegin(); it != numeri.rend(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    // Iteratore costante
    for (auto it = numeri.cbegin(); it != numeri.cend(); ++it) {
        // *it = 10;  // Errore: iteratore costante
        std::cout << *it << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Algoritmi

### Ordinamento e Ricerca
```cpp
#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    std::vector<int> numeri = {5, 2, 8, 1, 9, 3};
    
    // Ordinamento
    std::sort(numeri.begin(), numeri.end());
    
    // Ricerca binaria
    if (std::binary_search(numeri.begin(), numeri.end(), 8)) {
        std::cout << "8 trovato" << std::endl;
    }
    
    // Ricerca di un elemento
    auto it = std::find(numeri.begin(), numeri.end(), 3);
    if (it != numeri.end()) {
        std::cout << "3 trovato in posizione: " 
                  << std::distance(numeri.begin(), it) << std::endl;
    }
    
    return 0;
}
```

### Trasformazioni
```cpp
#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5};
    std::vector<int> raddoppiati(numeri.size());
    
    // Trasformazione
    std::transform(numeri.begin(), numeri.end(), 
                  raddoppiati.begin(),
                  [](int x) { return x * 2; });
    
    // Stampa risultati
    for (const auto& n : raddoppiati) {
        std::cout << n << " ";  // Output: 2 4 6 8 10
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Funzioni Lambda

### Sintassi e Uso
```cpp
#include <vector>
#include <algorithm>
#include <iostream>

int main() {
    std::vector<int> numeri = {1, 2, 3, 4, 5};
    
    // Lambda con cattura
    int fattore = 2;
    auto moltiplica = [fattore](int x) { return x * fattore; };
    
    // Applicazione della lambda
    std::transform(numeri.begin(), numeri.end(), 
                  numeri.begin(), moltiplica);
    
    // Stampa risultati
    for (const auto& n : numeri) {
        std::cout << n << " ";  // Output: 2 4 6 8 10
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Smart Pointers

### unique_ptr
```cpp
#include <memory>
#include <iostream>

class Risorsa {
public:
    Risorsa() { std::cout << "Risorsa creata" << std::endl; }
    ~Risorsa() { std::cout << "Risorsa distrutta" << std::endl; }
    
    void usa() { std::cout << "Risorsa in uso" << std::endl; }
};

int main() {
    auto risorsa = std::make_unique<Risorsa>();
    risorsa->usa();
    
    // La risorsa viene automaticamente deallocata
    return 0;
}
```

### shared_ptr
```cpp
#include <memory>
#include <iostream>

class Risorsa {
public:
    Risorsa() { std::cout << "Risorsa creata" << std::endl; }
    ~Risorsa() { std::cout << "Risorsa distrutta" << std::endl; }
    
    void usa() { std::cout << "Risorsa in uso" << std::endl; }
};

int main() {
    auto risorsa1 = std::make_shared<Risorsa>();
    auto risorsa2 = risorsa1;  // Condivisione della risorsa
    
    risorsa1->usa();
    risorsa2->usa();
    
    // La risorsa viene deallocata quando l'ultimo shared_ptr viene distrutto
    return 0;
}
```

## Esercizi Pratici

### Esercizio 1: Gestione di una Biblioteca
Implementa un sistema di gestione di una biblioteca usando i container STL.

```cpp
#include <iostream>
#include <string>
#include <map>
#include <set>
#include <vector>

class Libro {
public:
    std::string titolo;
    std::string autore;
    int anno;
    
    Libro(const std::string& t, const std::string& a, int y)
        : titolo(t), autore(a), anno(y) {}
};

class Biblioteca {
private:
    std::map<std::string, Libro> libri;
    std::set<std::string> prestiti;
    
public:
    void aggiungiLibro(const Libro& libro) {
        libri[libro.titolo] = libro;
    }
    
    void prestaLibro(const std::string& titolo) {
        if (libri.find(titolo) != libri.end()) {
            prestiti.insert(titolo);
            std::cout << "Libro prestato: " << titolo << std::endl;
        }
    }
    
    void restituisciLibro(const std::string& titolo) {
        if (prestiti.erase(titolo) > 0) {
            std::cout << "Libro restituito: " << titolo << std::endl;
        }
    }
    
    void stampaLibri() const {
        for (const auto& [titolo, libro] : libri) {
            std::cout << "Titolo: " << titolo << std::endl;
            std::cout << "Autore: " << libro.autore << std::endl;
            std::cout << "Anno: " << libro.anno << std::endl;
            std::cout << "Stato: " 
                      << (prestiti.count(titolo) ? "In prestito" : "Disponibile")
                      << std::endl;
            std::cout << "-------------------" << std::endl;
        }
    }
};

int main() {
    Biblioteca biblio;
    
    biblio.aggiungiLibro(Libro("Il Nome della Rosa", "Umberto Eco", 1980));
    biblio.aggiungiLibro(Libro("1984", "George Orwell", 1949));
    
    biblio.prestaLibro("1984");
    biblio.stampaLibri();
    
    biblio.restituisciLibro("1984");
    biblio.stampaLibri();
    
    return 0;
}
```

### Esercizio 2: Analisi di Dati
Implementa un sistema di analisi dati usando algoritmi STL.

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <cmath>

class AnalisiDati {
public:
    static double media(const std::vector<double>& dati) {
        return std::accumulate(dati.begin(), dati.end(), 0.0) / dati.size();
    }
    
    static double mediana(std::vector<double> dati) {
        std::sort(dati.begin(), dati.end());
        size_t n = dati.size();
        if (n % 2 == 0) {
            return (dati[n/2 - 1] + dati[n/2]) / 2.0;
        }
        return dati[n/2];
    }
    
    static double deviazioneStandard(const std::vector<double>& dati) {
        double m = media(dati);
        double somma = std::accumulate(dati.begin(), dati.end(), 0.0,
            [m](double acc, double x) {
                return acc + (x - m) * (x - m);
            });
        return std::sqrt(somma / dati.size());
    }
    
    static std::vector<double> filtra(const std::vector<double>& dati, 
                                    double soglia) {
        std::vector<double> risultato;
        std::copy_if(dati.begin(), dati.end(), 
                    std::back_inserter(risultato),
                    [soglia](double x) { return x > soglia; });
        return risultato;
    }
};

int main() {
    std::vector<double> dati = {1.2, 2.3, 3.4, 4.5, 5.6};
    
    std::cout << "Media: " << AnalisiDati::media(dati) << std::endl;
    std::cout << "Mediana: " << AnalisiDati::mediana(dati) << std::endl;
    std::cout << "Deviazione Standard: " 
              << AnalisiDati::deviazioneStandard(dati) << std::endl;
    
    auto filtrati = AnalisiDati::filtra(dati, 3.0);
    std::cout << "Dati > 3.0: ";
    for (double x : filtrati) {
        std::cout << x << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```