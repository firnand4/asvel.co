<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\PortfolioItem;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\TeamMember;
use App\Models\Testimonial;
use Illuminate\Database\Seeder;

/**
 * Content update, November 2026. Safe to re-run on a live database:
 *   php artisan db:seed --class=ContentUpdate2026Seeder --force
 *
 * Rows are matched by title / slug / key / name, so re-running never duplicates,
 * and only the old sample rows listed below are deleted.
 */
class ContentUpdate2026Seeder extends Seeder
{
    public function run(): void
    {
        $this->services();
        $this->portfolio();
        $this->removeSampleTeamAndTestimonials();
        $this->blog();
        $this->settings();
    }

    private function services(): void
    {
        $services = [
            [
                'title'       => 'AI Computer Vision',
                'icon'        => '🤖',
                'description' => 'Sistem yang membuat komputer bisa "melihat" dan mengenali objek dari kamera, foto, atau video secara otomatis, sehingga pekerjaan menghitung dan memantau tidak perlu lagi dilakukan satu per satu secara manual.',
                'benefits'    => ['Deteksi dan penghitungan objek', 'Analisis foto dan video', 'Pengolahan foto udara drone'],
                'tech'        => ['Python', 'OpenCV', 'PyTorch', 'YOLO'],
                'color'       => '#22d3ee',
                'order'       => 1,
                'is_active'   => true,
            ],
            [
                'title'       => 'Aplikasi Web Custom',
                'icon'        => '🌐',
                'description' => 'Aplikasi berbasis web yang dibuat khusus mengikuti alur kerja Anda dan bisa dibuka dari browser di mana saja.',
                'benefits'    => ['Sistem informasi', 'Dashboard dan laporan', 'WebGIS dan pemetaan'],
                'tech'        => ['Laravel', 'React', 'WebGIS'],
                'color'       => '#6c63ff',
                'order'       => 2,
                'is_active'   => true,
            ],
            [
                'title'       => 'Mobile Apps',
                'icon'        => '📱',
                'description' => 'Aplikasi Android yang dirancang sesuai kebutuhan bisnis Anda, untuk tim lapangan maupun pelanggan.',
                'benefits'    => ['Aplikasi Android sesuai kebutuhan', 'Terhubung dengan sistem web Anda', 'Mudah dipakai tim lapangan'],
                'tech'        => ['Android', 'Flutter', 'Kotlin'],
                'color'       => '#00c896',
                'order'       => 3,
                'is_active'   => true,
            ],
        ];

        foreach ($services as $s) {
            Service::updateOrCreate(['title' => $s['title']], $s);
        }

        Service::whereNotIn('title', array_column($services, 'title'))->delete();
    }

    private function portfolio(): void
    {
        // Sample projects from the original seeder; they contained made-up results.
        PortfolioItem::whereIn('title', [
            'HiMart E-Commerce Platform',
            'MedTrack Hospital System',
            'VisioGuard CCTV Analytics',
            'LogiTrack Delivery App',
            'DataInsight Analytics Dashboard',
            'TalentLink HR Platform',
        ])->delete();

        // Screenshots go in public/images/portfolio/; until the file exists a placeholder is shown.
        $projects = [
            [
                'title'       => 'Sistem Pemetaan Perumahan',
                'emoji'       => '🏘️',
                'image'       => 'images/portfolio/sistem-pemetaan-perumahan.png',
                'description' => 'Peta interaktif kawasan perumahan yang menampilkan lokasi dan informasi setiap kawasan langsung dari browser.',
                'tech'        => [],
                'order'       => 1,
            ],
            [
                'title'       => 'Pemetaan GeoNode',
                'emoji'       => '🗺️',
                'image'       => 'images/portfolio/pemetaan-geonode.png',
                'description' => 'Platform berbasis GeoNode untuk berbagi, mengelola, dan menyusun katalog data peta secara online.',
                'tech'        => ['GeoNode'],
                'order'       => 2,
            ],
            [
                'title'       => 'SIKP (Sistem Informasi KKPR dan PMP-UMK)',
                'emoji'       => '📋',
                'image'       => 'images/portfolio/sikp.png',
                'description' => 'Sistem informasi perizinan kesesuaian pemanfaatan ruang untuk pelaku usaha mikro dan kecil.',
                'tech'        => [],
                'order'       => 3,
            ],
        ];

        foreach ($projects as $p) {
            PortfolioItem::updateOrCreate(['title' => $p['title']], $p + [
                'category'  => 'WebGIS',
                'color'     => '#22d3ee',
                'is_active' => true,
            ]);
        }
    }

    private function removeSampleTeamAndTestimonials(): void
    {
        TeamMember::whereIn('name', ['Ahmad Rasyid', 'Rizky Akbar', 'Dewi Kartika', 'Fajar Nugroho'])->delete();

        Testimonial::whereIn('name', ['Budi Santoso', 'Dr. Siti Rahayu', 'Agung Prabowo', 'Maya Dewi'])->delete();
    }

    private function blog(): void
    {
        BlogPost::whereIn('title', [
            'How We Built a Real-Time Object Detection System with YOLOv8',
            'Why We Choose Laravel + React (Inertia.js) for Enterprise Projects',
            '5 KPIs Every E-Commerce Business Should Track (And How to Automate Them)',
        ])->delete();

        $posts = [
            [
                'slug'      => 'ai-computer-vision-untuk-bisnis-dan-instansi',
                'title'     => 'Mengenal AI Computer Vision: Contoh Penerapan untuk Bisnis dan Instansi',
                'excerpt'   => 'Penjelasan sederhana tentang AI computer vision, contoh penerapannya di bisnis dan instansi, serta alur pengerjaan proyeknya dari awal sampai berjalan.',
                'category'  => 'AI Computer Vision',
                'emoji'     => '🤖',
                'color'     => '#22d3ee',
                'read_time' => '3 menit baca',
                'order'     => 1,
                'content'   => self::ARTICLE_AI,
            ],
            [
                'slug'      => 'aplikasi-web-custom-vs-aplikasi-jadi',
                'title'     => 'Aplikasi Web Custom atau Aplikasi Jadi? Panduan Memilih untuk Bisnis',
                'excerpt'   => 'Panduan memilih antara aplikasi jadi dan aplikasi web custom, lengkap dengan tanda-tanda kapan bisnis Anda butuh sistem sendiri, termasuk WebGIS.',
                'category'  => 'Aplikasi Web',
                'emoji'     => '🌐',
                'color'     => '#6c63ff',
                'read_time' => '3 menit baca',
                'order'     => 2,
                'content'   => self::ARTICLE_WEB,
            ],
            [
                'slug'      => 'manfaat-aplikasi-android-untuk-operasional-bisnis',
                'title'     => 'Manfaat Aplikasi Android untuk Operasional Bisnis',
                'excerpt'   => 'Bagaimana aplikasi Android yang dibuat sesuai kebutuhan bisa merapikan operasional bisnis, beserta contoh penerapannya untuk tim lapangan dan pelanggan.',
                'category'  => 'Mobile Apps',
                'emoji'     => '📱',
                'color'     => '#00c896',
                'read_time' => '3 menit baca',
                'order'     => 3,
                'content'   => self::ARTICLE_MOBILE,
            ],
        ];

        foreach ($posts as $p) {
            $post = BlogPost::firstOrNew(['slug' => $p['slug']]);
            $post->fill($p + ['is_published' => true]);
            // Keep the original publish date when the seeder is re-run.
            $post->published_at ??= now();
            $post->save();
        }
    }

    private function settings(): void
    {
        $address = 'Jl. Raya Karang Anyar, Krajan, Karanganyar, Kec. Poncokusumo, Kabupaten Malang, Jawa Timur 65157';

        $settings = [
            ['key' => 'whatsapp',        'value' => '0813-3341-3109',       'type' => 'text', 'label' => 'WhatsApp Number'],
            ['key' => 'whatsapp_number', 'value' => '6281333413109',        'type' => 'text', 'label' => 'WhatsApp Number (digits only)'],
            ['key' => 'email',           'value' => 'asvelcoding@gmail.com', 'type' => 'text', 'label' => 'Contact Email'],
            ['key' => 'office_address',  'value' => $address,               'type' => 'text', 'label' => 'Office Address'],
            [
                'key'   => 'maps_embed_url',
                // Business name + address pins the "Asvel Coding Factory" place listing on Google Maps.
                'value' => 'https://www.google.com/maps?q=' . urlencode('Asvel Coding Factory, ' . $address) . '&z=16&output=embed',
                'type'  => 'text',
                'label' => 'Google Maps Embed URL (https://www.google.com/maps?...&output=embed)',
            ],
        ];

        foreach ($settings as $s) {
            SiteSetting::updateOrCreate(['key' => $s['key']], $s);
        }
    }

    private const ARTICLE_AI = <<<'TEXT'
Setiap hari banyak bisnis dan instansi mengandalkan mata manusia untuk pekerjaan yang berulang: menghitung barang yang masuk gudang, memantau kendaraan di area parkir, memeriksa foto hasil survei, atau mengecek rekaman kamera. Pekerjaan seperti ini melelahkan, memakan waktu, dan mudah terlewat. Di sinilah AI computer vision bisa membantu.

## Apa itu AI computer vision?

Computer vision adalah cabang kecerdasan buatan (AI) yang membuat komputer bisa "melihat" dan memahami isi gambar atau video. Sistem dilatih dengan contoh gambar, lalu belajar mengenali objek tertentu, misalnya orang, kendaraan, kardus, atau bangunan.

Hasilnya, komputer bisa menjawab pertanyaan seperti: ada objek apa saja di gambar ini, berapa jumlahnya, dan di mana posisinya. Setiap objek yang ditemukan biasanya ditandai dengan kotak (bounding box) dan tingkat keyakinan, sehingga hasilnya mudah diperiksa ulang oleh manusia.

## Contoh penerapan untuk bisnis dan instansi

Computer vision bisa diterapkan di banyak bidang. Beberapa contoh yang umum:

- Menghitung objek secara otomatis, seperti jumlah orang yang lewat, kendaraan yang masuk, atau barang di jalur produksi.
- Memantau area melalui kamera, misalnya mendeteksi kendaraan yang parkir di tempat terlarang atau pekerja yang tidak memakai helm di area proyek.
- Menganalisis foto dan video dalam jumlah besar, seperti memilah foto dokumentasi lapangan berdasarkan isinya.
- Mengolah foto udara dari drone untuk mengenali bangunan, lahan, atau objek lain di suatu wilayah. Hasilnya bisa digabungkan dengan peta digital (WebGIS) agar lebih mudah dibaca.
- Memeriksa kualitas produk dengan mencari cacat atau ketidaksesuaian dari gambar.

Setiap kebutuhan berbeda, sehingga sistem perlu disesuaikan dengan objek yang ingin dikenali, kondisi kamera, dan cara hasilnya akan dipakai.

## Alur pengerjaan proyek

Agar hasilnya benar-benar berguna, proyek computer vision sebaiknya dikerjakan bertahap:

1. Diskusi kebutuhan. Kami memahami masalah yang ingin diselesaikan, objek apa yang perlu dikenali, dan dari mana gambarnya berasal: CCTV, kamera ponsel, foto drone, atau arsip foto.
2. Pengumpulan dan pelabelan data. Contoh gambar dikumpulkan, lalu objek di dalamnya ditandai satu per satu. Kualitas data di tahap ini sangat menentukan hasil akhir.
3. Pelatihan dan pengujian model. Model AI dilatih dengan data tersebut, lalu diuji dengan gambar yang belum pernah dilihat sebelumnya untuk mengetahui seberapa baik hasilnya.
4. Integrasi. Model dihubungkan ke sistem yang Anda pakai, misalnya dashboard web, aplikasi Android, atau laporan otomatis.
5. Uji coba di lapangan dan penyempurnaan. Sistem dicoba pada kondisi nyata. Jika ada kesalahan, data ditambah dan model diperbaiki.

## Keunggulan dan batasan yang perlu dipahami

Keunggulan utama computer vision adalah konsistensi. Sistem tidak lelah, bisa bekerja terus-menerus, dan menerapkan aturan yang sama pada setiap gambar. Pekerjaan yang sebelumnya memakan waktu berjam-jam bisa dikerjakan jauh lebih cepat, sehingga tim Anda bisa fokus pada keputusan, bukan pada menghitung.

Namun AI juga punya batasan. Hasilnya bergantung pada kualitas gambar: pencahayaan yang terlalu gelap, sudut kamera yang tidak ideal, atau objek yang saling menutupi bisa membuat deteksi meleset. Model juga hanya mengenali objek yang pernah dipelajari. Jika muncul jenis objek baru, model perlu dilatih ulang dengan contoh tambahan.

Karena itu, sistem computer vision sebaiknya dirancang sebagai alat bantu. Untuk keputusan penting, hasil deteksi tetap perlu bisa diperiksa ulang oleh manusia, misalnya dengan menyimpan gambar beserta kotak penandanya. Dengan pendekatan ini, Anda mendapatkan kecepatan AI tanpa kehilangan kendali atas hasil akhirnya.

## Hal yang perlu disiapkan

Anda tidak perlu memahami teknis AI untuk memulai. Yang paling membantu adalah penjelasan masalah yang jelas, contoh gambar atau video dari kondisi sebenarnya, dan gambaran bagaimana hasil deteksi akan dipakai sehari-hari. Dari situ kami bisa menilai apakah computer vision cocok untuk kebutuhan Anda dan pendekatan apa yang paling masuk akal.

## Konsultasikan kebutuhan Anda

Punya pekerjaan menghitung atau memantau yang ingin diotomatiskan? Ceritakan kebutuhan Anda kepada tim Asvel Coding Factory. Konsultasi awal gratis melalui WhatsApp di 0813-3341-3109 atau lewat tombol WhatsApp di halaman ini.
TEXT;

    private const ARTICLE_WEB = <<<'TEXT'
Saat bisnis mulai berkembang, pencatatan di kertas atau spreadsheet biasanya mulai terasa merepotkan. Pilihannya ada dua: memakai aplikasi jadi yang sudah tersedia di pasaran, atau membuat aplikasi web custom yang dirancang khusus. Keduanya sama-sama punya tempat. Artikel ini membantu Anda menentukan mana yang lebih cocok.

## Apa bedanya aplikasi jadi dan aplikasi custom?

Aplikasi jadi adalah software yang dibuat untuk banyak pengguna sekaligus, misalnya aplikasi kasir, akuntansi, atau manajemen proyek. Biasanya Anda tinggal mendaftar, membayar langganan, dan langsung bisa memakainya.

Aplikasi web custom dibuat khusus untuk satu bisnis atau instansi. Fitur, tampilan, dan alurnya mengikuti cara kerja Anda, bukan sebaliknya. Aplikasi ini dibuka lewat browser, sehingga bisa diakses dari komputer maupun ponsel tanpa perlu instalasi.

## Kapan aplikasi jadi sudah cukup?

Aplikasi jadi sering menjadi pilihan yang tepat jika:

- Kebutuhan Anda umum dan sama dengan kebutuhan banyak bisnis lain.
- Anda ingin segera mulai tanpa menunggu proses pembuatan.
- Alur kerja Anda masih bisa menyesuaikan dengan cara kerja aplikasi tersebut.

Jika semua poin di atas sesuai, aplikasi jadi biasanya lebih praktis.

## Tanda bisnis Anda butuh sistem custom

Sistem custom layak dipertimbangkan ketika:

- Alur kerja Anda unik, sehingga aplikasi jadi memaksa banyak langkah tambahan atau pencatatan ganda.
- Data tersebar di beberapa aplikasi dan spreadsheet yang tidak saling terhubung.
- Anda butuh laporan atau dashboard dengan format tertentu yang tidak disediakan aplikasi jadi.
- Ada aturan akses khusus, misalnya setiap bagian hanya boleh melihat data tertentu.
- Sistem perlu terhubung dengan aplikasi lain yang sudah Anda pakai.
- Data berkaitan dengan lokasi dan perlu ditampilkan di peta.

## Contoh aplikasi web custom

Beberapa jenis sistem yang umum dibuat secara custom:

- Sistem informasi, seperti pendataan, pengajuan dan persetujuan, atau pengelolaan arsip.
- Dashboard yang merangkum data dari berbagai sumber menjadi grafik dan laporan.
- WebGIS atau sistem pemetaan, yaitu aplikasi web yang menampilkan data di atas peta interaktif. Contohnya peta sebaran kawasan perumahan, katalog data peta yang bisa dibagikan antarbagian, atau sistem informasi perizinan yang berkaitan dengan pemanfaatan ruang.

WebGIS sangat membantu ketika keputusan bergantung pada lokasi. Data yang sebelumnya hanya berupa tabel alamat atau koordinat bisa langsung dilihat posisinya, difilter, dan dibandingkan di peta.

## Langkah membuat aplikasi web custom

Proses pembuatan aplikasi custom umumnya berjalan seperti ini:

1. Analisis kebutuhan. Kami mempelajari alur kerja yang berjalan saat ini, siapa saja penggunanya, data apa yang dikelola, dan laporan apa yang dibutuhkan.
2. Rancangan sistem dan tampilan. Alur aplikasi dan contoh tampilan (prototipe) dibuat terlebih dahulu, sehingga Anda bisa memberi masukan sebelum proses coding dimulai.
3. Pengembangan bertahap. Aplikasi dibangun per bagian, dan setiap bagian bisa Anda coba untuk memastikan hasilnya sesuai harapan.
4. Pengujian dan migrasi data. Aplikasi diuji, lalu data lama dari spreadsheet atau sistem sebelumnya dipindahkan jika diperlukan.
5. Peluncuran dan pendampingan. Aplikasi dipasang di server, pengguna diberi panduan, dan perbaikan dilakukan berdasarkan pemakaian nyata.

Dengan alur seperti ini, risiko aplikasi tidak sesuai kebutuhan bisa ditekan sejak awal, karena Anda terlibat di setiap tahap.

## Hal yang perlu dipertimbangkan

Aplikasi custom membutuhkan waktu untuk dirancang dan dibangun, serta perlu dirawat setelah berjalan. Karena itu, mulailah dari kebutuhan yang paling penting terlebih dahulu. Sistem bisa dikembangkan bertahap: fitur inti dibuat dan dipakai dulu, lalu fitur lain ditambahkan sesuai masukan pengguna.

Keuntungannya, sistem tumbuh mengikuti bisnis Anda, dan data sepenuhnya berada dalam kendali Anda.

## Masih ragu mana yang cocok?

Ceritakan alur kerja dan kendala yang Anda hadapi sekarang. Tim Asvel Coding Factory akan membantu menilai apakah aplikasi jadi sudah cukup atau sistem custom lebih tepat. Konsultasi gratis melalui WhatsApp di 0813-3341-3109 atau lewat tombol WhatsApp di halaman ini.
TEXT;

    private const ARTICLE_MOBILE = <<<'TEXT'
Ponsel Android sudah menjadi alat kerja sehari-hari bagi banyak orang, termasuk tim lapangan, staf gudang, dan tenaga penjualan. Namun di banyak bisnis, ponsel tersebut baru dipakai untuk chat dan foto, sementara pencatatan tetap dilakukan di kertas lalu diketik ulang di kantor. Aplikasi Android yang dibuat sesuai kebutuhan bisa menutup celah ini.

## Mengapa Android?

Android banyak digunakan di Indonesia dan tersedia di berbagai pilihan harga. Artinya, tim Anda kemungkinan besar sudah memiliki perangkatnya dan terbiasa memakainya. Aplikasi Android juga bisa memanfaatkan fitur bawaan ponsel seperti kamera, GPS, dan notifikasi.

## Manfaat untuk operasional bisnis

Aplikasi Android yang dirancang khusus dapat membantu:

- Mencatat data langsung di lokasi, sehingga tidak perlu menyalin ulang dari kertas.
- Melampirkan foto dan titik lokasi GPS sebagai bukti kegiatan di lapangan.
- Mengirim data ke sistem pusat sehingga atasan bisa memantau perkembangan tanpa menunggu laporan manual.
- Memberi notifikasi tugas baru atau pengingat kepada tim.
- Menyeragamkan format laporan, karena semua orang mengisi formulir yang sama.

Manfaat yang paling terasa biasanya adalah berkurangnya pekerjaan ganda dan data yang lebih cepat sampai ke orang yang membutuhkan.

## Contoh penerapan

Beberapa contoh aplikasi Android untuk operasional:

- Aplikasi survei lapangan untuk mengisi formulir, mengambil foto, dan menandai lokasi.
- Aplikasi absensi dan laporan kegiatan untuk tim yang bekerja di luar kantor.
- Aplikasi pencatatan stok untuk mencatat barang masuk dan keluar di gudang.
- Aplikasi untuk pelanggan, misalnya pemesanan, pengecekan status pesanan, atau informasi layanan.
- Aplikasi pendamping sistem web, sehingga data dari lapangan langsung masuk ke dashboard atau peta WebGIS di kantor.

Aplikasi juga bisa dikombinasikan dengan AI computer vision, misalnya foto yang diambil dari aplikasi langsung dianalisis untuk mengenali objek tertentu.

## Langkah membangun aplikasi Android

Pembuatan aplikasi biasanya dimulai dari memahami siapa penggunanya dan apa yang mereka kerjakan setiap hari. Setelah itu dibuat rancangan tampilan agar mudah dipakai, termasuk oleh pengguna yang tidak terbiasa dengan teknologi. Aplikasi kemudian dibangun, diuji bersama calon pengguna, lalu dirilis, baik melalui Google Play maupun dipasang langsung di perangkat internal.

Sama seperti aplikasi web, aplikasi Android bisa dibangun bertahap. Mulailah dari satu proses yang paling sering dikeluhkan, lihat hasilnya, lalu kembangkan ke proses berikutnya.

## Hal yang perlu dipertimbangkan

Sebelum membuat aplikasi, ada beberapa hal yang sebaiknya dibahas sejak awal:

- Koneksi internet di lokasi kerja. Jika tim sering bekerja di area dengan sinyal lemah, aplikasi perlu dirancang agar data bisa disimpan dulu di ponsel lalu dikirim saat koneksi tersedia.
- Ragam perangkat. Ponsel yang dipakai tim bisa berbeda-beda ukuran layar dan versi Android-nya, sehingga aplikasi perlu diuji di beberapa perangkat.
- Keamanan data. Akses perlu dibatasi dengan login, dan data penting sebaiknya tersimpan di server, bukan hanya di ponsel, agar tidak hilang ketika perangkat rusak atau berganti.
- Kemudahan pemakaian. Tampilan yang sederhana, tombol yang jelas, dan jumlah isian yang secukupnya membuat aplikasi lebih cepat diterima oleh tim.
- Perawatan setelah rilis. Android terus diperbarui, dan kebutuhan bisnis juga berubah. Rencanakan pembaruan berkala agar aplikasi tetap berjalan dengan baik.

Membahas hal-hal ini di awal membantu menghindari perubahan besar di tengah jalan, sehingga proses pembuatan lebih lancar.

## Mulai dari kebutuhan Anda

Punya proses di lapangan yang masih manual dan ingin dirapikan? Ceritakan kepada tim Asvel Coding Factory. Konsultasi gratis melalui WhatsApp di 0813-3341-3109 atau lewat tombol WhatsApp di halaman ini.
TEXT;
}
