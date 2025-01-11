import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className='mb-6'>
            <div className="flex items-center">
<img src="/img/logo.svg" className="rounded w-30  mr-4" alt="logo" />

                               
                            </div>
                                    
          {/* <h4 class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">CRE Reasearch</h4> */}
                </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
               <div class="flex">
               <span class="icon-[tabler--mail] text-base-content/80 size-6"></span> &nbsp;<InputLabel htmlFor="email" value="Faculty Email" />
               </div>

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2 text-xs" />
                </div>

{/* <div class="">
  <label class="input-group-filled">
    <span class="input-group-text">
      <span class="icon-[tabler--user] text-base-content/80 size-6"></span>
    </span>
    <div class="form-control grow">
      <input  id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="" class={"input input-filled peer" + (errors.email ? "input input-filled is-invalid peer" : "")} />
      <span class="input-filled-label text-sm">Email</span>
    </div>
  </label>
  <span class="input-filled-focused"></span>
  <InputError message={errors.email} className="mt-2" />
</div> */}

{/* <div class="mt-4">
  <label class="input-group-filled">
    <span class="input-group-text">
      <span class="icon-[tabler--lock] text-base-content/80 size-6"></span>
    </span>
    <div class="form-control grow">
      <input  id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="" class={"input input-filled peer" + (errors.password ? "input input-filled is-invalid peer" : "")} />
      <span class="input-filled-label text-sm">Password</span>
    </div>
  </label>
  <span class="input-filled-focused"></span>
  <InputError message={errors.password} className="mt-2" />
</div> */}

                <div className="mt-4">

                <div class="flex">
               <span class="icon-[tabler--lock] text-base-content/80 size-6"></span> &nbsp;<InputLabel htmlFor="password" value="Password" />
               </div>
                    

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2 text-xs" />
                </div>

                <div className="mt-4 block">
                    {/* <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label> */}
                </div>

                <div className="mt-4 flex items-center justify-end">
                   

                    <PrimaryButton className="ms-4 w-auto"  disabled={processing}>
                    <span class="icon-[tabler--login]" ></span> &nbsp;Log in
                    </PrimaryButton>
                </div>

                <div class="flex flex-col w-full lg:flex-row mt-3">
                <div class="grid flex-grow  place-items-center">  
                {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            
                            <span class="text-neutral">Forgot password?</span>
                        </Link>
                    )}
                </div>
                <div class="divider lg:divider-horizontal">or</div> 
                <div class="grid flex-grow  place-items-center"> 
                     <Link
                        href={route('register')}
                        className="rounded-md text-sm text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        
                        <span class="text-[#0000FF]">Register Account?</span>
                    </Link>
                    </div>
                </div>

            </form>

         
        </GuestLayout>
    );
}
