import React from 'react'
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';


export default function ProgressExtensionModal({className = '', id}) {
const notyf = new Notyf();
const [confirmingModal, setConfirmingModal] = useState(false);

const {
    data,
    setData,
    patch,
    processing,
    reset,
    errors,
    clearErrors,
} = useForm({
  'date_extension' : ''
});

const progressExtension = (e) => {
    e.preventDefault();

    patch(route('progress.extension.date', id), {
      preserveScroll: true,
      onSuccess: (page) => {
        closeModal();
        notyf.success(page.props.flash.message);
      },
  });
};

const confirmModalDisplay = () => {
    setConfirmingModal(true);
  };

  const closeModal = () => {
    setConfirmingModal(false);
    clearErrors();
    reset();
  };


  return (
    <section className={`space-y-6 ${className}`}>
                    
                      <span className='text-xs flex cursor-pointer' onClick={confirmModalDisplay}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="gray" d="m13.372 11.013l.614.614l-6.04 6.04h-.613v-.614zM15.771 7a.67.67 0 0 0-.467.193l-1.22 1.22l2.5 2.5l1.22-1.22a.664.664 0 0 0 0-.94l-1.56-1.56A.66.66 0 0 0 15.772 7m-2.4 2.127L6 16.5V19h2.5l7.372-7.373Z"/><path fill="gray" d="M19 1h-2v2H7V1H5v2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1zM4 21V5h16v16Z"/></svg>&nbsp;Set Extension</span>
          
                      <Modal show={confirmingModal} onClose={closeModal}>
                      <form onSubmit={progressExtension} className="p-6">
                          <div className="mt-4">
    <label htmlFor="testName" className="block text-sm font-medium text-gray-700">
    Extension Date
    </label>
    <input
      type="date"
      onChange={(e) => setData('date_extension', e.target.value)}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
      placeholder=""
    />
  </div>

   <div className="mt-6 flex justify-end">
                                <SecondaryButton onClick={closeModal}>
                                    Cancel
                                </SecondaryButton>
        
                                <PrimaryButton className="ms-3" disabled={processing}>
                                    Save Changes
                                </PrimaryButton>
                            </div>
  </form>
    </Modal>
    </section>
  )
}
