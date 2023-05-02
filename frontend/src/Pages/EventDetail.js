import React, { Suspense } from 'react';
import EventItem from '../components/EventItem';
import { Await, defer, json, redirect, useParams, useRouteLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { loadEvents } from './Events';

const EventDetail = () => {
    const params = useParams();
    const { event, events } = useRouteLoaderData("event-detail");

    return <>
        <Suspense fallback={<p style={{ textAlign: "center" }}>"Loading..."</p>}>
            <Await resolve={event}>
                {(loadedEvent) => <EventItem event={loadedEvent} />}
            </Await>
        </Suspense>

        <Suspense fallback={<p style={{ textAlign: "center" }}>"Loading..."</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    </>
}

export default EventDetail;
async function loadEvent (id) {
    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        throw json({ message: "Could not find the details of this event." }, { status: 500 })
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

export async function eventDetailLoader ({ request, params }) {
    const id = params.eventID;
    return defer({
        event: await loadEvent(id),
        events: loadEvents()
    })
}

export async function eventDetailAction ({ params, request }) {
    const eventId = params.eventID;
    console.log("params", params)
    console.log(eventId)
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
    });
    if (!response.ok) {

        return json(
            { message: "Could not delete the event." },
            { status: 500 }
        )
    }

    return redirect("/events");
}