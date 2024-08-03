<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserProfileRequest;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    public function update(UserProfileRequest $request){
        dd($request->all());
    }
}
