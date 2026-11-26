<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\ServicePage;
use Illuminate\Database\Seeder;

/**
 * Initial content for the three service pages (/layanan/{slug}).
 * Safe to re-run: existing pages are left untouched so edits made in the admin panel are kept.
 *   php artisan db:seed --class=ServicePagesSeeder --force
 */
class ServicePagesSeeder extends Seeder
{
    public function run(): void
    {
        foreach ($this->pages() as $page) {
            $serviceTitle = $page['service_title'];
            unset($page['service_title']);

            $page['service_id'] = Service::where('title', $serviceTitle)->value('id');

            ServicePage::firstOrCreate(['slug' => $page['slug']], $page);
        }
    }

    private function pages(): array
    {
        return [
            [
                'slug'          => 'jasa-pembuatan-aplikasi-web-malang',
                'service_title' => 'Aplikasi Web Custom',
                'order'         => 1,
                'portfolio_categories' => ['WebGIS', 'Aplikasi Web', 'Web App'],

                'h1'               => 'Jasa Pembuatan Aplikasi Web di Malang',
                'meta_title'       => 'Jasa Pembuatan Aplikasi Web Malang | Asvel Coding Factory',
                'meta_description' => 'Jasa pembuatan aplikasi web custom di Malang: sistem informasi, dashboard, dan WebGIS yang mengikuti alur kerja bisnis atau instansi Anda. Konsultasi gratis.',
                'body' => <<<'TEXT'
Asvel Coding Factory menerima jasa pembuatan aplikasi web custom untuk bisnis dan instansi, baik di Malang maupun kota lain. Aplikasi dibuat mengikuti alur kerja Anda, dibuka langsung dari browser di komputer atau ponsel, dan tidak perlu dipasang satu per satu.

## Aplikasi web seperti apa yang kami buat?

- Sistem informasi untuk pendataan, pengajuan, persetujuan, dan pengelolaan arsip.
- Dashboard dan laporan yang merangkum data dari beberapa sumber.
- WebGIS atau aplikasi pemetaan yang menampilkan data di atas peta interaktif.
- Integrasi dengan aplikasi atau layanan yang sudah Anda gunakan.

## Kapan sebaiknya memilih aplikasi web custom?

Aplikasi jadi cocok untuk kebutuhan yang umum. Aplikasi custom lebih tepat ketika alur kerja Anda khas, data masih tersebar di banyak spreadsheet, laporan membutuhkan format tertentu, atau setiap bagian memerlukan hak akses yang berbeda. Jika data Anda berkaitan dengan lokasi, WebGIS membantu melihat sebaran dan kondisi di lapangan langsung dari peta.

## Dikerjakan bertahap dan terbuka

Kami memulai dari fitur yang paling dibutuhkan agar aplikasi bisa segera dipakai, lalu mengembangkannya berdasarkan masukan pengguna. Selama pengerjaan, Anda dapat mencoba setiap bagian, sehingga hasil akhirnya sesuai dengan pekerjaan sehari-hari tim Anda.
TEXT,
                'process' => [
                    ['title' => 'Diskusi kebutuhan', 'desc' => 'Kami mempelajari alur kerja, pengguna, data, dan laporan yang Anda butuhkan.'],
                    ['title' => 'Rancangan dan prototipe', 'desc' => 'Alur aplikasi dan contoh tampilan dibuat lebih dulu untuk Anda tinjau.'],
                    ['title' => 'Pengembangan bertahap', 'desc' => 'Aplikasi dibangun per bagian dan bisa dicoba selama pengerjaan.'],
                    ['title' => 'Pengujian dan migrasi data', 'desc' => 'Aplikasi diuji, lalu data lama dipindahkan jika diperlukan.'],
                    ['title' => 'Peluncuran dan pendampingan', 'desc' => 'Aplikasi dipasang di server dan pengguna dipandu saat mulai memakainya.'],
                ],
                'faq' => [
                    ['q' => 'Berapa biaya pembuatan aplikasi web?', 'a' => 'Biaya bergantung pada jumlah fitur, kerumitan alur kerja, dan integrasi yang dibutuhkan. Setelah diskusi kebutuhan, kami menyampaikan ruang lingkup pekerjaan beserta perkiraan biayanya.'],
                    ['q' => 'Berapa lama proses pembuatannya?', 'a' => 'Lama pengerjaan ditentukan oleh ruang lingkup. Kami bisa memulai dari fitur inti agar aplikasi lebih cepat dipakai, lalu menambahkan fitur berikutnya secara bertahap.'],
                    ['q' => 'Apakah bisa membuat WebGIS atau aplikasi pemetaan?', 'a' => 'Bisa. Kami membangun aplikasi web yang menampilkan data lokasi di atas peta interaktif, termasuk katalog data peta.'],
                    ['q' => 'Apakah melayani klien di luar Malang?', 'a' => 'Ya. Diskusi, presentasi, dan uji coba dapat dilakukan secara online, sehingga kami bisa bekerja dengan klien di seluruh Indonesia.'],
                    ['q' => 'Bagaimana dengan perawatan setelah aplikasi selesai?', 'a' => 'Perawatan seperti perbaikan bug, pembaruan keamanan, dan penyesuaian kecil dapat dibahas dan disepakati sejak awal proyek.'],
                ],

                'h1_en'               => 'Custom Web Application Development in Malang',
                'meta_title_en'       => 'Web Application Development in Malang | Asvel Coding Factory',
                'meta_description_en' => 'Custom web application development in Malang: information systems, dashboards, and WebGIS built around how your business or institution works. Free consultation.',
                'body_en' => <<<'TEXT'
Asvel Coding Factory builds custom web applications for businesses and institutions, in Malang and in other cities. Each application follows your workflow, opens directly in the browser on a computer or phone, and needs no installation on every device.

## What kind of web applications do we build?

- Information systems for data entry, requests, approvals, and records management.
- Dashboards and reports that combine data from several sources.
- WebGIS and mapping applications that show data on an interactive map.
- Integrations with the applications and services you already use.

## When is a custom web application the right choice?

Off-the-shelf software works well for common needs. A custom application fits better when your workflow is specific, data is spread across many spreadsheets, reports need a particular format, or each department needs different access rights. When your data is tied to locations, WebGIS lets you see distribution and field conditions directly on a map.

## Built in stages, in the open

We start with the features you need most so the application can be used early, then extend it based on user feedback. During development you can try each part, so the final result matches your team's day-to-day work.
TEXT,
                'process_en' => [
                    ['title' => 'Requirements discussion', 'desc' => 'We study your workflow, users, data, and the reports you need.'],
                    ['title' => 'Design and prototype', 'desc' => 'The application flow and sample screens are prepared first for your review.'],
                    ['title' => 'Development in stages', 'desc' => 'The application is built part by part and can be tried during development.'],
                    ['title' => 'Testing and data migration', 'desc' => 'The application is tested, and existing data is moved over when needed.'],
                    ['title' => 'Launch and guidance', 'desc' => 'The application goes live on the server and users are guided as they start.'],
                ],
                'faq_en' => [
                    ['q' => 'How much does a web application cost?', 'a' => 'The cost depends on the number of features, the complexity of the workflow, and the integrations required. After the requirements discussion we share the scope of work together with an estimated cost.'],
                    ['q' => 'How long does development take?', 'a' => 'The timeline depends on the scope. We can start with the core features so the application is usable sooner, then add further features in stages.'],
                    ['q' => 'Can you build WebGIS or mapping applications?', 'a' => 'Yes. We build web applications that show location data on an interactive map, including map data catalogues.'],
                    ['q' => 'Do you work with clients outside Malang?', 'a' => 'Yes. Discussions, presentations, and testing can be done online, so we can work with clients across Indonesia.'],
                    ['q' => 'What about maintenance after launch?', 'a' => 'Maintenance such as bug fixes, security updates, and small adjustments can be discussed and agreed at the start of the project.'],
                ],
            ],

            [
                'slug'          => 'jasa-pembuatan-aplikasi-android-malang',
                'service_title' => 'Mobile Apps',
                'order'         => 2,
                'portfolio_categories' => ['Mobile App', 'Android', 'Aplikasi Android'],

                'h1'               => 'Jasa Pembuatan Aplikasi Android di Malang',
                'meta_title'       => 'Jasa Pembuatan Aplikasi Android Malang | Asvel Coding Factory',
                'meta_description' => 'Jasa pembuatan aplikasi Android di Malang untuk operasional bisnis: aplikasi tim lapangan, pencatatan data, dan aplikasi pelanggan. Konsultasi gratis via WhatsApp.',
                'body' => <<<'TEXT'
Asvel Coding Factory membuat aplikasi Android sesuai kebutuhan operasional bisnis dan instansi. Aplikasi dirancang untuk dipakai sehari-hari oleh tim lapangan, staf, maupun pelanggan Anda, dan dapat terhubung dengan sistem web yang sudah ada.

## Contoh aplikasi Android yang bisa dibuat

- Aplikasi survei dan pencatatan data lapangan, lengkap dengan foto dan titik lokasi GPS.
- Aplikasi absensi dan laporan kegiatan untuk tim yang bekerja di luar kantor.
- Aplikasi pencatatan stok atau barang masuk dan keluar.
- Aplikasi untuk pelanggan, misalnya pemesanan atau pengecekan status layanan.
- Aplikasi pendamping sistem web, sehingga data dari lapangan langsung masuk ke dashboard atau peta.

## Dirancang untuk kondisi di lapangan

Sebelum pengembangan, kami membahas hal-hal praktis seperti kondisi sinyal di lokasi kerja, jenis perangkat yang dipakai tim, dan siapa saja yang boleh melihat data. Dari situ tampilan dibuat sesederhana mungkin agar mudah dipelajari, termasuk oleh pengguna yang belum terbiasa dengan aplikasi.

## Rilis di Google Play atau untuk internal

Aplikasi dapat dirilis di Google Play untuk umum, atau dipasang langsung di perangkat internal jika hanya dipakai oleh tim Anda.
TEXT,
                'process' => [
                    ['title' => 'Diskusi kebutuhan', 'desc' => 'Kami memahami siapa penggunanya dan pekerjaan apa yang ingin dibantu oleh aplikasi.'],
                    ['title' => 'Rancangan tampilan', 'desc' => 'Alur dan tampilan aplikasi dirancang agar mudah dipakai, lalu ditinjau bersama Anda.'],
                    ['title' => 'Pengembangan dan integrasi', 'desc' => 'Aplikasi dibangun dan dihubungkan dengan server atau sistem web yang dibutuhkan.'],
                    ['title' => 'Uji coba bersama pengguna', 'desc' => 'Aplikasi dicoba oleh calon pengguna di perangkat dan kondisi sebenarnya.'],
                    ['title' => 'Rilis dan perawatan', 'desc' => 'Aplikasi dirilis di Google Play atau dipasang di perangkat internal, lalu dirawat sesuai kesepakatan.'],
                ],
                'faq' => [
                    ['q' => 'Berapa biaya pembuatan aplikasi Android?', 'a' => 'Biaya bergantung pada jumlah fitur, jumlah tampilan, dan integrasi dengan sistem lain. Setelah diskusi kebutuhan, kami menyampaikan ruang lingkup pekerjaan beserta perkiraan biayanya.'],
                    ['q' => 'Apakah aplikasi bisa dipakai tanpa internet?', 'a' => 'Aplikasi dapat dirancang agar data disimpan dulu di perangkat lalu dikirim ke server saat koneksi tersedia. Kebutuhan ini sebaiknya dibahas sejak awal.'],
                    ['q' => 'Apakah aplikasi bisa terhubung dengan sistem web kami?', 'a' => 'Bisa. Aplikasi Android dapat mengirim dan menerima data dari sistem web, misalnya dashboard atau aplikasi pemetaan.'],
                    ['q' => 'Apakah juga membuat versi iOS?', 'a' => 'Fokus layanan kami adalah aplikasi Android. Jika Anda juga membutuhkan versi iOS, hal ini dapat dibahas saat konsultasi.'],
                    ['q' => 'Apakah melayani klien di luar Malang?', 'a' => 'Ya. Diskusi, presentasi, dan uji coba dapat dilakukan secara online, sehingga kami bisa bekerja dengan klien di seluruh Indonesia.'],
                ],

                'h1_en'               => 'Android App Development in Malang',
                'meta_title_en'       => 'Android App Development in Malang | Asvel Coding Factory',
                'meta_description_en' => 'Android app development in Malang for business operations: field team apps, data collection, and customer apps. Free consultation on WhatsApp.',
                'body_en' => <<<'TEXT'
Asvel Coding Factory builds Android apps around the operational needs of businesses and institutions. Each app is designed for daily use by your field team, staff, or customers, and can connect to the web systems you already have.

## Examples of Android apps we can build

- Field survey and data collection apps, with photos and GPS locations.
- Attendance and activity report apps for teams working outside the office.
- Stock or goods in-and-out recording apps.
- Customer apps, for example ordering or checking service status.
- Companion apps for web systems, so field data flows straight into a dashboard or map.

## Designed for conditions in the field

Before development we discuss practical matters such as signal conditions at work sites, the devices your team uses, and who may see which data. From there the interface is kept as simple as possible so it is easy to learn, including for people who are new to apps.

## Released on Google Play or internally

Apps can be published on Google Play for the public, or installed directly on internal devices when only your team uses them.
TEXT,
                'process_en' => [
                    ['title' => 'Requirements discussion', 'desc' => 'We learn who the users are and which work the app should support.'],
                    ['title' => 'Interface design', 'desc' => 'The app flow and screens are designed to be easy to use and reviewed with you.'],
                    ['title' => 'Development and integration', 'desc' => 'The app is built and connected to the servers or web systems it needs.'],
                    ['title' => 'Testing with users', 'desc' => 'Future users try the app on real devices and in real conditions.'],
                    ['title' => 'Release and maintenance', 'desc' => 'The app is published on Google Play or installed on internal devices, then maintained as agreed.'],
                ],
                'faq_en' => [
                    ['q' => 'How much does an Android app cost?', 'a' => 'The cost depends on the number of features, the number of screens, and integrations with other systems. After the requirements discussion we share the scope of work together with an estimated cost.'],
                    ['q' => 'Can the app work without internet?', 'a' => 'The app can be designed to store data on the device first and send it to the server when a connection is available. This is best discussed at the start.'],
                    ['q' => 'Can the app connect to our web system?', 'a' => 'Yes. An Android app can send and receive data from a web system, such as a dashboard or a mapping application.'],
                    ['q' => 'Do you also build iOS apps?', 'a' => 'Our focus is Android apps. If you also need an iOS version, we can discuss it during the consultation.'],
                    ['q' => 'Do you work with clients outside Malang?', 'a' => 'Yes. Discussions, presentations, and testing can be done online, so we can work with clients across Indonesia.'],
                ],
            ],

            [
                'slug'          => 'ai-computer-vision',
                'service_title' => 'AI Computer Vision',
                'order'         => 3,
                'portfolio_categories' => ['AI Computer Vision', 'Computer Vision', 'AI'],

                'h1'               => 'Layanan AI Computer Vision',
                'meta_title'       => 'Layanan AI Computer Vision: Deteksi & Penghitungan Objek | Asvel',
                'meta_description' => 'Layanan AI computer vision untuk deteksi dan penghitungan objek, analisis foto dan video, serta pengolahan foto udara drone. Konsultasi gratis via WhatsApp.',
                'body' => <<<'TEXT'
AI computer vision membuat komputer bisa mengenali objek pada foto, video, atau rekaman kamera secara otomatis. Asvel Coding Factory membangun sistem computer vision yang disesuaikan dengan objek yang ingin dikenali, kondisi kamera, dan cara hasilnya akan dipakai di bisnis atau instansi Anda.

## Yang bisa dikerjakan

- Deteksi dan penghitungan objek, seperti orang, kendaraan, atau barang.
- Analisis foto dan video untuk memilah atau menandai isi gambar dalam jumlah besar.
- Pengolahan foto udara drone untuk mengenali bangunan, lahan, atau objek tertentu, lalu menampilkannya di peta.
- Pemeriksaan visual, misalnya mencari ketidaksesuaian pada produk dari gambar.

## Hasil yang bisa diperiksa ulang

Setiap objek yang terdeteksi ditandai dengan kotak (bounding box) dan tingkat keyakinan. Hasil disimpan bersama gambarnya, sehingga tim Anda tetap bisa memeriksa dan memutuskan, terutama untuk keputusan yang penting.

## Batasan yang perlu dipahami

Kualitas hasil dipengaruhi oleh pencahayaan, sudut kamera, dan contoh data yang tersedia. Karena itu, kami biasanya memulai dengan uji coba skala kecil menggunakan gambar dari kondisi sebenarnya sebelum sistem diterapkan lebih luas.
TEXT,
                'process' => [
                    ['title' => 'Diskusi kebutuhan dan contoh data', 'desc' => 'Kami memahami masalahnya dan melihat contoh foto atau video dari kondisi sebenarnya.'],
                    ['title' => 'Pelabelan data', 'desc' => 'Objek pada contoh gambar ditandai sebagai bahan belajar model.'],
                    ['title' => 'Pelatihan dan pengujian model', 'desc' => 'Model dilatih, lalu diuji dengan gambar yang belum pernah dilihat sebelumnya.'],
                    ['title' => 'Integrasi', 'desc' => 'Model dihubungkan ke sistem Anda, misalnya dashboard web, aplikasi Android, atau laporan.'],
                    ['title' => 'Uji coba lapangan dan penyempurnaan', 'desc' => 'Sistem dicoba di kondisi nyata, lalu diperbaiki dengan data tambahan bila perlu.'],
                ],
                'faq' => [
                    ['q' => 'Data apa yang perlu disiapkan?', 'a' => 'Contoh foto atau video dari kondisi sebenarnya, penjelasan objek apa yang ingin dikenali, dan gambaran bagaimana hasilnya akan dipakai sehari-hari.'],
                    ['q' => 'Apakah bisa memakai kamera CCTV yang sudah ada?', 'a' => 'Bisa dipertimbangkan. Kami perlu melihat contoh rekamannya untuk menilai apakah resolusi dan sudut kameranya memadai.'],
                    ['q' => 'Seberapa akurat hasil deteksinya?', 'a' => 'Akurasi bergantung pada kualitas dan jumlah data serta kondisi kamera. Kami mengukurnya dengan data uji dari kondisi Anda dan menyampaikannya sebelum sistem dipakai.'],
                    ['q' => 'Hasil deteksi bisa ditampilkan di mana?', 'a' => 'Hasil dapat ditampilkan di dashboard web, aplikasi Android, peta WebGIS, atau laporan, sesuai kebutuhan Anda.'],
                    ['q' => 'Apakah melayani klien di luar Malang?', 'a' => 'Ya. Diskusi dan pengiriman contoh data dapat dilakukan secara online, sehingga kami bisa bekerja dengan klien di seluruh Indonesia.'],
                ],

                'h1_en'               => 'AI Computer Vision Services',
                'meta_title_en'       => 'AI Computer Vision: Object Detection & Counting | Asvel',
                'meta_description_en' => 'AI computer vision services for object detection and counting, photo and video analysis, and drone aerial imagery. Free consultation on WhatsApp.',
                'body_en' => <<<'TEXT'
AI computer vision lets a computer recognise objects in photos, videos, or camera footage automatically. Asvel Coding Factory builds computer vision systems tailored to the objects you need to recognise, your camera conditions, and how the results will be used in your business or institution.

## What we can build

- Object detection and counting, such as people, vehicles, or goods.
- Photo and video analysis to sort or tag large numbers of images.
- Drone aerial imagery processing to recognise buildings, land, or specific objects, and show them on a map.
- Visual inspection, for example spotting irregularities in products from images.

## Results you can double-check

Every detected object is marked with a box (bounding box) and a confidence score. Results are stored together with the image, so your team can still review and decide, especially for important decisions.

## Limitations to keep in mind

Result quality depends on lighting, camera angle, and the sample data available. That is why we usually start with a small trial using images from your real conditions before rolling the system out more widely.
TEXT,
                'process_en' => [
                    ['title' => 'Requirements and sample data', 'desc' => 'We understand the problem and look at sample photos or videos from real conditions.'],
                    ['title' => 'Data labelling', 'desc' => 'Objects in the sample images are marked so the model can learn from them.'],
                    ['title' => 'Model training and testing', 'desc' => 'The model is trained, then tested on images it has not seen before.'],
                    ['title' => 'Integration', 'desc' => 'The model is connected to your system, such as a web dashboard, an Android app, or reports.'],
                    ['title' => 'Field trial and refinement', 'desc' => 'The system is tried in real conditions and improved with more data when needed.'],
                ],
                'faq_en' => [
                    ['q' => 'What data do we need to prepare?', 'a' => 'Sample photos or videos from real conditions, a description of the objects to recognise, and an idea of how the results will be used day to day.'],
                    ['q' => 'Can our existing CCTV cameras be used?', 'a' => 'It can be considered. We need to see sample footage to judge whether the resolution and camera angle are adequate.'],
                    ['q' => 'How accurate is the detection?', 'a' => 'Accuracy depends on the quality and amount of data and on camera conditions. We measure it with test data from your conditions and share it before the system is used.'],
                    ['q' => 'Where can the results be shown?', 'a' => 'Results can be shown in a web dashboard, an Android app, a WebGIS map, or reports, depending on your needs.'],
                    ['q' => 'Do you work with clients outside Malang?', 'a' => 'Yes. Discussions and sharing sample data can be done online, so we can work with clients across Indonesia.'],
                ],
            ],
        ];
    }
}
