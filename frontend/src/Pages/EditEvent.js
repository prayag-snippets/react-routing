import React from 'react';
import EventForm from '../components/EventForm';
import { useRouteLoaderData } from 'react-router-dom';

const EditEvent = () =>{
    const data = useRouteLoaderData('event-detail');
    console.log("Edit event",data);

    return <>
    <h1>EditEvent Page</h1>
    <EventForm  method={"put"} event={data.event} />
    </>
}


export default EditEvent;