# OpenAI Connect Node App

## Overview

The OpenAI Connect Node App is an open-source project designed to serve as a simple interface for interacting with OpenAI's GPT (Generative Pre-trained Transformer) models. The app facilitates threaded conversations, allowing users to engage in dynamic and context-aware interactions.

## Prerequisites

Before running the application, make sure you have the following prerequisites installed:

- Node v20.10.0
- npm (Node Package Manager)
- OpenAI GPT-3.5 API Key
- Assistant ID from OpenAI

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/uhurutek/openai-connect-nodeapp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd openai-connect-nodeapp
   ```

3. Install dependencies:

   ```bash
   yarn install
   ```

4. Create a .env file in the project root and add the following configuration:

   ```env
   PORT=8000
   GPT_API_KEY=your_openai_GPT-3.5_api_key
   GPT_ASSISTANT_ID=your_assistant_id
   DOMAIN_ALLOW=[http://your-client-domain.com,http://your-client2-domain.com] 
   GPT_RUN_SLEEP=3
   ```

   Replace your_openai_api_key and your_assistant_id with your OpenAI API key and assistant ID. Also, set http://your-client-domain.com as the allowed domain for CORS.

## Usage

1. Start the Node.js server:

   ```bash
   yarn start
   ```

   The server will be running on the specified port (default is 8000).

2. Use the provided API endpoints to interact with the OpenAI GPT-3.5 model:

   - **POST /chats**: Create a new chat thread.
   - **POST /chats/:threadID/:question**: Post a question to an existing chat thread.

## Example

1. Create a new chat thread

   ```bash
   curl -X POST http://localhost:8000/chats
   ```

1. Post a question to a chat thread

   ```bash
   curl -X POST http://localhost:8000/chats/your_thread_id/Can you help me with this question?
   ```

## Deploy with docker

```bash
docker compose -f docker/docker-compose.yml up -d --build
```

## Deploy with pm2

For the initial start, use:

```bash
yarn start
```

And for subsequent restarts, use:

```bash
yarn restart
```

## License

This project is licensed under the [MIT License](./LICENSE). Feel free to use and modify the code as needed.

## Acknowledgments

This project utilizes the OpenAI GPT-3.5 beta API. Visit [OpenAI](https://openai.com/) for more information on accessing the API.
