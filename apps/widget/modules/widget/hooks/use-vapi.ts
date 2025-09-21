import Vapi from "@vapi-ai/web";   
import { error } from "console";
import { useEffect, useState } from "react";

interface TranscriptMessage {
    role: "user" | "assistant";
    text: string;
}

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);

    useEffect(() => {
        // TODO: Add your VAPI API key here
        const vapiInstance = new Vapi('6fc3929a-ac68-41e0-b5c6-117e0a5dd674')
        setVapi(vapiInstance)

        vapiInstance.on("call-start", () => {
            setIsConnected(true)
            setIsConnecting(false)
            setTranscript([])
        })

        vapiInstance.on("call-end", () => {
            setIsConnected(false)
            setIsConnecting(false)
            setIsSpeaking(false)
        })

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true)
        })

        vapiInstance.on("speech-end", () => {
            setIsSpeaking(false)
        })

        vapiInstance.on("error", (error) => {
            console.log(error, "VAPI_ERROR")
            setIsConnecting(false)
        })

        vapiInstance.on("message", (message) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                setTranscript((prev) => [
                    ...prev, 
                    { 
                        role: message.role === "user" ? "user" : "assistant",
                        text: message.transcript
                    }
                ])
            }
        })

        return () => {
            vapiInstance?.stop()
        }

    }, [])

    const startCall = () => {
        setIsConnecting(true)

        if (vapi) {
            // TODO: Add your VAPI agent ID here
            vapi.start('6a9f0cf3-1b40-443e-a248-7f8f08048946')
        }  
    }

    const endCall = () => {
        if (vapi) {
            vapi.stop()
        }
    }
    
    return {
        isConnected,
        isConnecting,
        isSpeaking,
        transcript,
        startCall,
        endCall
    }

}