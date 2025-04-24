import { useParams } from 'react-router-dom';
import mahasiswaList from '../data/mahasiswaList.json';

function MahasiswaDetail() {
  const { nim } = useParams();
  
 
  const data = mahasiswaList[nim];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detail Mahasiswa</h1>
      {data ? (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>NIM:</strong> {nim}</p>
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
