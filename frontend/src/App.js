import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { eventSubmitAction } from './components/EventForm';
import EditEvent from './Pages/EditEvent';
import Error from './Pages/Error';
import EventDetail, { eventDetailAction as deleteEvent, eventDetailLoader } from './Pages/EventDetail';
import Events, { eventsLoader } from './Pages/Events';
import Home from './Pages/Home';
import NewEvent from './Pages/NewEvent';
import Roots from './Pages/Root';
import RootNavigation from './Pages/RootNavigation';
import NewsletterPage, { action as newsletterAction } from './Pages/Newsletter';

// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

function App () {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Roots />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'events', element: <RootNavigation />, children: [
            {
              index: true, element: <Events />, loader: eventsLoader // for loader refer to how-to-use.txt line 15-18 
            },
            { path: 'new', element: <NewEvent />,  action: eventSubmitAction},
            {
              path: ':eventID', loader: eventDetailLoader, id: "event-detail", children: [
                { index: true, element: <EventDetail /> , action: deleteEvent},
                { path: 'edit', element: <EditEvent /> , action: eventSubmitAction},
              ]
            },
            // { path: ':eventID/edit', element: <EditEvent /> },
          ]
        },
		{
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      ],
    }
  ])

  return <div className='homePage'>
    <RouterProvider router={router} />
  </div>;
}

export default App;
