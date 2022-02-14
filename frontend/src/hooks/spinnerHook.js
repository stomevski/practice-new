import { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';



const useSpinner = () => {

    const [spinner, setSpinner] = useState(false);

    const spinnerForm = <div style={{ "width": "100%", "height": "100vh", "display": "flex", "justifyContent": "center", "alignItems": "center", }}>
        <TailSpin
            heigth="200"
            width="200"
            color="#24A19C"
        />
    </div>

    return {
        spinner,
        setSpinner,
        spinnerForm
    }


}


export default useSpinner;