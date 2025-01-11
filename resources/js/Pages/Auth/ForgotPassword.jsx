import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div>
            <div className="flex items-center">
<img src="/img/logo.svg" className="rounded-md w-38 text-gray-500 mr-4" alt="logo" />

                               
                            </div>
                            <h4 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">CRE Reasearch</h4>
                </div>

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                {/* <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" /> */}

<div class="">
  <label class="input-group-filled">
    <span class="input-group-text">
      <span class="icon-[tabler--mail] text-base-content/80 size-6"></span>
    </span>
    <div class="form-control grow">
      <input id="email"
                    type="email"
                    name="email"
                    value={data.email}
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="" class={"input input-filled peer" + (errors.email ? "input input-filled is-invalid peer" : "")} />
      <span class="input-filled-label text-sm">Email Address</span>
    </div>
  </label>
  <span class="input-filled-focused"></span>
  <InputError message={errors.email} className="mt-2" />
</div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
