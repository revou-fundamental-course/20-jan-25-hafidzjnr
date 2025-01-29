document.getElementById('bmi-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Mencegah refresh halaman

  // Ambil input dari form
  const gender = document.getElementById('gender').value;
  const age = parseInt(document.getElementById('age').value);
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);

  // Validasi input
  if (!validateInput(gender, age, height, weight)) {
    displayResult('Mohon masukkan semua data dengan benar.', 'red');
    return;
  }

  // Hitung BMI
  const bmi = (weight / ((height / 100) ** 2)).toFixed(2);
  const category = getBmiCategory(bmi);
  const healthRisks = getHealthRisks(category); // Dapatkan risiko penyakit

    // Tentukan warna berdasarkan kategori
    let color;
    if (category === 'Kelebihan Berat Badan' || category === 'Obesitas') {
      color = 'red';
    } else if (category === 'Kekurangan Berat Badan') {
      color = 'orange';
    } else {
      color = 'green';
    }

  // Tampilkan hasil
  const resultMessage = 
    `Jenis Kelamin: ${gender === 'male' ? 'Laki-Laki' : 'Wanita'}\n` +
    `Usia: ${age} tahun\n` +
    `BMI Anda: ${bmi}\nKategori: ${category}\n` +
    `${healthRisks}`;
  
  displayResult(resultMessage.replace(/\n/g, '<br>'), color);

  // Siapkan untuk unduhan
  prepareDownload(resultMessage);
});

// Fungsi untuk menampilkan hasil
function displayResult(message, color) {
  const resultDiv = document.getElementById('result');
  resultDiv.style.color = color;
  resultDiv.innerHTML = message;
  resultDiv.style.opacity = '1';
}


// Fungsi untuk memvalidasi input
function validateInput(gender, age, height, weight) {
  if (!gender) {
    alert('Pilih jenis kelamin.');
    return false;
  }
  if (isNaN(age) || age <= 0) {
    alert('Masukkan usia yang valid (lebih dari 0).');
    return false;
  }
  if (isNaN(height) || height <= 0) {
    alert('Masukkan tinggi badan yang valid (lebih dari 0).');
    return false;
  }
  if (isNaN(weight) || weight <= 0) {
    alert('Masukkan berat badan yang valid (lebih dari 0).');
    return false;
  }
  return true;
}

// Fungsi untuk menentukan kategori BMI
function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return 'Kekurangan Berat Badan';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Berat Badan Normal';
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'Kelebihan Berat Badan';
  } else {
    return 'Obesitas';
  }
}

// Fungsi untuk menentukan risiko penyakit berdasarkan kategori BMI
function getHealthRisks(category) {
  switch (category) {
    case 'Kekurangan Berat Badan':
      return 'Risiko: Malnutrisi, osteoporosis, atau anemia.';
    case 'Berat Badan Normal':
      return 'Risiko penyakit relatif rendah. Jaga pola hidup sehat.';
    case 'Kelebihan Berat Badan':
      return 'Risiko: Diabetes tipe 2, hipertensi, atau penyakit jantung.';
    case 'Obesitas':
      return 'Risiko: Diabetes tipe 2, penyakit jantung, tekanan darah tinggi, dan stroke.';
    default:
      return 'Tidak ada data risiko.';
  }
}

// Fungsi untuk mempersiapkan unduhan hasil
function prepareDownload(resultMessage) {
  const downloadBtn = document.getElementById('download-btn');
  const blob = new Blob([resultMessage], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  downloadBtn.style.display = 'inline-block'; // Tampilkan tombol unduh
  downloadBtn.href = url;
  downloadBtn.download = 'hasil_bmi.txt';

  downloadBtn.addEventListener('click', () => {
    setTimeout(() => URL.revokeObjectURL(url), 1000); // Hapus URL sementara
  });
}
