// BAGIAN 1: VARIABEL (TEMPAT SIMPAN DATA)

let skor = 0;               
let skorMath = 0;           
let skorMemory = 0;        
let nomorSoal = 0;          
let jawabanCorrectMath = 0; 
let kartu1 = null;          
let kartu2 = null;          

// Data soal kuis
let soal = [
    ["Apa ibu kota Indonesia?", "Jakarta", "Bandung", "Surabaya", "Jakarta"],
    ["Hewan apa yang disebut Raja Hutan?", "Harimau", "Singa", "Gajah", "Singa"],
    ["Berapa warna pelangi?", "5", "6", "7", "7"],
    ["Planet terdekat dengan Matahari?", "Venus", "Merkurius", "Mars", "Merkurius"],
    ["Berapa sisi pada segitiga?", "2", "3", "4", "3"]
];

// BAGIAN 2: FUNGSI PINDAH HALAMAN

function tampilBeranda() {
    document.getElementById("beranda").style.display = "block";
    document.getElementById("tentang").style.display = "none";
    document.getElementById("kuis").style.display = "none";
    document.getElementById("math").style.display = "none";
    document.getElementById("memory").style.display = "none";
}

function tampilTentang() {
    document.getElementById("beranda").style.display = "none";
    document.getElementById("tentang").style.display = "block";
    document.getElementById("kuis").style.display = "none";
    document.getElementById("math").style.display = "none";
    document.getElementById("memory").style.display = "none";
}

// BAGIAN 3: FUNGSI GAME KUIS

function mulaiKuis() {
    document.getElementById("beranda").style.display = "none";
    document.getElementById("kuis").style.display = "block";
    
    skor = 0;
    nomorSoal = 0;
    document.getElementById("skorKuis").textContent = "0";
    
    tampilSoal();
}

function tampilSoal() {
    if (nomorSoal >= 5) {
        document.getElementById("pilihanJawaban").innerHTML = 
            '<div style="background: #d4edda; padding: 20px; border-radius: 10px; text-align: center; font-size: 1.3em;">🎉 Selesai!<br>Skor Akhir: ' + skor + '/5</div>';
        return;
    }

    let soalSekarang = soal[nomorSoal];
    document.getElementById("soalKuis").textContent = "Soal " + (nomorSoal + 1) + ": " + soalSekarang[0];
    
    let html = "";
    html += '<button class="tombol" onclick="cekJawaban(\'' + soalSekarang[1] + '\')">' + soalSekarang[1] + '</button>';
    html += '<button class="tombol" onclick="cekJawaban(\'' + soalSekarang[2] + '\')">' + soalSekarang[2] + '</button>';
    html += '<button class="tombol" onclick="cekJawaban(\'' + soalSekarang[3] + '\')">' + soalSekarang[3] + '</button>';
    document.getElementById("pilihanJawaban").innerHTML = html;
}

function cekJawaban(jawabanUser) {
    let jawabanBenar = soal[nomorSoal][4];
    
    if (jawabanUser == jawabanBenar) {
        alert("✅ Benar!");
        skor = skor + 1;
    } else {
        alert("❌ Salah! Jawabannya: " + jawabanBenar);
    }
    
    document.getElementById("skorKuis").textContent = skor;
    nomorSoal = nomorSoal + 1;
    tampilSoal();
}


// BAGIAN 4: FUNGSI GAME MATEMATIKA

function mulaiMath() {
    document.getElementById("beranda").style.display = "none";
    document.getElementById("math").style.display = "block";
    
    skorMath = 0;
    document.getElementById("skorMath").textContent = "0";
    
    buatSoalMath();
}

function buatSoalMath() {
    let angka1 = Math.floor(Math.random() * 10) + 1;
    let angka2 = Math.floor(Math.random() * 10) + 1;
    
    jawabanCorrectMath = angka1 + angka2;
    document.getElementById("soalMath").textContent = angka1 + " + " + angka2 + " = ?";
    
    document.getElementById("jawabanMath").value = "";
    document.getElementById("hasilMath").innerHTML = "";
}

function cekJawabanMath() {
    let jawabanUser = document.getElementById("jawabanMath").value;
    
    if (jawabanUser == "") {
        alert("Isi jawabannya dulu ya!");
        return;
    }
    
    if (parseInt(jawabanUser) == jawabanCorrectMath) {
        skorMath = skorMath + 1;
        document.getElementById("skorMath").textContent = skorMath;
        document.getElementById("hasilMath").innerHTML = 
            '<div style="background: #d4edda; padding: 15px; border-radius: 10px; margin-top: 10px; text-align: center;">🎉 Benar!</div>';
    } else {
        document.getElementById("hasilMath").innerHTML = 
            '<div style="background: #f8d7da; padding: 15px; border-radius: 10px; margin-top: 10px; text-align: center;">❌ Salah! Jawabannya: ' + jawabanCorrectMath + '</div>';
    }
    
    setTimeout(buatSoalMath, 2000);
}

// BAGIAN 5: FUNGSI GAME MEMORY

function mulaiMemory() {
    document.getElementById("beranda").style.display = "none";
    document.getElementById("memory").style.display = "block";
    
    skorMemory = 0;
    document.getElementById("skorMemory").textContent = "0";
    
    buatKartu();
}

function buatKartu() {
    let emoji = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍊", "🍊"];
    emoji.sort(function() { return Math.random() - 0.5; });
    
    let html = "";
    for (let i = 0; i < 8; i++) {
        html += '<div class="kartu" id="kartu' + i + '" data-emoji="' + emoji[i] + '" onclick="klikKartu(' + i + ')">?</div>';
    }
    document.getElementById("kartuMemory").innerHTML = html;
    
    kartu1 = null;
    kartu2 = null;
}

function klikKartu(nomor) {
    let kartu = document.getElementById("kartu" + nomor);
    
    if (kartu.classList.contains("buka") || kartu2 != null) {
        return;
    }
    
    kartu.classList.add("buka");
    kartu.textContent = kartu.getAttribute("data-emoji");
    
    if (kartu1 == null) {
        kartu1 = kartu;
    } else {
        kartu2 = kartu;
        setTimeout(cekCocok, 1000);
    }
}

function cekCocok() {
    let emoji1 = kartu1.getAttribute("data-emoji");
    let emoji2 = kartu2.getAttribute("data-emoji");
    
    if (emoji1 == emoji2) {
        skorMemory = skorMemory + 1;
        document.getElementById("skorMemory").textContent = skorMemory;
        
        if (skorMemory == 4) {
            alert("🎉 Selamat! Kamu menang!");
        }
    } else {
        kartu1.classList.remove("buka");
        kartu2.classList.remove("buka");
        kartu1.textContent = "?";
        kartu2.textContent = "?";
    }
    
    kartu1 = null;
    kartu2 = null;
}

// Listener untuk input Enter di Matematika
document.getElementById("jawabanMath").addEventListener("keypress", function(e) {
    if (e.key == "Enter") {
        cekJawabanMath();
    }
});
