import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={`${className} flex flex-col h-full`}>
            <header className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    Profile Information
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="flex-1 flex flex-col space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" className="text-sm font-medium text-gray-700" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full border-gray-300 focus:border-green-600 focus:ring-green-600 rounded-md shadow-sm"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                        placeholder="Enter your full name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-sm font-medium text-gray-700" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full border-gray-300 focus:border-green-600 focus:ring-green-600 rounded-md shadow-sm"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="Enter your email address"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="save-button-wrapper">
                    <PrimaryButton 
                        disabled={processing}
                        className="px-6 py-2 bg-green-800 hover:bg-green-900 focus:ring-green-700"
                    >
                        {processing ? 'Saving...' : 'SAVE'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 transform translate-y-2"
                        enterTo="opacity-100 transform translate-y-0"
                        leave="transition ease-in-out duration-300"
                        leaveFrom="opacity-100 transform translate-y-0"
                        leaveTo="opacity-0 transform translate-y-2"
                    >
                        <div className="mt-3 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md">
                            Profile updated successfully!
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
