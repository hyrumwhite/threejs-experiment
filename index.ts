import { serveListener } from "https://deno.land/std/http/server.ts";
import { serveFile } from "https://deno.land/std/http/file_server.ts";

const PORT = 3000;
// const HOSTNAME = "0.0.0.0";

const listener = Deno.listen({ port: PORT });

console.log(`Server is now running on: http://localhost:${PORT}`);

await serveListener(listener, async (request) => {
	const path = request.url.split('/').slice(3).join('/') || 'index.html';
	try {
		return await serveFile(request, `./dist/${path}`);
	} catch(e) {
		return new Response("File not found",{status: 404});
	}

});

