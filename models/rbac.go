package models

import (
	"time"

	"gorm.io/gorm"
)

// Role represents a role within a tenant for RBAC
type Role struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	TenantID    uint           `gorm:"index;not null" json:"tenant_id"`
	Name        string         `gorm:"index;not null" json:"name"`
	Description string         `json:"description"`
	IsSystem    bool           `gorm:"default:false" json:"is_system"` // System roles cannot be deleted
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`

	// Relationships
	Tenant      Tenant       `gorm:"foreignKey:TenantID;constraint:OnDelete:Cascade" json:"-"`
	Permissions []Permission `gorm:"many2many:role_permissions;foreignKey:ID;joinForeignKey:RoleID;References:ID;joinReferences:PermissionID;constraint:OnDelete:Cascade" json:"-"`
	Users       []User       `gorm:"many2many:user_roles;foreignKey:ID;joinForeignKey:RoleID;References:ID;joinReferences:UserID;constraint:OnDelete:Cascade" json:"-"`
}

// TableName specifies the table name for Role
func (Role) TableName() string {
	return "roles"
}

// Permission represents a permission that can be assigned to roles
type Permission struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	Name        string         `gorm:"uniqueIndex;not null" json:"name"`
	Description string         `json:"description"`
	Module      string         `gorm:"index" json:"module"` // e.g., "posts", "users", "settings"
	Action      string         `json:"action"`              // e.g., "create", "read", "update", "delete"
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"`

	// Relationships
	Roles []Role `gorm:"many2many:role_permissions;foreignKey:ID;joinForeignKey:PermissionID;References:ID;joinReferences:RoleID;constraint:OnDelete:Cascade" json:"-"`
}

// TableName specifies the table name for Permission
func (Permission) TableName() string {
	return "permissions"
}

// UserRole is a join table for User and Role
type UserRole struct {
	UserID     uint      `gorm:"primaryKey;column:user_id"`
	RoleID     uint      `gorm:"primaryKey;column:role_id"`
	AssignedAt time.Time `gorm:"autoCreateTime" json:"assigned_at"`
	User       User      `gorm:"foreignKey:UserID;constraint:OnDelete:Cascade"`
	Role       Role      `gorm:"foreignKey:RoleID;constraint:OnDelete:Cascade"`
}

// TableName specifies the table name for UserRole
func (UserRole) TableName() string {
	return "user_roles"
}

// RolePermission is a join table for Role and Permission
type RolePermission struct {
	RoleID       uint       `gorm:"primaryKey;column:role_id"`
	PermissionID uint       `gorm:"primaryKey;column:permission_id"`
	AssignedAt   time.Time  `gorm:"autoCreateTime" json:"assigned_at"`
	Role         Role       `gorm:"foreignKey:RoleID;constraint:OnDelete:Cascade"`
	Permission   Permission `gorm:"foreignKey:PermissionID;constraint:OnDelete:Cascade"`
}

// TableName specifies the table name for RolePermission
func (RolePermission) TableName() string {
	return "role_permissions"
}
