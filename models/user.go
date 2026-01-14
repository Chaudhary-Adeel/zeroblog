package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents a blog user within a tenant
type User struct {
	ID           uint           `gorm:"primaryKey" json:"id"`
	TenantID     uint           `gorm:"index;not null" json:"tenant_id"`
	Email        string         `gorm:"index;not null" json:"email"`
	Username     string         `gorm:"index;not null" json:"username"`
	Password     string         `gorm:"-" json:"-"` // Never serialize password
	PasswordHash string         `gorm:"column:password_hash" json:"-"`
	FirstName    string         `json:"first_name"`
	LastName     string         `json:"last_name"`
	Avatar       string         `json:"avatar"`
	Bio          string         `json:"bio"`
	IsActive     bool           `gorm:"default:true" json:"is_active"`
	CreatedAt    time.Time      `json:"created_at"`
	UpdatedAt    time.Time      `json:"updated_at"`
	DeletedAt    gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`

	// Relationships
	Tenant Tenant `gorm:"foreignKey:TenantID;constraint:OnDelete:Cascade" json:"-"`
	Roles  []Role `gorm:"many2many:user_roles;foreignKey:ID;joinForeignKey:UserID;References:ID;joinReferences:RoleID;constraint:OnDelete:Cascade" json:"-"`
	Posts  []Post `gorm:"foreignKey:AuthorID;constraint:OnDelete:Cascade" json:"-"`
}

// TableName specifies the table name for User
func (User) TableName() string {
	return "users"
}
