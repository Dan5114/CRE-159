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

const TaggingUploader = ({ className = '', research, file_id }) => {
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
    'document_file' : '',
    'file_id' : file_id,
    'research_id' : research.id
  });

  const confirmturnitinScore = () => {
      setConfirmingTurnitinScore(true);
  };

  const turnitinScore = (e) => {
      e.preventDefault();

      post(route('cre.tagged.uploader'), {
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
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={confirmturnitinScore} width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
      
                  <Modal show={confirmingturnitinScore} onClose={closeModal}>
                      <form onSubmit={turnitinScore} className="p-6">
                         
                      <div className="mt-4">
                            <label htmlFor="testName" className="block text-sm font-medium text-gray-700">
                            Name of Uploader
                            </label>
                            <input
                            type="text"
                            onChange={(e) => setData('uploader', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            placeholder=""
                            />
                        </div>
      
                          <div className="mt-6 flex justify-end">
                              <SecondaryButton onClick={closeModal}>
                                  Cancel
                              </SecondaryButton>
      
                              <DangerButton className="ms-3" disabled={processing}>
                                  Save Changes
                              </DangerButton>
                          </div>
                      </form>
                  </Modal>
              </section>
    </>
  );
};

export default TaggingUploader;
