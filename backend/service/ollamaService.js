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
      options: {
        num_predict: 1200,
        temperature: 0.1,
        top_p: 0.9,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to call Ollama");
  }

  const data = await response.json();

  return data.response;
};