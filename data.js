let currentPage = 1;
const rowsPerPage = 10;
let globalData = [];

fetch("data/peminjam_1000_data.json")
  .then((response) => response.json())
  .then((data) => {
    globalData = data;
    renderTable(currentPage);
    renderPagination();
  })
  .catch((error) => {
    console.error("Gagal memuat data:", error);
    document.getElementById("tabel-peminjam").textContent = "Gagal memuat data.";
  });

function renderTable(page) {
  const tableContainer = document.getElementById("tabel-peminjam");
  tableContainer.innerHTML = ""; // Kosongkan dulu

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";

  // Header
  const header = table.insertRow();
  const headers = ["No", "Nama", "Jumlah Pinjaman", "Status", "Kategori", "Wilayah", "Tanggal Pinjam"];
  headers.forEach((text) => {
    const cell = header.insertCell();
    cell.outerHTML = `<th style="background:#bf7d33;color:white;padding:8px">${text}</th>`;
  });

  // Hitung index data untuk halaman sekarang
  const start = (page - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, globalData.length);

  for (let i = start; i < end; i++) {
    const item = globalData[i];
    const row = table.insertRow();
    row.innerHTML = `
      <td style="padding:8px">${i + 1}</td>
      <td style="padding:8px">${item.nama}</td>
      <td style="padding:8px">Rp ${item.jumlahPinjaman.toLocaleString()}</td>
      <td style="padding:8px">${item.statusPengembalian}</td>
      <td style="padding:8px">${item.kategori}</td>
      <td style="padding:8px">${item.wilayah}</td>
      <td style="padding:8px">${item.tanggalPinjam}</td>
    `;
  }

  tableContainer.appendChild(table);
}

function renderPagination() {
  const paginationContainer = document.createElement("div");
  paginationContainer.id = "pagination";
  paginationContainer.style.marginTop = "1rem";
  paginationContainer.style.textAlign = "center";

  const totalPages = Math.ceil(globalData.length / rowsPerPage);

  const prevButton = document.createElement("button");
  prevButton.textContent = "Sebelumnya";
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderTable(currentPage);
      renderPagination();
    }
  };

  const nextButton = document.createElement("button");
  nextButton.textContent = "Berikutnya";
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTable(currentPage);
      renderPagination();
    }
  };

  const pageInfo = document.createElement("span");
  pageInfo.textContent = ` Halaman ${currentPage} dari ${totalPages} `;
  pageInfo.style.margin = "0 10px";

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(pageInfo);
  paginationContainer.appendChild(nextButton);

  // Tambahkan ke bawah tabel
  const container = document.getElementById("tabel-peminjam");
  container.appendChild(paginationContainer);
}
