

I'll create a bright and vibrant todo list dashboard using shadcn/ui components with a yellow color scheme.

```tsx file="app/dashboard/page.tsx"
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Sun, CheckCircle2, Circle, Filter } from 'lucide-react'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

type FilterType = 'all' | 'active' | 'completed'

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      text: 'Design the new landing page',
      completed: false,
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      text: 'Review pull requests',
      completed: true,
      createdAt: new Date('2024-01-14')
    },
    {
      id: '3',
      text: 'Update documentation',
      completed: false,
      createdAt: new Date('2024-01-13')
    }
  ])
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

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const completedCount = todos.filter(todo => todo.completed).length
  const activeCount = todos.filter(todo => !todo.completed).length

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-yellow-400 rounded-full shadow-lg">
              <Sun className="h-8 w-8 text-yellow-900" />
            </div>
            <h1 className="text-4xl font-bold text-yellow-900">Sunny Todos</h1>
          </div>
          <p className="text-yellow-700 text-lg">Brighten your day with organized tasks!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-yellow-200 bg-yellow-100/50 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-400 rounded-lg">
                  <Circle className="h-5 w-5 text-yellow-900" />
                </div>
                <div>
                  <p className="text-sm text-yellow-700">Active Tasks</p>
                  <p className="text-2xl font-bold text-yellow-900">{activeCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-100/50 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-400 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-900" />
                </div>
                <div>
                  <p className="text-sm text-green-700">Completed</p>
                  <p className="text-2xl font-bold text-green-900">{completedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-amber-100/50 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-400 rounded-lg">
                  <Filter className="h-5 w-5 text-amber-900" />
                </div>
                <div>
                  <p className="text-sm text-amber-700">Total Tasks</p>
                  <p className="text-2xl font-bold text-amber-900">{todos.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Todo Section */}
        <Card className="mb-8 border-yellow-300 bg-white/80 shadow-lg">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input
                placeholder="What needs to be done today?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500"
              />
              <Button 
                onClick={addTodo}
                className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-semibold shadow-md"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-yellow-900' 
              : 'border-yellow-300 text-yellow-700 hover:bg-yellow-100'
            }
          >
            All Tasks ({todos.length})
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
            className={filter === 'active' 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-yellow-900' 
              : 'border-yellow-300 text-yellow-700 hover:bg-yellow-100'
            }
          >
            Active ({activeCount})
          </Button>
          <Button
            variant={filter === 'completed' ? 'default' : 'outline'}
            onClick={() => setFilter('completed')}
            className={filter === 'completed' 
              ? 'bg-yellow-500 hover:bg-yellow-600 text-yellow-900' 
              : 'border-yellow-300 text-yellow-700 hover:bg-yellow-100'
            }
          >
            Completed ({completedCount})
          </Button>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <Card className="border-yellow-200 bg-yellow-50/50">
              <CardContent className="p-8 text-center">
                <Sun className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <p className="text-yellow-700 text-lg">
                  {filter === 'all' && 'No tasks yet! Add one above to get started.'}
                  {filter === 'active' && 'No active tasks! Time to relax or add new ones.'}
                  {filter === 'completed' && 'No completed tasks yet. Keep working!'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredTodos.map((todo) => (
              <Card 
                key={todo.id} 
                className={`border-2 transition-all duration-200 shadow-md hover:shadow-lg ${
                  todo.completed 
                    ? 'border-green-300 bg-green-50/50' 
                    : 'border-yellow-300 bg-white/80'
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
                          ? 'line-through text-green-700' 
                          : 'text-yellow-900'
                      }`}>
                        {todo.text}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created {todo.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {todo.completed && (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Done
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
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
        <div className="text-center mt-12 p-6 bg-yellow-100/50 rounded-lg border border-yellow-200">
          <p className="text-yellow-700">
            ✨ Stay organized and keep shining! ✨
          </p>
        </div>
      </div>
    </div>
  )
}
```

This bright and cheerful todo list dashboard features:

🌟 **Key Features:**
- **Bright Yellow Theme**: Uses yellow, amber, and orange gradients for a sunny, energetic feel
- **Complete Todo Management**: Add, toggle completion, and delete tasks
- **Smart Filtering**: View all, active, or completed tasks
- **Statistics Cards**: Visual overview of task counts
- **Responsive Design**: Works great on all screen sizes

🎨 **Visual Elements:**
- Gradient background from yellow to orange
- Colorful stat cards with icons
- Smooth transitions and hover effects
- Bright, accessible color combinations
- Sun icon theme throughout

⚡ **Functionality:**
- Add todos with Enter key or button click
- Toggle completion status with checkboxes
- Delete individual todos
- Filter by status (all/active/completed)
- Real-time statistics updates
- Sample data included for demonstration

The design uses shadcn/ui components with custom yellow/bright styling and Lucide icons for a modern, vibrant todo list experience!