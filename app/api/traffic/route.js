let currentSecond = Math.floor(Date.now() / 1000);
let counter = 0;

export async function GET() {
  const now = Math.floor(Date.now() / 1000);

  if (now !== currentSecond) {
    currentSecond = now;
    counter = 0;
  }

  return Response.json({
    time: new Date().toLocaleTimeString(),
    rps: counter,
  });
}

export async function POST() {
  const now = Math.floor(Date.now() / 1000);

  if (now !== currentSecond) {
    currentSecond = now;
    counter = 0;
  }

  counter++;

  return new Response("OK");
}
