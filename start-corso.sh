#!/bin/bash

# Script per avviare il corso C++ con interfaccia web
# Autore: Corso C++ Interattivo
# Versione: 1.0

echo "🚀 Avvio Corso C++ Interattivo..."
echo "=================================="

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Funzione per stampare messaggi colorati
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}[HEADER]${NC} $1"
}

# Verifica che siamo nella directory corretta
if [ ! -d "corso-app/webapp" ]; then
    print_error "Directory corso-app/webapp non trovata!"
    print_error "Assicurati di eseguire questo script dalla directory principale del progetto."
    exit 1
fi

# Vai alla directory webapp
cd corso-app/webapp

print_status "Directory webapp trovata ✓"

# Verifica se node_modules esiste
if [ ! -d "node_modules" ]; then
    print_warning "node_modules non trovato. Installazione dipendenze..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Errore durante l'installazione delle dipendenze!"
        exit 1
    fi
    print_status "Dipendenze installate ✓"
else
    print_status "Dipendenze già installate ✓"
fi

# Verifica se il server è già in esecuzione
if pgrep -f "next dev" > /dev/null; then
    print_warning "Server Next.js già in esecuzione!"
    print_status "Apertura browser..."
    sleep 2
    xdg-open "http://localhost:3000" 2>/dev/null || \
    sensible-browser "http://localhost:3000" 2>/dev/null || \
    firefox "http://localhost:3000" 2>/dev/null || \
    google-chrome "http://localhost:3000" 2>/dev/null || \
    print_error "Impossibile aprire il browser automaticamente. Apri manualmente: http://localhost:3000"
    exit 0
fi

print_header "Avvio server di sviluppo..."
print_status "Il server sarà disponibile su: http://localhost:3000"

# Avvia il server in background
npm run dev &
SERVER_PID=$!

# Aspetta che il server sia pronto
print_status "Attendo che il server sia pronto..."
sleep 5

# Verifica se il server è partito correttamente
if ! pgrep -f "next dev" > /dev/null; then
    print_error "Errore nell'avvio del server!"
    exit 1
fi

print_status "Server avviato con successo ✓"

# Apri il browser
print_status "Apertura browser..."
sleep 2

# Prova diversi browser in ordine di preferenza
if command -v xdg-open > /dev/null; then
    xdg-open "http://localhost:3000"
elif command -v sensible-browser > /dev/null; then
    sensible-browser "http://localhost:3000"
elif command -v firefox > /dev/null; then
    firefox "http://localhost:3000"
elif command -v google-chrome > /dev/null; then
    google-chrome "http://localhost:3000"
elif command -v chromium > /dev/null; then
    chromium "http://localhost:3000"
else
    print_warning "Nessun browser trovato. Apri manualmente: http://localhost:3000"
fi

print_header "🎉 Corso C++ Interattivo avviato!"
echo ""
echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║                    CORSO C++ INTERATTIVO                     ║${NC}"
echo -e "${PURPLE}║                                                              ║${NC}"
echo -e "${PURPLE}║  🌐 URL: http://localhost:3000                              ║${NC}"
echo -e "${PURPLE}║  📚 Lezioni interattive con quiz e riassunti               ║${NC}"
echo -e "${PURPLE}║  🎯 Progresso salvato automaticamente                      ║${NC}"
echo -e "${PURPLE}║  📖 Glossario completo                                      ║${NC}"
echo -e "${PURPLE}║  🎨 Interfaccia moderna e responsive                        ║${NC}"
echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
print_status "Per fermare il server, premi Ctrl+C"
echo ""

# Mantieni lo script in esecuzione per mostrare i log del server
wait $SERVER_PID
