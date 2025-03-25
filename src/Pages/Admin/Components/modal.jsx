import React from "react";
import Button from "./button";
import Input from "./input";

const Modal = ({ closeModal }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logika untuk submit form bisa ditambahkan di sini
    alert('Mahasiswa berhasil ditambah!');
    closeModal(); // Tutup modal setelah submit
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tambah Mahasiswa</h2>
          <Button
            onClick={closeModal}
            tulisanButton="×"
            classname="text-gray-600 hover:text-gray-800"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* <input
              className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
              placeholder="NIM"
              required
            /> */}
            <Input
              classname="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
              placeholder="NIM"
            />
          </div>
          <div className="mb-4">
          <Input
              classname="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
              placeholder="nama"
            />
          </div>
          <div className="mb-4">
          <Input
              classname="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300"
              placeholder="jurusan"
            />
          </div>
          <div className="flex justify-end">
            {/* <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded mr-2"
            >
             
              Batal
            </button> */}
            <Button
              type="button"
              onClick={closeModal}
              classname="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded mr-2"
              tulisanButton="Batal"
            
            />
             <Button
              type="submit"
              classname="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              tulisanButton="Simpan"

            />
           
            {/* <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Simpan
            </button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;