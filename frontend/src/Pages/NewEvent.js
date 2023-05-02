import React from 'react';
import { json, redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';

const NewEvent = () => {

    return <>
        <EventForm method={"post"}/>
    </>
}


export default NewEvent;

