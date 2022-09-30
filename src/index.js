/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

/** 
 * 
 * #1 Create worker to handle automated traffic differently.
 * #2 Get additinal data from external site via a subrequest
 * #3 If the inbound request appears automated, always return json-formated responses
 * #4 Use the inbound request data to filter bad bots
 * #5 For bad bots, return a JSON object indicatin the request was blocked due to -
 * - be non human. (Alternatively return external site 401)
 * #6 Set an origin Resolve Override for your subrequest origin - what is effect? 
 * 
 * #7 Optional - Create DNS record to external domain - set page rule w/ host header override. 
 * 
 * 
 * **/
 addEventListener('fetch', event => { 
	event.respondWith(handleRequest(event.request))
	})



	async function handleRequest(request) { 
		// set userScore
		const userScore = (request.cf.botManagement.score); 
		// determine int for "badscore"
		const badScore = 40 ;
		// create boolean - human is true
		const humanTrueBool = userScore > badScore ; 
		
		if (humanTrueBool) { 
			//  if true then;
			return new Response("Welcome Human :)")
		}
		else
		// return JSON of request.cf.botManagement field and message detailing visitor of block. 
			return new Response(`You have been blocked from accessing this site - Score is kinda bad, look:  ${JSON.stringify(request.cf.botManagement)}`);
}