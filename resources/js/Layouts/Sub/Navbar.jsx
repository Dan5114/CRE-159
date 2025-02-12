import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import _ from 'lodash'

const Navbar = () => {
    const user = usePage().props.auth.user;

    const str = user.user_type;
    const UserTypeupperStr = _.toUpper(str);

    console.log(user);
  return (
    <>
    <div class="">
<nav class="navbar bg-base-100">

    <div class="navbar-start">
        <div className="flex items-center">
            <img src="/img/logo.svg" className="rounded-md w-28 text-gray-500 mr-4" alt="logo" />
            <a class="link text-base-content/90 link-neutral text-xl font-semibold no-underline" href="#">CRE Research</a>
        </div>    
    </div>

    <div class="navbar-center max-sm:hidden">
      <ul class="menu menu-horizontal font-extrabold gap-2 p-0 text-base rtl:ml-20">
      <li><Link  href={route('dashboard')}
                                    active={route().current('dashboard')}>Dashboard</Link></li>
      
      
       {
        (user.user_type == "cre") ?
        <li class="dropdown relative inline-flex [--auto-close:inside] [--offset:9] [--placement:bottom-end] max-sm:[--placement:bottom]">
        <button id="dropdown-end" type="button" class="dropdown-toggle dropdown-open:bg-base-content/10 dropdown-open:text-base-content max-sm:px-2" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
          CRE
          <span class="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
        </button>
        <ul class="dropdown-menu dropdown-open:opacity-100 hidden" role="menu" aria-orientation="vertical" aria-labelledby="nested-dropdown"> 
          <li><Link href={route('researcher.index')} class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="gray" d="M8 13h8v-2H8zm0 3h8v-2H8zm0 3h5v-2H8zm-2 3q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13V4H6v16h12V9zM6 4v5zv16z"/></svg>My Research List</Link></li>
        </ul>
      </li>
      :
        (user.user_type == "tpl") ?
        <li class="dropdown relative inline-flex [--auto-close:inside] [--offset:9] [--placement:bottom-end] max-sm:[--placement:bottom]">
        <button id="dropdown-end" type="button" class="dropdown-toggle dropdown-open:bg-base-content/10 dropdown-open:text-base-content max-sm:px-2" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
          TPL
          <span class="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
        </button>
        <ul class="dropdown-menu dropdown-open:opacity-100 hidden" role="menu" aria-orientation="vertical" aria-labelledby="nested-dropdown"> 
          <li><Link href={route('researcher.index')} class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="gray" d="M8 13h8v-2H8zm0 3h8v-2H8zm0 3h5v-2H8zm-2 3q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13V4H6v16h12V9zM6 4v5zv16z"/></svg>My Research List</Link></li>
        </ul>
      </li>
        :
        <li class="dropdown relative inline-flex [--auto-close:inside] [--offset:9] [--placement:bottom-end] max-sm:[--placement:bottom]">
        <button id="dropdown-end" type="button" class="dropdown-toggle dropdown-open:bg-base-content/10 dropdown-open:text-base-content max-sm:px-2" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
          Researcher
          <span class="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
        </button>
        <ul class="dropdown-menu dropdown-open:opacity-100 hidden" role="menu" aria-orientation="vertical" aria-labelledby="nested-dropdown">
        <li><Link href={route('researcher.create')} class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="gray" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"/></svg>Create Application</Link></li>
          <li><Link href={route('researcher.index')} class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="gray" d="M8 13h8v-2H8zm0 3h8v-2H8zm0 3h5v-2H8zm-2 3q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13V4H6v16h12V9zM6 4v5zv16z"/></svg>My Research List</Link></li>
        </ul>
      </li> 
       }

        <li class="dropdown relative inline-flex [--auto-close:inside] [--offset:9] [--placement:bottom-end] max-sm:[--placement:bottom]">
          <button id="dropdown-end" type="button" class="dropdown-toggle dropdown-open:bg-base-content/10 dropdown-open:text-base-content max-sm:px-2" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
            Reports
            <span class="icon-[tabler--chevron-down] dropdown-open:rotate-180 size-4"></span>
          </button>
          <ul class="dropdown-menu dropdown-open:opacity-100 hidden" role="menu" aria-orientation="vertical" aria-labelledby="nested-dropdown">
            <li><Link href={route('researcher.create')} class="dropdown-item"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="gray" d="M8 13h8v-2H8zm0 3h8v-2H8zm0 3h5v-2H8zm-2 3q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v12q0 .825-.587 1.413T18 22zm7-13V4H6v16h12V9zM6 4v5zv16z"/></svg>Document Submission</Link></li>
           
            
          </ul>
        </li>
      </ul>


    </div>

    


  <div class="navbar-end flex items-center gap-4">

  <div className="flex items-center space-x-4">
  <div className="flex justify-between">
  <div class="text-sm">
      <span class="text-black-400 text-sm font-mono">Currently Viewing: </span>
      <span className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
              {UserTypeupperStr}
            </span>
    </div>
            
          </div>
         
        </div>

    <div class="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
      <button id="dropdown-scrollable" type="button" class="dropdown-toggle flex items-center" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
        <div class="avatar">
          <div class="size-9.5 rounded-full">
            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar 1" />
          </div>
        </div>
      </button>
      <ul class="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-avatar">
        <li class="dropdown-header gap-2">
          <div class="avatar">
            <div class="w-10 rounded-full">
              <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar" />
            </div>
          </div>
          <div>
            <h6 class="text-base-content/90 text-base font-semibold"> {user.name}</h6>
            <small class="text-base-content/50"> {user.email}</small>
          </div>
        </li>
        <li>
          <Link class="dropdown-item" href={route('profile.edit')}>
            <span class="icon-[tabler--user]"></span>
            My Profile
          </Link>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            <span class="icon-[tabler--settings]"></span>
            Settings
          </a>
        </li>
       
        <li class="dropdown-footer gap-2">
          <Link class="btn btn-error btn-soft btn-block"  method="post"
                                href={route('logout')}
                                as="button">
            <span class="icon-[tabler--logout]"></span>
            Sign out
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</div>
    </>
  )
}

export default Navbar