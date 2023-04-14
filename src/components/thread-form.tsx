"use client";
import { useState } from "react";
import { z } from "zod";
import { UtilButton } from "@/components/ui/buttons";
import { SignOut } from "@/app/actions";
import { CopyButton } from "@/components/ui/buttons";
import { toast } from "react-hot-toast";

export const InputSchema = z.object({
  article: z.string().trim().nonempty().max(17000),
  numberOfTweets: z.number().max(6).min(1).default(4),
  tweetType: z.enum(["short", "medium", "long"]).default("medium"),
});

type TweetType = "short" | "medium" | "long";

export default function ThreadForm() {
  const [article, setArticle] = useState("");
  const [numberOfTweets, setNumberOfTweets] = useState(4);
  const [tweetType, setTweetType] = useState<TweetType>("medium");
  const [generatedTweets, setGeneratedTweets] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [threadTitle, setThreadTitle] = useState("");

  const generateThread = async () => {
    const id = toast.loading("Generating thread...");
    const input = InputSchema.safeParse({
      article,
      numberOfTweets,
      tweetType,
    });
    if (!input.success) {
      console.log(input.error);
      toast.error("Invalid form input!", {
        id,
      });
      return;
    }
    const prompt = `Turn this article into an interesting twitter thread that catches people's attention, your tone should be like that of a famous twitter thread creator, the first tweet should be an introduction tweet to the thread, the thread should consist of ${input.data.numberOfTweets} tweets of ${input.data.tweetType} length each. Keep the links and people's name in the article as it is, and clearly label them like "1." and "2.",separate each tweet with a line gap, tweets should be written in first person - \n ${input.data.article}`;
    setGeneratedTweets("");
    setLoading(true);
    const response = await fetch("/api/thread", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      console.error(response.statusText);
      toast.error("Couldn't generate thread!", {
        id,
      });
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedTweets((prev) => prev + chunkValue);
    }
    // scrollToBios();
    setLoading(false);
    toast.success("Thread generated successfully!", {
      id,
    });
  };

  const toggleSaveForm = async () => {
    setShowSaveForm((prev) => !prev);
  };

  const saveThread = async () => {
    const id = toast.loading("Saving thread...");
    if (!threadTitle.trim()) {
      toast.error("Please enter a thread title!", {
        id,
      });
      return;
    }
    const reqBody = {
      title: threadTitle,
      tweets: generatedTweets.split("\n\n").map((tweet, index) => ({
        content: tweet.trim().slice(3),
      })),
    };

    const response = await fetch("/api/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      console.error(response.statusText);
      toast.error("Couldn't save the thread!", {
        id,
      });
    }

    const data = await response.json();
    console.log(data);
    toast.success("Thread saved successfully!", {
      id,
    });
  };

  return (
    <div className="lg:w-[56%] w-full flex flex-col gap-2 justify-start items-center">
      <h2 className="text-xl font-semibold w-full bg-clip-text text-transparent bg-gradient-to-b from-teal-400 via-sky-200 to-indigo-400">
        Create a new thread
      </h2>
      <div className="flex flex-col lg:flex-row md:flex-row gap-4 w-full">
        <div className="w-full">
          <label
            htmlFor="numberOfTweets"
            className="self-start text-sm mb-1 text-zinc-300"
          >
            Number of tweets (1 - 6)
          </label>
          <input
            type="number"
            className="w-full bg-zinc-900/50 text-zinc-100 focus:bg-zinc-900 transition-all border focus:border-sky-300/60 duration-200 border-indigo-300/60 rounded-md p-2 outline-none"
            max={6}
            min={1}
            placeholder="Number of tweets"
            value={numberOfTweets}
            onChange={(e) => setNumberOfTweets(parseInt(e.target.value))}
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="tweetType"
            className="self-start text-sm mb-1 text-zinc-300"
          >
            Tweet type
          </label>
          <select
            value={tweetType}
            className="w-full bg-zinc-900/50 text-zinc-100 focus:bg-zinc-900 transition-all border focus:border-sky-300/60 duration-200 border-indigo-300/60 rounded-md p-2 outline-none"
            onChange={(e) => setTweetType(e.target.value as TweetType)}
          >
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
      </div>
      <div className="w-full">
        <label
          htmlFor="article"
          className="self-start text-sm mb-1 text-zinc-300"
        >
          Article (max 17k characters)
        </label>
        <textarea
          placeholder="Enter your article"
          className="w-full min-h-[400px] bg-zinc-900/50 text-zinc-100 focus:bg-zinc-900/70 transition-all border focus:border-sky-300/60 duration-200 border-indigo-300/60 rounded-md p-2 outline-none scrollbar-thin scrollbar-track-transparent scrollbar-thumb-indigo-200/60 scrollbar-thumb-rounded-md"
          onChange={(e) => setArticle(e.target.value)}
        />
      </div>
      <div className="w-full flex gap-4">
        <UtilButton onClick={generateThread} label="Generate" />
        <SignOut />
      </div>
      {generatedTweets.trim() !== "" && (
        <div className="w-full whitespace-pre-line text-zinc-200 flex flex-col gap-2 mt-4">
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-b from-teal-400 via-sky-200 to-indigo-400">
            Generated tweets
          </h2>
          <div className="relative flex flex-col gap-4 z-0 mb-2">
            <div className="absolute w-full h-full left-5 z-[-100] top-0 bg-transparent border-l border-sky-200/60"></div>
            {generatedTweets.split("\n\n").map((tweet, index) => (
              <p
                key={index}
                className="bg-zinc-900 relative z-[100] border border-indigo-300/60 rounded-md p-4 pr-10 text-zinc-200"
              >
                {tweet.trim().slice(3)}
                <CopyButton text={tweet.trim().slice(3)} />
              </p>
            ))}
          </div>

          <div>
            {showSaveForm && (
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Thread name"
                  className="w-full bg-zinc-900/50 text-zinc-100 focus:bg-zinc-900 transition-all border focus:border-sky-300/60 duration-200 border-indigo-300/60 rounded-md p-2 outline-none"
                  value={threadTitle}
                  onChange={(e) => setThreadTitle(e.target.value)}
                />
                <UtilButton onClick={saveThread} label="Save" />
              </div>
            )}
            {generatedTweets && (
              <UtilButton
                onClick={toggleSaveForm}
                label={showSaveForm ? "Cancel" : "Save Thread"}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
