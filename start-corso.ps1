# Script per avviare il corso C++ con interfaccia web
# Autore: Corso C++ Interattivo
# Versione: 1.0
# Requisiti: PowerShell 5.1+ e Node.js 18+

param(
    [switch]$NoBrowser,
    [switch]$Silent
)

# Funzione per stampare messaggi colorati
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Write-Header {
    param([string]$Message)
    Write-Host "[HEADER] $Message" -ForegroundColor Blue
}

# Funzione per verificare se Node.js è installato
function Test-NodeJS {
    try {
        $nodeVersion = node --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            $version = $nodeVersion.TrimStart('v')
            $majorVersion = [int]($version.Split('.')[0])
            if ($majorVersion -ge 18) {
                Write-Status "Node.js $version trovato ✓"
                return $true
            } else {
                Write-Error "Node.js versione $version trovata, ma è richiesta la versione 18+"
                return $false
            }
        }
    } catch {
        Write-Error "Node.js non trovato. Installa Node.js 18+ da https://nodejs.org/"
        return $false
    }
    return $false
}

# Funzione per verificare se npm è installato
function Test-NPM {
    try {
        $npmVersion = npm --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Status "npm $npmVersion trovato ✓"
            return $true
        }
    } catch {
        Write-Error "npm non trovato"
        return $false
    }
    return $false
}

# Funzione per verificare se il server è già in esecuzione
function Test-ServerRunning {
    try {
        $connection = Test-NetConnection -ComputerName localhost -Port 3000 -InformationLevel Quiet -WarningAction SilentlyContinue
        return $connection.TcpTestSucceeded
    } catch {
        return $false
    }
}

# Funzione per aprire il browser
function Open-Browser {
    param([string]$Url)
    
    $browsers = @(
        "chrome",
        "firefox", 
        "msedge",
        "iexplore"
    )
    
    foreach ($browser in $browsers) {
        try {
            Start-Process $browser -ArgumentList $Url -ErrorAction SilentlyContinue
            if ($LASTEXITCODE -eq 0) {
                Write-Status "Browser aperto con $browser ✓"
                return $true
            }
        } catch {
            continue
        }
    }
    
    # Fallback: usa il browser predefinito
    try {
        Start-Process $Url
        Write-Status "Browser predefinito aperto ✓"
        return $true
    } catch {
        Write-Warning "Impossibile aprire il browser automaticamente. Apri manualmente: $Url"
        return $false
    }
}

# Funzione per fermare il server
function Stop-Server {
    Write-Status "Fermando il server..."
    try {
        Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -like "*next dev*" } | Stop-Process -Force
        Write-Status "Server fermato ✓"
    } catch {
        Write-Warning "Impossibile fermare il server automaticamente"
    }
}

# Gestione dell'interruzione
$null = Register-EngineEvent PowerShell.Exiting -Action {
    Stop-Server
}

# Main script
if (-not $Silent) {
    Write-Host "🚀 Avvio Corso C++ Interattivo..." -ForegroundColor Cyan
    Write-Host "==================================" -ForegroundColor Cyan
    Write-Host ""
}

# Verifica prerequisiti
if (-not (Test-NodeJS)) {
    exit 1
}

if (-not (Test-NPM)) {
    exit 1
}

# Verifica che siamo nella directory corretta
if (-not (Test-Path "corso-app\webapp")) {
    Write-Error "Directory corso-app\webapp non trovata!"
    Write-Error "Assicurati di eseguire questo script dalla directory principale del progetto."
    Read-Host "Premi Invio per uscire"
    exit 1
}

# Vai alla directory webapp
Set-Location "corso-app\webapp"
Write-Status "Directory webapp trovata ✓"

# Verifica se node_modules esiste
if (-not (Test-Path "node_modules")) {
    Write-Warning "node_modules non trovato. Installazione dipendenze..."
    try {
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Error "Errore durante l'installazione delle dipendenze!"
            Read-Host "Premi Invio per uscire"
            exit 1
        }
        Write-Status "Dipendenze installate ✓"
    } catch {
        Write-Error "Errore durante l'installazione delle dipendenze!"
        Read-Host "Premi Invio per uscire"
        exit 1
    }
} else {
    Write-Status "Dipendenze già installate ✓"
}

# Verifica se il server è già in esecuzione
if (Test-ServerRunning) {
    Write-Warning "Server Next.js già in esecuzione!"
    if (-not $NoBrowser) {
        Write-Status "Apertura browser..."
        Start-Sleep -Seconds 2
        Open-Browser "http://localhost:3000"
    }
    goto :end
}

Write-Header "Avvio server di sviluppo..."
Write-Status "Il server sarà disponibile su: http://localhost:3000"

# Avvia il server in background
try {
    $job = Start-Job -ScriptBlock {
        Set-Location $using:PWD
        npm run dev
    }
    Write-Status "Server avviato in background ✓"
} catch {
    Write-Error "Errore nell'avvio del server!"
    Read-Host "Premi Invio per uscire"
    exit 1
}

# Aspetta che il server sia pronto
Write-Status "Attendo che il server sia pronto..."
$timeout = 30
$elapsed = 0
while ($elapsed -lt $timeout) {
    if (Test-ServerRunning) {
        Write-Status "Server pronto ✓"
        break
    }
    Start-Sleep -Seconds 1
    $elapsed++
}

if ($elapsed -ge $timeout) {
    Write-Error "Timeout nell'avvio del server!"
    Stop-Job $job -ErrorAction SilentlyContinue
    Remove-Job $job -ErrorAction SilentlyContinue
    Read-Host "Premi Invio per uscire"
    exit 1
}

# Apri il browser
if (-not $NoBrowser) {
    Write-Status "Apertura browser..."
    Start-Sleep -Seconds 2
    Open-Browser "http://localhost:3000"
}

Write-Header "🎉 Corso C++ Interattivo avviato!"
Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Magenta
Write-Host "║                    CORSO C++ INTERATTIVO                     ║" -ForegroundColor Magenta
Write-Host "║                                                              ║" -ForegroundColor Magenta
Write-Host "║  🌐 URL: http://localhost:3000                              ║" -ForegroundColor Magenta
Write-Host "║  📚 Lezioni interattive con quiz e riassunti               ║" -ForegroundColor Magenta
Write-Host "║  🎯 Progresso salvato automaticamente                      ║" -ForegroundColor Magenta
Write-Host "║  📖 Glossario completo                                      ║" -ForegroundColor Magenta
Write-Host "║  🎨 Interfaccia moderna e responsive                        ║" -ForegroundColor Magenta
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Magenta
Write-Host ""
Write-Status "Il server è in esecuzione in background."
Write-Status "Per fermare il server, premi Ctrl+C o chiudi questa finestra"
Write-Host ""
Write-Warning "Nota: Il server continuerà a funzionare anche dopo aver chiuso questa finestra."
Write-Warning "Per fermarlo completamente, usa Task Manager o esegui: Get-Process node | Stop-Process"
Write-Host ""

:end
if (-not $Silent) {
    Read-Host "Premi Invio per uscire"
}
