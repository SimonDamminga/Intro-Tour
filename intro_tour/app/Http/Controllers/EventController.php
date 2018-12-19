<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\EventTour;
use App\Tour;
use App\Location;
use App\Question;
use Response;
use DB;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $events = DB::table('EventTour')
        // ->join('tours', 'tour_id', '=', 'tours.id')
        // ->join('events', 'event_id', '=', 'events.id')
        // ->get();

        $events = EventTour::with('event')
        ->with('tour')
        ->get();

        return $events;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $event = Event::create($request->all());

        return response()->json($event, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $events = EventTour::with('event')->with('tour')->where('tour_id', '=', $id)->get();
        return $events;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function storeEventTour(Request $request)
    {
        $event_tour = EventTour::create($request->all());

        return response()->json($event_tour, 201);
    }

    public function deleteEventTour($id)
    {
        EventTour::where('event_id', $id)->delete();

        return response()->json(null, 204);
    }

    public function getEventsByTourId($id)
    {
        $eventTours = EventTour::where('tour_id', $id)->get();
        $events = [];

        foreach ($eventTours as $eventTour)
        {
            $event = Event::where('id', $eventTour->event_id)->get();
            $location = Location::where('id', $event[0]->trigger['data']['location_id'])->get();
            $question = Question::where('id', $event[0]->action['data']['question_id'])->with('answers')->get();

            $event[0]->location = $location[0];
            $event[0]->question = $question[0];

            array_push($events, $event);
        }

        return response()->json($events, 200);
    }
}
