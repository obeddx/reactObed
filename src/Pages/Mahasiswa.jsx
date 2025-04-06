import { Link } from 'react-router-dom';
import React, { useState } from "react";
import Button from "./Admin/Components/button";
import Modal from "./Admin/Components/modal";
import ModalEdit from "./Admin/Components/modalEdit";

function Mahasiswa() {
  const [mahasiswaList, setMahasiswaList] = useState([
    { NIM: "A11.2022.13962", nama: "Obed Danny", status: "true" },
    { NIM: "A11.2022.13964", nama: "Jane Doe", status: "true" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMahasiswa(null);
  };

  const openEditModal = (mahasiswa) => {
    setSelectedMahasiswa(mahasiswa);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedMahasiswa(null);
  };

  const handleAddMahasiswa = (newMahasiswa) => {
    const isDuplicate = mahasiswaList.some(mhs => mhs.NIM === newMahasiswa.NIM);
    if (isDuplicate) {
      alert("NIM sudah terdaftar! Harap gunakan NIM yang unik.");
      return;
    }
    setMahasiswaList([...mahasiswaList, newMahasiswa]);
    closeModal();
  };

  const handleUpdateMahasiswa = (updatedMahasiswa) => {

      // Cek apakah NIM yang diedit sudah ada pada mahasiswa lain
    const isDuplicate = mahasiswaList.some(mhs => mhs.NIM === updatedMahasiswa.NIM && mhs !== selectedMahasiswa);
    if (isDuplicate) {
      alert("NIM sudah digunakan oleh mahasiswa lain!");
      return;
    }
 
    setMahasiswaList(mahasiswaList.map(mhs => 
      mhs.NIM === updatedMahasiswa.NIM ? updatedMahasiswa : mhs
    ));
  
    closeEditModal();
  
  };
  

  const handleDelete = (NIM) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus mahasiswa ini?")) {
      setMahasiswaList(mahasiswaList.filter(mhs => mhs.NIM !== NIM));
    }
  };

  return (
    <>
      <main className="flex-1 p-6 overflow-x-auto">
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-end mb-4">
            <Button
              onClick={openModal}
              tulisanButton="+ Tambah Mahasiswa"
              classname="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            />
          </div>
          <table className="w-full text-sm text-gray-700 mt-4">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4">NIM</th>
                <th className="py-2 px-4">Nama</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {mahasiswaList.map((mhs, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="py-2 px-4">{mhs.NIM}</td>
                  <td className="py-2 px-4">{mhs.nama}</td>
                  <td className="py-2 px-4">{mhs.status}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 cursor-pointer"
                      onClick={() => openEditModal(mhs)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2 cursor-pointer"
                      onClick={() => handleDelete(mhs.NIM)}
                    >
                      Hapus
                    </button>
                    <button className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 ml-2">
                      <Link to={`/admin/mahasiswa/${mhs.NIM}`}>Detail</Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {isModalOpen && <Modal closeModal={closeModal} handleAddMahasiswa={handleAddMahasiswa} />}
      {isEditModalOpen && <ModalEdit closeModal={closeEditModal} mahasiswa={selectedMahasiswa} handleUpdateMahasiswa={handleUpdateMahasiswa} />}
    </>
  );
}

export default Mahasiswa;
