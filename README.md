# LibIT_A
---

Repository Projek Mata Kuliah Semantik Web : **Aplikasi Pencarian Source code dengan menggunakan SPARQL**
Projek ini dibangun dengan menggunakan React JS beserta *library* terkait untuk menunjang berjalannya fitur *website* ini.

---
## Anggota
- 140810180005 - Fauzan Akmal Hariz
- 140810180013 - Alvin
---
## Panduan Instalasi
### Apache Jena Fuseki
1. *Download* Apache Jena Fuseki di https://jena.apache.org/download/
2. *Download* [apache-jena-fuseki-4.1.0.zip](https://downloads.apache.org/jena/binaries/apache-jena-fuseki-4.1.0.zip)
3. *Extract file*
4. Pada direktori buka cmd dan masukan *command*
    ```cmd
    fuseki-server
    ```
5. Buka *browser* dan jalankan http://localhost:3030/

### Mengupload Dataset
1. Jalankan **fuseki-server**
2. Buka *browser* dan http://localhost:3030/
3. Klik *manage dataset*, lalu buat *dataset* baru
4. Masukkan *dataset name* = **repo-codes**
5. *Create dataset*
6. Upload data dari folder *dataset*, pilih **datasetv2.ttl**
7. Tunggu sampai file selesai di-*upload*

### Menjalankan React JS
1. *Download* **Node.js** *installer*
2. *Install* **Node.js** dan **NPM** (sumber : https://nodejs.org/en/docs/)
3. Clone Repository dengan
    ```cmd
    git clone https://github.com/fauzanakmalh1/LibIT_A.git
    ```
4. Ubah direktori ke folder yang sudah di *clone* dengan mengetikkan *command*
    ```cmd
    cd LibIT_A
    ```
5. Lalu pasang *dependencies* yang dibutuhkan dengan mengetikkan *command*
    ```cmd
    npm install
    ```
6. Kemudian jalankan dengan 
    ```cmd
    npm start
    ```
6. *Website* secara otomatis terbuka di *browser* pada http://localhost:3000/
7. Kemudian akan terbuka *main page* dari *website* **LibIT**
---
## Cara Penggunaan
### Mencari Repository
1. Buka *website* dapat secara *offline* atau *online*
    - Jika membuka *website* secara ***offline*** buka http://localhost:3000/ pada *browser*
    - Jika membuka *website* secara ***online*** buka https://libit.herokuapp.com/ pada *browser*
2. Cari *repository* yang diinginkan pada kolom pencarian biasa (*normal search*) atau pada kolom pencarian *advanced* (*advanced search*)
---
## Screenshot Website
<img src="https://github.com/fauzanakmalh1/LibIT_A/blob/master/public/images/screenshot-web.png" alt="Screenshot Website">
<img src="https://github.com/fauzanakmalh1/LibIT_A/blob/master/public/images/screenshot-mobile.png" alt="Screenshot Website Mobile">

 >Copyright &copy; 2021 - LibIT!