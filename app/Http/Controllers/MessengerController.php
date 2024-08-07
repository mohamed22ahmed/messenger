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
                ->paginate(10);
        
        $html = '';
        foreach ($users as $user) {
            $html .= view('messenger.components.search-user-component', ['user' => $user])->render();
        }

        if(!$html)
            $html = '<p class="text-center">No Results To Show</p>';

        return response()->json(['html' => $html, 'last_page' => $users->lastPage()]);
    }
}
