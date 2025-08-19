# Design Patterns

## Indice
- [Introduzione](#introduzione)
- [Pattern Creazionali](#pattern-creazionali)
- [Pattern Strutturali](#pattern-strutturali)
- [Pattern Comportamentali](#pattern-comportamentali)
- [Esercizi Pratici](#esercizi-pratici)

## Introduzione

I Design Patterns sono soluzioni riutilizzabili a problemi comuni nella progettazione del software. In C++, i pattern aiutano a creare codice più flessibile, manutenibile e riutilizzabile.

## Pattern Creazionali

### Singleton
```cpp
#include <iostream>
#include <string>

class Database {
private:
    static Database* instance;
    std::string connection;
    
    // Costruttore privato
    Database() : connection("Connessione al database") {}
    
public:
    // Elimina la copia e l'assegnazione
    Database(const Database&) = delete;
    Database& operator=(const Database&) = delete;
    
    static Database* getInstance() {
        if (instance == nullptr) {
            instance = new Database();
        }
        return instance;
    }
    
    void query(const std::string& sql) {
        std::cout << "Esecuzione query: " << sql << std::endl;
    }
};

// Inizializzazione della variabile statica
Database* Database::instance = nullptr;

int main() {
    // Ottieni l'istanza del database
    Database* db = Database::getInstance();
    db->query("SELECT * FROM users");
    
    // Prova a ottenere un'altra istanza
    Database* db2 = Database::getInstance();
    db2->query("SELECT * FROM products");
    
    // db e db2 sono la stessa istanza
    std::cout << "db == db2: " << (db == db2) << std::endl;
    
    return 0;
}
```

### Factory Method
```cpp
#include <iostream>
#include <string>
#include <memory>

// Interfaccia prodotto
class Document {
public:
    virtual void open() = 0;
    virtual void close() = 0;
    virtual ~Document() = default;
};

// Prodotti concreti
class TextDocument : public Document {
public:
    void open() override {
        std::cout << "Apertura documento di testo" << std::endl;
    }
    
    void close() override {
        std::cout << "Chiusura documento di testo" << std::endl;
    }
};

class SpreadsheetDocument : public Document {
public:
    void open() override {
        std::cout << "Apertura foglio di calcolo" << std::endl;
    }
    
    void close() override {
        std::cout << "Chiusura foglio di calcolo" << std::endl;
    }
};

// Creator
class Application {
public:
    virtual std::unique_ptr<Document> createDocument() = 0;
    
    void newDocument() {
        auto doc = createDocument();
        doc->open();
        // ... altre operazioni
        doc->close();
    }
    
    virtual ~Application() = default;
};

// Concrete Creator
class TextApplication : public Application {
public:
    std::unique_ptr<Document> createDocument() override {
        return std::make_unique<TextDocument>();
    }
};

class SpreadsheetApplication : public Application {
public:
    std::unique_ptr<Document> createDocument() override {
        return std::make_unique<SpreadsheetDocument>();
    }
};

int main() {
    TextApplication textApp;
    textApp.newDocument();
    
    SpreadsheetApplication spreadsheetApp;
    spreadsheetApp.newDocument();
    
    return 0;
}
```

## Pattern Strutturali

### Adapter
```cpp
#include <iostream>
#include <string>

// Interfaccia target
class MediaPlayer {
public:
    virtual void play(const std::string& file) = 0;
    virtual ~MediaPlayer() = default;
};

// Classe adattata
class AdvancedMediaPlayer {
public:
    void playVlc(const std::string& file) {
        std::cout << "Riproduzione file VLC: " << file << std::endl;
    }
    
    void playMp4(const std::string& file) {
        std::cout << "Riproduzione file MP4: " << file << std::endl;
    }
};

// Adapter
class MediaAdapter : public MediaPlayer {
private:
    AdvancedMediaPlayer* advancedPlayer;
    
public:
    MediaAdapter() {
        advancedPlayer = new AdvancedMediaPlayer();
    }
    
    ~MediaAdapter() {
        delete advancedPlayer;
    }
    
    void play(const std::string& file) override {
        if (file.ends_with(".vlc")) {
            advancedPlayer->playVlc(file);
        } else if (file.ends_with(".mp4")) {
            advancedPlayer->playMp4(file);
        }
    }
};

// Client
class AudioPlayer : public MediaPlayer {
private:
    MediaAdapter* mediaAdapter;
    
public:
    AudioPlayer() : mediaAdapter(nullptr) {}
    
    ~AudioPlayer() {
        delete mediaAdapter;
    }
    
    void play(const std::string& file) override {
        if (file.ends_with(".mp3")) {
            std::cout << "Riproduzione file MP3: " << file << std::endl;
        } else if (file.ends_with(".vlc") || file.ends_with(".mp4")) {
            mediaAdapter = new MediaAdapter();
            mediaAdapter->play(file);
        }
    }
};

int main() {
    AudioPlayer player;
    player.play("song.mp3");
    player.play("movie.vlc");
    player.play("video.mp4");
    
    return 0;
}
```

### Decorator
```cpp
#include <iostream>
#include <string>

// Component
class Beverage {
public:
    virtual std::string getDescription() const = 0;
    virtual double cost() const = 0;
    virtual ~Beverage() = default;
};

// Concrete Component
class Espresso : public Beverage {
public:
    std::string getDescription() const override {
        return "Espresso";
    }
    
    double cost() const override {
        return 1.99;
    }
};

// Decorator
class CondimentDecorator : public Beverage {
protected:
    Beverage* beverage;
    
public:
    CondimentDecorator(Beverage* b) : beverage(b) {}
    
    std::string getDescription() const override {
        return beverage->getDescription();
    }
    
    double cost() const override {
        return beverage->cost();
    }
};

// Concrete Decorators
class Mocha : public CondimentDecorator {
public:
    Mocha(Beverage* b) : CondimentDecorator(b) {}
    
    std::string getDescription() const override {
        return beverage->getDescription() + ", Mocha";
    }
    
    double cost() const override {
        return beverage->cost() + 0.20;
    }
};

class Whip : public CondimentDecorator {
public:
    Whip(Beverage* b) : CondimentDecorator(b) {}
    
    std::string getDescription() const override {
        return beverage->getDescription() + ", Whip";
    }
    
    double cost() const override {
        return beverage->cost() + 0.10;
    }
};

int main() {
    Beverage* beverage = new Espresso();
    std::cout << beverage->getDescription() 
              << " $" << beverage->cost() << std::endl;
    
    Beverage* beverage2 = new Mocha(new Whip(new Espresso()));
    std::cout << beverage2->getDescription() 
              << " $" << beverage2->cost() << std::endl;
    
    delete beverage;
    delete beverage2;
    
    return 0;
}
```

## Pattern Comportamentali

### Observer
```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

// Observer
class Observer {
public:
    virtual void update(const std::string& message) = 0;
    virtual ~Observer() = default;
};

// Subject
class Subject {
private:
    std::vector<Observer*> observers;
    
public:
    void attach(Observer* observer) {
        observers.push_back(observer);
    }
    
    void detach(Observer* observer) {
        observers.erase(
            std::remove(observers.begin(), observers.end(), observer),
            observers.end()
        );
    }
    
    void notify(const std::string& message) {
        for (auto observer : observers) {
            observer->update(message);
        }
    }
};

// Concrete Subject
class WeatherStation : public Subject {
private:
    std::string weather;
    
public:
    void setWeather(const std::string& newWeather) {
        weather = newWeather;
        notify(weather);
    }
};

// Concrete Observer
class WeatherDisplay : public Observer {
private:
    std::string name;
    
public:
    WeatherDisplay(const std::string& n) : name(n) {}
    
    void update(const std::string& message) override {
        std::cout << name << " riceve aggiornamento: " 
                  << message << std::endl;
    }
};

int main() {
    WeatherStation station;
    
    WeatherDisplay display1("Display 1");
    WeatherDisplay display2("Display 2");
    
    station.attach(&display1);
    station.attach(&display2);
    
    station.setWeather("Soleggiato");
    station.setWeather("Piovoso");
    
    station.detach(&display1);
    station.setWeather("Nuvoloso");
    
    return 0;
}
```

### Strategy
```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

// Strategy
class SortStrategy {
public:
    virtual void sort(std::vector<int>& numbers) = 0;
    virtual ~SortStrategy() = default;
};

// Concrete Strategies
class BubbleSort : public SortStrategy {
public:
    void sort(std::vector<int>& numbers) override {
        std::cout << "Ordinamento con Bubble Sort" << std::endl;
        // Implementazione bubble sort
        for (size_t i = 0; i < numbers.size(); i++) {
            for (size_t j = 0; j < numbers.size() - i - 1; j++) {
                if (numbers[j] > numbers[j + 1]) {
                    std::swap(numbers[j], numbers[j + 1]);
                }
            }
        }
    }
};

class QuickSort : public SortStrategy {
public:
    void sort(std::vector<int>& numbers) override {
        std::cout << "Ordinamento con Quick Sort" << std::endl;
        // Implementazione quick sort
        std::sort(numbers.begin(), numbers.end());
    }
};

// Context
class Sorter {
private:
    SortStrategy* strategy;
    
public:
    Sorter(SortStrategy* s) : strategy(s) {}
    
    void setStrategy(SortStrategy* s) {
        strategy = s;
    }
    
    void sort(std::vector<int>& numbers) {
        strategy->sort(numbers);
    }
};

int main() {
    std::vector<int> numbers = {5, 2, 8, 1, 9};
    
    Sorter sorter(new BubbleSort());
    sorter.sort(numbers);
    
    std::cout << "Dopo Bubble Sort: ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    numbers = {5, 2, 8, 1, 9};
    sorter.setStrategy(new QuickSort());
    sorter.sort(numbers);
    
    std::cout << "Dopo Quick Sort: ";
    for (int n : numbers) {
        std::cout << n << " ";
    }
    std::cout << std::endl;
    
    return 0;
}
```

## Esercizi Pratici

### Esercizio 1: Sistema di Notifiche
Implementa un sistema di notifiche usando il pattern Observer.

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

class Observer {
public:
    virtual void update(const std::string& message) = 0;
    virtual ~Observer() = default;
};

class Subject {
private:
    std::vector<Observer*> observers;
    
public:
    void attach(Observer* observer) {
        observers.push_back(observer);
    }
    
    void detach(Observer* observer) {
        observers.erase(
            std::remove(observers.begin(), observers.end(), observer),
            observers.end()
        );
    }
    
    void notify(const std::string& message) {
        for (auto observer : observers) {
            observer->update(message);
        }
    }
};

class NotificationSystem : public Subject {
private:
    std::string lastMessage;
    
public:
    void sendNotification(const std::string& message) {
        lastMessage = message;
        notify(message);
    }
};

class EmailNotifier : public Observer {
private:
    std::string email;
    
public:
    EmailNotifier(const std::string& e) : email(e) {}
    
    void update(const std::string& message) override {
        std::cout << "Invio email a " << email 
                  << ": " << message << std::endl;
    }
};

class SMSNotifier : public Observer {
private:
    std::string phone;
    
public:
    SMSNotifier(const std::string& p) : phone(p) {}
    
    void update(const std::string& message) override {
        std::cout << "Invio SMS a " << phone 
                  << ": " << message << std::endl;
    }
};

int main() {
    NotificationSystem system;
    
    EmailNotifier email1("user1@example.com");
    EmailNotifier email2("user2@example.com");
    SMSNotifier sms1("+1234567890");
    
    system.attach(&email1);
    system.attach(&email2);
    system.attach(&sms1);
    
    system.sendNotification("Nuovo aggiornamento disponibile");
    
    system.detach(&email2);
    system.sendNotification("Promemoria: riunione domani");
    
    return 0;
}
```

### Esercizio 2: Sistema di Pagamento
Implementa un sistema di pagamento usando il pattern Strategy.

```cpp
#include <iostream>
#include <string>

class PaymentStrategy {
public:
    virtual void pay(double amount) = 0;
    virtual ~PaymentStrategy() = default;
};

class CreditCardPayment : public PaymentStrategy {
private:
    std::string cardNumber;
    std::string cvv;
    
public:
    CreditCardPayment(const std::string& card, const std::string& c)
        : cardNumber(card), cvv(c) {}
    
    void pay(double amount) override {
        std::cout << "Pagamento di $" << amount 
                  << " con carta di credito " 
                  << cardNumber << std::endl;
    }
};

class PayPalPayment : public PaymentStrategy {
private:
    std::string email;
    
public:
    PayPalPayment(const std::string& e) : email(e) {}
    
    void pay(double amount) override {
        std::cout << "Pagamento di $" << amount 
                  << " con PayPal " << email << std::endl;
    }
};

class PaymentProcessor {
private:
    PaymentStrategy* strategy;
    
public:
    PaymentProcessor(PaymentStrategy* s) : strategy(s) {}
    
    void setStrategy(PaymentStrategy* s) {
        strategy = s;
    }
    
    void processPayment(double amount) {
        strategy->pay(amount);
    }
};

int main() {
    PaymentProcessor processor(new CreditCardPayment("1234-5678", "123"));
    processor.processPayment(100.0);
    
    processor.setStrategy(new PayPalPayment("user@example.com"));
    processor.processPayment(50.0);
    
    return 0;
}
```