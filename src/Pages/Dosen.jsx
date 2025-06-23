import React, { useState, useEffect} from 'react';
import DosenModal from './DosenModal';
import DosenTable from './DosenTable';
import { useNavigate } from 'react-router-dom';
import { toastSuccess, toastError } from '../Utils/Helpers/ToastHelpers';
import { confirmDelete, confirmUpdate } from '../Utils/Helpers/SwalHelpers';
import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "../Utils/Apis/DosenApi";
 // boundary error : 
 // 1. disebabkan karena bisa jadi struktur data salah pada saat fetch atau post data, 
 // 2. passing props child dan parent berbeda

function Dosen() {
    const [dosen, setDosen] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
            id: '',
            nama: '',
            max_sks: 0
            
        });

        const navigate = useNavigate();

        useEffect(() => {
            setTimeout(() => fetchDosen(), 500);
          }, []);
          
          const fetchDosen = async () => {
             getAllDosen().then((res) => setDosen(res.data));
          };

    const openAddModal = () => {
        setForm({ nama: "", max_sks: 0});
        setIsModalOpen(true);
    };

    const handleEdit = (dsn) => {
        setForm({ id: dsn.id, nama: dsn.nama, max_sks: dsn.max_sks });
        setIsEdit(true);
        setIsModalOpen(true);
      };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nama || !form.max_sks)  {
          toastError("Semua Kolom Wajib di isi")
          return;
        }
      
        if (isEdit) {
          confirmUpdate(() => {
            if (form.nama.length < 3) {
              toastError('Nama harus terdiri dari minimal 3 huruf!');
              return false; // gagal
            }
        
            updateDosen(form.id, form);
            toastSuccess('Dosen berhasil diupdate!');
            return true; // sukses
          });
        } else {
          const validIds = dosen
            .map(dsn => parseInt(dsn.id))
            .filter(id => !isNaN(id));

          const newId = validIds.length
            ? (Math.max(...validIds) + 1).toString()
            : "1";

              
           const { id, ...newData } = form;
            newData.id = newId; 
          
            toastSuccess('Dosen berhasil ditambah!')
          storeDosen(newData);
          
        }
      
        setForm({nama: ""});
        setIsEdit(false);
        setIsModalOpen(false);
      }

      const handleDelete = async (id) => {
       
        confirmDelete(()=>{
          deleteDosen(id);
          toastSuccess('Berhasil Hapus data')
        });

      }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Dosen</h1>
            <button
                onClick={openAddModal}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Tambah Dosen
            </button>
            <DosenModal
                isModalOpen={isModalOpen}
                isEdit={isEdit}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                form={form}
                handleChange={handleChange}
            />
            <DosenTable
                dosen={dosen}
               
                onDelete={handleDelete}
                onEdit={handleEdit}
                onDetail={(id) => navigate(`/admin/dosen/${id}`)}
            />
        </div>
    );
}

export default Dosen;