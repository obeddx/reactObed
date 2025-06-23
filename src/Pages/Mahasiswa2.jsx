import React, { useState, useEffect} from 'react';
import MahasiswaModal from './MahasiswaModal';
import MahasiswaTable from './MahasiswaTable';
// import mahasiswaList from '../data/mahasiswaList.json';
import { useNavigate } from 'react-router-dom';
import { toastSuccess, toastError } from '../Utils/Helpers/ToastHelpers';
import { confirmDelete, confirmUpdate } from '../Utils/Helpers/SwalHelpers';
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "../Utils/Apis/MahasiswaApi";
import { getAllKelas } from "../Utils/Apis/KelasApi";
import { getAllMatkul } from "../Utils/Apis/MatkulApi"
import { useMahasiswa } from '../Utils/Hooks/useMahasiswa';
import { useStoreMahasiswa, useUpdateMahasiswa, useDeleteMahasiswa } from '../Utils/Hooks/useMahasiswa';
 // boundary error : 
 // 1. disebabkan karena bisa jadi struktur data salah pada saat fetch atau post data, 
 // 2. passing props child dan parent berbeda

function Mahasiswa() {
  // const { data: mahasiswa = [] } = useMahasiswa();
  const { mutate: store } = useStoreMahasiswa();
  const { mutate: update } = useUpdateMahasiswa();
  const { mutate: remove } = useDeleteMahasiswa();

  const [kelas, setKelas] = useState([]);
  const [mataKuliah, setMataKuliah] = useState([]);

    const [mahasiswa, setMahasiswa] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
            id: '',
            nim: '',
            nama: '',
            // prodi: '',
            // angkatan: ''
        });

        const navigate = useNavigate();
        

        useEffect(() => {
            setTimeout(() => fetchData(), 500);
          }, []);

        const fetchData = async () => {
            const [resKelas, resMahasiswa, resMataKuliah] = await Promise.all([
              getAllKelas(),
              getAllMahasiswa(),
              getAllMatkul(),
            ]);
            setKelas(resKelas.data);
            setMahasiswa(resMahasiswa.data);
            setMataKuliah(resMataKuliah.data);
        };  
          
        //   const fetchMahasiswa = async () => {
        //      getAllMahasiswa().then((res) => setMahasiswa(res.data));
        //   };
        

  //   const addMahasiswa = async (newData) => {
  //       await MockMhs.post("/mahasiswa", newData);
  //       fetchMahasiswa();
  //   };

  //   const updateMahasiswa = async (nim, newData) => {
  //     try {
  //       console.log('NIM yang dikirim:', nim, 'Tipe:', typeof nim);
  //       console.log('Data yang dikirim untuk update:', newData);
  //       const response = await MockMhs.put(`/mahasiswa/${String(nim)}`, newData);
  //       console.log('Respons dari PUT:', response.data);
  //       fetchMahasiswa();
  //       toastSuccess('Mahasiswa berhasil diupdate!');
  //     } catch (error) {
  //       console.error('Error updating mahasiswa:', error);
  //       toastError('Gagal mengupdate mahasiswa');
  //     }
  // };

    // const deleteMahasiswa =  async (nim) => {
    //   await MockMhs.delete(`/mahasiswa/${String(nim)}`);
    //   fetchMahasiswa();
    // };

    const openAddModal = () => {
        setForm({ nim: "", nama: "",  max_sks: 0});
        setIsModalOpen(true);
    };
    

   

    const handleEdit = (mhs) => {
        setForm({ id: mhs.id, nim: mhs.nim, nama: mhs.nama, max_sks: mhs.max_sks });
        setIsEdit(true);
        setIsModalOpen(true);
      };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

   

    const handleSubmit =  (e) => {
        e.preventDefault();
        if (!form.nim || !form.nama || !form.max_sks) {
          toastError("Semua Kolom Wajib di isi")
          return;
        }
      
        if (isEdit) {
          confirmUpdate(() => {
            if (form.nama.length < 3) {
              toastError('Nama harus terdiri dari minimal 3 huruf!');
              return false; // gagal
            }
        
            updateMahasiswa(form.id, form);
            toastSuccess('Mahasiswa berhasil diupdate!');
            return true; // sukses
          });
        } else {
          const exists = mahasiswa.find((m) => m.nim === form.nim);
          if (exists) {
            toastError("NIM sudah terdaftar")
            return;
          }
          const validIds = mahasiswa
            .map(mhs => parseInt(mhs.id))
            .filter(id => !isNaN(id));

          const newId = validIds.length
            ? (Math.max(...validIds) + 1).toString()
            : "1";

              
           const { id, ...newData } = form;
            newData.id = newId;  // Menambahkan ID baru sebagai string
              
            store(newData);
          toastSuccess('Mahasiswa berhasil ditambah!')
        }
      
        setForm({ nim: "", nama: "", max_sks: 0});
        setIsEdit(false);
        setIsModalOpen(false);
      }

      const handleDelete = async (id) => {
       
        confirmDelete(()=>{
          deleteMahasiswa(id);
          toastSuccess('Berhasil Hapus data')
        });

      }

      // logika ini digunakan dan dipassing di saat menampilkan komponen table
      const getTotalSks = (mhsId) => {
        return kelas
          .filter(k => k.mahasiswa_ids.includes(mhsId))
          .map(k => mataKuliah.find(mk => mk.id === k.mata_kuliah_id)?.sks || 0)
          .reduce((a, b) => a + b, 0);
      };

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
                getTotalSks={getTotalSks}  // passing props ke komponen table
                onDelete={handleDelete}
                onEdit={handleEdit}
                onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
            />
        </div>
    );
}

export default Mahasiswa;