import { useRef } from "react";
import { say, useAppContext } from "./App";
import soundIcon from "./assets/sound_icon.svg";




export function FullTextMode({ visible = false }: { visible?: boolean }) {
    
    const inputElementRef = useRef<HTMLInputElement>(null);

    // const [outputText, setOutputText] = useState<string>("");

    const { setBrailleText, brailleText } = useAppContext();

    function onInputChanged() {

        if (!inputElementRef.current) {   
            return;
        }
        

        setBrailleText(
            inputElementRef.current.value
        );
    }
    
    function onHearButtonClicked() {
        say(brailleText);
    }

    return (

        <div className="right_side" style={{
            width: "50%",
            position: "absolute",
            left: "50%",
            top: "0",
            right: "0",
            bottom: "0",
            display: visible? "unset" : "none"
        }}>
            <input value={visible ? undefined : ""} maxLength={80} placeholder="Escriba aquí" className="centered" style={{ fontSize: "58px", width: "80%" }} ref={inputElementRef} type="text" onChange={onInputChanged} />
            
            <button onClick={onHearButtonClicked} style={{
                boxSizing: "border-box",
                padding: "5px",
                width: "42px",
                height: "42px",

                position: "absolute",
                
                top: "20px",
                left: "20px"
            }}>
                <img style={{width:"100%", height:"100%"}} src={soundIcon} />
            </button>
        </div>
    );
}