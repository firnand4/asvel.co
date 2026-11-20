<?php

namespace Database\Seeders;

use App\Models\SiteSetting;
use Illuminate\Database\Seeder;

/**
 * Safe to re-run on a live database:
 *   php artisan db:seed --class=SiteSettingSeeder
 *
 * Missing keys are created, values edited in the admin panel are kept, and only
 * values still equal to the old English defaults are replaced with Indonesian.
 */
class SiteSettingSeeder extends Seeder
{
    private const LEGACY_DEFAULTS = [
        'company_name' => 'ASVEL',
        'tagline'      => 'Building Scalable Digital Solutions',
        'subheadline'  => 'ASVEL is a premier software house specializing in Web Development, Mobile Apps, AI & Computer Vision, and Data Science — turning your ideas into powerful digital products.',
        'about_intro'  => 'ASVEL is a technology-driven software house founded by engineers who believe that great software is the foundation of every successful modern business. We combine deep technical expertise with a passion for solving complex problems.',
        'vision'       => 'To be the leading software partner for businesses across Southeast Asia and beyond — empowering growth through intelligent technology.',
        'mission'      => 'Deliver scalable, high-quality software solutions that exceed expectations, on time and on budget.',
    ];

    public function run(): void
    {
        $settings = [
            ['key'=>'company_name','value'=>'Asvel Coding Factory','type'=>'text','label'=>'Company Name'],
            ['key'=>'tagline','value'=>'Software dan AI computer vision untuk bisnis Anda','type'=>'text','label'=>'Hero Tagline'],
            ['key'=>'subheadline','value'=>'Kami membuat website, aplikasi mobile, dan sistem kamera pintar yang bisa mengenali objek secara otomatis, mulai dari menghitung orang hingga memantau kendaraan dan barang.','type'=>'textarea','label'=>'Hero Subheadline'],
            ['key'=>'email','value'=>'[EMAIL_ADDRESS]','type'=>'text','label'=>'Contact Email'],
            ['key'=>'whatsapp','value'=>'+62 813-3341-3109','type'=>'text','label'=>'WhatsApp Number'],
            ['key'=>'whatsapp_number','value'=>'6281333413109','type'=>'text','label'=>'WhatsApp Number (digits only)'],
            ['key'=>'office_address','value'=>'Malang, Jawa Timur, Indonesia','type'=>'text','label'=>'Office Address'],
            ['key'=>'office_hours','value'=>'24/7','type'=>'text','label'=>'Office Hours'],
            ['key'=>'maps_embed_url','value'=>'','type'=>'text','label'=>'Google Maps Embed URL (https://www.google.com/maps?...&output=embed)'],
            ['key'=>'about_intro','value'=>'Asvel Coding Factory adalah software house di Malang. Kami membantu bisnis membangun aplikasi yang rapi, cepat, dan mudah dikembangkan, termasuk sistem AI computer vision untuk kebutuhan operasional.','type'=>'textarea','label'=>'About Introduction'],
            ['key'=>'vision','value'=>'Menjadi mitra teknologi terpercaya bagi bisnis di Indonesia.','type'=>'textarea','label'=>'Vision'],
            ['key'=>'mission','value'=>'Membuat software berkualitas yang selesai tepat waktu, sesuai anggaran, dan mudah dirawat.','type'=>'textarea','label'=>'Mission'],
            ['key'=>'linkedin_url','value'=>'#','type'=>'text','label'=>'LinkedIn URL'],
            ['key'=>'github_url','value'=>'#','type'=>'text','label'=>'GitHub URL'],
            ['key'=>'twitter_url','value'=>'#','type'=>'text','label'=>'Twitter URL'],
            ['key'=>'instagram_url','value'=>'#','type'=>'text','label'=>'Instagram URL'],
        ];

        foreach ($settings as $s) {
            $setting = SiteSetting::firstOrCreate(['key' => $s['key']], $s);

            $legacy = self::LEGACY_DEFAULTS[$s['key']] ?? null;
            if ($legacy !== null && $setting->value === $legacy) {
                $setting->update(['value' => $s['value']]);
            }
        }

        // Homepage stats are counted from the database now; drop the old hand-typed values.
        SiteSetting::whereIn('key', ['stats_projects', 'stats_clients', 'stats_years', 'stats_satisfaction'])->delete();
    }
}
