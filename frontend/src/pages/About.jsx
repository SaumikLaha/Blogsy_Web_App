import React from "react";
import { useAuth } from "../context/AuthProvider";

function About() {
  const { profile } = useAuth();
  console.log(profile);
  const username = profile?.name || profile?.user?.name || "Blogger";

  return (
    <div className="container mx-auto my-12 p-4 space-y-9 px-20 py-3">
      <h1 className="text-2xl font-bold mb-6">✮彡About Blogsy彡✮</h1>

      <p className="text-lg">
        Welcome,{" "}
        <strong className="text-blue-800 font-semibold hover:scale-105 duration-500 capitalize">
        {username}
       </strong>
       ! We’re truly excited to have you here on{" "}
      <strong>⭐⭒ Blogsy ⭒⭐</strong> — a modern platform built for sharing 💡 ideas, ✍️ stories, and 🎨 creativity with the world.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">✧♥︎✧Our Mission✧♥︎✧</h2>
      <p>
        🌟 At Blogsy, our mission is to empower individuals to express themselves freely 🕊️ and connect with others 🤝 through the power of words. We aim to create a vibrant space where bloggers, creators, and readers come together to 📖 learn, 🌈 inspire, and 🌱 grow.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">♡̆̈Our Vision♡̆̈</h2>
      <p>
        🌍 We envision Blogsy as a global hub 🌐 for creative minds — a place where meaningful conversations 💬 flourish, diverse perspectives 🌏 are celebrated, and knowledge 📚 flows without barriers.
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">Why❤Blogsy?</h2>
      <p>
        📝 Easy-to-use platform for publishing blogs <br />
        🌐 Connect with a wide community of readers and writers <br />
        📚 Share knowledge, stories, and insights that truly matter <br />
        💻 A clean, modern, and responsive experience for everyone <br />
        🔒 Secure and reliable space to protect your content and creativity <br />
        🚀 Optimized for speed and performance across all devices <br />
        🎨 Customizable themes and layouts to reflect your unique style <br />
        🤝 Collaborative features to engage, interact, and grow with your audience <br />
      </p>

      <h2 className="font-semibold text-blue-800 text-xl">(♥ω♥)About the Developer(♥ᴗ♥)</h2>
      <p>
        💡 Blogsy was designed and developed by{" "}
        <strong className="text-blue-800">╰⊱♥⊱╮𝑺𝒂𝒖𝒎𝒊𝒌 𝑳𝒂𝒉𝒂╭⊱♥⊱╯</strong>, a passionate developer 👨‍💻 with a love for building innovative 🚀 and user-friendly 🌟 web applications.
      </p>
      <p>
        ᑕOᑎᑎEᑕT ᗯITᕼ ☄✯Saumik Laha✯☄: <br />
    <a
      href="https://github.com/SaumikLaha"
      className="text-blue-600 hover:underline mr-4"
      >
      GitHub
      </a>

    <a
      href="https://www.linkedin.com/in/saumik-laha-530883381/"
      className="text-blue-600 hover:underline"
      >
      LinkedIn
    </a>
      </p>
    </div>
  );
}

export default About;