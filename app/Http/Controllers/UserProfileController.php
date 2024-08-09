<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserProfileRequest;
use App\Models\User;
use App\Traits\FileUploadTrait;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;

class UserProfileController extends Controller
{
    use FileUploadTrait;

    public function update(UserProfileRequest $request){
        $avatarPath = $this->uploadFile($request, 'avatar') ?? auth()->user()->avatar;

        if($avatarPath != auth()->user()->avatar){
            if(File::exists(auth()->user()->avatar)){
                unlink(public_path(auth()->user()->avatar));
            }
        }

        if ($request->filled('password')) {
            auth()->user()->update([
                'password' => Hash::make($request->password),
            ]);
        }

        auth()->user()->update([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'avatar' => $avatarPath
        ]);

        return response()->json(['message' => 'Updated Successfully']);
    }

    public function show($id){
        return response()->json(User::findOrFail($id));
    }
}
