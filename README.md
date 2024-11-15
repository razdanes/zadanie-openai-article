# Node.js Project for OpenAI HTML Generator

This project reads a text file, processes its content using OpenAI's API, and generates an HTML file with the content converted to a modern HTML structure, including placeholders for images.

## Prerequisites

- Node.js (version 16 or higher recommended)
- OpenAI API key

## Installation

1. Clone this repository to your local machine.

2. Install the required dependencies using npm:

```bash
npm install
```

### Usage

To run the script, use the following command in your terminal:

Linux bash
```bash
OPENAI_API_KEY=YOUR_OPENAI_API_KEY node app.js <article.txt>
```

Windows Powershell
```powershell
$env:OPENAI_API_KEY="YOUR_OPENAI_API_KEY" ; node app.js article.txt
```

The script will read the content of the provided text file, send it to OpenAI's API, and generate an HTML file with the processed content. The HTML file will contain placeholders for images (e.g., src="image_placeholder.jpg"), and the content will be formatted using the latest HTML standards.
