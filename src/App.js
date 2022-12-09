import './App.css';
import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer';

function App() {

//Setting up the initial states using
// react hook 'useState"
const [video, setVideo] = useState("");
const [warning, setWarning] = useState(false);
const [loading, setLoading] = useState(false);
const [videoURL, setVideoURL] =
	useState("https://www.youtube.com/watch?v=uzlHkac--qI");

//A function to fetch the required URL
// and storing it inside the
// videoURL state variable
function handleSearch() {

  //prevent empty input search
  if(video === ''){
     setWarning(true)
      return}
	movieTrailer(video).then((res) => {
    if(!res){
      setLoading(true)
    } else{ setLoading(false)}
	setVideoURL(res);
	});
}

useEffect(() => {
  //remove warning text after 5sec
  setTimeout(() => {
    if(warning === true){
      setWarning(false)
    }
  }, 5000);
}, [warning])


return (
	<div className="App">
		<label>
    <h1>YouTube Movies Trailer</h1>
		</label>
	<div className="search-box">
		<input type="text" onChange=
			{(e) => { setVideo(e.target.value) }} />
		<button onClick={()=>{handleSearch()}}>🔍</button>
	</div>
  {warning && <span>Enter movie title!</span>}

  {loading === true ? <p>loading...</p> : 
  <div className='rpw'>
{/* <ReactPlayer wrapper={'div'}></ReactPlayer> */}
	<ReactPlayer height={'100%'} width={'100%'} url={videoURL} controls={true} playing={true} pip={true} stopOnUnmount={false}/>
  </div>
  }
  <div>
    <br />
  </div>
	</div>
);
}

export default App;
