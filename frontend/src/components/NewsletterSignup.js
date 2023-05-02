import classes from './NewsletterSignup.module.css';
import { useFetcher } from 'react-router-dom' 
import { useEffect } from 'react';

function NewsletterSignup () {
    const fetcher = useFetcher();
    const { data, state } = fetcher;

    
    useEffect(()=>{
        if( state === 'idle' && data && data.message){
            console.log(state, data.message)
            window.alert(data.message);
        }
    },[data, state])

    //fetcher.Form => will not navigate you towards any page , it'll keep ypou on that page only after submission.
    //Form  will navigate you towards the pade after submission of form.
    return (
            <fetcher.Form method="post" className={classes.newsletter}>
                <input
                    type="email"
                    placeholder="Sign up for newsletter..."
                    aria-label="Sign up for newsletter"
                />
                <button>Sign up</button>
            </fetcher.Form>
    );
}

export default NewsletterSignup;