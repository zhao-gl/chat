package models

type RequestContent struct {
	Type    string `json:"type"`
	Role    string `json:"role"`
	Content string `json:"content"`
	Model   string `json:"model"`
}

// Message 消息结构体
type Message struct {
	Role    string `json:"role"`    // "user" 或 "ai"
	Content string `json:"content"` // 消息内容
	Time    string `json:"time"`    // 时间戳
}

type Session struct {
	Id      string    `json:"id"`
	Title   string    `json:"title"`
	MsgList []Message `json:"msgList"`
}
