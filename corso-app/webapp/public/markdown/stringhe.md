# 📦 1. Le stringhe in stile C (`char*` / `char[]`)

## 1.1 Cos’è una C-string?

Una C-string è un array di caratteri terminato da un carattere nullo `\0`.

```cpp
char s[] = "ciao";  // ['c','i','a','o','\0'] → s è un char[5]
```

Il carattere `'\0'` serve a marcare la fine della stringa: **non è opzionale!**

---

## 1.2 Dichiarazione e inizializzazione

```cpp
char nome[] = "Sasha";          // inizializzazione implicita
char citta[10] = "Torino";      // dimensione > stringa = ok
char paese[] = {'I','T','A'};   // NON è una C-string (manca '\0')
```

⚠️ **Pericolo comune:** dimenticare il terminatore nullo = **UB a runtime**

---

## 1.3 Funzioni standard (`<cstring>`)

| Funzione            | Descrizione                              |
|---------------------|-------------------------------------------|
| `strlen(s)`         | Lunghezza fino a `'\0'`                   |
| `strcpy(dst, src)`  | Copia stringa                             |
| `strncpy(dst, src, n)` | Copia con limite (non garantisce `\0`)|
| `strcmp(s1, s2)`    | Confronto lexicografico                   |
| `strcat(dst, src)`  | Concatenazione (**occhio ai buffer!**)   |

🧨 **Attenzione:** queste funzioni **non controllano i limiti dei buffer** → rischio di **buffer overflow** (CWE-120)

---

## 1.4 Lavorare con `char*` dinamici

```cpp
char* buf = new char[100];
strcpy(buf, "Hello");
delete[] buf;
```

- Ricorda sempre `delete[]`
- Copiare in `char*` è SEMPRE una potenziale fonte di bug se non si conosce la dimensione!

---

# 🚀 2. `std::string`: finalmente, un alleato

## 2.1 Dichiarazione e assegnazione

```cpp
#include <string>

std::string a = "Ciao";
std::string b("Mondo");
std::string c = a + " " + b;
```

- Gestione automatica dell'heap
- Supporto per **RAII**, sicura e dinamica
- Evita copy-on-write nei moderni standard (C++11+)

---

## 2.2 Metodi principali

| Metodo                        | Descrizione                                     |
|------------------------------|-------------------------------------------------|
| `s.length()` / `s.size()`    | Lunghezza della stringa                         |
| `s.c_str()`                  | Ottieni `const char*` compatibile con C         |
| `s.at(i)`                    | Accesso con controllo (throw su out-of-bounds)  |
| `s[i]`                       | Accesso diretto (UB se out-of-bounds)           |
| `s.append("...")`            | Aggiunge una stringa                            |
| `s.substr(pos, len)`         | Sottostringa                                    |
| `s.find("...")`              | Ricerca                                         |
| `s.replace(pos, len, "...")` | Sostituzione                                    |
| `s.insert(pos, "...")`       | Inserisce in posizione specifica                |

---

## 2.3 Concatenazione e performance

```cpp
std::string s = "A" + std::to_string(42) + "B";  // OK
```

⚠️ Ogni `+` può causare allocazioni temporanee → **inefficienza**!

**Preferisci:**

```cpp
std::string s;
s.reserve(100);  // se prevedi molte concatenazioni
s += "A";
s += std::to_string(42);
s += "B";
```

---

# ⚙️ 3. Conversioni tra `char*` e `std::string`

## 3.1 Da `char*` a `std::string`

```cpp
char c[] = "test";
std::string s(c);
```

⚠️ Il `char*` **deve** essere terminato da `\0`

---

## 3.2 Da `std::string` a `char*`

```cpp
std::string s = "ciao";
const char* c = s.c_str();  // solo lettura!
```

⚠️ Il puntatore `c` diventa **dangling** se `s` viene modificata dopo

---

# 🧠 4. Approfondimenti e dettagli interni

## 4.1 Small String Optimization (SSO)

Stringhe brevi (< 15 caratteri, dipende dall’implementazione) **non vanno in heap**:

```cpp
std::string s = "tiny"; // SSO attivo
s += " and more";       // ora heap allocation scatta
```

---

## 4.2 Allocator awareness

`std::string` supporta **custom allocator** (utile in embedded/realtime):

```cpp
std::basic_string<char, std::char_traits<char>, MyAllocator<char>> mystr;
```

---

## 4.3 Copy vs Move

```cpp
std::string a = "pippo";
std::string b = a;              // copia (heap duplicato)
std::string c = std::move(a);   // move: a diventa vuoto (dipende dall'implementazione)
```

- Passa `const std::string&` se non devi modificarla
- Passa `std::string&&` per semantica di move (es. con `std::move`)

---

# 🔐 5. Sicurezza, best practice e anti-pattern

## ✅ Best practice

- Usa sempre `std::string` a meno che:
  - Sei in ambiente embedded con RAM limitata
  - Devi interagire con API C

- Usa `.at()` per accessi sicuri
- Usa `.reserve()` per concatenazioni frequenti

## ❌ Errori comuni

- Usare `c_str()` e poi modificare la stringa → dangling pointer
- Confrontare `std::string` con `char*` senza cast:

```cpp
std::string s = "ok";
if (s == "ok")           // OK
if (s == some_char_ptr)  // ⚠️ Attenzione: può fallire se some_char_ptr è non valido
```

- Allocare `char*` senza gestirne la durata → memory leak

---

# 🧪 6. Esercizi professionali consigliati

- Implementa un parser CSV base con `std::string`, `find()`, `substr()`
- Scrivi una funzione `bool endsWith(const std::string&, const std::string&)`
- Confronta performance tra `std::string` e `char*` per 1 milione di concatenazioni
- Scrivi un RAII wrapper per `char*` dinamico: `c_string_guard`
- Wrappa una funzione C (`char* buffer, size_t size`) in un’interfaccia `std::string` safe
```
