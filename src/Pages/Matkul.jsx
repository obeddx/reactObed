import React, { useState, useEffect} from 'react';
import MatkulModal from './MatkulModal';
import MatkulTable from './MatkulTable';
// import MatkulList from '../data/MatkulList.json';
import { useNavigate } from 'react-router-dom';
import { toastSuccess, toastError } from '../Utils/Helpers/ToastHelpers';
import { confirmDelete, confirmUpdate } from '../Utils/Helpers/SwalHelpers';
import {
  getAllMatkul,
  storeMatkul,
  updateMatkul,
  deleteMatkul,
} from "../Utils/Apis/MatkulApi";
 // boundary error : 
 // 1. disebabkan karena bisa jadi struktur data salah pada saat fetch atau post data, 
 // 2. passing props child dan parent berbeda

function Matkul() {
    const [matkul, setMatkul] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form, setForm] = useState({
            id: '',
            name: '',
            sks: 0
            // angkatan: ''
        });

        const navigate = useNavigate();

        useEffect(() => {
            setTimeout(() => fetchMatkul(), 500);
          }, []);
          
          const fetchMatkul = async () => {
             getAllMatkul().then((res) => setMatkul(res.data));
          };
        



    const openAddModal = () => {
        setForm({ name: "", sks: 0});
        setIsModalOpen(true);
    };
    

   

    const handleEdit = (mtkl) => {
        setForm({ id: mtkl.id, name: mtkl.name, sks: mtkl.sks });
        setIsEdit(true);
        setIsModalOpen(true);
      };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.sks)  {
          toastError("Semua Kolom Wajib di isi")
          return;
        }
      
        if (isEdit) {
          confirmUpdate(() => {
            if (form.name.length < 3) {
              toastError('name harus terdiri dari minimal 3 huruf!');
              return false; // gagal
            }
        
            updateMatkul(form.id, form);
            toastSuccess('Matkul berhasil diupdate!');
            return true; // sukses
          });
        } else {
          const validIds = matkul
            .map(mtkl => parseInt(mtkl.id))
            .filter(id => !isNaN(id));

          const newId = validIds.length
            ? (Math.max(...validIds) + 1).toString()
            : "1";

              
           const { id, ...newData } = form;
            newData.id = newId; 
          
            toastSuccess('Matkul berhasil ditambah!')
          storeMatkul(newData);
          
        }
      
        setForm({name: ""});
        setIsEdit(false);
        setIsModalOpen(false);
      }

      const handleDelete = async (id) => {
       
        confirmDelete(()=>{
          deleteMatkul(id);
          toastSuccess('Berhasil Hapus data')
        });

      }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Data Matkul</h1>
            <button
                onClick={openAddModal}
                className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
                Tambah Matkul
            </button>
            <MatkulModal
                isModalOpen={isModalOpen}
                isEdit={isEdit}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                form={form}
                handleChange={handleChange}
            />
            <MatkulTable
                matkul={matkul}
               
                onDelete={handleDelete}
                onEdit={handleEdit}
                onDetail={(id) => navigate(`/admin/matkul/${id}`)}
            />
        </div>
    );
}

export default Matkul;