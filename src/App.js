import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [apiData, setApiData] = useState({});
    const [powerState, setPowerState] = useState(false);
    const id = "4022d88e30e8";
    const auth_key = "MWNiMjY5dWlk404459961993DCA83AE44BC6E3A6F58906952E7BECA0A5B69DC375C964915ACBC0EA536A0639CB73";

    useEffect( () => {
        axios.get("https://shelly-77-eu.shelly.cloud/device/status?id="+id+"&auth_key="+auth_key).then(async (response) => {
            await setApiData(response.data.data.device_status);
            setPowerState(response.data.data.device_status.relays[0].ison);
        });
    }, [])

    const switchPowerState = () => {
        const FormData = require('form-data');
        let data = new FormData();
        data.append('id', id);
        data.append('turn', powerState ? 'off' : 'on');
        data.append('auth_key', auth_key);
        data.append('channel', '0');

        const headers = data.getHeaders ? data.getHeaders() : { 'Content-Type': 'multipart/form-data' };
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://shelly-77-eu.shelly.cloud/device/relay/control',
            headers: {
                ...headers
            },
            data : data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
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
            <div className={'informations'}>
                <h3>Informations : </h3>
                <p>Overtemperature : {apiData.overtemperature ? 'Oui' : 'Non'}</p>
                <p>Temperature : {apiData.temperature}</p>
            </div>
        </div>
    );
}

export default App;
