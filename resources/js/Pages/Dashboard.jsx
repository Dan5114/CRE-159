import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; 
import Cre from './Dashboards/Cre';
import Researcher from './Dashboards/Researcher';
import Tpl from './Dashboards/Tpl';

export default function Dashboard(props) {
    const user = usePage().props.auth.user;

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
                <div class="max-w-12xl mx-auto py-2 px-2 sm:px-6 lg:px-8">
                    {
                        user.user_type == "cre" ?
                        <>
                        <Cre />
                        </>
                        :
                        user.user_type == "tpl" ?
                       <>
                       <Tpl />
                       </>
                       :
                       <>
                       <Researcher requirements={props.requirements} />
                       </>
                    }
              </div>
            </div>
        </AuthenticatedLayout>
    );
}
