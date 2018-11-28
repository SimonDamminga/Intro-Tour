<?php

use Illuminate\Database\Seeder;

class ParticipantsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('participants')->insert
        ([
            [
            'name' => "henk",
            'team_id' => 1
            ],[
            'name' => "harry",
            'team_id' => 1
            ],[
            'name' => "yea",
            'team_id' => 2
            ],[
            'name' => "boi",
            'team_id' => 2
            ]
        ]);
        
        DB::table('teams')->insert
        ([
            [
            'team_name' => "team1",
            'tour_id' => 1,
            ],[
            'team_name' => "team2",
            'tour_id' => 1,
            ]
        ]);

        DB::table('admins')->insert
        ([
            [
            'username' => "NekoBot",
            'password' => hash::make("admin"),
            ],[
            'username' => "KeemStar",
            'password' => hash::make("admin"),
            ]
        ]);
        DB::table('admin_tour')->insert
        ([
            [
            'admin_id' => 1,
            'tour_id' => 1,
            ],[
            'admin_id' => 2,
            'tour_id' => 1,
            ]
        ]);
    }
}
