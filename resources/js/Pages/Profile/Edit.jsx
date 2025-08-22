import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={null}
        >
            <Head title="Profile" />

            {/* Custom CSS for button alignment */}
            <style jsx>{`
                .form-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    min-height: 500px;
                    position: relative;
                }
                .form-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .button-container {
                    margin-top: auto !important;
                    padding-top: 1.5rem;
                    position: relative;
                    bottom: 0;
                }
                .equal-height {
                    display: grid;
                    grid-template-rows: 1fr;
                    align-items: stretch;
                }
                .form-wrapper {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    position: relative;
                    padding-bottom: 80px;
                }
                .save-button-wrapper {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 1.5rem 0 0 0;
                    background: white;
                }
            `}</style>

            {/* Dark Green Profile Title Bar */}
            <div className="bg-green-800 py-4 px-6">
                <h1 className="text-2xl font-bold text-white">Profile</h1>
            </div>

            {/* Main Content */}
            <div className="py-6">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"> {/* Responsive padding */}
                    {/* Top Row - Two Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8 equal-height"> {/* Responsive gap and margin */}
                        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 form-container"> {/* Responsive padding */}
                            <div className="form-wrapper">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                />
                            </div>
                        </div>

                        <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8 form-container"> {/* Responsive padding */}
                            <div className="form-wrapper">
                                <UpdatePasswordForm />
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row - Full Width */}
                    <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8"> {/* Responsive padding */}
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
