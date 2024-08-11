<?php

namespace App\Traits;

trait MessengerTrait
{
    function timeAge($timestamp){
        $seconds = time() - strtotime($timestamp);

        if(!$seconds)
            return "a seconds ago";
        if($seconds < 60)
            return "$seconds seconds ago";
        if($seconds/60 < 60)
            return ceil($seconds/60) ." Minutes ago";
        if($seconds/3600 < 24)
            return ceil($seconds/3600) ." Hours ago";
        return date('d M Y', strtotime($timestamp));
    }
}
