<?php

use Illuminate\Database\Seeder;

class QuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('questions')->insert
        ([
        [
        'question' => "How can you repel the haters?",
        ],[
        'question' => "Whitch is the better paul brother?",
        'hint' => "none",
        ],[
        'question' => "Why are we still here?"
        ]
        ]);

        DB::table('answers')->insert
        ([
        [
        'answer' => "spit on them",
        'right_answer' => "0",
        'question_id' => 1,
        ],[
        'answer' => "Dab on the haters",
        'right_answer' => "1",
        'question_id' => 1,
        ],[
        'answer' => "Walk away like a responible adult",
        'right_answer' => "0",
        'question_id' => 1,
        ],[
        'answer' => "Logan Paul",
        'right_answer' => "0",
        'question_id' => 2,
        ],[    
        'answer' => "Jake Paul",
        'right_answer' => "1",
        'question_id' => 2,
        ],[
        'answer' => "Just to suffer",
        'right_answer' => "1",
        'question_id' => 3,
        ],[    
        'answer' => "To survive and reproduce",
        'right_answer' => "0",
        'question_id' => 3,
        ]    
        ]);

    }
}
