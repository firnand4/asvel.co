<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeamMember;
use App\Models\Service;
use App\Models\BlogPost;
use App\Models\TechStack;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call(AdminUserSeeder::class);

        // ── Team Members ─────────────────────────────────────
        $team = [
            ['name'=>'Ahmad Rasyid','role'=>'Founder & CEO','expertise'=>'Full-Stack Engineering, System Architecture','bio'=>'10+ years building enterprise software. Led engineering teams at multiple tech startups.','skills'=>['Laravel','React','System Design','AWS'],'emoji'=>'👨‍💻','linkedin_url'=>'#','order'=>1],
            ['name'=>'Rizky Akbar','role'=>'Head of AI & Data','expertise'=>'Machine Learning, Computer Vision, NLP','bio'=>'PhD candidate in Computer Science. Expert in deep learning and production ML systems.','skills'=>['Python','PyTorch','YOLOv8','LLMs'],'emoji'=>'🧠','linkedin_url'=>'#','order'=>2],
            ['name'=>'Dewi Kartika','role'=>'Lead UI/UX Designer','expertise'=>'Product Design, Design Systems, User Research','bio'=>'Crafts seamless digital experiences for complex systems. Formerly at top design agencies.','skills'=>['Figma','Design Systems','Prototyping'],'emoji'=>'🎨','linkedin_url'=>'#','order'=>3],
            ['name'=>'Fajar Nugroho','role'=>'Mobile Lead','expertise'=>'iOS, Android, Cross-Platform Development','bio'=>'Published 20+ apps on App Store and Play Store with millions of combined downloads.','skills'=>['React Native','Flutter','Swift','Kotlin'],'emoji'=>'📱','linkedin_url'=>'#','order'=>4],
        ];
        foreach ($team as $t) TeamMember::create($t);

        // ── Services ─────────────────────────────────────────
        $services = [
            ['icon'=>'🌐','title'=>'Pembuatan Website','description'=>'Website dan aplikasi web yang cepat, aman, dan mudah dikembangkan.','benefits'=>['Cepat diakses','Ramah SEO','Tampil rapi di HP'],'tech'=>['Laravel','React','Vue.js','Node.js'],'color'=>'#6c63ff','order'=>1],
            ['icon'=>'📱','title'=>'Aplikasi Mobile','description'=>'Aplikasi Android dan iOS yang nyaman dipakai pelanggan maupun tim internal.','benefits'=>['Android & iOS','Bisa dipakai offline','Notifikasi push'],'tech'=>['React Native','Flutter','Swift','Kotlin'],'color'=>'#00d4ff','order'=>2],
            ['icon'=>'🤖','title'=>'AI & Computer Vision','description'=>'Sistem kamera pintar yang mengenali, menghitung, dan memantau objek secara otomatis.','benefits'=>['Deteksi objek real-time','Pelatihan model khusus','Integrasi ke sistem Anda'],'tech'=>['Python','PyTorch','TensorFlow','OpenCV','YOLOv8'],'color'=>'#c084fc','order'=>3],
            ['icon'=>'📊','title'=>'Data & Analitik','description'=>'Mengolah data bisnis menjadi dashboard dan laporan yang mudah dipahami.','benefits'=>['Prediksi','Dashboard','Laporan otomatis'],'tech'=>['Python','Pandas','Tableau','Power BI','SQL'],'color'=>'#00c896','order'=>4],
            ['icon'=>'🔗','title'=>'Integrasi Sistem','description'=>'Menghubungkan aplikasi, API, dan layanan pihak ketiga agar data mengalir otomatis.','benefits'=>['Pembuatan API','Sinkronisasi pihak ketiga','Migrasi sistem lama'],'tech'=>['REST API','GraphQL','Webhooks','Kafka'],'color'=>'#ffb84d','order'=>5],
            ['icon'=>'🛡️','title'=>'Perawatan & Dukungan','description'=>'Dukungan teknis, pemantauan performa, dan perbaikan rutin setelah aplikasi berjalan.','benefits'=>['Pemantauan server','Perbaikan bug','Pembaruan keamanan'],'tech'=>['CI/CD','Docker','Linux','AWS','Nginx'],'color'=>'#ff6b6b','order'=>6],
        ];
        foreach ($services as $s) Service::create($s);

        // ── Portfolio ─────────────────────────────────────────
        // Left empty on purpose: add real projects in Admin › Portfolio.
        // The project count on the homepage is calculated from these entries.

        // ── Blog Posts ────────────────────────────────────────
        $blogs = [
            ['emoji'=>'🤖','category'=>'AI','title'=>'How We Built a Real-Time Object Detection System with YOLOv8','excerpt'=>'A deep dive into how we deployed YOLOv8 on edge devices to achieve 30fps real-time detection in production — including our optimization tricks.','color'=>'#c084fc','read_time'=>'8 min read','is_published'=>true,'published_at'=>now()->subDays(6),'order'=>1],
            ['emoji'=>'⚡','category'=>'Web Dev','title'=>'Why We Choose Laravel + React (Inertia.js) for Enterprise Projects','excerpt'=>'The combination gives us the best of both worlds: Laravel\'s powerful backend with React\'s dynamic UI — without the complexity of a separate API.','color'=>'#6c63ff','read_time'=>'5 min read','is_published'=>true,'published_at'=>now()->subDays(25),'order'=>2],
            ['emoji'=>'📊','category'=>'Data Science','title'=>'5 KPIs Every E-Commerce Business Should Track (And How to Automate Them)','excerpt'=>'From conversion rate to customer lifetime value — here are the metrics that actually matter and how we built automated dashboards for our clients.','color'=>'#00d4ff','read_time'=>'6 min read','is_published'=>true,'published_at'=>now()->subDays(42),'order'=>3],
        ];
        foreach ($blogs as $b) BlogPost::create($b);

        // ── Testimonials ──────────────────────────────────────
        // Left empty on purpose: add real client testimonials in Admin › Testimonials.

        // ── Tech Stack ────────────────────────────────────────
        $techs = [
            ['name'=>'Laravel','emoji'=>'🔴','category'=>'Backend','order'=>1],
            ['name'=>'React','emoji'=>'⚛️','category'=>'Frontend','order'=>2],
            ['name'=>'Vue.js','emoji'=>'💚','category'=>'Frontend','order'=>3],
            ['name'=>'Python','emoji'=>'🐍','category'=>'AI/Data','order'=>4],
            ['name'=>'Node.js','emoji'=>'🟩','category'=>'Backend','order'=>5],
            ['name'=>'React Native','emoji'=>'📱','category'=>'Mobile','order'=>6],
            ['name'=>'Flutter','emoji'=>'🔵','category'=>'Mobile','order'=>7],
            ['name'=>'PostgreSQL','emoji'=>'🐘','category'=>'Database','order'=>8],
            ['name'=>'MySQL','emoji'=>'🗄️','category'=>'Database','order'=>9],
            ['name'=>'Redis','emoji'=>'🔴','category'=>'Cache','order'=>10],
            ['name'=>'Docker','emoji'=>'🐋','category'=>'DevOps','order'=>11],
            ['name'=>'PyTorch','emoji'=>'🔥','category'=>'AI/Data','order'=>12],
            ['name'=>'TensorFlow','emoji'=>'🧠','category'=>'AI/Data','order'=>13],
            ['name'=>'OpenCV','emoji'=>'👁️','category'=>'AI/Data','order'=>14],
            ['name'=>'AWS','emoji'=>'☁️','category'=>'Cloud','order'=>15],
            ['name'=>'Nginx','emoji'=>'⚡','category'=>'DevOps','order'=>16],
            ['name'=>'Git','emoji'=>'📦','category'=>'DevOps','order'=>17],
            ['name'=>'Figma','emoji'=>'🎨','category'=>'Design','order'=>18],
        ];
        foreach ($techs as $t) TechStack::create($t);

        // ── Site Settings ─────────────────────────────────────
        $this->call(SiteSettingSeeder::class);
        $this->call(ServicePagesSeeder::class);
    }
}
