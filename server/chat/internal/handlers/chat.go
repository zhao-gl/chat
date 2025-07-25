package handlers

import (
	"chat/internal/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"
)

// 处理聊天请求
func handleChat(w http.ResponseWriter, r *http.Request) {
	// 处理预检请求
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// 处理POST请求，接收用户消息
	if r.Method == "POST" {
		var msg models.Message
		err := json.NewDecoder(r.Body).Decode(&msg)
		if err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// 设置SSE响应头
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")

		// 模拟AI思考过程，分块返回结果
		aiResponse := generateAIResponse(msg.Content)
		words := strings.Split(aiResponse, " ")

		// 逐词发送响应
		for i, word := range words {
			// 构建AI消息
			responseMsg := models.Message{
				Type: "ai",
				Content: word + (func() string {
					if i < len(words)-1 {
						return " "
					}
					return ""
				})(),
				Time: time.Now().Format(time.RFC3339),
			}

			// 转换为JSON
			data, err := json.Marshal(responseMsg)
			if err != nil {
				log.Printf("Error marshaling response: %v", err)
				continue
			}

			// 按照SSE格式发送数据
			_, err2 := fmt.Fprintf(w, "data: %s\n\n", data)
			if err2 != nil {
				fmt.Println(err2)
				return
			}

			// 刷新缓冲区，确保数据被立即发送
			if flusher, ok := w.(http.Flusher); ok {
				flusher.Flush()
			} else {
				log.Println("Streaming not supported")
				return
			}

			// 模拟思考延迟
			time.Sleep(200 * time.Millisecond)
		}

		return
	}

	http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
}

// 生成AI响应（实际应用中替换为真实AI模型调用）
func generateAIResponse(input string) string {
	// 简单的响应示例，实际应用中应调用真实的AI模型
	responses := map[string]string{
		"hello":            "Hello! How can I help you today?",
		"hi":               "Hi there! What can I do for you?",
		"how are you":      "I'm just a program, but thanks for asking! How about you?",
		"what's your name": "I'm an AI chatbot created with Go and SSE. You can call me SSE Bot!",
	}

	// 转换为小写便于匹配
	lowerInput := strings.ToLower(input)

	// 查找匹配的响应
	for key, response := range responses {
		if strings.Contains(lowerInput, key) {
			return response
		}
	}

	// 默认响应
	return "Thank you for your message: " + input + ". This is a sample response from the AI."
}
