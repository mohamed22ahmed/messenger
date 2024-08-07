<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait FileUploadTrait
{
    function uploadFile(Request $request, string $inputName, string $path='uploads'){
        if($request->has($inputName)){
            $file = $request->{$inputName};
            $ext = $file->getClientOriginalExtension();
            $fileName = 'media_'.uniqid().'.'.$ext;
            $file->move(public_path($path), $fileName);
            return $path.'/'.$fileName;
        }

        return null;
    }
}
