import axios from "axios";
import { useState } from "react";

const App = () => {
    const [city,setCity] = useState("");
    const [data,setData] = useState(null);
    const [notFound,setNotFound] = useState(null)
    const handleChange = (e) => {
        setCity(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8000/temp?city=${city}`).then(res=>{
            console.log(res);
            setData(res.data);
            res.data.cod === '404' && setNotFound(res.data.message);
        }).catch(e=>console.log(e.message));
    }
    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" placeholder="Enter city" value={city} onChange={(e)=>handleChange(e)}/>
            <button type="submit">Send</button>
            <button type="reset" onClick={()=>{
                setCity(null);
                setData(null);
                setNotFound(null)
                }}>Clear</button>
            </form>
            {
                data &&  data.cod === 200 &&
                <div>
                    <p>Weather-type:{data.weather[0].description}</p>
                    <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                    <p>City:{data.name}</p>
                    <p>Temp:{data.main.temp}</p>
                    <p>Min:{data.main.temp_min}</p>
                    <p>Max:{data.main.temp_max}</p>
                </div>
            }
            {
                notFound && 
                <div>{notFound}</div>
            }
        </div>
    )
}
export default App;