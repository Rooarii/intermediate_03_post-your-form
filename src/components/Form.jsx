import React, {useState} from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {
    const [title, setTitle]=useState('');
    const [poster, setPoster]=useState('');
    const [comment, setComment]=useState('');

    /* generic onChange function that allows to capture the id of:
        input title
        input poster
        input comment 
    */
    const onChange=(e)=>{
        let eventId=e.currentTarget.id;
        let eventValue=e.currentTarget.value;
        // cases handle
        switch(eventId){
            case 'title':
                setTitle(eventValue)
                break;
            case 'poster':
                setPoster(eventValue)
                break;
            case 'comment':
                setComment(eventValue)
                break;
            // errors handle
            default:
                console.log(`An error occured on ${eventId} input`)
        }
    }

    const config ={
        url: 'https://post-a-form.herokuapp.com/api/movies',
        method: 'POST',
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        data: {
            title: title,
            poster: poster,
            comment: comment
        }
    };

    const onSubmit =(e)=>{
        e.preventDefault();
        // axios request passing config 
        axios(config)
            .then((res)=>res.data)
            .then((res)=>{
                alert(`Movie ${title} has been sent!`)
            })
            .catch((error)=>{
                alert("Oups ... an error occured :(")
            });
    }

    return (
        <>
            <form 
                id="form"
                onSubmit={onSubmit}
            >
                <fieldset>
                    <legend id="legend">Favorite Movie</legend>
                    <div>
                        <label htmlFor="title">Movie</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="poster">Movie Url</label>
                        <input
                            type="text"
                            id="poster"
                            value={poster}
                            onChange={onChange}
                            placeholder="https://www.rooariimanuel.com/"
                        />
                    </div>
                    <div>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                            type="textarea"
                            id="comment"
                            value={comment}
                            onChange={onChange}  
                        />
                    </div>
                    <button type="submit" value="send">Send</button>
                </fieldset>

            </form>
        </>
    );
}

export default Form;