import { useParams } from 'react-router-dom';

function MahasiswaDetail() {
  const { NIM } = useParams();
  
  // Dummy data
  const mahasiswa = {
    "A11.2022.13962": { nama: "Obed Danny", jurusan: "TI", umur: 20 },
    "A11.2022.13964": { nama: "Jane Doe", jurusan: "Akuntasi", umur: 21 },
  };

  const data = mahasiswa[NIM];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detail Mahasiswa</h1>
      {data ? (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>NIM:</strong> {NIM}</p>
          <p><strong>Nama:</strong> {data.nama}</p>
          <p><strong>Jurusan:</strong> {data.jurusan}</p>
          <p><strong>Umur:</strong> {data.umur}</p>
        </div>
      ) : (
        <p className="text-red-500">Data mahasiswa tidak ditemukan.</p>
      )}
    </div>
  );
}

export default MahasiswaDetail;
