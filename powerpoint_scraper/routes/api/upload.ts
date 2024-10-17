import { Handlers } from "$fresh/server.ts";
import JSZip from "npm:jszip";
import xml2js from "npm:xml2js";

// PPTXParser class for converting pptx to JSON
// Since there is not Package that takes the file string itself, I made my own learnign from theirs
class PPTXParser {
  // Options for the PPTXParser like blob and so on
  constructor(private options: any = {}) {}

  // Converts the unzipped files to JSON
  async jszip2json(jszip: JSZip): Promise<any> {
    const json: any = {};

    await Promise.all(
      Object.keys(jszip.files).map(async (relativePath) => {
        // Get the file from the JSZip object
        const file = jszip.file(relativePath);
        // Get the extension of the file
        const ext = relativePath.split(".").pop();

        let content;
        if (!file || file.dir) return;
        // if the file is xml or rels, parse it as a string, otherwise use the binary
        if (ext === "xml" || ext === "rels") {
          const xml = await file.async("string");
          content = await xml2js.parseStringPromise(xml);
        } else {
          // Use the binary content for the file, nodebuffer is the default
          content = await file.async(this.options.jszipBinary || "nodebuffer");
        }
        // Add the content to the JSON object

        json[relativePath] = content;
      })
    );

    return json;
  }

  // parse the blob to JSON
  async parseFromBlob(blob: Blob): Promise<Record<string, string>> {
    const zip = await JSZip().loadAsync(blob);
    return await this.jszip2json(zip);
  }

  // Extracts text content from slides in JSON
  extractTextFromSlides(
    json: Record<string, string>
  ): { slide: string; text: string }[] {
    const slideText: { slide: string; text: string }[] = [];

    Object.keys(json).forEach((relativePath) => {
      if (
        relativePath.startsWith("ppt/slides/slide") &&
        relativePath.endsWith(".xml")
      ) {
        const slideData = json[relativePath];
        // Found this algorithm from the original code

        // p:sld is the slide data
        // p:cSld is the common slide data
        // p:spTree is the shape tree
        // p:sp is the shape
        // p:txBody is the text body
        // a:p is the paragraph
        // a:r is the run which means the text
        // a:t is the text content as well
        // This is the structure of the XML file in the PPTX file and we are first mapping through the slides
        // and then through the paragraphs and then through the text runs to get the text content
        //  after that we join the text runs to get the text content of the paragraph then join the
        //  paragraphs to get the text content of the slide and then push it to the slideText array
        const paragraphs =
        // @ts-ignore: can't find the type for the slideData
          slideData["p:sld"]?.["p:cSld"]?.[0]?.["p:spTree"]?.[0]?.["p:sp"] ||
          [];
        const slideContent = paragraphs
          .map((paragraph: any) => {
            const textElements =
              paragraph["p:txBody"]?.[0]?.["a:p"]
                ?.map((p: any) => {
                  const textRuns =
                    p["a:r"]?.map((r: any) => r["a:t"]?.[0]).join(" ") || "";
                  return textRuns;
                })
                .join("\n") || "";
            return textElements;
          })
          .join("\n");

        slideText.push({
          slide: relativePath,
          text: slideContent,
        });
      }
    });

    return slideText;
  }
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const formData = await req.formData();
      const file = formData.get("file") as File;

      if (!file) {
        return new Response(JSON.stringify({ error: "No file provided" }), {
          status: 400,
        });
      }

      // Regex for a PPTX
      if (!file.name.match(/\.(pptx)$/i)) {
        return new Response(
          JSON.stringify({ error: "Only PPTX files are allowed" }),
          { status: 400 }
        );
      }

      // Convert the File to an ArrayBuffer for parsing
      const arrayBuffer = await file.arrayBuffer();

      // Create a Blob from the ArrayBuffer for the PPTXParser
      const blob = new Blob([arrayBuffer]);

      // Create an instance of PPTXParser
      const pptxParser = new PPTXParser();

      // Parse the Blob using the PPTXParser
      const parsedJson = await pptxParser.parseFromBlob(blob);

      // Extract text from the parsed slides
      const slides = await pptxParser.extractTextFromSlides(parsedJson);

      return new Response(
        JSON.stringify({
          success: true,
          filename: file.name,
          totalSlides: slides.length,
          slides,
        })
      );
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error processing presentation file";
      return new Response(
        JSON.stringify({
          error: errorMessage,
        }),
        {
          status: 500,
        }
      );
    }
  },
};
