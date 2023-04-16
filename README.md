## Supathreads

https://user-images.githubusercontent.com/68690233/232323882-a009ff32-83a1-439e-875a-7d0a50977d56.mp4

Create concise and professional twitter threads from your blogs within seconds using AI, built for the [Supabase AI Hackathon](https://supabase.com/blog/launch-week-7-hackathon) and powered by [OpenAI](https://openai.com/). The site is live at [supathreads.vercel.app](https://supathreads.vercel.app).

### Inspiration

Writing eye catching twitter threads is a skill that takes time to master. I wanted to create a tool that would help people create twitter threads from some other source of content, like a blog post, in a matter of seconds, and I knew that I could use OpenAI's AI models to achieve this. 

### Process

Firstly, I designed a basic prototype for the web app and then I started working on the backend. I used NextAuth.js to handle authentication and Supabase to store the user data and the generated threads. The next thing was to find a correct OpenAI model for my use case and GPT-3.5 was the perfect fit. Next I used the OpenAI API to stream the generated tweets to the frontend and display them to the user. The last thing was to let users save the generated threads to their account and I used Supabase to store the threads. And once I was done with the backend, I started working on the frontend. I used TailwindCSS to style the web app and I used Next.js to handle routing and server side rendering. The web app is built using Next.js v13 which helped me a lot getting to know about React Server Components as well as the new app router structure.

### Tech Stack

The web app is made using the [t3 stack](https://create.t3.gg) and I'm using [Supabase](htps://supabase.com) as my database and storage layer. I'm using [OpenAI](https://openai.com/) to generate the tweets.

### How I'm using Supabase

- to store authenticated user data from NextAuth.js
- to store the generated threads for users

### Team

This project is solo developed by me, [ashish](https://twitter.com/_asheeshh).
