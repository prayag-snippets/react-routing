import PageContent from "../components/PageContent";
import MainNavigation from '../components/MainNavigation';
import { useRouteError } from "react-router-dom";

function Error () {
    const error = useRouteError();
    let title = "An error occured.";
    let message = "Something Went Wrong...";

    if (error.status === 500) {
        // error = JSON.parse(error.data).message;
        error = error.data.message; // we don't need to parse data as we are returning data from json() method
    }

    if (error.status === 404) {
        title = "Not Found!";
        message = "Could not found resource or page..."
    }


    return <>
        <MainNavigation />
        <PageContent title={title} >
            {message}
        </PageContent>
    </>
}

export default Error;