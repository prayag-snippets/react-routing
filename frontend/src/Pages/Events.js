import EventsList from '../components/EventsList';
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

function Events () {
    const data = useLoaderData();
    console.log(data);
    // if (data.isError === true) {
    //     return <p>{data.message}</p>
    // }
    const events = data.events;
    return (
        <>
            <Suspense fallback={<p style={{ textAlign: "center" }}>"Loading..."</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    );
}


export default Events;

export async function loadEvents () {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        // return { isError: true, message: "Could not fetch events." }
        // throw new Response(JSON.stringyfy({ message:"Could not fetch events." }, { status: 500 } ))
        return json({ message: "Could not fetch events." }, { status: 500 })
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export function eventsLoader () {
    return defer({
        events: loadEvents()
    })
}