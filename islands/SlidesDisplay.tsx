// islands/SlidesDisplay.tsx
interface Slide {
  slideNumber: number;
  title: string;
  content: string;
}

interface SlidesDisplayProps {
  slides: Slide[];
}

export default function SlidesDisplay({ slides }: SlidesDisplayProps) {
  return (
    <div class="slides-container mt-8 text-left">
      {slides.length > 0 ? (
        slides.map((slide) => (
          <div key={slide.slideNumber} class="mb-6 p-4 bg-gray-900 rounded-lg">
            <h2 class="text-xl font-bold mb-2">
              Slide {slide.slideNumber}: {slide.title}
            </h2>
            <p class="text-gray-300 whitespace-pre-wrap">{slide.content}</p>
          </div>
        ))
      ) : (
        <p class="text-lg text-gray-400">
          No slides found. Please upload a PPTX file.
        </p>
      )}
    </div>
  );
}
