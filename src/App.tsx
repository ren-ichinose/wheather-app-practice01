import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Loading from "./components/Loading";
import Results from "./components/Results";
import Title from "./components/Title";

interface ResultState {
    country: string;
    cityName: string;
    temperature: string;
    conditionText: string;
    icon: string;
}

function App() {
  const [ city, setCity ] = useState<string>("");
  const [ result, setResult ] = useState<ResultState>({
    country: "",
    cityName: "",
    temperature: "",
    conditionText: "",
    icon: "",
  })
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const getWeather = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`)
      .then(res => res.json())
      .then(data => { 
        setResult({
          country: data.location.country,
          cityName: data.location.name,
          temperature: data.current.temp_c,
          conditionText: data.current.condition.text,
          icon: data.current.condition.icon,
        })
        setIsLoading(false);
        setCity("");
      })
      .catch(() => alert('入力内容を確認してください'))
  }
  return (  
    <div className="App">
      <Title />
      <Form 
        city = { city }
        setCity = { setCity }
        getWeather = { getWeather }/>
      { isLoading ? <Loading /> : <Results result = { result } /> }
    </div>
  );
}

export default App;
