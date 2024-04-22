"use client";
import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import annyang from "annyang";
import axios from "axios";

const EndCallButton = () => {
  const senderEmail = "keerthanaradjendirane@gmail.com";
  const receiverEmail = "keerthu190805@gmail.com";
  const password = "jsromkntsftugyxp";
  const [transcript, setTranscript] = useState("");
  const [resuuu, setResuuu] = useState("");
  const call = useCall();
  const router = useRouter();

  useEffect(() => {
    let annyangInitialized = false;

    const startListening = () => {
      console.log("Listening... Speak now.");
      annyang.start();
    };

    const stopListening = () => {
      console.log("Stopping listening.");
      annyang.abort();
    };

    if (annyang) {
      annyang.addCallback("result", (phrases: string[]) => {
        const newTranscript = phrases[0]; // Get the new phrase
        setTranscript((prevTranscript) => prevTranscript + " " + newTranscript); // Append to previous transcript
        console.log(newTranscript); // Log updated transcript
      });

      annyangInitialized = true;
      startListening();
    } else {
      console.log("Speech recognition not supported.");
    }

    return () => {
      if (annyangInitialized) {
        stopListening();
      }
    };
  }, []);

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;
  if (!isMeetingOwner) return null;

  const results = async () => {
    try {
      console.log(transcript);
      const body = {
        contents: [
          {
            parts: [
              {
                text:
                  transcript +
                  "this is a transcript of a meeting now summarize this",
              },
            ],
          },
        ],
      };
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAWH3ml0KOLbFA3JnaWUejxzInEzAGfAfU",
        body
      );
      console.log(res);
      const generatedText = res.data.candidates[0].content.parts[0].text;
      console.log(generatedText);
      await setResuuu(generatedText);

      const emailData = {
        text: generatedText,
      };
      const emailResponse = await axios.post(
        "http://localhost:7777/send-email",
        emailData
      );
      console.log("Email Response:", emailResponse.data);

      return 1;
    } catch (error) {
      console.error("Error:");
      throw error; // Rethrow the error for the caller to handle if necessary
    }
  };

  return (
    <Button
      onClick={async () => {
        await results();
        await call.endCall();
        router.push("/");
      }}
      className="bg-red-500"
    >
      End call for everyone
    </Button>
  );
};

export default EndCallButton;