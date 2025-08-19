@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

REM Script per avviare il corso C++ con interfaccia web
REM Autore: Corso C++ Interattivo
REM Versione: 1.0

echo.
echo 🚀 Avvio Corso C++ Interattivo...
echo ==================================
echo.

REM Colori per output (Windows 10+)
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "PURPLE=[95m"
set "NC=[0m"

REM Funzione per stampare messaggi colorati
:print_status
echo %GREEN%[INFO]%NC% %~1
goto :eof

:print_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

:print_header
echo %BLUE%[HEADER]%NC% %~1
goto :eof

REM Verifica che siamo nella directory corretta
if not exist "corso-app\webapp" (
    call :print_error "Directory corso-app\webapp non trovata!"
    call :print_error "Assicurati di eseguire questo script dalla directory principale del progetto."
    pause
    exit /b 1
)

REM Vai alla directory webapp
cd corso-app\webapp

call :print_status "Directory webapp trovata ✓"

REM Verifica se node_modules esiste
if not exist "node_modules" (
    call :print_warning "node_modules non trovato. Installazione dipendenze..."
    call npm install
    if errorlevel 1 (
        call :print_error "Errore durante l'installazione delle dipendenze!"
        pause
        exit /b 1
    )
    call :print_status "Dipendenze installate ✓"
) else (
    call :print_status "Dipendenze già installate ✓"
)

REM Verifica se il server è già in esecuzione
netstat -an | findstr ":3000" >nul
if not errorlevel 1 (
    call :print_warning "Server Next.js già in esecuzione!"
    call :print_status "Apertura browser..."
    timeout /t 2 /nobreak >nul
    start http://localhost:3000
    goto :end
)

call :print_header "Avvio server di sviluppo..."
call :print_status "Il server sarà disponibile su: http://localhost:3000"

REM Avvia il server in background
start /b npm run dev

REM Aspetta che il server sia pronto
call :print_status "Attendo che il server sia pronto..."
timeout /t 5 /nobreak >nul

REM Verifica se il server è partito correttamente
netstat -an | findstr ":3000" >nul
if errorlevel 1 (
    call :print_error "Errore nell'avvio del server!"
    pause
    exit /b 1
)

call :print_status "Server avviato con successo ✓"

REM Apri il browser
call :print_status "Apertura browser..."
timeout /t 2 /nobreak >nul
start http://localhost:3000

call :print_header "🎉 Corso C++ Interattivo avviato!"
echo.
echo %PURPLE%╔══════════════════════════════════════════════════════════════╗%NC%
echo %PURPLE%║                    CORSO C++ INTERATTIVO                     ║%NC%
echo %PURPLE%║                                                              ║%NC%
echo %PURPLE%║  🌐 URL: http://localhost:3000                              ║%NC%
echo %PURPLE%║  📚 Lezioni interattive con quiz e riassunti               ║%NC%
echo %PURPLE%║  🎯 Progresso salvato automaticamente                      ║%NC%
echo %PURPLE%║  📖 Glossario completo                                      ║%NC%
echo %PURPLE%║  🎨 Interfaccia moderna e responsive                        ║%NC%
echo %PURPLE%╚══════════════════════════════════════════════════════════════╝%NC%
echo.
call :print_status "Il server è in esecuzione in background."
call :print_status "Per fermare il server, chiudi questa finestra o premi Ctrl+C"
echo.
echo %YELLOW%Nota: Il server continuerà a funzionare anche dopo aver chiuso questa finestra.%NC%
echo %YELLOW%Per fermarlo completamente, usa Task Manager o 'taskkill /f /im node.exe'%NC%
echo.

:end
pause
