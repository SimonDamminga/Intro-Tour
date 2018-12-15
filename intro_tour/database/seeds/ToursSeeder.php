<?php

use Illuminate\Database\Seeder;

class ToursSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('Tours')->insert 
        ([
            [
                'name' => "Introductie Applicatie Ontwikkelaar",
                'team_limit' => 2,
                'description' => "Weet jij alle vragen te beantwoorden? Vind alle vragen versprijdt over het leerpark",
				'tour_code' => 778899,
                'time_limit' => 10800,
                'play_area' => '[{"lat": 51.807640, "lng": 4.744030}, {"lat": 51.822284, "lng": 4.671277}, {"lat": 51.798935, "lng": 4.623334}, {"lat": 51.759002, "lng": 4.630883}, {"lat": 51.782584, "lng": 4.715647}]'
            ],
            [
                'name' => 'Rondje Dord',
                'team_limit' => 10,
				'description' => 'Kom alles te weten over de Historische binnenstad van Dordrecht.',
				'tour_code' => 123456,
                'time_limit' => 5400,
                'play_area' => '[{"lat": 51.807640, "lng": 4.744030}, {"lat": 51.822284, "lng": 4.671277}, {"lat": 51.798935, "lng": 4.623334}, {"lat": 51.759002, "lng": 4.630883}, {"lat": 51.782584, "lng": 4.715647}]'
            ],
            [
                'name' => 'Mc Tour',
                'team_limit' => 5,
                'description' => 'Een zoektocht naar alle McDonald\'s in Nederland',
				'tour_code' => 654321,
                'time_limit' => 60,
                'play_area' => '[{"lat": 51.807640, "lng": 4.744030}, {"lat": 51.822284, "lng": 4.671277}, {"lat": 51.798935, "lng": 4.623334}, {"lat": 51.759002, "lng": 4.630883}, {"lat": 51.782584, "lng": 4.715647}]'
            ]
        ]);

    }
}
