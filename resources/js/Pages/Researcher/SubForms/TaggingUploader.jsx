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
                
                  <svg xmlns="http://www.w3.org/2000/svg" onClick={confirmturnitinScore} width="22.5" height="18" viewBox="0 0 640 512"><path fill="gray" d="m630.6 364.9l-90.3-90.2c-12-12-28.3-18.7-45.3-18.7h-79.3c-17.7 0-32 14.3-32 32v79.2c0 17 6.7 33.2 18.7 45.2l90.3 90.2c12.5 12.5 32.8 12.5 45.3 0l92.5-92.5c12.6-12.5 12.6-32.7.1-45.2m-182.8-21c-13.3 0-24-10.7-24-24s10.7-24 24-24s24 10.7 24 24c0 13.2-10.7 24-24 24m-223.8-88c70.7 0 128-57.3 128-128C352 57.3 294.7 0 224 0S96 57.3 96 128c0 70.6 57.3 127.9 128 127.9m127.8 111.2V294c-12.2-3.6-24.9-6.2-38.2-6.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 287.9 0 348.1 0 422.3v41.6c0 26.5 21.5 48 48 48h352c15.5 0 29.1-7.5 37.9-18.9l-58-58c-18.1-18.1-28.1-42.2-28.1-67.9"/></svg>
      
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
