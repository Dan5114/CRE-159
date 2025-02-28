import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 

export default function Dashboard() {

    const notyf = new Notyf();
    

    return (
        <AuthenticatedLayout
            header={
              <div class='flex text-white'>
              <h2 className="text-xl text-white font-extrabold leading-none tracking-tight">
                 Dashboard
               </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-2">
            <div class="max-w-7xl mx-auto py-2 px-2 sm:px-6 lg:px-8">
   
              </div>
            </div>
        </AuthenticatedLayout>
    );
}
