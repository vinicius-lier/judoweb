'use client'

import React, { useState, useEffect } from 'react'
import BaseLayout from '@/components/layout/base-layout'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Student {
  id: string
  name: string
}

interface Class {
  id: string
  name: string
}

interface Attendance {
  id: string
  date: string
  present: boolean
  student: Student
  class: Class
}

export default function PresencasPage() {
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
  const [classes, setClasses] = useState<Class[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/classes')
        if (!response.ok) {
          throw new Error('Erro ao buscar turmas')
        }
        const data = await response.json()
        setClasses(data || [])
      } catch (error) {
        console.error('Erro ao buscar turmas:', error)
        setClasses([])
      }
    }

    fetchClasses()
  }, [])

  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedClass) return
      
      try {
        const response = await fetch('http://localhost:3000/api/students')
        if (!response.ok) {
          throw new Error('Erro ao buscar alunos')
        }
        const data = await response.json()
        setStudents(data || [])
      } catch (error) {
        console.error('Erro ao buscar alunos:', error)
        setStudents([])
      }
    }

    fetchStudents()
  }, [selectedClass])

  useEffect(() => {
    const fetchAttendances = async () => {
      if (!selectedClass || !selectedDate) return
      
      setLoading(true)
      try {
        const response = await fetch(`http://localhost:3000/api/attendances/class?classId=${selectedClass}&date=${selectedDate}`)
        if (!response.ok) {
          throw new Error('Erro ao buscar presenças')
        }
        const data = await response.json()
        setAttendances(data || [])
      } catch (error) {
        console.error('Erro ao buscar presenças:', error)
        setAttendances([])
      } finally {
        setLoading(false)
      }
    }

    fetchAttendances()
  }, [selectedClass, selectedDate])

  const handleAttendanceChange = async (studentId: string, present: boolean) => {
    try {
      const existingAttendance = attendances.find(a => a.student.id === studentId)
      
      if (existingAttendance) {
        // Atualizar presença existente
        const response = await fetch(`http://localhost:3000/api/attendances/${existingAttendance.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ present }),
        })
        
        if (!response.ok) {
          throw new Error('Erro ao atualizar presença')
        }
        
        const updatedAttendance = await response.json()
        setAttendances(prev => 
          prev.map(a => a.id === updatedAttendance.id ? updatedAttendance : a)
        )
      } else {
        // Criar nova presença
        const response = await fetch('http://localhost:3000/api/attendances', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            date: selectedDate,
            present,
            studentId,
            classId: selectedClass,
          }),
        })
        
        if (!response.ok) {
          throw new Error('Erro ao registrar presença')
        }
        
        const newAttendance = await response.json()
        setAttendances(prev => [...prev, newAttendance])
      }
      
      setMessage('Presença registrada com sucesso!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Erro ao registrar presença:', error)
      setMessage('Erro ao registrar presença. Tente novamente.')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <BaseLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Controle de Presenças</h1>
        
        {message && (
          <div className={`p-4 mb-4 rounded-md ${message.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-gray-700">
              Turma
            </label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Selecione uma turma</option>
              {Array.isArray(classes) && classes.map(class_ => (
                <option key={class_.id} value={class_.id}>
                  {class_.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Data
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Carregando...</p>
          </div>
        ) : selectedClass && Array.isArray(students) && students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aluno
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map(student => {
                  const attendance = attendances.find(a => a.student.id === student.id)
                  return (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          attendance?.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {attendance?.present ? 'Presente' : 'Ausente'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleAttendanceChange(student.id, !attendance?.present)}
                          className={`mr-2 ${
                            attendance?.present ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          {attendance?.present ? 'Marcar como Ausente' : 'Marcar como Presente'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : selectedClass ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum aluno encontrado para esta turma.</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Selecione uma turma para visualizar as presenças.</p>
          </div>
        )}
      </div>
    </BaseLayout>
  )
} 