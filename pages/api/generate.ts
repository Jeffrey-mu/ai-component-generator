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
                "role": "user",
                "content": "Please generate an article about 数码产品 for me Title description keyword date author comment content subject is required"
            },
            {
                "role": "assistant", "content": `
                <div class="article">
                <h1 class="title">数码产品——科技带来的便利生活</h1>
                <p class="description">数码产品已经成为现代人生活的必需品，随着科技的不断发展，人们对数字化、智能化的需求越来越高。本文将着重探讨数码产品在我们生活中的应用和便利。</p>
                <p class="keyword">数码产品、便利生活、科技、智能家居</p>
                <p class="date">June 1, 2021</p>
                <p class="author">AI</p>
                <p class="comment">本文为AI智能生成文章，敬请阅读。</p>
                <div class="content">
                    <p>数码产品，是以数字形式为基础，借助电子技术的手段，实现信息的获取、存储、处理和传输的一类产品。可以说，数码产品已经贯穿了我们现代人的生活，从个人电脑到智能手机，再到智能家居，数码产品都带来了极大的生活便利。</p>
                    <p>首先，数码产品的出现使得我们的信息获取和传输更加快捷。通过个人电脑、笔记本电脑和智能手机等数码产品，我们可以轻松地获取到各种信息，如新闻、娱乐信息、商业资讯等，这样的大量信息就如同是我们生活中的必需品。</p>
                    <p>另外，智能家居也越来越受到人们的欢迎，通过智能家居设备，我们可以轻松地控制家中各种设备，如灯光、窗帘、温度、音响等，这极大地方便了人们的生活。智能家居设备之间的联动，也使得人们的家居生活更加智能化和便利化。</p>
                    <p>而随着科技的不断发展，未来数码产品无疑将拥有更广泛的应用场景。例如智能医疗、智能交通等领域，都将会有更多的数码产品在其中发挥作用。</p>
                    <p>总之，数码产品给我们的生活带来了极大的便利，我们要善于利用这些科技，让数字化成为我们更加美好的生活方式。</p>
                </div>
                </div>
                `
            },
            {
                "role": "user",
                "content": "Please generate an article for me Title description keyword date author comment content subject is required"
            },
            { "role": "user", "content": "Please return my article according to the content I sent" },
            { "role": "user", "content": prompt },
        ],
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
};

export default handler;
