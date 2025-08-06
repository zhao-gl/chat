package handlers

import (
	"chat/config"
	"chat/internal/handlers/ai"
	"chat/internal/models"
	"fmt"
)

// CreateSession 创建新会话
func CreateSession() (models.Session, error) {
	newSession := models.Session{
		Title: "新会话",
	}
	// 执行SQL
	_, err := config.DB.Exec("INSERT INTO session(title) VALUES(?)", newSession.Title)
	return newSession, err
}

// GetSession 查询会话
func GetSession(sessionId string) (models.Session, error) {
	return models.Session{}, nil
}

// GetAllSessions 查询全部历史会话
func GetAllSessions() ([]models.Session, error) {
	return []models.Session{}, nil
}

// DelSession 删除会话
func DelSession(sessionId string) (bool, error) {
	return true, nil
}

// HandleChat 处理聊天请求
func HandleChat(reqContent models.RequestContent) []byte {
	fmt.Println("type", reqContent.Type)
	if reqContent.Type == "qwen" {
		return ai.QueryQWen(reqContent)
	}
	return []byte{0}
}
