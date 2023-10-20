import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [apiData, setApiData] = useState({});
    const [powerData, setPowerData] = useState({});
    useEffect(() => {
        axios.get("http://192.168.1.100/relay/0").then((response) => {
            setApiData(response.data);
        });
        axios.get("http://192.168.1.100/settings/status").then((response) => {
            setPowerData(response.data);
        });
    }, [])

    const [powerState, setPowerState] = useState(apiData.ison);
    const switchPowerState = () => {
        axios.get("http://192.168.1.100/relay/0?turn="+ (powerState ? "on" : "off"));
        setPowerState(!powerState);
    };

    return (
        <div className="App">
            <h1>API Shelly</h1>
            <div>
                <img
                    src={powerState === true ? 'switchButtonOn.svg' : 'switchButtonOff.svg'}
                    alt="switchButton"
                    onClick={switchPowerState}
                    className="switchButton"
                />
            </div>
            <div>
                <h3>Informations : </h3>

            </div>
        </div>
    );
}

export default App;
