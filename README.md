# 🏥 LLM Performance Comparison in a Healthcare App

## 📌 Project Overview

This project evaluates the performance of different **Large Language Models (LLMs)** by integrating them into a healthcare-focused app. The primary objective is to apply **software engineering principles** while analyzing LLMs based on key performance metrics.

---

## 🎯 Application Use Case

The app provides **healthcare-related questions** as input to multiple LLMs (both **cloud-based** and **local**) to compare their efficiency, accuracy, and resource usage.

---

## 🚀 Objectives

### 1️⃣ Define & Implement the App

- Develop an interactive app to send **healthcare-related queries** to various LLMs.
- Support both **cloud-based APIs** (e.g., OpenAI, Gemini, Claude) and **local models**.

### 2️⃣ Integrate & Compare Multiple LLMs

- Use different LLMs from:
  - **Cloud-based**: ChatGPT (OpenAI), Gemini (Google), Claude (Anthropic).
  - **Local**: biomedlm (Stanford), LLama-3.1 (8B).

### 3️⃣ Test Across Devices & Conditions

- Run tests on **different devices** (laptop, cloud VM, mobile, edge devices).
- Evaluate models under **varying network conditions** to assess real-world performance.

### 4️⃣ Measure Key Performance Metrics

- **Response Time**: How quickly the model generates a response.
- **Accuracy & Relevance**: Compare responses against standard answers.
- **Resource Usage**: Measure **CPU, RAM, and GPU consumption**.
- **Latency Issues**: Identify **delays** in response delivery.

### 5️⃣ Data Collection & Visualization

- Gather data from multiple test cases.
- Use **graphs, charts, and tables** to present findings.

---

## 🛠️ Process

- Downloaded models, trained, and fine-tuned them for app integration.
- Acquired API keys for various LLM models and integrated them using **FastAPI**.
- Developed an **interactive app** using **React Native (Frontend)**.

---

## 📌 How to Use the App

1. **Sign in** with valid credentials.
2. **Fill in** details (Name, Age, Height, Weight, Symptoms).
3. Click on **Start Chatting**.
4. **Select a model** from the dropdown list.
5. **Compare efficiency** and various parameters across multiple LLMs.

---

## 🏗️ Tech Stack

- **Backend**: Node.js, Express, Python (FastAPI/Flask)
- **Frontend**: React Native, Tailwind CSS (UI)
- **Database**: PostgreSQL/MongoDB (for storing test results)
- **Cloud APIs**: OpenAI, Google Gemini, Anthropic Claude
- **Local LLMs**: Hugging Face models (via Transformers library)
- **Visualization**: Matplotlib, Seaborn, Plotly

---

## 📊 Expected Outcomes

- A **detailed performance comparison** of cloud-based vs. local LLMs.
- Insights into **software engineering best practices** for LLM integration.
- **Visualization dashboards** showcasing LLM performance.

---

## 🔮 Future Enhancements

- Expand to other domains (**education, finance, legal**).
- Add **more LLMs** as they become available.
- Improve **benchmarking framework** for deeper analysis.

---

## 📚 License

This project is open-source under the **MIT License**.

---

## 👥 Contributors

- **Adheil Gupta** (23BDS002)
- **Arnav Gupta** (23BDS009)
- **Atharva Agrawal** (23BDS010)
- **SuryaNarayan Rao** (23BDS025)

💡 **Contributions are welcome!** Feel free to submit pull requests. 🚀

---

## 🛠️ How to Contribute

1. **Fork** the repository.
2. **Create a new branch** (`feature-xyz`).
3. **Commit** your changes.
4. **Push** to your branch and submit a **Pull Request (PR)**.

---
