<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PanelUserSeeder extends Seeder
{
    public function run(): void
    {
        $panels = [
            ['Rowela A. Chiu, DPA', 'r.chiu@usls.edu.ph'],
            ['Lilibeth F. Sedonio, PhD', 'l.sedonio@usls.edu.ph'],
            ['Ronnie O. Lizada, PhD', 'r.lizada@usls.edu.ph'],
            ['Ariel G. Bravo, PhD', 'a.bravo@usls.edu.ph'],
            ['Gloria De Oca', 'g.deoca@usls.edu.ph'],
            ['Geraldine Y. Abella, PhD', 'g.abella@usls.edu.ph'],
            ['Eva Grace B. Chavez, PhD', 'e.chavez@usls.edu.ph'],
            ['Noreza Causing, PhD', 'n.causing@usls.edu.ph'],
            ['Leah May Santiago, PhD', 'l.santiago@usls.edu.ph'],
            ['Ariadne Socorro Cordero, PhD', 'a.cordero@usls.edu.ph'],
            ['Michael Baylosis, PhD', 'm.baylosis@usls.edu.ph'],
            ['Bea Emma Bachinela', 'b.bachinela@usls.edu.ph'],
            ['Raymund Malapitan', 'raymund.malapitan@usls.edu.ph'],
            ['Rowena Ginafe Graciano', 'r.graciano@usls.edu.ph'],
            ['Loreto B. Damasco Jr., PhD', 'l.damasco@usls.edu.ph'],
            ['Jim Jonathan C. Decripito, PhD', 'j.decripito@usls.edu.ph'],
            ['Rics L. Rojas, MIT', 'rhix.rojas@usls.edu.ph'],
            ['May J. Jallorina, MIT', 'm.jallorina@usls.edu.ph'],
            ['Ma. Carlvina F. Cruz', 'c.cruz@usls.edu.ph'],
            ['Hazel P. Atilano', 'h.atilano@usls.edu.ph'],
            ['Cynthia S. Dy', 'c.dy@usls.edu.ph'],
            ['Zoena G. Gomelao', 'z.gomelao@usls.edu.ph'],
            ['Mark Xavier A. Guanzon', 'm.guanzon@usls.edu.ph'],
            ['Sarah Teherese P. Jardenil', 's.jardenil@usls.edu.ph'],
            ['Pilarica C. Jison', 'p.jison@usls.edu.ph'],
            ['June Carl S. Seran', 'jc.seran@usls.edu.ph'],
            ['Ricver P. Ureta', 'r.ureta@usls.edu.ph'],
            ['Maria J-Len J. Mesias, PhD', 'm.jonco@usls.edu.ph'],
            ['Christer John Uy, MEnE', 'cj.uy@usls.edu.ph'],
            ['Jeffrey Fuentes, MIT', 'j.fuentes@usls.edu.ph'],
            ['Mirose Francisco, ME', 'mr.francisco@usls.edu.ph'],
            ['Marie Fe Novia, MECE', 'm.novia@usls.edu.ph'],
            ['Arvee Olvido, MEnE', 'a.olvido@usls.edu.ph'],
            ['Felix Querubin, MEnE', 'f.querubin@usls.edu.ph'],
            ['Toni-An B. Lachica, RN, MAN, PhD', 't.lachica@usls.edu.ph'],
            ['Ivy G. Edemni, RN, MN', 'i.edemni@usls.edu.ph'],
            ['T. Parreño, RN, MAN', 't.parreno@usls.edu.ph'],
            ['Mary Beth P. Diva, RN, MN, PhD', 'm.diva@usls.edu.ph'],
            ['Jocelyn May Flor A. Cadena, RN, LPT, MN, PhD', 'j.cadena@usls.edu.ph'],
            ['Leslie E. Young, RN, MN, PhD', 'l.young@usls.edu.ph'],
            ['John Michael A. Montelibano, PhD', 'j.montelibano@usls.edu.ph'],
            ['Leane Adelle L. Linaugo, PhD', 'l.linaugo@usls.edu.ph'],
            ['Ostein Earn G. Gemotea, PhD', 'o.gemotea@usls.edu.ph'],
            ['Ralph A. Sarmiento, JD', 'r.sarmiento@usls.edu.ph'],
            ['Rhodora P. Lo, JD', 'r.lo@usls.edu.ph'],
            ['Mariel B. Panganiban', 'm.panganiban@usls.edu.ph'],
            ['Radela Yvonne R. Cortes, MD', 'r.cortes@usls.edu.ph'],
            ['Frederic Ivan L. Ting, MD', 'f.ting@usls.edu.ph'],
            ['Rea A. Laroza, MD', 'r.laroza@usls.edu.ph'],
            ['Ma. Cristina I. Eusebio, MD', 'c.eusebio@usls.edu.ph'],
        ];

        foreach ($panels as [$name, $email]) {
            User::updateOrCreate(
                ['email' => $email],
                [
                    'name' => $name,
                    'user_type' => 'tpl',
                    'email_verified_at' => now(),
                    'password' => Hash::make('password123'),
                    'remember_token' => Str::random(10),
                ]
            );
        }
    }
}
