# 🔁 Controllo del Flusso, Operatori e Scope in C++

## 🧭 1. Controllo del flusso: if, else, switch

```cpp
if (condizione) {
    // blocco eseguito se condizione è vera
} else {
    // altrimenti
}
```

🔹 Ogni tipo è convertibile in `bool`:  
`0`, `nullptr`, `false` → **falso**  
Qualsiasi altro valore → **vero**

### switch
```cpp
switch (valore) {
    case 1:
        // codice
        break;
    case 2:
        // altro codice
        break;
    default:
        // se nessun caso combacia
}
```

📌 Richiede `break` per evitare il fall-through.  
Usalo con `int`, `enum`, `char`.

---

## 🔁 2. Cicli: for, while, do-while

```cpp
for (int i = 0; i < N; ++i) { /* ... */ }
while (condizione) { /* ... */ }
do { /* ... */ } while (condizione);
```

🔹 `for` → numero fisso di iterazioni  
🔹 `while` → condizione controllata prima  
🔹 `do-while` → eseguito **almeno una volta**

### break / continue
- `break`: esce subito dal ciclo  
- `continue`: salta alla prossima iterazione

---

## ➕ 3. Operatori

### Aritmetici
`+`, `-`, `*`, `/`, `%`  
> ⚠️ Divisione intera → tronca il risultato

### Confronto
`==`, `!=`, `<`, `<=`, `>`, `>=`

### Logici
`&&` (AND), `||` (OR), `!` (NOT)

### Bitwise
`&`, `|`, `^`, `~`, `<<`, `>>`

🔹 Utile per flag, maschere binarie, ottimizzazioni  
🔹 Esempio swap con XOR:
```cpp
a ^= b; b ^= a; a ^= b;
```

### Confronto tra float
```cpp
if (std::abs(a - b) < 1e-6) { /* uguali */ }
```

---

## 🏁 4. Funzione main e struttura di base

```cpp
#include <iostream>

int main() {
    // codice principale
    return 0;
}
```

### #include
Importa librerie standard:
- `<iostream>`, `<string>`, `<vector>`, `<cmath>`

📌 Evita `using namespace std;` globale

---

## 📦 5. Scope e ciclo di vita delle variabili

| Tipo           | Durata         | Visibilità          |
|----------------|----------------|---------------------|
| Locale         | Dentro `{}`    | Solo nel blocco     |
| Globale        | Tutto il prog. | Ovunque (⚠️ attenti) |
| static locale  | Fino a fine     | Solo nella funzione |

### Shadowing
```cpp
int x = 5;
{
    int x = 10; // shadowing di x
}
```
⚠️ Può causare bug → usa `-Wshadow` per avvisi

---

## 📌 6. Const, constexpr e static

```cpp
const double PI = 3.1415;       // non modificabile
constexpr int MAX = 100;        // valutato a compile-time
static int chiamate = 0;        // conserva valore tra chiamate
```

📌 Costanti rendono il codice più sicuro e leggibile  
📌 `static` in funzione → mantiene stato, invisibile fuori

---
## 🧱 Tipi di Dati Fondamentali

### 1. Tipi Numerici Interi

* `int`: Rappresenta numeri interi. La dimensione e l'intervallo dipendono dall'implementazione del compilatore. Su sistemi a 32 bit, generalmente occupa 4 byte, con un intervallo da -2.147.483.648 a 2.147.483.647.

* `short`: Intero di dimensioni ridotte, solitamente 2 byte. Su sistemi a 32 bit, l'intervallo va da -32.768 a 32.767.

* `long`: Intero di dimensioni maggiori, solitamente 4 byte su sistemi a 32 bit. L'intervallo è simile a `int`.

* `long long`: Intero di dimensioni ancora maggiori, solitamente 8 byte. Su sistemi a 64 bit, l'intervallo va da -9.223.372.036.854.775.808 a 9.223.372.036.854.775.807.

* `unsigned`: Tipo senza segno, che rappresenta solo valori positivi e zero. Ad esempio, `unsigned int` rappresenta numeri interi positivi.

### 2. Tipi a Virgola Mobile

* `float`: Numero in virgola mobile a precisione singola, solitamente 4 byte. Può rappresentare valori con circa 6-7 cifre significative.

* `double`: Numero in virgola mobile a precisione doppia, solitamente 8 byte. Può rappresentare valori con circa 15-16 cifre significative.

* `long double`: Numero in virgola mobile a precisione estesa, solitamente 10 byte. La precisione varia a seconda dell'implementazione del compilatore.

### 3. Tipo Carattere

* `char`: Rappresenta un singolo carattere. Solitamente occupa 1 byte e può contenere valori compresi tra -128 e 127 (con segno) o tra 0 e 255 (senza segno).

### 4. Tipo Booleano

* `bool`: Rappresenta un valore booleano, che può essere `true` (vero) o `false` (falso). Solitamente occupa 1 byte.

***

## 🧰 Modificatori di Tipo

* `signed`: Indica che il tipo può rappresentare sia valori positivi che negativi. È implicito nei tipi interi, ma può essere specificato esplicitamente.

* `unsigned`: Indica che il tipo rappresenta solo valori positivi e zero, raddoppiando l'intervallo positivo rispetto al tipo con segno.

* `short`: Riduce la dimensione del tipo intero, solitamente a 2 byte.

* `long`: Aumenta la dimensione del tipo intero, solitamente a 4 o 8 byte.

***

## 🧪 Esempio di Dichiarazione e Inizializzazione

```
#include <iostream>

int main() {
    int numeroIntero = 42;
    float numeroVirgolaMobile = 3.14f;
    char carattere = 'A';
    bool valoreBooleano = true;

    std::cout << "Numero Intero: " << numeroIntero << std::endl;
    std::cout << "Numero Virgola Mobile: " << numeroVirgolaMobile << std::endl;
    std::cout << "Carattere: " << carattere << std::endl;
    std::cout << "Valore Booleano: " << valoreBooleano << std::endl;

    return 0;
}
```

***

## ✅ Best Practices

* **Precisione nei Tipi a Virgola Mobile**: Evita l'uso di `float` per calcoli che richiedono alta precisione. Utilizza `double` o `long double` quando necessario.

* **Uso di&#x20;**`unsigned`: Utilizza `unsigned` quando sei certo che i valori saranno sempre positivi, per sfruttare appieno l'intervallo disponibile.

* **Dichiarazioni Esplicite**: Dichiara sempre esplicitamente il tipo di dato per evitare ambiguità e migliorare la leggibilità del codice.

***

---
## ✅ Best Practice

- `if/else` e `switch` → leggibili, ben indentati
- Evita `goto` (salvo rari casi)
- Cicli brevi e chiari
- Sempre `break` nel `switch`, salvo uso consapevole
- Usa `const` per ogni valore che non cambia
- Controlla i warning: `-Wall -Wextra -Wshadow`

---

## 🧪 Esercizi consigliati

1. Scrivi un programma che confronta due numeri e stampa il maggiore
2. Implementa un ciclo `for` che stampa i numeri da 1 a 100, saltando i multipli di 3
3. Crea una `switch` che reagisce a comandi di input (start, stop, quit)
4. Usa gli operatori bitwise per attivare/disattivare flag binari
5. Fai un esempio di `do-while` che richiede input corretto da tastiera
6. Crea una funzione con `static` locale che conta le chiamate

---