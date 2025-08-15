import { useEffect } from "react";
import { AppMode, useAppContext } from "./App";

export function LettersMode({ visible = false }: { visible?: boolean }) {
    
    const CHARACTERS = Array.from("ABCDEFGHIJKLMNÑOPQRSTUVWXYZ#0123456789,;.:?!()");
    const { setBrailleText, playAudio, mode } = useAppContext();

    function onButtonClicked(char:string, index:number) {
        setBrailleText(char);
        playAudio(`voice/${index}.mp3`);
    }

    function onKeyPressed(event: KeyboardEvent) {
        
        if (mode !== AppMode.MODE_LETTER_BY_LETTER) {
            return
        }

        const UPPER = event.key.toUpperCase()

        if (CHARACTERS.includes(UPPER)) {
            onButtonClicked(event.key, CHARACTERS.indexOf(UPPER) as number)
        }
    }

    useEffect(() => {

        window.addEventListener("keypress", onKeyPressed);

        () => {
            window.removeEventListener("keypress", onKeyPressed);
        }
     }, []);
    
    return (
        
        <div id="letters_mode" style={{
            display: visible ? "unset" : "none",
            position: "absolute",
            top: "0",
            bottom: "0",
            left: "50%",
            right: "0"

        }}>

            <div style={{
                position: "absolute",
                inset:"0",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
                
                left: "30px",
                right: "20px",
                bottom: "30px",
                top: "100px",
                overflowY: "auto",
                alignContent:"flex-start"
                
            }} className="right_side">

                {CHARACTERS.map((char, index) => {
                    return <button
                        key={`button__${index}`}
                        onClick={() => onButtonClicked(char, index)}
                        style={{
                            width: "calc(20% - 20px)",
                            minWidth: "64px",
                            maxWidth: "128px",
                            margin: "5px 5px",
                            overflow:"hidden",
                            boxSizing:"border-box",
                            aspectRatio:"1",
                            backgroundColor: "#f0f0f0",
                            boxShadow:"1px 1px 2px",
                            color: "black",
                            fontSize: "clamp(16px, 2vw, 120px)",
                        }}>{char.toUpperCase()}</button>
                })}

            </div>
        
        </div>

    );
}