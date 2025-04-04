import { createContext, ReactNode, useContext, useRef, useState } from 'react'
import './App.css'
import { FullTextMode } from './FullTextMode';
import { LettersMode } from './LettersMode';
import { BrailleUtils } from './BrailleUtils';

enum AppMode {
  MODE_FULL_TEXT,
  MODE_LETTER_BY_LETTER,
}

interface AppContextInterface {
  readonly mode: AppMode
  readonly setMode: React.Dispatch<React.SetStateAction<AppMode>>,
  readonly brailleText: string,
  readonly setBrailleText: (newText: string) => void,
  readonly playAudio: (audioPath:string) => void

}

export const AppContext = createContext<AppContextInterface|null>(null);

export function useAppContext() {
  return useContext(AppContext) as AppContextInterface;
}

function AppContextProvider({ children }: { children?: ReactNode }) {

  const [mode, setModeState] = useState<AppMode>(AppMode.MODE_FULL_TEXT);
  const [brailleText, setBrailleText] = useState<string>("");

  const setMode: React.Dispatch<React.SetStateAction<AppMode>> = (newMode) => {
    setModeState(newMode);
    setBrailleText("");
  }

  const audioReference = useRef<HTMLAudioElement>(null);

  function playAudio(audioPath: string) {

    if (!audioReference.current) {
      return;
    }

    const audioElement = audioReference.current;

    audioElement.pause();
    audioElement.src = audioPath;
    audioElement.play();

  }
  
  const contextData:AppContextInterface = {
    mode,
    setMode,

    brailleText,
    setBrailleText,

    playAudio
  }

  return (

    <AppContext.Provider value={contextData}>
      {children}

      <audio ref={audioReference}/>
    </AppContext.Provider>

  );  
}

function getTextSize(text:string, font:string):{width:number, height:number} {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.font = font;
    const metrics = context.measureText(text);
    
    return {
        width: metrics.width,
        height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    };
}

function BrailleDrawer() {

  const { brailleText } = useAppContext();

  const SHOWING_TEXT = BrailleUtils.convertText(brailleText.toLowerCase());

  const FONT_SIZE = (window.innerWidth) / getTextSize(SHOWING_TEXT, "Arial 12px").width;

  return (
    <div style={{
      alignContent: "center",
      backgroundColor: "black",
      color: "white",
      width: "50%",
      height: "100%",
      wordBreak: "break-all",
      padding: "20px",
      fontFamily:"Arial",
      fontSize: `${Math.max(64, FONT_SIZE)}px`,
      overflow:"auto"
    }}>
      {SHOWING_TEXT}
    </div>
  );
  
}

function ForegroundContent() {
  const { mode: appMode, setMode } = useAppContext();

  function onSwitchClicked() {
    setMode(
      appMode == AppMode.MODE_FULL_TEXT ?
        AppMode.MODE_LETTER_BY_LETTER
        :
        AppMode.MODE_FULL_TEXT
    );
  }

  return (
    <>
      <FullTextMode visible={appMode == AppMode.MODE_FULL_TEXT} />
      <LettersMode visible={appMode == AppMode.MODE_LETTER_BY_LETTER}/>

      <button style={{
        position: "absolute",
        right: "20px",
        top: "20px"
      }} onClick={onSwitchClicked}>{appMode == AppMode.MODE_FULL_TEXT ? "MODO LETRAS" : "MODO TEXTO" }</button>
    
    </>
  )
}

function App() {

  return (
    <AppContextProvider>
      <main style={{
        width:"100vw",
        height: "100vh",
        position: "absolute",
        inset:"0",
        overflow:"hidden"
      }}>


        <div className='background' style={{position:"absolute", width:"100%", height:"100%"}}>
          <BrailleDrawer/>
          <span style={{display:"inline-block", backgroundColor:"white", position:"absolute", left:"50%", top:"0", bottom:"0", right:"0"}}></span>
        </div>

        <ForegroundContent />
      </main>
    </AppContextProvider>

  )
}

export default App
