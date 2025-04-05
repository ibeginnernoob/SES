🏥 LLM Performance Comparison in a Healthcare App
📌 Project Overview
This project compares the performance of various Large Language Models (LLMs) integrated into a healthcare-focused app. It applies software engineering principles to evaluate LLMs across multiple metrics and platforms.

🎯 Application Use Case
The app allows users to input healthcare-related questions, which are processed by both cloud-based and local LLMs, enabling a detailed performance comparison.

🚀 Objectives
1️⃣ Develop the App
Build an interactive, secure app for healthcare-related chat with LLMs.

Include cloud-based APIs (e.g., OpenAI, Gemini, Claude, Grok) and local models.

2️⃣ Integrate Multiple LLMs
Compare models from:

Cloud-based: OpenAI (ChatGPT), Gemini, Claude, Grok

Local: bioGPT, LLama-3.1 (1B).

3️⃣ Test Across Devices & Conditions
Evaluate performance on mobile, laptop, cloud VMs, and edge devices.

Simulate varied network conditions to test reliability and latency.

4️⃣ Measure Key Metrics
⏱ Response Time

🎯 Accuracy & Relevance

🧠 Resource Usage (CPU, RAM, GPU)

🚧 Latency & Delay Analysis

5️⃣ Visualize Data
Collect and analyze results using charts, graphs, and tables.

🛠️ Technologies Used
🔹 Primary Language
TypeScript

🔹 IDE
Visual Studio Code (VSCode)

🔹 Frontend
React Native – UI development

Zustand – State management

Ky – HTTP requests

Gluestick – UI component library

Firebase Auth – Authentication

🔹 Backend
Express.js – API and service handling

Mongoose (ORM) – MongoDB interaction

Axios – Internal and external HTTP requests

🔹 Database
MongoDB

🔹 Microservices
Express.js – Microservice framework

LLM SDKs/APIs – Official packages from OpenAI, Anthropic, Google, etc.

📲 How to Use the App
Sign in with your credentials via Firebase.

Fill in patient details (Name, Age, Height, Weight, Symptoms).

Tap Start Chatting.

Choose your preferred LLM from the dropdown.

Begin the conversation and compare results across models.

🔐 If a signed-out user tries to access any protected page (like the form or chat), the app redirects them to the Sign-In screen.

🧑‍💻 User Features
🧾 Fetch & resume previous chat sessions.

🧠 Compare different model responses on identical queries.

📈 View performance stats and model efficiency insights.

📊 Expected Outcomes
In-depth analysis of cloud vs. local LLMs in a real-world app.

Software engineering insights into LLM integration.

Visualization dashboards to present the performance metrics.

🧱 Architecture Diagrams
🔄 Sequence Diagram
Updated with actual tools used:

Frontend uses React Native, Ky, and Firebase

Backend microservices use Express, Mongoose, Axios

🏗️ Class Diagrams (Updated)
Clean separation of concerns across User, Chat, Prompt, and Response entities.

Updated to show Firebase Auth, and integration with MongoDB using Mongoose.

🌐 Network Architecture
Includes:

React Native frontend (Firebase → Express → Microservices)

Cloud LLM APIs

Local model microservice handler

MongoDB for persistent storage

🎯 Activity & State Diagram
Illustrates the flow:

User lands on the homepage.

On clicking “Start Chat”, if signed in → proceeds to the form.

If not signed in → redirected to Sign-In screen.

🗃️ Entity-Relationship (ER) Diagram
txt
Copy
Edit
User
- email: string
- password: string
- firebaseId: string
- chats: [chat ids]

Chat
- firebaseId: string (owner id)
- title: string
- prompts: [prompt ids]
- responses: [response ids]

Prompt
- chat: id
- askedAt: Date
- text: string

Response
- chat: id
- repliedAt: Date
- text: string
- generatedBy: string (e.g., ChatGPT, Claude)
🔮 Future Enhancements
Expand into other industries like education, finance, legal.

Add support for new LLMs as they are released.

Enhance the benchmarking engine for deeper analysis and automation.

📚 License
This project is licensed under the MIT License.

👥 Contributors
Adheil Gupta (23BDS002)

Arnav Gupta (23BDS009)

Atharva Agrawal (23BDS010)

SuryaNarayan Rao (23BDS025)

💡 Contributions are welcome! Submit pull requests anytime 🚀

🛠️ How to Contribute
Fork this repository.

Create a new branch (feature-xyz).

Commit your changes.

Push your branch and submit a Pull Request.
