import {useState, useEffect} from 'react';
import axios from 'axios'
function MovieReviews(props)
{

    function GetStars(score)
    {
        if (score == 1)
        {
            return (
                <div className='reviewRating'>
                <span className='starFilled'>★</span>
                <span className='starEmpty'>☆</span>
                <span className='starEmpty'>☆</span>
                <span className='starEmpty'>☆</span>
                <span className='starEmpty'>☆</span>
                </div>
            );
        }
        else if (score == 2)
        {
            return (
                <div className='reviewRating'>
                <span className='starFilled'>★</span>
                <span className='starFilled'>★</span>
                <span className='starEmpty'>☆</span>
                <span className='starEmpty'>☆</span>
                <span className='starEmpty'>☆</span>

              </div>
            );
        }
        else if (score == 3)
        {
            return (
                <div className='reviewRating'>
                <span className='starFilled'>★</span>
                <span className='starFilled'>★</span>
                <span className='starFilled'>★</span>
                <span className='starEmpty'>☆</span>
                <span className='starEmpty'>☆</span>

              </div>
            );
        }
        else if (score == 4)
        {
            return (
                <div className='reviewRating'>
                <span className='starFilled'>★</span>
                <span className='starFilled'>★</span>
                <span className='starFilled'>★</span>
                <span className='starFilled'>★</span>
                <span className='starEmpty'>☆</span>
              </div>
            );
        }
        else // 5 stars
        {
            return (
                <div className='reviewRating'>
                <span className='starFilled'>★</span>
                <span className='starFilled'>★</span>
                <span className='starFilled'>★</span>
                <span className='starFilled'>★</span>
                <span className='starFilled'>★</span>

              </div>
            );
        }
    }

    const [revs, setRev] = useState()
    console.log("prop: " + props.id)
    const thisMovie = {
        movID: props.id
    }
    useEffect(() => {
        axios.post("http://localhost:8000/getreviews", thisMovie).then((res) => {
            let reviewsjson = res.data;
            setRev(reviewsjson);
            
        })
    }, []);



    return (
        <div>
            {(typeof revs === 'undefined') ? (
                <p>Getting Reviews...</p>
            ) : (
                revs.map(review =>
                    <div id='review'>
                    <div id='reviewTop'>
                    <h2 id='reviewAuthor'>{review.author}</h2>
                    <h2 id="reviewTitle">{review.title}</h2>
                    {GetStars(review.rating)}
                    </div>
                    <div id='reviewBottom'>
                    <p id='reviewPG'>{review.content}</p>
                    </div>
                </div>
                )
            )}
        </div>
    );


}

export default MovieReviews;