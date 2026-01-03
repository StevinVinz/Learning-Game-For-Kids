// BAGIAN 1: VARIABEL (TEMPAT MENYIMPAN DATA)

var skorKuis = 0;
var skorMath = 0;
var skorMemory = 0;

var angka1 = 0;
var angka2 = 0;
var jawabanBenar = 0;

var kartu1 = null;
var kartu2 = null;
var nomorSoal = 0;


// FUNGSI NAVIGASI HALAMAN

function keBeranda() {
    document.getElementById("halamanBeranda").style.display = "block";
    document.getElementById("halamanTentang").classList.remove("active");
    tutupGame();
}

function keTentang() {
    document.getElementById("halamanBeranda").style.display = "none";
    document.getElementById("halamanTentang").classList.add("active");
}

// BAGIAN 2: DATA SOAL KUIS
var soalKuis = [
    {
        soal: "Apa ibu kota Indonesia?",
        pilihan: ["Jakarta", "Bandung", "Surabaya"],
        benar: "Jakarta"
    },
    {
        soal: "Hewan apa yang disebut Raja Hutan?",
        pilihan: ["Harimau", "Singa", "Gajah"],
        benar: "Singa"
    },
    {
        soal: "Berapa warna pelangi?",
        pilihan: ["5", "6", "7"],
        benar: "7"
    },
    {
        soal: "Planet terdekat dengan Matahari?",
        pilihan: ["Venus", "Merkurius", "Mars"],
        benar: "Merkurius"
    },
    {
        soal: "Berapa sisi pada segitiga?",
        pilihan: ["2", "3", "4"],
        benar: "3"
    }
];

// BAGIAN 3: FUNGSI BUKA/TUTUP GAME
function bukaKuis() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("quizGame").classList.add("active");
    skorKuis = 0;
    nomorSoal = 0;
    tampilkanSoalKuis();
}

function bukaMath() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("mathGame").classList.add("active");
    skorMath = 0;
    document.getElementById("mathScore").innerHTML = skorMath;
    buatSoalBaru();
}

function bukaMemory() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("memoryGame").classList.add("active");
    skorMemory = 0;
    document.getElementById("memoryScore").innerHTML = skorMemory;
    buatKartu();
}

function tutupGame() {
    document.getElementById("menu").style.display = "grid";
    document.getElementById("quizGame").classList.remove("active");
    document.getElementById("mathGame").classList.remove("active");
    document.getElementById("memoryGame").classList.remove("active");
}

// BAGIAN 4: GAME KUIS
function tampilkanSoalKuis() {
    if (nomorSoal >= 5) {
        var hasilDiv = document.getElementById("quizOptions");
        hasilDiv.innerHTML = '<div class="result correct" style="font-size: 1.5em; padding: 30px;">🎉 Selesai!<br>Skor: ' + skorKuis + '/5</div>';
        return;
    }
    
    var soalSekarang = soalKuis[nomorSoal];
    document.getElementById("quizQuestion").innerHTML = "Soal " + (nomorSoal + 1) + " dari 5<br>" + soalSekarang.soal;
    
    var pilihanDiv = document.getElementById("quizOptions");
    pilihanDiv.innerHTML = ""; 

    soalSekarang.pilihan.forEach(function(opt) {
        var div = document.createElement("div");
        div.className = "quiz-option";
        div.innerHTML = opt;
        div.onclick = function() { cekJawabanKuis(opt); };
        pilihanDiv.appendChild(div);
    });
}

function cekJawabanKuis(jawaban) {
    var jwbBenar = soalKuis[nomorSoal].benar;
    if (jawaban === jwbBenar) {
        alert("✅ Benar!");
        skorKuis++;
    } else {
        alert("❌ Salah! Jawabannya: " + jwbBenar);
    }
    
    document.getElementById("quizScore").innerHTML = skorKuis + "/5";
    nomorSoal++;
    setTimeout(tampilkanSoalKuis, 500);
}

// BAGIAN 5: GAME MATEMATIKA
function buatSoalBaru() {
    angka1 = Math.floor(Math.random() * 10) + 1;
    angka2 = Math.floor(Math.random() * 10) + 1;
    jawabanBenar = angka1 + angka2;
    document.getElementById("mathQuestion").innerHTML = angka1 + " + " + angka2 + " = ?";
    document.getElementById("mathInput").value = "";
    document.getElementById("mathResult").innerHTML = "";
}

function cekJawaban() {
    var jawabanUser = document.getElementById("mathInput").value;
    if (jawabanUser === "") return alert("Isi jawabannya dulu ya!");
    
    if (parseInt(jawabanUser) === jawabanBenar) {
        skorMath++;
        document.getElementById("mathScore").innerHTML = skorMath;
        document.getElementById("mathResult").innerHTML = '<div class="result correct">🎉 Benar!</div>';
    } else {
        document.getElementById("mathResult").innerHTML = '<div class="result wrong">❌ Salah. Jawabannya: ' + jawabanBenar + '</div>';
    }
    setTimeout(buatSoalBaru, 2000);
}

// BAGIAN 6: GAME MEMORY
function buatKartu() {
    var emoji = ["🍎", "🍎", "🍌", "🍌", "🍇", "🍇", "🍊", "🍊"];
    emoji.sort(() => Math.random() - 0.5);
    
    var grid = document.getElementById("memoryGrid");
    grid.innerHTML = "";
    
    for (var i = 0; i < 8; i++) {
        var kartu = document.createElement("div");
        kartu.className = "memory-card";
        kartu.innerHTML = "?";
        kartu.setAttribute("data-emoji", emoji[i]);
        kartu.onclick = function() { klikKartu(this); };
        grid.appendChild(kartu);
    }
    kartu1 = kartu2 = null;
}

function klikKartu(kartu) {
    if (kartu.classList.contains("flipped") || (kartu1 && kartu2)) return;
    
    kartu.classList.add("flipped");
    kartu.innerHTML = kartu.getAttribute("data-emoji");
    
    if (!kartu1) {
        kartu1 = kartu;
    } else {
        kartu2 = kartu;
        setTimeout(cekKartu, 1000);
    }
}

function cekKartu() {
    if (kartu1.getAttribute("data-emoji") === kartu2.getAttribute("data-emoji")) {
        skorMemory++;
        document.getElementById("memoryScore").innerHTML = skorMemory;
        if (skorMemory === 4) alert("🎉 Selamat! Kamu menang!");
    } else {
        kartu1.classList.remove("flipped");
        kartu2.classList.remove("flipped");
        kartu1.innerHTML = kartu2.innerHTML = "?";
    }
    kartu1 = kartu2 = null;
}

// Event Listener Enter
document.getElementById("mathInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") cekJawaban();
});