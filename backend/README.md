# RecoPlant Backend API

RecoPlant Backend is a RESTful API built with Laravel that manages user authentication, stores land vegetation satellite features, communicates with a Machine Learning service to predict optimal crops, and handles prediction histories.

---

## 🚀 Key Features

* **Secure Authentication:** Implements token-based authentication using **Laravel Sanctum**.
* **Crop Prediction Service:** Receives 18 satellite and spatial features (such as NDVI, NDWI, coordinates, and seasonality parameters) and queries a Machine Learning model.
* **History Management:** User-specific dashboard and paginated predictions history (CRUD).
* **Robust Security Implementations:**
  * **Insecure Direct Object Reference (IDOR) Protection:** Predict history endpoints are scoped to the authenticated user.
  * **CORS Protection:** Configured origins allow only trusted applications (e.g. `http://localhost:5173`).
  * **Rate Limiting (Throttling):**
    * Public endpoints (register/login) are restricted to **10 requests per minute** to protect against brute-force attacks.
    * Authenticated actions (predictions/dashboard) are throttled to **60 requests per minute** to prevent API abuse and DoS against the ML service.

---

## 🛠️ Tech Stack

* **Core Framework:** Laravel (PHP >= 8.3)
* **Auth System:** Laravel Sanctum (Token Auth)
* **Database:** MySQL
* **Testing:** PHPUnit (Feature / Unit tests)

---

## 📋 API Endpoints

### Public Endpoints (Rate Limit: 10 req/min)
| Method | URI | Description |
| :--- | :--- | :--- |
| `POST` | `/api/register` | Register a new account |
| `POST` | `/api/login` | Login to receive a Bearer Token |
| `GET` | `/api/plants` | Fetch plant encyclopedia data (local/translated keys) |

### Protected Endpoints (Rate Limit: 60 req/min, requires Bearer Token)
| Method | URI | Description |
| :--- | :--- | :--- |
| `POST` | `/api/logout` | Revoke user access token |
| `GET` | `/api/dashboard` | Access the user dashboard |
| `POST` | `/api/predict` | Send 18 spatial parameters to predict crops |
| `GET` | `/api/predictions` | Fetch paginated prediction history |
| `GET` | `/api/predictions/{id}`| Fetch specific prediction details |
| `PUT` | `/api/predictions/{id}`| Update notes on a prediction |
| `DELETE`| `/api/predictions/{id}`| Delete a prediction history record |

---

## 🏛️ Clean Architecture Design

The project has been refactored to implement **Clean Architecture** principles to separate business logic from the framework details:

* **Domain Layer (`app/Domain`)**: Contains repository contracts (e.g. `UserRepositoryInterface`, `PredictionRepositoryInterface`, `PlantRepositoryInterface`) and domain service interfaces (`MLServiceInterface`).
* **Infrastructure Layer (`app/Infrastructure`)**: Contains framework-specific implementations like Eloquent Repositories and external service callers (like the `MLService` client).
* **Application/Presentation Layer**: Controllers (`AuthController`, `PredictionController`, `PlantController`) rely purely on **Dependency Injection (DI)** of Domain Interfaces rather than Eloquent models directly, registered via `AppServiceProvider`.

---

## 📂 Directory Structure

Berikut adalah pohon struktur folder lengkap dari backend RecoPlant yang telah menerapkan Clean Architecture:

```text
backend/
├── app/
│   ├── Domain/                        # 🏛️ Domain Layer (Pure Business Rules & Interface Contracts)
│   │   ├── Repositories/              # Kontrak Data-Access
│   │   │   ├── UserRepositoryInterface.php
│   │   │   ├── PredictionRepositoryInterface.php
│   │   │   └── PlantRepositoryInterface.php
│   │   └── Services/                  # Kontrak External Integration
│   │       └── MLServiceInterface.php
│   │
│   ├── Infrastructure/                # 🔌 Infrastructure Layer (Framework & External Implementations)
│   │   ├── Repositories/              # Implementasi Repositori menggunakan Eloquent
│   │   │   ├── EloquentUserRepository.php
│   │   │   ├── EloquentPredictionRepository.php
│   │   │   └── EloquentPlantRepository.php
│   │   └── Services/                  # Implementasi Klien HTTP ML Service
│   │       └── MLService.php
│   │
│   ├── Http/                          # 🎮 Presentation Layer (HTTP Requests, Controllers, Routing)
│   │   ├── Controllers/               # Controller yang memanfaatkan Dependency Injection
│   │   │   ├── AuthController.php
│   │   │   ├── Controller.php
│   │   │   ├── DashboardController.php
│   │   │   ├── PlantController.php
│   │   │   └── PredictionController.php
│   │   └── Resources/                 # API Resources (Data Format Translators)
│   │       └── PlantResource.php
│   │
│   ├── Models/                        # 📦 Eloquent ORM Models (Definisi Entitas DB)
│   │   ├── User.php
│   │   ├── Prediction.php
│   │   └── PlantEncyclopedia.php
│   │
│   └── Providers/
│       └── AppServiceProvider.php     # ⚙️ Dependency Injection Service Provider (Binding Interface -> Class)
│
├── bootstrap/                         # 🚀 Laravel Bootstrapping & Middleware Registries
│
├── config/                            # ⚙️ Berkas Konfigurasi Framework (Database, Session, Sanctum, dll.)
│
├── database/                          # 🗄️ Database Schemas & Data Seeding
│   ├── factories/                     # Model Factories untuk Pengujian Data Dummy
│   │   └── UserFactory.php
│   ├── migrations/                    # DDL Skema Tabel Database
│   │   ├── 0001_01_01_000000_create_users_table.php (Termasuk tabel 'sessions' dan 'password_resets')
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 2026_06_29_071656_create_personal_access_tokens_table.php
│   │   ├── 2026_06_29_074733_create_predictions_table.php
│   │   └── 2026_06_29_133332_create_plant_encyclopedia_table.php
│   └── seeders/                       # Data Awal Dummy & Ensiklopedia Tanaman
│       ├── DatabaseSeeder.php
│       └── PlantEncyclopediaSeeder.php
│
├── routes/                            # 🗺️ Route Mappings
│   ├── api.php                        # Rute REST API
│   ├── web.php                        # Rute Web Fallback
│   └── console.php                    # Perintah CLI Artisan
│
└── tests/                             # 🧪 Automated Test Suite
    ├── Feature/                       # Pengujian Fungsionalitas API & Alur Bisnis (Dipecah per-Fitur)
    │   ├── AuthTest.php               # Pengujian Registrasi, Login, dan Logout
    │   ├── DashboardTest.php          # Pengujian Keamanan Akses Dashboard
    │   ├── PredictionTest.php         # Pengujian CRUD Riwayat Prediksi & Integrasi Mock
    │   ├── PlantTest.php              # Pengujian API Ensiklopedia & Resource Translator
    │   └── MLServiceIntegrationTest.php # Pengujian Integrasi Nyata ML API (Tanpa Mock)
    └── Unit/                          # Pengujian Unit Tingkat Rendah Terisolasi
        ├── ExampleTest.php
        └── ModelsAndServicesTest.php  # Pengujian Casting Atribut Model, Relasi DB, & MLService Parser
```

### 📂 Penjelasan Detail Folder Utama:

1. **`app/Domain/`**: Layer inti bisnis yang independen dari framework eksternal. Layer ini memuat kontrak (interface) data access dan service eksternal yang diizinkan untuk dikonsumsi oleh alur bisnis utama.
2. **`app/Infrastructure/`**: Tempat implementasi konkrit dari kontrak-kontrak domain. Ini melibatkan penggunaan library pihak ketiga atau fitur spesifik Laravel (seperti Eloquent ORM untuk data-access atau HTTP Guzzle Client untuk API integrasi).
3. **`app/Http/`**: Mengatur interaksi request-response klien. Memiliki controller minimalis yang bersih dari query SQL karena sudah menggunakan dependensi repositori dari layer domain.
4. **`app/Models/`**: Memetakan struktur database relasional menjadi objek PHP menggunakan Laravel Eloquent.
5. **`database/`**: Mendefinisikan riwayat migrasi struktur database, skema data pabrik (*factories*) untuk kebutuhan mock testing, dan pengisian data bawaan (*seeders*).
6. **`tests/`**: Kumpulan berkas pengujian otomatis yang modular dan dipecah per-fitur untuk mempermudah pemeliharaan jangka panjang (*long-term maintainability*).

---

## ⚙️ Configuration (`.env`)

Ensure the following configuration variables are present in your `.env` file:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=RecoPlant
DB_USERNAME=RecoPlant
DB_PASSWORD=secret123

# Machine Learning Service URL
ML_API_URL=http://localhost:8001
```

*Note: The ML service URL is managed securely via `config/services.php` as `config('services.ml.api_url')` to prevent runtime configuration cache errors.*

---

## 🖥️ Getting Started

### 1. Installation
Clone the repository and install the dependencies:
```bash
composer install
npm install
```

### 2. Run Database Migrations & Seeding
Create your database schema (including `users`, `predictions`, `plant_recommendations`, `sessions`, and `password_reset_tokens` tables) and seed default encyclopedia data:
```bash
php artisan migrate:fresh --seed
```

### 3. Generate App Key
```bash
php artisan key:generate
```

### 4. Running the Server Locally
To start the development server along with the queue listeners and frontend compilation:
```bash
npm run dev
```
Alternatively, just run the PHP artisan server:
```bash
php artisan serve
```

---

## 🧪 Testing

We have built a comprehensive test suite covering **30 test scenarios** spanning unit testing, model relationship testing, data-isolation, controller features, and mock integrations.

Run the core tests (excluding integration tests that require an active external ML service) using:
```bash
php artisan test --exclude-filter MLServiceIntegrationTest
```

### Test Case Structure:
* **`Tests\Feature\AuthTest`**: Validates registration, login, logout, validation rules, and error handling.
* **`Tests\Feature\DashboardTest`**: Validates authenticated dashboard access and routing middleware blocks.
* **`Tests\Feature\PredictionTest`**: Validates prediction history, update notes, pagination, record isolation, and mock prediction flows.
* **`Tests\Feature\PlantTest`**: Validates plant encyclopedia retrieval and `PlantResource` translation array.
* **`Tests\Unit\ModelsAndServicesTest`**: Tests domain model relationships, JSON casting, `PlantEncyclopedia` database mapping, and mock `MLService` actions.

### Test Run Output:
```bash
PASS  Tests\Feature\AuthTest
✓ user can register
✓ user cannot register with duplicate username
✓ user cannot register with short password
✓ user can login
✓ user cannot login with wrong password
✓ user can logout

PASS  Tests\Feature\DashboardTest
✓ user can access dashboard
✓ unauthenticated user cannot access dashboard

PASS  Tests\Feature\PredictionTest
✓ user can create prediction
✓ prediction fails when ml service fails
✓ prediction fails with invalid features
✓ user can get predictions list
✓ user can show own prediction
✓ user cannot show other users prediction
✓ user can update prediction notes
✓ user cannot update other users prediction notes
✓ user can delete prediction
✓ user cannot delete other users prediction
✓ unauthenticated user cannot access prediction routes

PASS  Tests\Feature\PlantTest
✓ user can retrieve plant encyclopedia

PASS  Tests\Unit\ModelsAndServicesTest
✓ user has many predictions
✓ prediction belongs to user
✓ prediction casts input features as array
✓ plant encyclopedia table name
✓ plant encyclopedia fillable attributes
✓ plant encyclopedia creation and attributes
✓ ml service predict returns expected result

Tests:    30 passed (106 assertions)
Duration: 1.45s
```
