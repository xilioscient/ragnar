# 🚀 Corso C++ Interattivo

Un corso completo di C++ con interfaccia web moderna, quiz interattivi e progresso salvato automaticamente.

## 🎯 Caratteristiche

- 📚 **10 lezioni complete** dal livello base all'avanzato
- 🎯 **Quiz interattivi** per ogni lezione
- 📖 **Glossario completo** con termini C++
- 🎨 **Interfaccia moderna** con tema scuro/chiaro
- 💾 **Progresso salvato** automaticamente nel browser
- 📱 **Design responsive** per tutti i dispositivi

## 🚀 Avvio Rapido

### 🐧 Linux/macOS
```bash
./start-corso.sh
```

### 🪟 Windows

#### Metodo 1: Script Batch (Raccomandato)
```cmd
start-corso.bat
```

#### Metodo 2: PowerShell (Avanzato)
```powershell
.\start-corso.ps1
```

#### Metodo 3: Avvio Rapido
```cmd
Corso-C++-Windows.bat
```

### 🔧 Avvio Manuale (Tutti i Sistemi)
```bash
cd corso-app/webapp
npm install
npm run dev
```

Poi apri il browser su: http://localhost:3000

## 📋 Prerequisiti

- **Node.js 18+** - [Scarica da nodejs.org](https://nodejs.org/)
- **npm** (incluso con Node.js)
- **Browser moderno** (Chrome, Firefox, Safari, Edge)

## 🎮 Controlli Automatici

- **Verifica Node.js**: Controlla versione e compatibilità
- **Installazione dipendenze**: Installa automaticamente se mancanti
- **Rilevamento server**: Evita conflitti se già attivo
- **Apertura browser**: Supporto per Chrome, Firefox, Edge, Safari
- **Gestione errori**: Messaggi chiari e colorati

## 🪟 Opzioni PowerShell (Windows)

```powershell
# Avvio normale
.\start-corso.ps1

# Senza aprire il browser
.\start-corso.ps1 -NoBrowser

# Modalità silenziosa
.\start-corso.ps1 -Silent
```

## 📁 Struttura Progetto

```
corso-app/
├── start-corso.sh              # Script Linux/macOS
├── start-corso.bat             # Script Windows (Batch)
├── start-corso.ps1             # Script Windows (PowerShell)
├── Corso-C++.desktop           # File desktop Linux
├── Corso-C++-Windows.bat       # Avvio rapido Windows
├── corso-app/
│   └── webapp/                 # Applicazione Next.js
│       ├── src/
│       │   └── app/            # Componenti React
│       ├── public/
│       │   └── markdown/       # Contenuti lezioni
│       └── package.json
└── *.md                        # File markdown lezioni
```

## 🎯 Lezioni Disponibili

1. **Introduzione al C++** - Basi del linguaggio
2. **Variabili e Tipi di Dati** - Fondamenti
3. **Operatori e Espressioni** - Calcoli e logica
4. **Strutture di Controllo** - If, switch, cicli
5. **Array e Stringhe** - Strutture dati
6. **Funzioni e Scope** - Programmazione modulare
7. **Puntatori e Riferimenti** - Gestione memoria
8. **Classi e Oggetti** - OOP
9. **Ereditarietà e Polimorfismo** - OOP avanzato
10. **Templates e STL** - Programmazione generica

## 🔧 Risoluzione Problemi

### Server già in esecuzione
Gli script rilevano automaticamente se il server è attivo e aprono solo il browser.

### Dipendenze mancanti
Gli script installano automaticamente le dipendenze se `node_modules` non esiste.

### Browser non si apre
Apri manualmente: http://localhost:3000

### Porta 3000 occupata
Il server Next.js gestisce automaticamente le porte alternative.

### Windows: Errore PowerShell Execution Policy
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Windows: Node.js non trovato
- Installa Node.js da [nodejs.org](https://nodejs.org/)
- Riavvia il terminale dopo l'installazione
- Verifica con `node --version`

## 🛠️ Comandi Utili

### Fermare il server
- **Linux/macOS**: `Ctrl+C` nel terminale
- **Windows**: `Ctrl+C` o Task Manager → Processi → node.exe

### Verificare processi attivi
```bash
# Linux/macOS
ps aux | grep node

# Windows (PowerShell)
Get-Process node
```

### Pulizia completa
```bash
# Linux/macOS
pkill -f "next dev"

# Windows (PowerShell)
Get-Process node | Stop-Process -Force
```

## 📞 Supporto

Per problemi o suggerimenti, controlla:
1. **Versione Node.js** (richiesta 18+)
2. **Connessione internet** (per installazione dipendenze)
3. **Permessi di esecuzione** (Linux/macOS: `chmod +x start-corso.sh`)
4. **Execution Policy** (Windows PowerShell)

## 🎉 Buon Apprendimento!

Il corso è progettato per essere progressivo e interattivo. Ogni lezione include esempi pratici e quiz per verificare la comprensione.

### 🌟 Suggerimenti
- Completa i **quiz** per consolidare l'apprendimento
- Consulta il **glossario** per i termini tecnici
- Salva il **progresso** per continuare da dove hai lasciato 