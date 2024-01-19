<?php

namespace App\Models\Api\V1;

use Google_Client;
use Google_Service_Drive;
use Google_Service_Drive_DriveFile;
use App\Models\Api\ApiModel;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Yaza\LaravelGoogleDriveStorage\Gdrive;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CTBaoCaoSVModel extends ApiModel
{
    use HasFactory;

    public function addFileBaoCaoSV($request)
    {
        if($request->hasFile('file'))
        {
            // dd(sinhvien::all()->toArray());
            // dd(Gdrive::get('demo2.jpg'));
            // dd(File::get($request->file('file')));

            // dd(File::get(public_path($request->file('file')->getClientOriginalName())));
            // dd(Storage::disk('google')->put('demo2.jpg', File::get($request->file('file'))));
            // dd(public_path($request->file('file')->getClientOriginalName()));
            // dd($request->file('file')->getClientOriginalName());
            // dd(config('GOOGLE_DRIVE_REFRESH_TOKEN'));

            //lấy ra id
            // $client = new Google_Client();
            // $client->setApplicationName('hsris_cloud_server');
            // $client->setScopes(Google_Service_Drive::DRIVE_FILE);
            // $client->setAuthConfig([
            //     'client_id' => env('GOOGLE_DRIVE_CLIENT_ID'),
            //     'client_secret' => env('GOOGLE_DRIVE_CLIENT_SECRET'),
            // ]);
            // $client->refreshToken(env('GOOGLE_DRIVE_REFRESH_TOKEN'));

            // // Khởi tạo dịch vụ Google Drive
            // $service = new Google_Service_Drive($client);

            // // Lấy thông tin về tệp tin
            // $fileList = $service->files->listFiles([
            //     'q' => "name = 'demo.docx'",
            // ]);

            // if (count($fileList->getFiles()) > 0) {
            //     // Lấy fileId của tệp đầu tiên (giả sử không có tên tệp trùng lặp)
            //     $fileId = $fileList->getFiles()[0]->getId();
            //     dd($fileId);
            //     return $fileId;
            // }
            $file = $request->file('file');
            $client = new Google_Client();
            $client->setApplicationName('hsris_cloud_server');
            $client->setScopes([Google_Service_Drive::DRIVE_FILE]);
            $client->setAuthConfig([
                'client_id' => env('GOOGLE_DRIVE_CLIENT_ID'),
                'client_secret' => env('GOOGLE_DRIVE_CLIENT_SECRET'),
            ]);
            $client->refreshToken(env('GOOGLE_DRIVE_REFRESH_TOKEN'));
            // Tạo dịch vụ Google Drive
            $service = new Google_Service_Drive($client);
            $parentFolderId = env('GOOGLE_DRIVE_FOLDER_ID');
            // Tạo một file metadata
            $fileMetadata = new Google_Service_Drive_DriveFile([
                'name' => $file->getClientOriginalName(),
                'parents' => [$parentFolderId],
            ]);

            // Upload file vào Google Drive

            $content = file_get_contents($file->getRealPath());
            // dd($service);
            $driveFile = $service->files->create($fileMetadata, [
                'data' => $content,
                'mimeType' => $file->getClientMimeType(),
                'uploadType' => 'multipart',
            ]);

            // dd($driveFile);
            // Lấy fileId của file vừa tải lên
            $fileId = $driveFile->id;
            dd($fileId);
        }
    }
}
