# Ereditarietà in C++

## Introduzione

L'ereditarietà è un meccanismo fondamentale della programmazione orientata agli oggetti che permette a una classe di acquisire le proprietà e i metodi di un'altra classe. In C++, l'ereditarietà supporta sia l'ereditarietà singola che multipla.

## Ereditarietà Singola

### Sintassi Base
```cpp
class Base {
protected:
    int valore;

public:
    Base(int v) : valore(v) {}
    
    void stampa() {
        std::cout << "Valore: " << valore << std::endl;
    }
};

class Derivata : public Base {
public:
    Derivata(int v) : Base(v) {}
    
    void raddoppia() {
        valore *= 2;
    }
};
```

### Uso
```cpp
int main() {
    Derivata d(5);
    d.stampa();     // Output: Valore: 5
    d.raddoppia();
    d.stampa();     // Output: Valore: 10
    
    return 0;
}
```

### Livelli di Accesso
```cpp
class Base {
public:
    int pubblico;
protected:
    int protetto;
private:
    int privato;
};

// Ereditarietà pubblica
class DerivataPubblica : public Base {
    // pubblico -> pubblico
    // protetto -> protetto
    // privato -> inaccessibile
};

// Ereditarietà protetta
class DerivataProtetta : protected Base {
    // pubblico -> protetto
    // protetto -> protetto
    // privato -> inaccessibile
};

// Ereditarietà privata
class DerivataPrivata : private Base {
    // pubblico -> privato
    // protetto -> privato
    // privato -> inaccessibile
};
```

## Ereditarietà Multipla

### Sintassi
```cpp
class Animale {
public:
    virtual void mangia() = 0;
    virtual ~Animale() = default;
};

class Volatile {
public:
    virtual void vola() = 0;
    virtual ~Volatile() = default;
};

class Aquila : public Animale, public Volatile {
public:
    void mangia() override {
        std::cout << "L'aquila mangia" << std::endl;
    }
    
    void vola() override {
        std::cout << "L'aquila vola" << std::endl;
    }
};
```

### Risoluzione delle Ambiguità
```cpp
class A {
public:
    void f() { std::cout << "A::f()" << std::endl; }
};

class B {
public:
    void f() { std::cout << "B::f()" << std::endl; }
};

class C : public A, public B {
public:
    void chiamaF() {
        A::f();  // Chiama f() di A
        B::f();  // Chiama f() di B
    }
};
```

## Polimorfismo

### Funzioni Virtuali
```cpp
class Forma {
public:
    virtual void disegna() const {
        std::cout << "Disegno una forma generica" << std::endl;
    }
    
    virtual ~Forma() = default;
};

class Cerchio : public Forma {
public:
    void disegna() const override {
        std::cout << "Disegno un cerchio" << std::endl;
    }
};

class Quadrato : public Forma {
public:
    void disegna() const override {
        std::cout << "Disegno un quadrato" << std::endl;
    }
};
```

### Binding Dinamico
```cpp
void disegnaForma(const Forma& forma) {
    forma.disegna();  // Binding dinamico
}

int main() {
    Cerchio c;
    Quadrato q;
    
    disegnaForma(c);  // Output: Disegno un cerchio
    disegnaForma(q);  // Output: Disegno un quadrato
    
    return 0;
}
```

## Classi Astratte

### Definizione
```cpp
class Documento {
public:
    virtual void salva() = 0;
    virtual void carica() = 0;
    virtual void stampa() = 0;
    virtual ~Documento() = default;
};

class PDF : public Documento {
public:
    void salva() override {
        std::cout << "Salvo il PDF" << std::endl;
    }
    
    void carica() override {
        std::cout << "Carico il PDF" << std::endl;
    }
    
    void stampa() override {
        std::cout << "Stampo il PDF" << std::endl;
    }
};
```

### Uso
```cpp
int main() {
    // Documento d;  // Errore: non si può istanziare una classe astratta
    PDF pdf;
    
    pdf.salva();   // Output: Salvo il PDF
    pdf.carica();  // Output: Carico il PDF
    pdf.stampa();  // Output: Stampo il PDF
    
    return 0;
}
```

## Esercizi Pratici

### Esercizio 1: Sistema di Forme Geometriche
Implementa una gerarchia di forme geometriche con calcolo dell'area e del perimetro.

```cpp
#include <iostream>
#include <cmath>

class Forma {
public:
    virtual double calcolaArea() const = 0;
    virtual double calcolaPerimetro() const = 0;
    virtual void stampa() const = 0;
    virtual ~Forma() = default;
};

class Cerchio : public Forma {
private:
    double raggio;

public:
    Cerchio(double r) : raggio(r) {}
    
    double calcolaArea() const override {
        return M_PI * raggio * raggio;
    }
    
    double calcolaPerimetro() const override {
        return 2 * M_PI * raggio;
    }
    
    void stampa() const override {
        std::cout << "Cerchio - Raggio: " << raggio << std::endl;
        std::cout << "Area: " << calcolaArea() << std::endl;
        std::cout << "Perimetro: " << calcolaPerimetro() << std::endl;
    }
};

class Rettangolo : public Forma {
private:
    double base;
    double altezza;

public:
    Rettangolo(double b, double h) : base(b), altezza(h) {}
    
    double calcolaArea() const override {
        return base * altezza;
    }
    
    double calcolaPerimetro() const override {
        return 2 * (base + altezza);
    }
    
    void stampa() const override {
        std::cout << "Rettangolo - Base: " << base << ", Altezza: " << altezza << std::endl;
        std::cout << "Area: " << calcolaArea() << std::endl;
        std::cout << "Perimetro: " << calcolaPerimetro() << std::endl;
    }
};

int main() {
    Cerchio c(5);
    Rettangolo r(4, 6);
    
    c.stampa();
    std::cout << std::endl;
    r.stampa();
    
    return 0;
}
```

### Esercizio 2: Sistema di Pagamento
Implementa un sistema di pagamento con diversi metodi.

```cpp
#include <iostream>
#include <string>

class Pagamento {
public:
    virtual void processa(double importo) = 0;
    virtual ~Pagamento() = default;
};

class CartaCredito : public Pagamento {
private:
    std::string numero;
    std::string titolare;

public:
    CartaCredito(const std::string& num, const std::string& tit) 
        : numero(num), titolare(tit) {}
    
    void processa(double importo) override {
        std::cout << "Processo pagamento di " << importo 
                  << "€ con carta " << numero << std::endl;
    }
};

class PayPal : public Pagamento {
private:
    std::string email;

public:
    PayPal(const std::string& e) : email(e) {}
    
    void processa(double importo) override {
        std::cout << "Processo pagamento di " << importo 
                  << "€ con PayPal " << email << std::endl;
    }
};

class Bonifico : public Pagamento {
private:
    std::string iban;

public:
    Bonifico(const std::string& i) : iban(i) {}
    
    void processa(double importo) override {
        std::cout << "Processo pagamento di " << importo 
                  << "€ con bonifico " << iban << std::endl;
    }
};

int main() {
    CartaCredito cc("1234-5678-9012-3456", "Mario Rossi");
    PayPal pp("mario.rossi@email.com");
    Bonifico b("IT60X0542811101000000123456");
    
    cc.processa(100.0);
    pp.processa(50.0);
    b.processa(75.0);
    
    return 0;
}
```