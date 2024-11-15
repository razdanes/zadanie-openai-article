#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

// Sprawdzenie argumentów CLI
if (process.argv.length < 3) {
    console.error("Użycie: node app.js <plik_wejsciowy.txt> <plik_wyjsciowy.html>");
    process.exit(1);
}

// Pobranie ścieżek do plików
const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3] || 'article.html';

// Sprawdzenie, czy plik wejściowy istnieje
if (!fs.existsSync(inputFilePath)) {
    console.error(`Plik wejściowy "${inputFilePath}" nie istnieje.`);
    process.exit(1);
}

// Konfiguracja OpenAI API
const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ustaw klucz API jako zmienną środowiskową
});

// Funkcja generująca HTML
const generateHTML = (textContent) => `
<body>
<pre>
${textContent}
</pre>
</body>
`;


async function main() {
    fs.readFile(inputFilePath, 'utf8', async (err, data) => {
        if (err) {
            console.error(`Błąd podczas odczytu pliku: ${err.message}`);
            process.exit(1);
        }
    
        console.log("Oczekiwanie na odpowiedź z OpenAPI...");
        
        try {
            // Wysłanie zawartości pliku do OpenAI API
            const response = await client.chat.completions.create({
                messages: [ 
                    { role: 'system', content: 'Przetwarzaj podaną treść i odpowiadaj tylko kodem HTML ' },
                    { role: 'user', content: `napraw kodowanie 
                        podanego artykułu i przerób go 
                        na artykul html, uzupełnij ten 
                        artykuł o <img /> gdzie jako placeholder 
                        wstaw nazwę "src="image_placeholder.jpg", 
                        użyj najnowszych standardów HTML i podaną zwrotkę podaj bez opisu, 
                        tylko sam czysty kod html ${data}` }
                ],
                model: 'gpt-3.5-turbo',
              });

            const aiGeneratedContent = (response.choices?.[0]?.message?.content || '').trim();
    
            // // Generowanie pliku HTML
            const htmlContent = generateHTML(aiGeneratedContent);
    
            // // Zapisanie pliku HTML
            fs.writeFile(outputFilePath, htmlContent, 'utf8', (err) => {
                if (err) {
                    console.error(`Błąd podczas zapisywania pliku: ${err.message}`);
                    process.exit(1);
                }
    
                console.log(`Plik HTML został zapisany jako "${outputFilePath}".`);
            });
        } catch (apiError) {
            console.error(`Błąd podczas komunikacji z OpenAI API: ${apiError.message}`);
            process.exit(1);
        }
    });
  }
  
  main();
