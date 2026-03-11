

# 🛒 Full-Stack E-Commerce Platform

> Modern web teknolojileri kullanılarak "Monorepo" mimarisinde uçtan uca (End-to-End) geliştirilmiş, tam kapsamlı bir B2C (Business to Consumer) E-Ticaret platformu.

Bu proje; kullanıcı yönetimi, ürün kataloğu, kategori filtreleme ve dinamik sepet işlemlerini (Cart Management) barındıran, ölçeklenebilir bir mimariyle tasarlanmıştır.

## 🏗️ Mimari ve Teknolojiler (Tech Stack)

Proje, **Separation of Concerns (Sorumlulukların Ayrılığı)** prensibine uygun olarak Frontend ve Backend olmak üzere iki bağımsız katmandan oluşmaktadır.

### 🟢 Frontend (İstemci - Client Side)
* **Framework:** React.js
* **Build Aracı:** Vite (Yüksek performanslı HMR ve derleme)
* **Stil & UI:** Modern CSS (Component-based styling)
* **Mimari:** Modüler yapı (`/components`, `/pages`, `/services`)

### 🔴 Backend (Sunucu - Server Side)
* **Dil & Framework:** Java 17+, Spring Boot
* **Veritabanı Yönetimi:** Spring Data JPA, Hibernate
* **Mimari:** Katmanlı Mimari (Controller -> Service -> Repository -> Model)
* **Güvenlik:** Çevresel değişken (Environment Variables) izolasyonu ve `.gitignore` tabanlı kimlik bilgisi (Credential) koruması.


## 🚀 Projeyi Lokal Ortamda Çalıştırmak (Getting Started)

Projeyi kendi bilgisayarınızda test etmek için aşağıdaki adımları izleyin:

### 1. Repoyu Klonlayın
```bash
git clone https://github.com/cagri000/e_commerce-full-stack.git

### 2. Backend'i Başlatın (Spring Boot)
   1. backend/src/main/resources klasörüne gidin.
   2. application.properties.template dosyasının adını application.properties olarak değiştirin ve içindeki veritabanı şifrenizi (spring.datasource.password) kendinize göre ayarlayın.
   3. IDE üzerinden veya terminalden projeyi çalıştırın:
     cd backend
     ./mvnw spring-boot:run


 ### 3. Frontend'i Başlatın (React/Vite)
     Yeni bir terminal penceresi açın ve önyüzü ayağa kaldırın:
      cd frontend
      npm install
      npm run dev

