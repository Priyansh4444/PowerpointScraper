// routes/index.tsx
import DropZone from "../islands/Dropzone.tsx";

interface Slide {
  slideNumber: number;
  title: string;
  content: string;
}

export default function Home() {
  return (
    <div class="relative px-6 py-16 mx-auto bg-[#111] text-white min-h-screen">
      <div class="absolute top-4 right-4 flex items-center space-x-5">
        <img
          src="/pronsh.png"
          alt="Profile"
          class="w-8 h-8 rounded-full border border-gray-300 transition-transform duration-500 hover:rotate-180"
        />
        <a
          href="https://github.com/Priyansh4444/PowerpointScraper"
          class="transition-colors duration-300 hover:text-white text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-github"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>
      </div>

      <div class="max-w-screen-lg mx-auto flex flex-col items-center">
        <img
          class="mx-8"
          src="/logo.png"
          width="128"
          height="128"
          alt="Project logo"
        />
        <h1 class="text-5xl font-semibold mb-4 text-center">
          PowerPoint Scraper
        </h1>
        <p class="text-xl text-center mb-8">
          Upload your PowerPoint files and extract key information effortlessly.
        </p>
        <DropZone />
        <footer class="mt-16 text-center">
          <p class="text-lg text-gray-300">
            Just wanted to make something I'd abuse with{" "}
            <span class="text-green-400">Deno 🦕</span> /{" "}
            <span class="text-yellow-400">Fresh 🍋</span>
          </p>
          <p class="text-lg text-gray-300">
            Made with <span class="text-red-400">Laziness ❤️</span>
          </p>
          <p class="text-lg text-gray-300">
            To scrape and Prompt <span class="text-blue-400">LLMs 🤖</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
