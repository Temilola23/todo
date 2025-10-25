

I'll create a bright and modern todo list app with a yellow color scheme using shadcn/ui components.

```tsx file="app/page.tsx"
'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  Sun, 
  ListTodo,
  Filter,
  Sparkles
} from 'lucide-react'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

type FilterType = 'all' | 'active' | 'completed'

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date()
      }
      setTodos([todo, ...todos])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed)
      case 'completed':
        return todos.filter(todo => todo.completed)
      default:
        return todos
    }
  }, [todos, filter])

  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter(todo => todo.completed).length
    const active = total - completed
    return { total, completed, active }
  }, [todos])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
              <Sun className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Bright Todo
            </h1>
            <Sparkles className="h-6 w-6 text-yellow-200 animate-pulse" />
          </div>
          <p className="text-center text-white/90 text-lg">
            Organize your day with sunshine and productivity
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <ListTodo className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-yellow-800">{stats.total}</p>
                  <p className="text-yellow-600 text-sm">Total Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Circle className="h-8 w-8 text-amber-600" />
                <div>
                  <p className="text-2xl font-bold text-amber-800">{stats.active}</p>
                  <p className="text-amber-600 text-sm">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-100 to-green-200 border-green-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-green-800">{stats.completed}</p>
                  <p className="text-green-600 text-sm">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Todo */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-yellow-200 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Plus className="h-5 w-5" />
              Add New Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
              />
              <Button 
                onClick={addTodo}
                className="bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-white shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Filter:</span>
              </div>
              <div className="flex gap-2">
                {(['all', 'active', 'completed'] as FilterType[]).map((filterType) => (
                  <Button
                    key={filterType}
                    variant={filter === filterType ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(filterType)}
                    className={filter === filterType 
                      ? "bg-yellow-400 hover:bg-yellow-500 text-white" 
                      : "border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                    }
                  >
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <Card className="bg-white/60 backdrop-blur-sm border-yellow-200">
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-yellow-100 rounded-full">
                    <ListTodo className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                      {filter === 'all' ? 'No tasks yet!' : `No ${filter} tasks`}
                    </h3>
                    <p className="text-yellow-600">
                      {filter === 'all' 
                        ? 'Add your first task to get started' 
                        : `You have no ${filter} tasks right now`
                      }
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredTodos.map((todo) => (
              <Card 
                key={todo.id} 
                className={`bg-white/80 backdrop-blur-sm border-yellow-200 shadow-sm hover:shadow-md transition-all duration-200 ${
                  todo.completed ? 'opacity-75' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <div className="flex-1">
                      <p className={`text-lg ${
                        todo.completed 
                          ? 'line-through text-gray-500' 
                          : 'text-gray-800'
                      }`}>
                        {todo.text}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {todo.createdAt.toLocaleDateString()} at {todo.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {todo.completed && (
                        <Badge className="bg-green-100 text-green-800 border-green-300">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Done
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Footer */}
        {todos.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-yellow-700">
              {stats.completed} of {stats.total} tasks completed
            </p>
            <div className="w-full bg-yellow-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-amber-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

This todo list app features:

🌟 **Bright Yellow Design**: Uses a vibrant yellow and amber color scheme with gradients
📱 **Responsive Layout**: Works perfectly on mobile and desktop
✨ **Modern UI**: Clean cards, smooth animations, and beautiful gradients
📊 **Statistics Dashboard**: Shows total, active, and completed tasks
🔍 **Filtering**: Filter between all, active, and completed tasks
✅ **Full Functionality**: Add, complete, and delete todos
🎨 **Visual Feedback**: Progress bar, badges, and status indicators
🌅 **Themed Icons**: Sun and sparkle icons for the bright theme

The app uses shadcn/ui components throughout and provides a delightful user experience with smooth transitions and a cheerful, productive atmosphere!