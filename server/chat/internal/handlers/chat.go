package handlers

import (
	"chat/internal/handlers/ai"
	"chat/internal/models"
	"fmt"
)

// HandleChat 处理聊天请求
func HandleChat(reqContent models.RequestContent) []byte {
	fmt.Println("type", reqContent.Type)
	if reqContent.Type == "qwen" {
		return ai.QueryQWen(reqContent)
	}
	return []byte{0}
}
