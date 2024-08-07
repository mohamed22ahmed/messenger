<?php

namespace App\Http\Controllers;

use App\Http\Requests\SearchRequest;
use App\Models\User;

class MessengerController extends Controller
{
    public function index(){
        return view('messenger.index');
    }

    public function search(SearchRequest $request){
        $query = $request->input('query');
        $users = User::whereLike('name', '%'.$query.'%')
                ->orWhereLike('username', '%'.$query.'%')
                ->limit(10)
                ->get();

        $html = '';
        foreach ($users as $user) {
            $html .= view('messenger.components.search-user-component', ['user' => $user])->render();
        }

        return response()->json(['html' => $html]);
    }
}
