export const sendImageToOllama = async ({ file, prompt }) => {
  const base64Image = file.buffer.toString("base64");

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "moondream", 
      prompt,
      images: [base64Image],
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to call Ollama");
  }

  const data = await response.json();

  return data.response;
};