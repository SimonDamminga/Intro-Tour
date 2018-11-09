<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'tour_id', 'team_name', 'team_leader', 'team_pin', 'team_score', 'questions_answerd'
    ];

    protected $casts = [
        'questions_answerd' => 'array'
    ];
}
