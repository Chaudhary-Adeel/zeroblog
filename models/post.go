package models

import (
	"time"

	"gorm.io/gorm"
)

// Post represents a blog post
type Post struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	TenantID    uint           `gorm:"index;not null" json:"tenant_id"`
	AuthorID    uint           `gorm:"index;not null" json:"author_id"`
	Title       string         `gorm:"index;not null" json:"title"`
	Slug        string         `gorm:"index;not null" json:"slug"`
	Excerpt     string         `json:"excerpt"`
	Content     string         `gorm:"type:longtext" json:"content"`
	Featured    bool           `gorm:"default:false" json:"featured"`
	Published   bool           `gorm:"default:false;index" json:"published"`
	ViewCount   int64          `gorm:"default:0" json:"view_count"`
	ReadTime    int            `json:"read_time"` // in minutes
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	PublishedAt *time.Time     `json:"published_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`

	// Relationships
	Tenant     Tenant     `gorm:"foreignKey:TenantID;constraint:OnDelete:Cascade" json:"-"`
	Author     User       `gorm:"foreignKey:AuthorID;constraint:OnDelete:Cascade" json:"-"`
	Categories []Category `gorm:"many2many:post_categories;foreignKey:ID;joinForeignKey:PostID;References:ID;joinReferences:CategoryID;constraint:OnDelete:Cascade" json:"-"`
	Comments   []Comment  `gorm:"foreignKey:PostID;constraint:OnDelete:Cascade" json:"-"`
}

// TableName specifies the table name for Post
func (Post) TableName() string {
	return "posts"
}

// Category represents a blog post category
type Category struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	TenantID    uint           `gorm:"index;not null" json:"tenant_id"`
	Name        string         `gorm:"index;not null" json:"name"`
	Slug        string         `gorm:"index;not null" json:"slug"`
	Description string         `json:"description"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`

	// Relationships
	Tenant Tenant `gorm:"foreignKey:TenantID;constraint:OnDelete:Cascade" json:"-"`
	Posts  []Post `gorm:"many2many:post_categories;foreignKey:ID;joinForeignKey:CategoryID;References:ID;joinReferences:PostID;constraint:OnDelete:Cascade" json:"-"`
}

// TableName specifies the table name for Category
func (Category) TableName() string {
	return "categories"
}

// PostCategory is a join table for Post and Category
type PostCategory struct {
	PostID     uint     `gorm:"primaryKey;column:post_id"`
	CategoryID uint     `gorm:"primaryKey;column:category_id"`
	Post       Post     `gorm:"foreignKey:PostID;constraint:OnDelete:Cascade"`
	Category   Category `gorm:"foreignKey:CategoryID;constraint:OnDelete:Cascade"`
}

// TableName specifies the table name for PostCategory
func (PostCategory) TableName() string {
	return "post_categories"
}

// Comment represents a comment on a blog post
type Comment struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	PostID    uint           `gorm:"index;not null" json:"post_id"`
	UserID    uint           `gorm:"index" json:"user_id"`
	Content   string         `gorm:"type:text;not null" json:"content"`
	Approved  bool           `gorm:"default:false;index" json:"approved"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`

	// Relationships
	Post Post  `gorm:"foreignKey:PostID;constraint:OnDelete:Cascade" json:"-"`
	User *User `gorm:"foreignKey:UserID;constraint:OnDelete:SetNull" json:"-"`
}

// TableName specifies the table name for Comment
func (Comment) TableName() string {
	return "comments"
}
