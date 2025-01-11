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

                <div class="navbar-end w-full">
                    <div class="breadcrumbs">
                    <ul>
   
    
                    </ul>
                    </div>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-5">
                <div className="mx-auto sm:px-6 lg:px-8">
                <div class="stats">
  <div class="stat">
    <div class="stat-figure text-base-content size-8">
      <span class="icon-[tabler--world] size-8"></span>
    </div>
    <div class="stat-title">Website Traffic</div>
    <div class="stat-value">32K</div>
    <div class="stat-desc">5% ↗︎ than last week</div>
  </div>

  <div class="stat">
    <div class="stat-figure text-base-content size-8">
      <span class="icon-[tabler--users-group] size-8"></span>
    </div>
    <div class="stat-title">New Signups</div>
    <div class="stat-value">1.2K</div>
    <div class="stat-desc">12% increase this month</div>
  </div>

  <div class="stat">
    <div class="stat-figure size-12">
      <div class="avatar">
        <div class="size-12 rounded-full">
          <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png" alt="User Avatar"/>
        </div>
      </div>
    </div>
    <div class="stat-value text-success">95%</div>
    <div class="stat-title">Customer Retention</div>
    <div class="stat-desc">Steady over last quarter</div>
  </div>
</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
