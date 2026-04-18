<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TeamMember;
use App\Models\Service;
use App\Models\PortfolioItem;
use App\Models\BlogPost;
use App\Models\Testimonial;
use App\Models\TechStack;
use App\Models\SiteSetting;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::updateOrCreate(
            ['email' => 'admin@asvel.co'],
            ['name' => 'ASVEL Admin', 'password' => Hash::make('asvel2024!')]
        );

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
            ['icon'=>'🌐','title'=>'Web Development','description'=>'Full-stack web applications built with modern technologies — fast, secure, and scalable.','benefits'=>['High performance','SEO optimized','Responsive design'],'tech'=>['Laravel','React','Vue.js','Node.js'],'color'=>'#6c63ff','order'=>1],
            ['icon'=>'📱','title'=>'Mobile App Development','description'=>'Native and cross-platform mobile apps that deliver exceptional user experiences.','benefits'=>['iOS & Android','Offline support','Push notifications'],'tech'=>['React Native','Flutter','Swift','Kotlin'],'color'=>'#00d4ff','order'=>2],
            ['icon'=>'🤖','title'=>'AI & Computer Vision','description'=>'Intelligent systems powered by deep learning — from object detection to NLP solutions.','benefits'=>['Real-time detection','Model training','API integration'],'tech'=>['Python','PyTorch','TensorFlow','OpenCV','YOLOv8'],'color'=>'#c084fc','order'=>3],
            ['icon'=>'📊','title'=>'Data Science & Analytics','description'=>'Turn raw data into actionable insights with advanced analytics and visualization.','benefits'=>['Predictive modeling','Dashboards','Automated reports'],'tech'=>['Python','Pandas','Tableau','Power BI','SQL'],'color'=>'#00c896','order'=>4],
            ['icon'=>'🔗','title'=>'System Integration','description'=>'Seamlessly connect your applications, APIs, and third-party services into one ecosystem.','benefits'=>['API development','Third-party sync','Legacy migration'],'tech'=>['REST API','GraphQL','Webhooks','Kafka'],'color'=>'#ffb84d','order'=>5],
            ['icon'=>'🛡️','title'=>'Maintenance & Support','description'=>'Ongoing technical support, performance monitoring, and proactive optimization.','benefits'=>['24/7 monitoring','Bug fixes','Security patches'],'tech'=>['CI/CD','Docker','Linux','AWS','Nginx'],'color'=>'#ff6b6b','order'=>6],
        ];
        foreach ($services as $s) Service::create($s);

        // ── Portfolio ─────────────────────────────────────────
        $portfolio = [
            ['emoji'=>'🛒','title'=>'HiMart E-Commerce Platform','description'=>'A full-scale B2C marketplace with real-time inventory, payment gateway, and seller dashboard.','tech'=>['Laravel','React','MySQL','Redis'],'problem'=>'Client needed to migrate from legacy system with 0 downtime.','result'=>'3× faster load time, 40% increase in conversions.','color'=>'#6c63ff','order'=>1],
            ['emoji'=>'🏥','title'=>'MedTrack Hospital System','description'=>'Integrated patient management, scheduling, and billing system for a regional hospital chain.','tech'=>['Laravel','Vue.js','PostgreSQL'],'problem'=>'Manual processes causing delays and billing errors.','result'=>'70% reduction in admin time, zero billing errors.','color'=>'#00c896','order'=>2],
            ['emoji'=>'👁️','title'=>'VisioGuard CCTV Analytics','description'=>'AI-powered CCTV system with real-time object detection, crowd counting, and anomaly alerts.','tech'=>['Python','YOLOv8','OpenCV','FastAPI','React'],'problem'=>'Security team overwhelmed monitoring dozens of cameras.','result'=>'Incident detection time reduced by 85%.','color'=>'#c084fc','order'=>3],
            ['emoji'=>'📦','title'=>'LogiTrack Delivery App','description'=>'Real-time package tracking mobile app with driver management and route optimization.','tech'=>['React Native','Node.js','MongoDB','Google Maps API'],'problem'=>'No visibility into delivery status for customers or managers.','result'=>'95% customer satisfaction, 30% fewer missed deliveries.','color'=>'#00d4ff','order'=>4],
            ['emoji'=>'📈','title'=>'DataInsight Analytics Dashboard','description'=>'Business intelligence platform with interactive dashboards, KPI tracking, and automated reports.','tech'=>['Python','Pandas','React','Chart.js','PostgreSQL'],'problem'=>'Leadership had no real-time view of business KPIs.','result'=>'Decision-making time cut by 60%, ROI up 25%.','color'=>'#ffb84d','order'=>5],
            ['emoji'=>'🤝','title'=>'TalentLink HR Platform','description'=>'End-to-end HR system covering recruitment, onboarding, payroll, and performance reviews.','tech'=>['Laravel','React','MySQL','Mailgun'],'problem'=>'Scattered HR processes across spreadsheets and email.','result'=>'HR workload reduced by 50%, onboarding 3× faster.','color'=>'#ff6b6b','order'=>6],
        ];
        foreach ($portfolio as $p) PortfolioItem::create($p);

        // ── Blog Posts ────────────────────────────────────────
        $blogs = [
            ['emoji'=>'🤖','category'=>'AI','title'=>'How We Built a Real-Time Object Detection System with YOLOv8','excerpt'=>'A deep dive into how we deployed YOLOv8 on edge devices to achieve 30fps real-time detection in production — including our optimization tricks.','color'=>'#c084fc','read_time'=>'8 min read','is_published'=>true,'published_at'=>now()->subDays(6),'order'=>1],
            ['emoji'=>'⚡','category'=>'Web Dev','title'=>'Why We Choose Laravel + React (Inertia.js) for Enterprise Projects','excerpt'=>'The combination gives us the best of both worlds: Laravel\'s powerful backend with React\'s dynamic UI — without the complexity of a separate API.','color'=>'#6c63ff','read_time'=>'5 min read','is_published'=>true,'published_at'=>now()->subDays(25),'order'=>2],
            ['emoji'=>'📊','category'=>'Data Science','title'=>'5 KPIs Every E-Commerce Business Should Track (And How to Automate Them)','excerpt'=>'From conversion rate to customer lifetime value — here are the metrics that actually matter and how we built automated dashboards for our clients.','color'=>'#00d4ff','read_time'=>'6 min read','is_published'=>true,'published_at'=>now()->subDays(42),'order'=>3],
        ];
        foreach ($blogs as $b) BlogPost::create($b);

        // ── Testimonials ──────────────────────────────────────
        $testimonials = [
            ['name'=>'Budi Santoso','role'=>'CEO, HiMart Indonesia','avatar'=>'👨‍💼','text'=>'ASVEL transformed our outdated system into a modern e-commerce platform. The team was professional, fast, and delivered beyond expectations. Our conversion rate jumped 40% in the first quarter.','rating'=>5,'order'=>1],
            ['name'=>'Dr. Siti Rahayu','role'=>'Director, MedTrack Hospital','avatar'=>'👩‍⚕️','text'=>'The hospital management system they built streamlined our entire operation. Patient data is now secure and accessible, and our staff loves the intuitive interface. Highly recommended!','rating'=>5,'order'=>2],
            ['name'=>'Agung Prabowo','role'=>'CTO, LogiTrack Logistics','avatar'=>'👨‍💻','text'=>'We needed a mobile app in 10 weeks — ASVEL delivered in 9. The code quality is excellent, documentation is thorough, and they are still our preferred tech partner for all new initiatives.','rating'=>5,'order'=>3],
            ['name'=>'Maya Dewi','role'=>'Head of Analytics, RetailGroup','avatar'=>'👩‍💻','text'=>'Their data science team built us a BI dashboard that finally gave leadership real-time visibility. ROI became measurable within weeks. The team is sharp, responsive, and truly understands business problems.','rating'=>5,'order'=>4],
        ];
        foreach ($testimonials as $t) Testimonial::create($t);

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
        $settings = [
            ['key'=>'company_name','value'=>'ASVEL','type'=>'text','label'=>'Company Name'],
            ['key'=>'tagline','value'=>'Building Scalable Digital Solutions','type'=>'text','label'=>'Hero Tagline'],
            ['key'=>'subheadline','value'=>'ASVEL is a premier software house specializing in Web Development, Mobile Apps, AI & Computer Vision, and Data Science — turning your ideas into powerful digital products.','type'=>'textarea','label'=>'Hero Subheadline'],
            ['key'=>'email','value'=>'[EMAIL_ADDRESS]','type'=>'text','label'=>'Contact Email'],
            ['key'=>'whatsapp','value'=>'+62 813-3341-3109','type'=>'text','label'=>'WhatsApp Number'],
            ['key'=>'whatsapp_number','value'=>'6281333413109','type'=>'text','label'=>'WhatsApp Number (digits only)'],
            ['key'=>'office_address','value'=>'Malang, Jawa Timur, Indonesia','type'=>'text','label'=>'Office Address'],
            ['key'=>'office_hours','value'=>'24/7','type'=>'text','label'=>'Office Hours'],
            ['key'=>'about_intro','value'=>'ASVEL is a technology-driven software house founded by engineers who believe that great software is the foundation of every successful modern business. We combine deep technical expertise with a passion for solving complex problems.','type'=>'textarea','label'=>'About Introduction'],
            ['key'=>'vision','value'=>'To be the leading software partner for businesses across Southeast Asia and beyond — empowering growth through intelligent technology.','type'=>'textarea','label'=>'Vision'],
            ['key'=>'mission','value'=>'Deliver scalable, high-quality software solutions that exceed expectations, on time and on budget.','type'=>'textarea','label'=>'Mission'],
            ['key'=>'stats_projects','value'=>'50+','type'=>'text','label'=>'Stat: Projects Delivered'],
            ['key'=>'stats_clients','value'=>'30+','type'=>'text','label'=>'Stat: Happy Clients'],
            ['key'=>'stats_years','value'=>'5+','type'=>'text','label'=>'Stat: Years Experience'],
            ['key'=>'stats_satisfaction','value'=>'99%','type'=>'text','label'=>'Stat: Client Satisfaction'],
            ['key'=>'linkedin_url','value'=>'#','type'=>'text','label'=>'LinkedIn URL'],
            ['key'=>'github_url','value'=>'#','type'=>'text','label'=>'GitHub URL'],
            ['key'=>'twitter_url','value'=>'#','type'=>'text','label'=>'Twitter URL'],
            ['key'=>'instagram_url','value'=>'#','type'=>'text','label'=>'Instagram URL'],
        ];
        foreach ($settings as $s) SiteSetting::create($s);
    }
}
