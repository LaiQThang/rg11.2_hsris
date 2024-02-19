<?php

namespace App\Services;

use Exception;
use Google_Client;
use Google_Service_Drive;
use Google_Service_Drive_DriveFile;
use Illuminate\Support\Arr;
class GoogleDrive {

    public static function POST($file)
    {
        // Tạo dịch vụ Google Drive
        $service = self::service();
        $parentFolderId = env('GOOGLE_DRIVE_FOLDER_ID');
        // Tạo một file metadata
        $fileMetadata = new Google_Service_Drive_DriveFile([
            'name' => $file->getClientOriginalName(),
            'parents' => [$parentFolderId],
        ]);

        // Upload file vào Google Drive

        $content = file_get_contents($file->getRealPath());
        // dd($service);
        try{
            $driveFile = $service->files->create($fileMetadata, [
                'data' => $content,
                'mimeType' => $file->getClientMimeType(),
                'uploadType' => 'multipart',
            ]);
    
            // dd($driveFile);
            // Lấy fileId của file vừa tải lên
            $fileId = $driveFile->id;
    
            return $fileId;
        }
        catch(Exception $e){
            return false;
        }
    }

    public static function DELETE($fileId)
    {
        // Tạo dịch vụ Google Drive
        $service = self::service();

        try {
            // Gọi phương thức delete để xoá file
            $service->files->delete($fileId);
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    private static function service()
    {
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

        return $service;
    }
}