'use client'

import { useState, useRef, useEffect } from 'react'
import { Pencil, Check, X, Upload, Image as ImageIcon } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface EditableTextProps {
  value: string
  onChange: (value: string) => void
  type?: 'text' | 'textarea' | 'email' | 'url'
  className?: string
  placeholder?: string
  multiline?: boolean
  maxLength?: number
}

export function EditableText({ 
  value, 
  onChange, 
  type = 'text',
  className = '', 
  placeholder = 'Click to edit',
  multiline = false,
  maxLength
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      if (type === 'text' && inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select()
      }
    }
  }, [isEditing, type])

  const handleSave = () => {
    onChange(editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    } else if (e.key === 'Enter' && e.ctrlKey && multiline) {
      handleSave()
    }
  }

  if (isEditing) {
    const Component = multiline ? 'textarea' : 'input'
    return (
      <div className="relative group">
        <Component
          ref={inputRef as any}
          type={multiline ? undefined : type}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          className={`${className} border-2 border-primary rounded-md px-2 py-1 w-full resize-none bg-background text-foreground`}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={multiline ? 3 : undefined}
        />
        <div className="absolute -right-16 top-0 flex gap-1 bg-card border border-border shadow-lg rounded-md p-1 z-20">
          <Button size="sm" variant="ghost" onClick={handleSave} className="h-6 w-6 p-0">
            <Check className="h-3 w-3 text-green-600" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel} className="h-6 w-6 p-0">
            <X className="h-3 w-3 text-red-600" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`${className} group relative cursor-pointer hover:border-primary/50 border border-transparent rounded-md px-2 py-1 transition-all text-foreground`}
      onClick={() => setIsEditing(true)}
    >
      {value || <span className="text-muted-foreground italic">{placeholder}</span>}
      <Pencil className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-card border border-border rounded p-0.5 shadow-sm text-muted-foreground" />
    </div>
  )
}

interface EditableImageProps {
  src?: string
  alt: string
  onChange: (src: string) => void
  className?: string
  placeholder?: string
}

export function EditableImage({ 
  src, 
  alt, 
  onChange, 
  className = '', 
  placeholder = 'Click to upload image' 
}: EditableImageProps) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    try {
      // Convert to base64 for demo (in production, upload to cloud storage)
      const reader = new FileReader()
      reader.onload = () => {
        onChange(reader.result as string)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading image:', error)
      setIsUploading(false)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`${className} group relative cursor-pointer hover:border-primary/50 border border-transparent rounded-lg transition-all`} onClick={handleClick}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-full bg-muted border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <ImageIcon className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">{placeholder}</p>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        {isUploading ? (
          <div className="text-white text-sm">Uploading...</div>
        ) : (
          <div className="text-white text-sm flex items-center gap-2">
            <Upload className="h-4 w-4" />
            {src ? 'Change Image' : 'Upload Image'}
          </div>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}

interface EditableListProps<T> {
  items: T[]
  onChange: (items: T[]) => void
  renderItem: (item: T, index: number, onUpdate: (item: T) => void, onDelete: () => void) => React.ReactNode
  onAdd: () => T
  addButtonText?: string
  className?: string
}

export function EditableList<T>({ 
  items, 
  onChange, 
  renderItem, 
  onAdd, 
  addButtonText = 'Add Item',
  className = '' 
}: EditableListProps<T>) {
  const handleAdd = () => {
    const newItem = onAdd()
    onChange([...items, newItem])
  }

  const handleUpdate = (index: number, updatedItem: T) => {
    const newItems = [...items]
    newItems[index] = updatedItem
    onChange(newItems)
  }

  const handleDelete = (index: number) => {
    const newItems = items.filter((_, i) => i !== index)
    onChange(newItems)
  }

  return (
    <div className={className}>
      {items.map((item, index) => 
        renderItem(
          item, 
          index, 
          (updatedItem) => handleUpdate(index, updatedItem),
          () => handleDelete(index)
        )
      )}
      <Button 
        variant="outline" 
        onClick={handleAdd}
        className="mt-4 w-full border-dashed"
      >
        {addButtonText}
      </Button>
    </div>
  )
}

interface EditableSelectProps {
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  className?: string
}

export function EditableSelect({ value, options, onChange, className = '' }: EditableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`${className} relative`}>
      <div 
        className="cursor-pointer border border-input bg-background text-foreground rounded px-3 py-2 hover:bg-accent/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.find(opt => opt.value === value)?.label || 'Select...'}
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-card text-card-foreground border border-border rounded shadow-lg z-30 max-h-40 overflow-y-auto">
          {options.map(option => (
            <div
              key={option.value}
              className="px-3 py-2 hover:bg-accent cursor-pointer transition-colors"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}