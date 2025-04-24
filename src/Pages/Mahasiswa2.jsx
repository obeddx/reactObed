import React, { useState, useEffect} from 'react';
import MahasiswaModal from './MahasiswaModal';
import MahasiswaTable from './MahasiswaTable';
import mahasiswaList from '../data/mahasiswaList.json';
import { useNavigate } from 'react-router-dom';
import { toastSuccess, toastError } from '../Utils/Helpers/ToastHelpers';
import { confirmDelete, confirmUpdate } from '../Utils/Helpers/SwalHelpers';
 // boundary error : 
 // 1. disebabkan karena bisa jadi struktur data salah pada saat fetch atau post data, 
 // 2. passing props child dan parent berbeda

function Mahasiswa() {
    const [mahasiswa, setMahasiswa] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
            nim: '',
            nama: '',
            prodi: '',
            angkatan: ''
        });

        const navigate = useNavigate();

        useEffect(() => {
            setTimeout(() => fetchMahasiswa(), 500);
          }, []);
          
          const fetchMahasiswa = async () => {
            // bisa disimulasikan delay atau nanti diganti fetch API
            setMahasiswa(mahasiswaList);
          };
        

    const addMahasiswa = (newMahasiswa) => {
        setMahasiswa([...mahasiswa, newMahasiswa]);
    };

    const updateMahasiswa = (nim, newData) => {
        const updated = mahasiswa.map((mhs) => 
          mhs.nim === nim ? {...mhs, ...newData} : mhs
        );
        setMahasiswa(updated);
      };

    const deleteMahasiswa = (nim) => {
        setMahasiswa(mahasiswa.filter((mhs) => mhs.nim !== nim));
    };

    const openAddModal = () => {
        setForm({ nim: "", nama: "", prodi: '', angkatan:'' });
        setIsModalOpen(true);
    };

   

    const handleEdit = (mhs) => {
        setForm({ nim: mhs.nim, nama: mhs.nama, prodi:mhs.prodi, angkatan:mhs.angkatan });
        setIsEdit(true);
        setIsModalOpen(true);
      };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nim || !form.nama || !form.prodi || !form.angkatan) {
          toastError("Semua Kolom Wajib di isi")
          return;
        }
      
        if (isEdit) {
          confirmUpdate(() => {
            if (form.nama.length < 3) {
              toastError('Nama harus terdiri dari minimal 3 huruf!');
              return false; // gagal
            }
        
            updateMahasiswa(form.nim, form);
            toastSuccess('Mahasiswa berhasil diupdate!');
            return true; // sukses
          });
        } else {
          const exists = mahasiswa.find((m) => m.nim === form.nim);
          if (exists) {
            toastError("NIM sudah terdaftar")
            return;
          }
          addMahasiswa(form);
          toastSuccess('Mahasiswa berhasil ditambah!')
        }
      
        setForm({ nim: "", nama: "", prodi: '', angkatan:'' });
        setIsEdit(false);
        setIsModalOpen(false);
      }

      const handleDelete = (nim) => {
       
        confirmDelete(()=>{
          deleteMahasiswa(nim);
          toastSuccess('Berhasil Hapus data')
        });

      }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Mahasiswa</h1>
            <button
                onClick={openAddModal}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Tambah Mahasiswa
            </button>
            <MahasiswaModal
                isModalOpen={isModalOpen}
                isEdit={isEdit}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                form={form}
                handleChange={handleChange}
            />
            <MahasiswaTable
                mahasiswa={mahasiswa}
               
                onDelete={handleDelete}
                onEdit={handleEdit}
                onDetail={(nim) => navigate(`/admin/mahasiswa/${nim}`)}
            />
        </div>
    );
}

export default Mahasiswa;