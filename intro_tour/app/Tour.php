<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
	protected $casts = [
		'play_area' => 'array'
	];

    protected $fillable = [
		'name', 'team_limit', 'description', 'tour_code', 'time_limit', 'time_start', 'play_area'
	];
}
