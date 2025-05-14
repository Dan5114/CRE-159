import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const TurnitinModal = ({ className = '', file_id, research }) => {
  const notyf = new Notyf();
  const [confirmingturnitinScore, setConfirmingTurnitinScore] = useState(false);
 
  const {
      data,
      setData,
      post,
      processing,
      reset,
      errors,
      clearErrors,
  } = useForm({
    'score' : '',
    'status' : '',
    'file_id' : file_id,
    'document_file' : '',
    'research_id' : research.id
  });

  const confirmturnitinScore = () => {
      setConfirmingTurnitinScore(true);
  };

  const turnitinScore = (e) => {
      e.preventDefault();

      post(route('turnitin.report.upload'), {
        preserveScroll: true,
        onSuccess: (page) => {
          closeModal();
          notyf.success(page.props.flash.message);
        },
    });
  };

  const closeModal = () => {
      setConfirmingTurnitinScore(false);
      reset();
  };

  return (
    <>
      <section className={`space-y-6 ${className}`}>
                
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={confirmturnitinScore} width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="gray" stroke-linejoin="round" stroke-width="2"><path stroke-linecap="round" d="M7 21a2 2 0 0 1-2-2V3h9l5 5v11a2 2 0 0 1-2 2zm5-8v4m-2-2h4"/><path d="M13 3v6h6"/></g></svg>
      
                  <Modal show={confirmingturnitinScore} onClose={closeModal}>
                      <form onSubmit={turnitinScore} className="p-6">
                          <div className="mt-4">
    <label htmlFor="testName" className="block text-sm font-medium text-gray-700">
     Score
    </label>
    <input
      type="text"
      onChange={(e) => setData('score', e.target.value)}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
      placeholder=""
    />
  </div>

  <div className="mt-4">
    <label htmlFor="testStatus" className="block text-sm font-medium text-gray-700">
      Status
    </label>
    <select
      onChange={(e) => setData('status', e.target.value)}
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
    >
      <option value="">Please choose</option>
      <option value="pass">Pass</option>
      <option value="fail">Fail</option>
    </select>
  </div>

  {/* <div className="mt-4">
    <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">
      Result File
    </label>
    <input
      type="file"
      onChange={(e) => setData('document_file', e.target.files[0])}
      className="mt-1 block w-full text-sm text-gray-500"
    />
  </div> */}
      
                          <div className="mt-6 flex justify-end">
                              <SecondaryButton onClick={closeModal}>
                                  Cancel
                              </SecondaryButton>
      
                              <DangerButton className="ms-3" disabled={processing}>
                                  Submit Score
                              </DangerButton>
                          </div>
                      </form>
                  </Modal>
              </section>
    </>
  );
};

export default TurnitinModal;
