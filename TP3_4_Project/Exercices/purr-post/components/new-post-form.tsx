"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CatIcon } from "@/components/cat-icon";
import { AngryIcon } from "@/components/angry-icon";
import { SmileIcon } from "@/components/smile-icon";
import { newPost } from "@/app/actions";
import { THRESHOLD } from "@/lib/contants";

type NewPostFormProps = {};

export default function NewPostForm(props: NewPostFormProps) {
  const worker = useRef<Worker | null>(null);

  // Keep track of the classification result and the model loading status.
  const [result, setResult] = useState<null | { label: string; score: number }>(
    null,
  );
  const [ready, setReady] = useState<boolean | null>(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(
        new URL("../app/worker.js", import.meta.url),
        {
          type: "module",
        },
      );
    }

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e: any) => {
      console.log(e);
      switch (e.data.status) {
        case "initiate":
          setReady(false);
          break;
        case "ready":
          setReady(true);
          break;
        case "complete":
          setResult(e.data.output[0]);
          if (e.data.output[0].score < THRESHOLD) {
            setSentiment(1);
          } else {
            setSentiment(0);
          }
          break;
      }
    };

    // Attach the callback function as an event listener.
    worker.current.addEventListener("message", onMessageReceived);

    // Define a cleanup function for when the component is unmounted.
    return () =>
      worker.current?.removeEventListener("message", onMessageReceived);
  });

  const classify = useCallback((text: string) => {
    if (worker.current) {
      worker.current.postMessage({ text });
    }
  }, []);

  const [sentiment, setSentiment] = useState(-1);

  const border = useMemo(() => {
    switch (sentiment) {
      case 1:
        return "border-green-500";
      case 0:
        return "border-red-500";
      default:
        return "border-gray-200";
    }
  }, [sentiment]);

  return (
    <div>
      <div>
        <form
          action={async () => {
            await newPost(text, []);
            setText("");
            setSentiment(-1);
          }}
          className="bg-white p-4 border border-gray-200 rounded-lg"
        >
          <textarea
            value={text}
            onInput={(e) => {
              setText((e.target as HTMLTextAreaElement).value);
              classify((e.target as HTMLTextAreaElement).value);
            }}
            className={`w-full p-2 border-4 ${border} rounded-md focus:outline-none`}
            placeholder="Raconte-nous ton meilleur ronron."
            rows={4}
            required
          ></textarea>

          {!ready ||
            (!result && (
              <span className="text-xs flex items-center gap-1 text-blue-500 animate-pulse">
                <CatIcon className="fill-current h-3"></CatIcon> Chat en
                chargement..
              </span>
            ))}
          {sentiment === 1 && (
            <span className="text-xs flex items-center gap-1 text-green-500">
              <SmileIcon className="fill-current"></SmileIcon> Chat content (
              {(1 - (result?.score ?? 0) - THRESHOLD).toFixed(3)})
            </span>
          )}
          {sentiment === 0 && (
            <span className="text-xs flex items-center gap-1 text-red-500">
              <AngryIcon className="fill-current"></AngryIcon> Chat pas content
              ({(1 - (result?.score ?? 0) - THRESHOLD).toFixed(3)})
            </span>
          )}

          <div className="flex justify-end mt-2">
            <button
              type="submit"
              disabled={sentiment !== 1}
              className="disabled:bg-neutral-300 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              <CatIcon className="h-4"></CatIcon>
              Poste ce ronron
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
