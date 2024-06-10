import translate from "google-translate-api";

async function translateText(text: string, options: { to: string }): Promise<string> {
  try {
    const { to } = options;
    const res = await translate(text, { to });
    return res.text;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Rückgabe des Originaltexts im Fehlerfall
  }
}


export default translateText;
