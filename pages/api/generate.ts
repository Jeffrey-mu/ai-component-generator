import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}

export const config = {
    runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
    const { prompt } = (await req.json()) as {
        prompt?: string;
    };

    if (!prompt) {
        return new Response("No prompt in the request", { status: 400 });
    }

    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "system",
                "content": "You are a blog post writer, you have extensive writing experience, and you are good at any field. You need to help me write an article with an outline and paragraphs based on the keywords I provide, and the paragraph content needs to be rich. The document structure has paragraphs separated, and the content is returned in HTML tag format, such as h1 h2 h3 p ul li, and other tags to modify the text."
            },
            {
                "role": "user",
                "content": "must return html code"
            },
            { "role": "user", "content": prompt },
        ],
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
};

export default handler;
